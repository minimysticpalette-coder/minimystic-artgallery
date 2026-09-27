export function getCloudinaryUrl(publicId: string, options: Record<string, string> = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const params = new URLSearchParams({
    ...options,
    f: 'auto',
    q: 'auto',
  });

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.toString() ? `${params.toString()}/` : ''}${publicId}`;
}

export function getArtworkImage(image: { src?: string; publicId?: string }, fallback: string) {
  if (image.src) return image.src;
  if (image.publicId) return getCloudinaryUrl(image.publicId);
  return fallback;
}
