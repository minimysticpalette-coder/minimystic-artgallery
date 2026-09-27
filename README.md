# Mini Mystic Palette

A static artist portfolio migrated to Next.js + TypeScript for maintainability, Cloudinary-ready media handling, and GitHub Pages deployment.

## Tech stack
- Next.js
- TypeScript
- React
- ESLint
- Prettier
- GitHub Pages static export
- Cloudinary-ready media configuration

## Project structure
- src/app — page entry points and app shell
- src/components — reusable UI and gallery components
- src/data — artwork data source
- src/config — site configuration
- src/lib — reusable media helpers
- src/types — shared TypeScript interfaces

## Local development
1. Install dependencies: `npm install`
2. Start the app: `npm run dev`
3. View the site at `http://localhost:3000`

## Environment variables
Create a `.env.local` file from `.env.example` and fill in values when ready.

## Build
- `npm run build`

## Lint
- `npm run lint`

## Format
- `npm run format`

## Deployment
This app is configured for static export and GitHub Pages.

GitHub Actions deployment can be added by publishing the generated static output to the Pages branch or using GitHub Pages Actions.

## Adding artwork
Update `src/data/artworks.ts` with the artwork object. Add the current image path or placeholder and later replace it with Cloudinary public IDs.

## Cloudinary
Cloudinary is prepared as the media delivery layer, but real values should be added to environment variables after setup.
