import type { Artwork } from '@/types/artwork';

export const artworks: Artwork[] = [
  {
    id: 'caravan-van-1',
    slug: 'caravan-van-1',
    title: 'CARAVAN_VAN_1',
    images: [{ publicId: 'CARAVAN_VAN_1', version: '1790527245', format: 'heic', alt: 'CARAVAN_VAN_1' }],
  },
  {
    id: 'shree-nath-ji-1',
    slug: 'shree-nath-ji-1',
    title: 'SHREE_NATH_JI_1',
    images: [{ publicId: 'SHREE_NATH_JI_1', version: '1790527245', format: 'heic', alt: 'SHREE_NATH_JI_1' }],
  },
  {
    id: 'glowing-lantern-1',
    slug: 'glowing-lantern-1',
    title: 'GLOWING_LANTERN_1',
    images: [{ publicId: 'GLOWING_LANTERN_1', version: '1790527245', format: 'heic', alt: 'GLOWING_LANTERN_1' }],
  },
  {
    id: 'ganesha-1',
    slug: 'ganesha-1',
    title: 'GANESHA_1',
    images: [{ publicId: 'GANESHA_1', version: '1790527245', format: 'heic', alt: 'GANESHA_1' }],
  },
  {
    id: 'leo-1',
    slug: 'leo-1',
    title: 'LEO_1',
    images: [{ publicId: 'LEO_1', version: '1790527244', format: 'heic', alt: 'LEO_1' }],
  },
  {
    id: 'forever-1',
    slug: 'forever-1',
    title: 'FOREVER_1',
    images: [{ publicId: 'FOREVER_1', version: '1790527243', format: 'heic', alt: 'FOREVER_1' }],
  },
  {
    id: 'ganesha-2',
    slug: 'ganesha-2',
    title: 'GANESHA_2',
    images: [{ publicId: 'GANESHA_2', version: '1790527243', format: 'heic', alt: 'GANESHA_2' }],
  },
  {
    id: 'rainy-evening-1',
    slug: 'rainy-evening-1',
    title: 'RAINY_EVENING_1',
    images: [{ publicId: 'RAINY_EVENING_1', version: '1790527244', format: 'heic', alt: 'RAINY_EVENING_1' }],
  },
  {
    id: 'sukoon-1',
    slug: 'sukoon-1',
    title: 'SUKOON_1',
    images: [{ publicId: 'SUKOON_1', version: '1790527243', format: 'heic', alt: 'SUKOON_1' }],
  },
  {
    id: 'fire-flies-1',
    slug: 'fire-flies-1',
    title: 'FIRE_FLIES_1',
    images: [{ publicId: 'FIRE_FLIES_1', version: '1790527245', format: 'heic', alt: 'FIRE_FLIES_1' }],
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}
