'use client';

import { useEffect, useRef, useState } from 'react';
import type { Artwork } from '@/types/artwork';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import { getPrimaryArtworkImageIndex } from '@/lib/artworks';

interface ArtworkDialogProps {
  artwork: Artwork;
  onClose: () => void;
}

const dialogWidths = [640, 960, 1280, 1600];

export function ArtworkDialog({ artwork, onClose }: ArtworkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(() => getPrimaryArtworkImageIndex(artwork.images));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
  }, []);

  const image = artwork.images[imageIndex];
  const imageCount = artwork.images.length;
  const hasMultipleImages = imageCount > 1;

  function changeImage(direction: number) {
    setImageIndex((current) => (current + direction + imageCount) % imageCount);
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialogRef.current?.close();
    }
    if (event.key === 'ArrowLeft' && hasMultipleImages) changeImage(-1);
    if (event.key === 'ArrowRight' && hasMultipleImages) changeImage(1);
  }

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="artwork-dialog"
      aria-labelledby="artwork-dialog-title"
      onClose={onClose}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      onKeyDown={handleKeyDown}
    >
      <div className="artwork-dialog-content">
        <button className="artwork-dialog-close" type="button" aria-label="Close artwork" autoFocus onClick={() => dialogRef.current?.close()}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="artwork-dialog-media">
          <CloudinaryImage
            asset={image}
            alt={image.alt}
            widths={dialogWidths}
            sizes="(max-width: 760px) calc(100vw - 2rem), min(60vw, 1000px)"
            className="artwork-dialog-image"
            loading="eager"
          />
          {hasMultipleImages && (
            <div className="artwork-dialog-navigation" aria-label="Artwork views">
              <button type="button" aria-label="Previous artwork image" onClick={() => changeImage(-1)}>←</button>
              <span aria-live="polite">{imageIndex + 1} / {artwork.images.length}</span>
              <button type="button" aria-label="Next artwork image" onClick={() => changeImage(1)}>→</button>
            </div>
          )}
        </div>
        <section className="artwork-dialog-details">
          <div className="eyebrow coral">ORIGINAL ARTWORK</div>
          <h2 id="artwork-dialog-title">{artwork.title}</h2>
          <p>{artwork.description}</p>
          <p className="artwork-dialog-size"><span>Image size</span>{artwork.imageSize}</p>
        </section>
      </div>
    </dialog>
  );
}
