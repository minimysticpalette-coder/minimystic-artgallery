import type { ArtworkImage } from '@/types/artwork';

export function getArtworkVariantNumber(publicId: string) {
  const match = publicId.match(/_(\d+)$/);
  return match ? Number(match[1]) : 1;
}

export function getPrimaryArtworkImageIndex(images: ArtworkImage[]) {
  const flaggedIndex = images.findIndex((image) => image.isPrimary);
  if (flaggedIndex >= 0) return flaggedIndex;

  return images.reduce((primaryIndex, image, imageIndex) => {
    const candidateNumber = getArtworkVariantNumber(image.publicId);
    const primaryNumber = getArtworkVariantNumber(images[primaryIndex].publicId);
    return candidateNumber < primaryNumber ? imageIndex : primaryIndex;
  }, 0);
}

export function getPrimaryArtworkImage(images: ArtworkImage[]) {
  return images[getPrimaryArtworkImageIndex(images)];
}