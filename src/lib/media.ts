export interface CloudinaryAsset {
  publicId: string;
  version: string;
  format: string;
}

export interface CloudinaryImageOptions {
  width: number;
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'oleopm7s';

export const cloudinaryBrandAssets = {
  logo: { publicId: 'logo', version: '1790530548', format: 'png' },
  watermarkLight: {
    publicId: 'water-mark-background',
    version: '1790530549',
    format: 'png',
  },
  watermarkDark: {
    publicId: 'water-mark-dark-mode',
    version: '1790530549',
    format: 'png',
  },
} satisfies Record<string, CloudinaryAsset>;

export function getCloudinaryImageUrl(
  asset: CloudinaryAsset,
  { width }: CloudinaryImageOptions,
) {
  const transformations = `f_auto,q_auto,c_limit,w_${width}`;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/v${asset.version}/${asset.publicId}.${asset.format}`;
}

export function getCloudinaryImageSrcSet(asset: CloudinaryAsset, widths: number[]) {
  return Array.from(new Set(widths))
    .sort((left, right) => left - right)
    .map((width) => `${getCloudinaryImageUrl(asset, { width })} ${width}w`)
    .join(', ');
}
