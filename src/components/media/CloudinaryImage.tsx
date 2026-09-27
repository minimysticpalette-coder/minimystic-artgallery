import type { CloudinaryAsset } from '@/lib/media';
import { getCloudinaryImageSrcSet, getCloudinaryImageUrl } from '@/lib/media';

interface CloudinaryImageProps {
  asset: CloudinaryAsset;
  alt: string;
  widths: number[];
  sizes: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function CloudinaryImage({
  asset,
  alt,
  widths,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
}: CloudinaryImageProps) {
  const fallbackWidth = Math.min(...widths);

  return (
    <img
      src={getCloudinaryImageUrl(asset, { width: fallbackWidth })}
      srcSet={getCloudinaryImageSrcSet(asset, widths)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  );
}