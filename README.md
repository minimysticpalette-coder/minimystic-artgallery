# Mini Mystic Palette

A single-page artist portfolio built with Next.js and TypeScript, statically exported for GitHub Pages, with artwork and brand images delivered through Cloudinary.

## Local development

Requires Node.js 20 or newer.

1. Copy `.env.example` to `.env.local` if you need to override the public configuration.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev` or `./run.sh` from Git Bash.
4. Open `http://localhost:3000`.

## Project structure

- `src/app` — page entry points, metadata, and global styles
- `src/components` — reusable presentation components
- `src/data/artworks.ts` — central artwork list
- `src/config` — site configuration
- `src/lib/media.ts` — Cloudinary URL generation and shared brand asset IDs
- `src/types` — shared TypeScript models

## Environment variables

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is the public Cloudinary cloud name used to form delivery URLs. It is not an API secret. The current value is `oleopm7s`. Never add the Cloudinary API secret to this static frontend.

`NEXT_PUBLIC_BASE_PATH` is empty for local development. The GitHub Pages workflow sets it to `/minimystic-artgallery` for the repository site.

## Add artwork

Upload each view to Cloudinary, then add an `ArtworkImage` entry to `uploadedImages` in `src/data/artworks.ts` with:

- `publicId`, `version`, and original `format` from the Cloudinary delivery URL
- Accurate alt text
- `isPrimary: true` on the image to use as the artwork's carousel cover

Images whose public IDs share a stem before the final underscore-number are grouped as one artwork. For example, `GANESHA_1` and `GANESHA_2` become one Ganesha entry. The explicitly flagged image is the carousel cover; if no image is flagged, the lowest-numbered variant is used. The modal opens on that primary image and lets visitors move through the remaining numbered views.

The site builds optimized responsive URLs with `f_auto`, `q_auto`, `c_limit`, and width transformations. Do not paste complete delivery URLs into page components. Images without titles, categories, or descriptions should not be given invented metadata.

Currently the gallery includes the ten uploaded artworks. Add the remaining six only after their Cloudinary assets and metadata are ready.

Brand assets are defined beside the media helpers in `src/lib/media.ts`; update those IDs there when replacing a logo or watermark.

The carousel autoplay duration is set by `carouselIntervalMs` in `src/config/site.ts`, in milliseconds. Its current value is `5000`.

The Ganesha hero video is listed with the artwork data. The page loads only its Cloudinary-generated poster initially; the H.264/AAC MP4 and original MOV fallback are attached after the visitor activates the play button. The browser-tab palette icon is `src/app/icon.svg`.

## Checks and deployment

- `npm run lint` — lint the application
- `npm run build` — generate the static site in `out/`
- Push to `main` to deploy through `.github/workflows/deploy-pages.yml`.

The repository's GitHub Pages setting must use **GitHub Actions** as the build and deployment source.
