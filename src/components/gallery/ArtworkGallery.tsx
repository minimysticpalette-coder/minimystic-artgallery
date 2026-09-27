'use client';

import { useEffect, useRef, useState } from 'react';
import type { Artwork } from '@/types/artwork';
import { ArtworkDialog } from '@/components/artwork/ArtworkDialog';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import { siteConfig } from '@/config/site';
import { getPrimaryArtworkImage } from '@/lib/artworks';

const galleryWidths = [320, 480, 640, 800];

interface ArtworkGalleryProps {
  artworks: Artwork[];
}

export function ArtworkGallery({ artworks }: ArtworkGalleryProps) {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    function measureCarousel() {
      const firstCard = track?.firstElementChild;
      if (!(firstCard instanceof HTMLElement)) return;

      const gap = Number.parseFloat(getComputedStyle(track!).gap) || 0;
      const nextStepWidth = firstCard.getBoundingClientRect().width + gap;
      const visibleCards = Math.max(1, Math.floor((stage!.clientWidth + gap) / nextStepWidth));
      const nextMaxIndex = Math.max(0, artworks.length - visibleCards);

      setStepWidth(nextStepWidth);
      setMaxIndex(nextMaxIndex);
      setIndex((current) => Math.min(current, nextMaxIndex));
    }

    measureCarousel();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureCarousel);
      return () => window.removeEventListener('resize', measureCarousel);
    }

    const observer = new ResizeObserver(measureCarousel);
    observer.observe(stage);
    if (track.firstElementChild instanceof HTMLElement) observer.observe(track.firstElementChild);
    return () => observer.disconnect();
  }, [artworks.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauseForReducedMotion = () => {
      if (mediaQuery.matches) setIsPlaying(false);
    };
    pauseForReducedMotion();
    mediaQuery.addEventListener('change', pauseForReducedMotion);
    return () => mediaQuery.removeEventListener('change', pauseForReducedMotion);
  }, []);

  useEffect(() => {
    if (selectedArtwork || !isPlaying || maxIndex === 0) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, siteConfig.carouselIntervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, maxIndex, selectedArtwork]);

  function moveCarousel(direction: -1 | 1) {
    setIndex((current) => {
      if (direction > 0) return current >= maxIndex ? 0 : current + 1;
      return current <= 0 ? maxIndex : current - 1;
    });
  }

  return (
    <>
      <div className="gallery-autoplay">
        <button
          className="gallery-autoplay-toggle"
          type="button"
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM15 5h4v14h-4z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          )}
        </button>
      </div>
      <div className="gallery-carousel" role="region" aria-label="Artwork gallery carousel">
      <button className="carousel-btn prev" type="button" aria-label="Previous artwork" onClick={() => moveCarousel(-1)}>←</button>
      <div className="gallery-stage" ref={stageRef}>
        <div className="gallery-track" ref={trackRef} style={{ transform: `translateX(-${index * stepWidth}px)` }}>
          {artworks.map((artwork, artworkIndex) => {
            const image = getPrimaryArtworkImage(artwork.images);

            return (
              <article key={artwork.id} className="card" data-category={artwork.category} aria-roledescription="slide">
                <button
                  className="art"
                  type="button"
                  aria-label={`View artwork: ${artwork.title}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <CloudinaryImage
                    asset={image}
                    alt={image.alt}
                    widths={galleryWidths}
                    sizes="(max-width: 980px) 82vw, 33vw"
                  />
                  <span>View artwork ↗</span>
                </button>
                <div className="meta">
                  <div>
                    <h3>{artwork.title}</h3>
                    {artwork.category && <p>{artwork.category}</p>}
                  </div>
                  <small>{String(artworkIndex + 1).padStart(2, '0')}</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <button className="carousel-btn next" type="button" aria-label="Next artwork" onClick={() => moveCarousel(1)}>→</button>
      </div>
      {selectedArtwork && (
        <ArtworkDialog
          key={selectedArtwork.id}
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </>
  );
}
