'use client';

import { useState } from 'react';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import type { ArtworkImage, ArtworkVideo } from '@/types/artwork';
import {
  getCloudinaryOriginalVideoUrl,
  getCloudinaryVideoPosterSrcSet,
  getCloudinaryVideoPosterUrl,
  getCloudinaryVideoUrl,
} from '@/lib/media';

interface LazyCloudinaryVideoProps {
  video?: ArtworkVideo;
  poster: ArtworkImage;
  title: string;
  autoStart?: boolean;
}

const posterWidths = [640, 960, 1280];

export function LazyCloudinaryVideo({ video, poster, title, autoStart = false }: LazyCloudinaryVideoProps) {
  const [requested, setRequested] = useState(autoStart);
  const [failed, setFailed] = useState(false);

  if (!video) {
    return (
      <CloudinaryImage
        asset={poster}
        alt={poster.alt}
        widths={posterWidths}
        sizes="(max-width: 980px) 100vw, 45vw"
        className="hero-video-poster"
        loading="eager"
        fetchPriority="high"
      />
    );
  }

  const posterUrl = getCloudinaryVideoPosterUrl(video, 960);

  return (
    <>
      {!requested && (
        <>
          <img
            className="hero-video-poster"
            src={posterUrl}
            srcSet={getCloudinaryVideoPosterSrcSet(video, posterWidths)}
            sizes="(max-width: 980px) 100vw, 45vw"
            alt={`${title} video preview`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <button
            className="hero-video-play"
            type="button"
            aria-label={`Play ${title} video`}
            title={`Play ${title} video`}
            onClick={() => {
              setFailed(false);
              setRequested(true);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </button>
        </>
      )}
      {requested && !failed && (
        <video
          className="hero-video-player"
          autoPlay
          muted
          loop={autoStart}
          playsInline
          preload={autoStart ? 'auto' : 'none'}
          poster={posterUrl}
          onError={() => setFailed(true)}
          onEnded={() => setRequested(false)}
          aria-label={video.title ?? `${title} video`}
        >
          <source src={getCloudinaryVideoUrl(video)} type="video/mp4" />
          <source src={getCloudinaryOriginalVideoUrl(video)} type="video/quicktime" />
        </video>
      )}
      {requested && failed && (
        <div className="hero-video-error" role="alert">
          <p>Video could not be loaded.</p>
          <button type="button" onClick={() => setRequested(false)}>Return to preview</button>
        </div>
      )}
    </>
  );
}