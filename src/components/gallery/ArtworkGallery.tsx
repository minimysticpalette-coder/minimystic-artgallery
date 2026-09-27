'use client';

import { useMemo, useState } from 'react';
import type { Artwork } from '@/types/artwork';

interface ArtworkGalleryProps {
  artworks: Artwork[];
}

export function ArtworkGallery({ artworks }: ArtworkGalleryProps) {
  const [index, setIndex] = useState(0);

  const slideCount = useMemo(() => Math.max(artworks.length, 1), [artworks.length]);

  const handleNext = () => setIndex((current) => (current + 1) % slideCount);
  const handlePrevious = () => setIndex((current) => (current - 1 + slideCount) % slideCount);

  return (
    <div className="gallery-carousel" aria-label="Artwork gallery carousel">
      <button className="carousel-btn prev" type="button" aria-label="Previous artwork" onClick={handlePrevious}>←</button>
      <div className="gallery-stage">
        <div className="gallery-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {artworks.map((artwork, artworkIndex) => (
            <article key={artwork.id} className="card" data-category={artwork.category} style={{ transform: `translateX(${artworkIndex === index ? 0 : 0}px)` }}>
              <button className="art" type="button" data-title={artwork.title} data-description={artwork.description} data-image={artwork.images[0]?.src || '/images/lantern-forest.jpg'}>
                <img src={artwork.images[0]?.src || '/images/lantern-forest.jpg'} alt={artwork.images[0]?.alt || artwork.title} />
                <span>View artwork ↗</span>
              </button>
              <div className="meta">
                <div>
                  <h3>{artwork.title}</h3>
                  <p>{artwork.category}</p>
                </div>
                <small>{String(artworkIndex + 1).padStart(2, '0')}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <button className="carousel-btn next" type="button" aria-label="Next artwork" onClick={handleNext}>→</button>
    </div>
  );
}
