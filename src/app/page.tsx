import { ArtworkGallery } from '@/components/gallery/ArtworkGallery';
import { CloudinaryImage } from '@/components/media/CloudinaryImage';
import { LazyCloudinaryVideo } from '@/components/media/LazyCloudinaryVideo';
import { NavigationBar } from '@/components/navigation/NavigationBar';
import { artworks } from '@/data/artworks';
import { siteConfig } from '@/config/site';
import { cloudinaryBrandAssets } from '@/lib/media';
import { getPrimaryArtworkImage } from '@/lib/artworks';

const aboutWidths = [320, 480, 640, 800];

export default function HomePage() {
  const featuredArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];
  const featuredImage = getPrimaryArtworkImage(featuredArtwork.images);

  return (
    <>
      <NavigationBar />
      <main>

      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow">ART · IMAGINATION · MAGIC</div>
          <h1>
            A little art.<br />
            <span>A little magic.</span>
          </h1>
          <p>Welcome to Mini Mystic Palette — paintings inspired by nature, night skies, glowing lights, quiet moments and curious little worlds.</p>
          <div className="actions">
            <a className="brush" href="#gallery">Explore the gallery <b>→</b></a>
            <a className="quiet" href="#about">Meet the artist</a>
          </div>
          <div className="note">
            <b>01</b>
            <i />
            <span>Little worlds. Big feelings.</span>
          </div>
        </div>
        <div className="hero-image">
          <LazyCloudinaryVideo
            video={featuredArtwork.videos?.[0]}
            poster={featuredImage}
            title={featuredArtwork.title}
          />
        </div>
      </section>

      <section id="gallery" className="gallery">
        <div className="heading">
          <div>
            <div className="eyebrow coral">THE COLLECTION</div>
            <h2>
              Little worlds,<br />
              <em>painted with feeling.</em>
            </h2>
          </div>
          <p>From glowing forests and rainy roads to stars in the sky, each piece is a tiny escape into another mood.</p>
        </div>
        <ArtworkGallery artworks={artworks} />
      </section>

      <section id="about" className="about">
        <div className="about-art">
          <div className="about-images">
            {artworks.slice(0, 4).map((artwork, index) => (
              <CloudinaryImage
                key={artwork.id}
                asset={getPrimaryArtworkImage(artwork.images)}
                className={`about-image${index === 0 ? ' active' : ''}`}
                alt={getPrimaryArtworkImage(artwork.images).alt}
                widths={aboutWidths}
                sizes="(max-width: 980px) 100vw, 35vw"
              />
            ))}
          </div>
          <span>made<br />with<br />magic ♡</span>
        </div>
        <div>
          <div className="eyebrow">ABOUT THE ARTIST</div>
          <h2>
            Painting the moments<br />
            that <em>feel a little magical.</em>
          </h2>
          <p>Mini Mystic Palette is a space for turning feelings, memories and tiny observations into colour. From quiet night scenes to glowing forests, the art is less about fitting into one style and more about following curiosity.</p>
          <p>I’m a software engineer by day, but somewhere between deadlines, screens and busy days, I found a little piece of myself in painting.

Art started as something I did simply because it made me happy. There was something comforting about sitting down with a blank canvas, choosing colours, and slowly watching an idea come to life. I didn’t always know what the final painting would look like—and honestly, I still don’t. But that’s what I love about creating.</p>
          <a className="outline" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Say hello ↗</a>
        </div>
      </section>

      <section id="process" className="process">
        <div className="heading compact">
          <div>
            <div className="eyebrow gold">BEHIND THE ART</div>
            <h2>
              From blank canvas<br />
              to <em>little universe.</em>
            </h2>
          </div>
          <p>Perfect for sharing sketches, painting progress and behind-the-scenes videos.</p>
        </div>
        <div className="process-grid">
          <div>
            <b>01</b>
            <h3>The spark</h3>
            <p>An image, memory or feeling becomes the first tiny idea.</p>
          </div>
          <div>
            <b>02</b>
            <h3>The layers</h3>
            <p>Colours, lights, textures and details slowly build the scene.</p>
          </div>
          <div>
            <b>03</b>
            <h3>The magic</h3>
            <p>The painting finds its mood — and a little world begins to exist.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="eyebrow">ORIGINALS · COMMISSIONS · COLLABORATIONS</div>
        <h2>
          Have a little world<br />
          you&apos;d like to <em>create?</em>
        </h2>
        <a className="brush light" href="#contact">Let&apos;s make something ↗</a>
      </section>

      <section id="contact" className="contact">
        <div>
          <div className="eyebrow">LET&apos;S CONNECT</div>
          <h2>
            Say hello to<br />
            <em>Mini Mystic Palette.</em>
          </h2>
        </div>
        <div className="details">
          <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email Mini Mystic Palette">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.3-.5 6.7 5.6 6.7-5.6H5.3Zm13.2 2.1-6.3 5.2a1 1 0 0 1-1.2 0L5.5 8.1v9.4c0 .3.2.5.5.5h12c.3 0 .5-.2.5-.5V8.1Z" /></svg>
            {siteConfig.contact.email}
          </a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Mini Mystic Palette">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A5.8 5.8 0 1 1 6.2 13 5.8 5.8 0 0 1 12 7.2Zm0 2A3.8 3.8 0 1 0 15.8 13 3.8 3.8 0 0 0 12 9.2Zm6.2-3.1a1.3 1.3 0 1 1-1.3-1.3 1.3 1.3 0 0 1 1.3 1.3Z" /></svg>
            @minimysticpalette
          </a>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube Mini Mystic Palette">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.7a2.8 2.8 0 0 0-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29.3 29.3 0 0 0 2 12a29.3 29.3 0 0 0 .4 4.3 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29.3 29.3 0 0 0 22 12a29.3 29.3 0 0 0-.4-4.3ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>
            @minimysticpalette
          </a>
          <span>Available for commissions &amp; collaborations</span>
        </div>
      </section>

      <footer>
        <CloudinaryImage asset={cloudinaryBrandAssets.logo} alt="Mini Mystic Palette" widths={[64, 128]} sizes="52px" />
        <span>© <b id="year">2026</b> Mini Mystic Palette</span>
        <span>Little worlds. Big feelings.</span>
      </footer>
      </main>
    </>
  );
}
