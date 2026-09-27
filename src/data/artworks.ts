import type { Artwork } from '@/types/artwork';

export const artworks: Artwork[] = [
  {
    id: 'the-last-ride',
    slug: 'the-last-ride',
    title: 'The Last Ride',
    category: 'Night & Light',
    description: 'A glowing journey through a quiet forest road.',
    featured: true,
    images: [
      { src: '/images/last-ride.jpg', alt: 'Glowing bus travelling through a forest at night' },
    ],
    availableSizes: ['18 x 24 inch', '24 x 36 inch'],
    tags: ['night', 'forest', 'light'],
  },
  {
    id: 'lanterns-in-the-woods',
    slug: 'lanterns-in-the-woods',
    title: 'Lanterns in the Woods',
    category: 'Nature · Night',
    description: 'A forest path illuminated by tiny warm lights.',
    images: [
      { src: '/images/lantern-forest.jpg', alt: 'Lantern-lit forest path' },
    ],
    availableSizes: ['18 x 24 inch', '24 x 36 inch'],
    tags: ['nature', 'night', 'lantern'],
  },
  {
    id: 'written-in-the-stars',
    slug: 'written-in-the-stars',
    title: 'Written in the Stars',
    category: 'Dreamy · Night',
    description: 'A quiet constellation floating in an inky blue sky.',
    images: [
      { src: '/images/written-in-the-stars.jpg', alt: 'Constellation artwork' },
    ],
    availableSizes: ['18 x 24 inch', '24 x 36 inch'],
    tags: ['dreamy', 'night', 'stars'],
  },
  {
    id: 'the-enchanted-path',
    slug: 'the-enchanted-path',
    title: 'The Enchanted Path',
    category: 'Nature · Dreamy',
    description: 'A magical woodland pathway scattered with tiny glowing lights.',
    images: [
      { src: '/images/enchanted-path.jpg', alt: 'Magical forest path painting' },
    ],
    availableSizes: ['18 x 24 inch', '24 x 36 inch'],
    tags: ['nature', 'dreamy', 'path'],
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}
