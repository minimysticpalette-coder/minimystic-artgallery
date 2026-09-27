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

Upload the image to Cloudinary, then add one `Artwork` entry in `src/data/artworks.ts` with:

- A unique `id` and URL-safe `slug`
- The approved title and any supplied category/description
- `publicId`, `version`, and original `format` from the Cloudinary delivery URL
- Accurate alt text

The site builds optimized responsive URLs with `f_auto`, `q_auto`, `c_limit`, and width transformations. Do not paste complete delivery URLs into page components. Images without titles, categories, or descriptions should not be given invented metadata.

Currently the gallery includes the ten uploaded artworks. Add the remaining six only after their Cloudinary assets and metadata are ready.

Brand assets are defined beside the media helpers in `src/lib/media.ts`; update those IDs there when replacing a logo or watermark.

## Checks and deployment

- `npm run lint` — lint the application
- `npm run build` — generate the static site in `out/`
- Push to `main` to deploy through `.github/workflows/deploy-pages.yml`.

The repository's GitHub Pages setting must use **GitHub Actions** as the build and deployment source.
