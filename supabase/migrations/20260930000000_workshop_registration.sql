BEGIN;

CREATE TABLE public.workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (length(btrim(title)) > 0),
  description text NOT NULL DEFAULT '',
  workshop_date date NOT NULL,
  start_time time without time zone NOT NULL,
  time_zone text NOT NULL DEFAULT 'UTC' CHECK (length(btrim(time_zone)) > 0),
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  price_minor bigint NOT NULL CHECK (price_minor > 0),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  capacity integer NOT NULL CHECK (capacity > 0),
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.workshop_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id uuid NOT NULL REFERENCES public.workshops(id) ON DELETE RESTRICT,
  attendee_name text NOT NULL CHECK (length(btrim(attendee_name)) > 0),
  attendee_email text NOT NULL CHECK (length(btrim(attendee_email)) > 3),
  attendee_email_normalized text GENERATED ALWAYS AS (lower(btrim(attendee_email))) STORED,
  attendee_phone text CHECK (attendee_phone IS NULL OR length(btrim(attendee_phone)) > 0),
  status text NOT NULL DEFAULT 'pending_payment'
    CHECK (status IN ('pending_payment', 'confirmed', 'cancelled', 'expired')),
  reservation_expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 minutes'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL REFERENCES public.workshop_registrations(id) ON DELETE RESTRICT,
  provider text NOT NULL CHECK (provider = lower(btrim(provider)) AND length(provider) > 0),
  provider_order_id text,
  provider_payment_id text,
  provider_event_id text,
  amount_minor bigint NOT NULL CHECK (amount_minor > 0),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded')),
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status = 'pending' OR verified_at IS NOT NULL),
  CHECK (
    status NOT IN ('authorized', 'captured', 'refunded', 'partially_refunded')
    OR provider_payment_id IS NOT NULL
  )
);

CREATE INDEX workshops_public_schedule_idx
  ON public.workshops (workshop_date, start_time)
  WHERE status = 'published';

CREATE INDEX workshop_registrations_workshop_status_idx
  ON public.workshop_registrations (workshop_id, status, created_at DESC);

CREATE INDEX workshop_registrations_expiring_holds_idx
  ON public.workshop_registrations (workshop_id, reservation_expires_at)
  WHERE status = 'pending_payment';

CREATE UNIQUE INDEX workshop_registrations_active_attendee_idx
  ON public.workshop_registrations (workshop_id, attendee_email_normalized)
  WHERE status IN ('pending_payment', 'confirmed');

CREATE INDEX payments_registration_created_idx
  ON public.payments (registration_id, created_at DESC);

CREATE UNIQUE INDEX payments_provider_order_id_idx
  ON public.payments (provider, provider_order_id)
  WHERE provider_order_id IS NOT NULL;

CREATE UNIQUE INDEX payments_provider_payment_id_idx
  ON public.payments (provider, provider_payment_id)
  WHERE provider_payment_id IS NOT NULL;

CREATE UNIQUE INDEX payments_provider_event_id_idx
  ON public.payments (provider, provider_event_id)
  WHERE provider_event_id IS NOT NULL;

CREATE UNIQUE INDEX payments_one_open_attempt_per_registration_idx
  ON public.payments (registration_id)
  WHERE status IN ('authorized', 'captured');

CREATE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER workshops_set_updated_at
  BEFORE UPDATE ON public.workshops
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER workshop_registrations_set_updated_at
  BEFORE UPDATE ON public.workshop_registrations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER payments_set_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE FUNCTION public.reserve_workshop_registration(
  p_workshop_id uuid,
  p_attendee_name text,
  p_attendee_email text,
  p_attendee_phone text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_workshop public.workshops%ROWTYPE;
  v_registration_id uuid;
  v_reserved_count bigint;
  v_email text;
BEGIN
  IF p_attendee_name IS NULL OR length(btrim(p_attendee_name)) = 0 THEN
    RAISE EXCEPTION 'Attendee name is required' USING ERRCODE = '22023';
  END IF;

  IF p_attendee_email IS NULL OR length(btrim(p_attendee_email)) <= 3 THEN
    RAISE EXCEPTION 'A valid attendee email is required' USING ERRCODE = '22023';
  END IF;

  v_email := lower(btrim(p_attendee_email));

  SELECT *
    INTO v_workshop
    FROM public.workshops
   WHERE id = p_workshop_id
     AND status = 'published'
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Workshop is not available for registration' USING ERRCODE = 'P0002';
  END IF;

  IF (v_workshop.workshop_date + v_workshop.start_time) AT TIME ZONE v_workshop.time_zone <= pg_catalog.now() THEN
    RAISE EXCEPTION 'Workshop registration has closed' USING ERRCODE = 'P0001';
  END IF;

  UPDATE public.workshop_registrations
     SET status = 'expired'
   WHERE workshop_id = p_workshop_id
     AND status = 'pending_payment'
     AND reservation_expires_at <= pg_catalog.now();

  IF EXISTS (
    SELECT 1
      FROM public.workshop_registrations
     WHERE workshop_id = p_workshop_id
       AND attendee_email_normalized = v_email
       AND status IN ('pending_payment', 'confirmed')
  ) THEN
    RAISE EXCEPTION 'Attendee already has an active registration for this workshop'
      USING ERRCODE = '23505';
  END IF;

  SELECT count(*)
    INTO v_reserved_count
    FROM public.workshop_registrations
   WHERE workshop_id = p_workshop_id
     AND (
       status = 'confirmed'
       OR (status = 'pending_payment' AND reservation_expires_at > pg_catalog.now())
     );

  IF v_reserved_count >= v_workshop.capacity THEN
    RAISE EXCEPTION 'Workshop is at capacity' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.workshop_registrations (
    workshop_id,
    attendee_name,
    attendee_email,
    attendee_phone
  )
  VALUES (
    p_workshop_id,
    btrim(p_attendee_name),
    v_email,
    nullif(btrim(p_attendee_phone), '')
  )
  RETURNING id INTO v_registration_id;

  RETURN v_registration_id;
END;
$$;

ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY workshops_read_published
  ON public.workshops
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

REVOKE ALL ON public.workshops, public.workshop_registrations, public.payments FROM anon, authenticated;
GRANT SELECT ON public.workshops TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.workshops, public.workshop_registrations, public.payments TO service_role;

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reserve_workshop_registration(uuid, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_workshop_registration(uuid, text, text, text) TO service_role;

COMMENT ON COLUMN public.workshops.price_minor IS
  'Price in the currency''s minor unit; for example, INR paise. Never use floating-point money.';
COMMENT ON COLUMN public.payments.amount_minor IS
  'Amount in the currency''s minor unit. Compare with the server-verified provider amount.';
COMMENT ON COLUMN public.payments.verified_at IS
  'Set only by trusted server code after verifying the provider response or webhook signature.';
COMMENT ON COLUMN public.payments.provider_event_id IS
  'Optional verified provider event identifier for webhook idempotency; do not store raw webhook payloads here.';

COMMIT;