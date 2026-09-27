import type { Artwork, ArtworkImage, ArtworkVideo } from '@/types/artwork';
import { getArtworkVariantNumber } from '@/lib/artworks';

const uploadedVideos: Record<string, ArtworkVideo[]> = {
  GANESHA: [
    {
      publicId: 'GANESHA_MOV_2',
      version: '1790539156',
      format: 'mov',
      title: 'Ganesha painting video',
    },
  ],
};

const uploadedImages: ArtworkImage[] = [
  { publicId: 'CARAVAN_VAN_1', version: '1790527245', format: 'heic', alt: 'Caravan Van, view 1', isPrimary: true },
  { publicId: 'SHREE_NATH_JI_1', version: '1790527245', format: 'heic', alt: 'Shree Nath Ji, view 1', isPrimary: true },
  { publicId: 'GLOWING_LANTERN_1', version: '1790527245', format: 'heic', alt: 'Glowing Lantern, view 1', isPrimary: true },
  { publicId: 'GANESHA_1', version: '1790527245', format: 'heic', alt: 'Ganesha, view 1', isPrimary: true },
  { publicId: 'LEO_1', version: '1790527244', format: 'heic', alt: 'Leo, view 1', isPrimary: true },
  { publicId: 'FOREVER_1', version: '1790527243', format: 'heic', alt: 'Forever, view 1', isPrimary: true },
  { publicId: 'GANESHA_2', version: '1790527243', format: 'heic', alt: 'Ganesha, view 2' },
  { publicId: 'RAINY_EVENING_1', version: '1790527244', format: 'heic', alt: 'Rainy Evening, view 1', isPrimary: true },
  { publicId: 'SUKOON_1', version: '1790527243', format: 'heic', alt: 'Sukoon, view 1', isPrimary: true },
  { publicId: 'FIRE_FLIES_1', version: '1790527245', format: 'heic', alt: 'Fire Flies, view 1', isPrimary: true },
];

function getArtworkStem(publicId: string) {
  return publicId.replace(/_\d+$/, '');
}

function toArtworkTitle(stem: string) {
  return stem
    .toLowerCase()
    .split(/[_\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toArtworkSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const artworkGroups = new Map<string, ArtworkImage[]>();

for (const image of uploadedImages) {
  const stem = getArtworkStem(image.publicId);
  const group = artworkGroups.get(stem) ?? [];
  group.push(image);
  artworkGroups.set(stem, group);
}

export const artworks: Artwork[] = Array.from(artworkGroups, ([stem, images]) => {
  const title = toArtworkTitle(stem);
  const orderedImages = images.sort((left, right) =>
    getArtworkVariantNumber(left.publicId) - getArtworkVariantNumber(right.publicId),
  );

  return {
    id: toArtworkSlug(title),
    slug: toArtworkSlug(title),
    title,
    description: 'DEMO TEXT',
    imageSize: 'DEMO TEXT',
    images: orderedImages,
    featured: stem === 'GANESHA',
    ...(uploadedVideos[stem] ? { videos: uploadedVideos[stem] } : {}),
  };
});

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}
