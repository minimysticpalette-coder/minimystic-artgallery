export interface ArtworkImage {
  publicId: string;
  version: string;
  format: string;
  alt: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
}

export interface ArtworkVideo {
  publicId: string;
  version: string;
  format: string;
  title?: string;
  posterPublicId?: string;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  category?: string;
  description: string;
  imageSize: string;
  images: ArtworkImage[];
  videos?: ArtworkVideo[];
  availableSizes?: string[];
  featured?: boolean;
  tags?: string[];
}

export interface Money {
  amountMinor: number;
  currency: string;
}

export type WorkshopStatus = 'draft' | 'scheduled' | 'full' | 'cancelled' | 'completed';

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt?: string;
  timezone?: string;
  location?: string;
  capacity?: number;
  status: WorkshopStatus;
}

export type ProductType = 'physical-artwork' | 'workshop-registration' | 'custom-commission';
export type ProductStatus = 'draft' | 'active' | 'archived';
export type ProductAvailability = 'available' | 'unavailable' | 'sold-out' | 'preorder';

interface ProductBase {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  sku?: string;
  price: Money;
  status: ProductStatus;
  availability: ProductAvailability;
}

export interface PhysicalArtworkProduct extends ProductBase {
  type: 'physical-artwork';
  artworkId: string;
}

export interface WorkshopRegistrationProduct extends ProductBase {
  type: 'workshop-registration';
  workshopId: string;
}

export interface CustomCommissionProduct extends ProductBase {
  type: 'custom-commission';
}

export type Product =
  | PhysicalArtworkProduct
  | WorkshopRegistrationProduct
  | CustomCommissionProduct;

export type CommissionRequestStatus =
  | 'submitted'
  | 'in-review'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'declined'
  | 'cancelled';

export interface CommissionRequest {
  id: string;
  customerId: string;
  description: string;
  status: CommissionRequestStatus;
  requestedAt: string;
  requestedArtworkId?: string;
  budget?: Money;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productType: ProductType;
  productName: string;
  sku?: string;
  quantity: number;
  unitPrice: Money;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: Money;
  total: Money;
  paymentIds?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt?: string;
}

export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'failed' | 'partially-refunded' | 'refunded';

export interface Payment {
  id: string;
  orderId: string;
  amount: Money;
  status: PaymentStatus;
  provider?: string;
  providerReference?: string;
  createdAt: string;
  paidAt?: string;
}