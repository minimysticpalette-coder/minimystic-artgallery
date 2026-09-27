export interface CloudinaryAsset {
  publicId: string;
  version: string;
  format: string;
}

export interface CloudinaryImageOptions {
  width: number;
}

export interface CloudinaryVideoAsset {
  publicId: string;
  version: string;
  format: string;
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

export function getCloudinaryVideoUrl(asset: CloudinaryVideoAsset) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/f_mp4,vc_h264,ac_aac,q_auto/v${asset.version}/${asset.publicId}.mp4`;
}

export function getCloudinaryOriginalVideoUrl(asset: CloudinaryVideoAsset) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/v${asset.version}/${asset.publicId}.${asset.format}`;
}

export function getCloudinaryVideoPosterUrl(asset: CloudinaryVideoAsset, width: number) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_jpg,q_auto,c_limit,w_${width}/v${asset.version}/${asset.publicId}.jpg`;
}

export function getCloudinaryVideoPosterSrcSet(asset: CloudinaryVideoAsset, widths: number[]) {
  return Array.from(new Set(widths))
    .sort((left, right) => left - right)
    .map((width) => `${getCloudinaryVideoPosterUrl(asset, width)} ${width}w`)
    .join(', ');
}
