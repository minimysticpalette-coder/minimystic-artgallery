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
