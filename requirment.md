Artwork Portfolio Website — Next.js + GitHub Pages + Cloudinary

You are a senior frontend architect and Next.js developer.

I have an existing artwork portfolio website built using HTML, CSS and JavaScript. The existing website/design should be treated as the primary visual and functional reference.

I want to rebuild/migrate the website into a clean, scalable and maintainable Next.js + TypeScript application while preserving the existing design and functionality wherever appropriate.

The final application must be optimized for:

Performance
Large numbers of images and videos
Mobile responsiveness
SEO
Accessibility
Maintainability
Clean architecture
Easy future content updates
Static deployment on GitHub Pages
1. Target Technology Stack

Use the following technologies unless there is a strong technical reason not to:

Next.js
TypeScript
React
CSS Modules or a clean global CSS architecture
GitHub
GitHub Actions
GitHub Pages
Cloudinary for image/video storage and delivery

Do NOT introduce unnecessary technologies.

Do not add:

Backend server
Database
Authentication system
CMS
API server

unless specifically requested later.

The initial website must remain a static website.

2. Deployment Architecture

The application must work with the following architecture:

GitHub Repository
       |
       v
GitHub Actions
       |
       v
Next.js Static Export
       |
       v
GitHub Pages
       |
       +----------------------+
                              |
                              v
                         Cloudinary
                              |
                    +---------+---------+
                    |                   |
                  Images              Videos
                    |                   |
                    +-------- CDN ------+
                              |
                           Visitors

The website must NOT depend on a Next.js server/runtime for the initial implementation.

Configure Next.js for static export.

The generated application must be deployable directly to GitHub Pages.

3. First Understand the Existing Website

Before modifying or rewriting anything:

Inspect the entire existing codebase.
Understand the current:
Pages
Components
Navigation
Gallery
Artwork presentation
Image usage
Video usage
Responsive behavior
Animations
Forms
Testimonials
Existing design system
Identify reusable functionality.
Identify duplicated code.
Identify performance problems.
Identify unnecessary dependencies.
Identify large media files.
Identify areas that should become reusable React components.

Do NOT blindly convert every HTML file into a React component.

First determine a clean component and page architecture.

4. Project Structure

Use a predictable and easy-to-understand structure.

Prefer an architecture similar to:

src/
├── app/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── artwork/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── gallery/
│   ├── artwork/
│   ├── media/
│   ├── testimonials/
│   ├── forms/
│   └── ui/
│
├── data/
│   ├── artworks.ts
│   ├── categories.ts
│   └── testimonials.ts
│
├── lib/
│   ├── cloudinary.ts
│   ├── media.ts
│   └── utils.ts
│
├── types/
│   ├── artwork.ts
│   └── media.ts
│
├── styles/
│   └── globals.css
│
└── config/
    └── site.ts

Adjust the structure if the existing application requires something different, but keep the same principles.

The structure must make it obvious:

Where pages live
Where reusable components live
Where artwork data lives
Where Cloudinary logic lives
Where shared types live
Where configuration lives

Avoid putting everything inside a single large component.

5. Component Design

Follow component-based architecture.

Create small, reusable components.

For example:

ArtworkGallery
    |
    +-- ArtworkCard
    |      |
    |      +-- ArtworkImage
    |
    +-- ArtworkCard
    |
    +-- ArtworkCard

Avoid:

Gallery.tsx

containing hundreds of lines of unrelated UI, data and business logic.

Components should generally have a single responsibility.

Use composition rather than deeply nested inheritance-style abstractions.

6. Artwork Data Model

Artwork information must NOT be hardcoded repeatedly inside UI components.

Create a central typed data model.

Example:

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  category: string;
  description?: string;

  images: ArtworkImage[];

  videos?: ArtworkVideo[];

  availableSizes?: string[];

  featured?: boolean;

  tags?: string[];
}

Media should have their own types.

Example:

export interface ArtworkImage {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ArtworkVideo {
  publicId: string;
  posterPublicId?: string;
  title?: string;
}

Do not duplicate artwork information across multiple pages.

The same artwork data should be reusable for:

Gallery
Artwork detail page
Featured artwork
Search/filter
Related artwork
Future CMS migration
7. Cloudinary Integration

Cloudinary must be treated as the primary media delivery system.

DO NOT store large artwork images or videos inside the GitHub repository.

Avoid:

/public/images/artwork1.jpg
/public/videos/artwork1.mp4

for large production media.

Instead store media in Cloudinary.

Use Cloudinary public IDs in the application data.

Example:

{
  publicId: "artworks/ganesha/ganesha-main",
  alt: "Hand-painted Lord Ganesha artwork"
}

Create reusable Cloudinary helper functions.

For example:

getCloudinaryImageUrl()
getCloudinaryVideoUrl()
getCloudinaryPosterUrl()

Do not construct Cloudinary URLs manually throughout the application.

8. Image Optimization

Image performance is one of the highest priorities.

Implement:

Responsive image sizing
Lazy loading for below-the-fold images
Appropriate image dimensions
Automatic format optimization
Automatic quality optimization
CDN delivery
Blur/placeholder where appropriate
Proper width/height handling to prevent layout shifts

Use Cloudinary transformations such as:

f_auto
q_auto

where appropriate.

Do not serve an 8 MB original image to a visitor when a much smaller optimized version is sufficient.

For gallery cards:

Use appropriately sized thumbnails.

For artwork detail pages:

Use a larger but still optimized image.

Do not load the largest version everywhere.

9. Responsive Images

The implementation should account for:

Mobile
Tablet
Laptop
Large desktop screens

An image displayed at 350px width should not unnecessarily download a 3000px image.

Use appropriate responsive image strategies.

Do not hardcode one image resolution for every device.

10. Video Optimization

Videos are potentially the biggest performance problem.

DO NOT automatically load every video on the gallery page.

The preferred behavior is:

Gallery
   |
   v
Video thumbnail/poster
   |
   v
User clicks
   |
   v
Load/play video

Avoid:

Page loads
   |
   +-- Video 1 downloads
   +-- Video 2 downloads
   +-- Video 3 downloads
   +-- Video 4 downloads

unless autoplay is specifically required.

Use Cloudinary for:

Video optimization
Video transformations
Poster images
CDN delivery

If a video is not visible or being played, avoid unnecessary network requests.

11. Lazy Loading

Implement lazy loading carefully.

Lazy load:

Gallery images below the fold
Videos
Non-critical artwork media

Do not lazy load:

Main hero image if it is immediately visible
Critical above-the-fold content

The objective is not "lazy load everything".

The objective is:

Load only what the user needs, when the user needs it.

12. Gallery Architecture

The gallery should be data-driven.

Example:

<ArtworkGallery
  artworks={artworks}
/>

Artwork cards should be reusable.

The gallery should support future requirements such as:

Categories
Filtering
Featured artworks
Search
Sorting
Different layouts

Do not tightly couple the gallery to a specific artwork.

13. Artwork Detail Pages

Use clean URLs.

Example:

/artwork/lord-ganesha
/artwork/radha-krishna
/artwork/abstract-peacock

Use artwork slugs rather than IDs in the user-facing URL where appropriate.

The artwork detail page should contain:

Artwork image
Artwork title
Description
Category
Available sizes
Additional images
Video/process media if available
Related artworks
Enquiry CTA
14. SEO

Implement proper SEO from the beginning.

Include:

Page titles
Meta descriptions
Canonical URLs where appropriate
Open Graph metadata
Twitter/X metadata where appropriate
Semantic HTML
Proper heading hierarchy
Image alt text
Sitemap
Robots configuration

Artwork detail pages should have meaningful metadata.

Avoid generic:

Artwork Website

for every page.

Use meaningful metadata based on the artwork.

15. Accessibility

Follow WCAG-oriented best practices.

Ensure:

Semantic HTML
Proper heading hierarchy
Keyboard navigation
Visible focus states
Accessible buttons
Accessible dialogs/lightboxes
Meaningful alt text
Sufficient color contrast
Proper labels for forms
No interaction that requires a mouse only

Do not use clickable <div> elements when a <button> or <a> is appropriate.

16. Performance

Performance is a major requirement.

Target:

Fast initial page load
Minimal JavaScript
Minimal unnecessary dependencies
Small bundle size
Optimized images
Lazy media
No unnecessary API calls
No unnecessary re-renders

Before adding a dependency, ask:

Can this functionality be implemented cleanly using existing browser APIs, React or Next.js?

If yes, avoid adding the dependency.

Do not optimize prematurely, but do not introduce obvious performance problems.

17. State Management

Do NOT introduce Redux or another global state library unless genuinely required.

Prefer:

React state
URL parameters
Props
Context only when appropriate

The website should remain simple.

18. TypeScript

Use TypeScript strictly.

Avoid:

any

unless there is a documented technical reason.

Prefer:

unknown

with proper type narrowing when the type is genuinely unknown.

Create reusable interfaces/types rather than duplicating type definitions.

Enable strict TypeScript settings.

19. Error Handling

Handle possible media failures gracefully.

For example:

Cloudinary image unavailable
        ↓
Display fallback image

The entire gallery must not break because one image fails.

Similarly, video failures should not break the artwork detail page.

Create reusable fallback components where appropriate.

20. Loading States

Use appropriate loading states for interactive components.

Avoid unnecessary loading spinners for static content.

For image-heavy sections, prefer:

Skeletons
Blur placeholders
Progressive visual loading

where useful.

21. Styling

Keep styling maintainable.

Do not put large amounts of inline CSS inside components.

Avoid duplicated CSS.

Use a consistent design system for:

Typography
Spacing
Border radius
Shadows
Buttons
Cards
Colors
Breakpoints

Create reusable UI styles/tokens where appropriate.

The existing website's visual identity should be preserved unless there is a specific reason to improve it.

22. Configuration

Do not hardcode values throughout the application.

Create configuration for values such as:

Website name
Social links
WhatsApp number
Google Form URL
Cloudinary cloud name
Contact information

Use environment variables for values that should not be committed.

Never commit:

API secrets
Private keys
Authentication secrets
Cloudinary API secret

Only public Cloudinary configuration should be exposed to the frontend.

23. GitHub Pages

Configure the project specifically for GitHub Pages.

The final build must:

Build successfully using GitHub Actions.
Generate a static export.
Deploy automatically to GitHub Pages.
Work correctly with the GitHub Pages base path if the repository is not hosted at the root domain.
Handle static assets correctly.
Not depend on server-side rendering.
Not depend on server-side API routes.

Create a clean GitHub Actions workflow.

24. Environment Configuration

Provide:

.env.example

with documentation.

Example:

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GOOGLE_FORM_URL=

Do not commit .env.local.

Add it to .gitignore.

25. Code Quality

Follow these principles:

DRY — Don't Repeat Yourself
KISS — Keep It Simple
SOLID principles where applicable
Separation of concerns
Single responsibility
Composition over unnecessary abstraction
Explicit naming
Small reusable components
No magic numbers
No duplicated constants
No dead code
No commented-out old code
No unnecessary abstractions

Code should be understandable by another developer without requiring extensive documentation.

26. Naming Conventions

Use clear naming.

Components:

ArtworkCard
ArtworkGallery
ArtworkViewer
NavigationBar
TestimonialCard

Functions:

getCloudinaryImageUrl()
getArtworkBySlug()
filterArtworksByCategory()

Variables:

artworks
featuredArtworks
selectedArtwork

Avoid unclear names such as:

data
obj
temp
x
thing

unless the scope is extremely small and obvious.

27. Comments

Do not add comments everywhere.

Comments should explain:

Why something is done

rather than:

What the code obviously does

Bad:

// Loop through artworks
artworks.map(...)

Good:

// Static export requires absolute asset handling when deployed
// under a GitHub Pages repository path.
28. Testing

Implement basic tests for important reusable logic.

Prioritize testing:

Artwork filtering
Artwork lookup
Slug generation/lookup
Cloudinary URL generation
Important UI interactions

Do not create hundreds of unnecessary tests.

Focus on meaningful behavior.

29. Linting and Formatting

Configure:

ESLint
Prettier

The project should have scripts such as:

npm run dev
npm run build
npm run lint
npm run format

The production build must fail if there are critical TypeScript or build errors.

30. Security

Even though this is primarily a static website:

Never expose secrets
Never put private Cloudinary credentials in frontend code
Validate external URLs where appropriate
Avoid unsafe HTML injection
Avoid dangerouslySetInnerHTML unless absolutely necessary
Do not store sensitive information in the repository
31. Documentation

Create a concise:

README.md

It should explain:

Project overview
Technology stack
Folder structure
Local development
Environment variables
Adding a new artwork
Adding Cloudinary media
Running tests
Building the project
Deploying to GitHub Pages

Also provide a short guide explaining:

"How to add a new artwork"

The process should be simple enough that another developer can understand it immediately.

32. Adding New Artwork

The initial implementation should make adding artwork simple.

Ideally, adding an artwork should involve updating one central data file:

{
  id: "ganesha-001",
  slug: "lord-ganesha",
  title: "Lord Ganesha",
  category: "Religious",
  images: [
    {
      publicId: "artworks/ganesha/lord-ganesha",
      alt: "Hand-painted Lord Ganesha artwork"
    }
  ],
  availableSizes: [
    "18 x 24 inch",
    "24 x 36 inch"
  ]
}

The developer should NOT need to modify:

Gallery component
Artwork card
Artwork detail page
Navigation

every time a new artwork is added.

33. Do Not Overengineer

This is an important requirement.

Do not introduce:

Redux
GraphQL
Microservices
Custom backend
Database
Authentication
Docker
Kubernetes
CMS

unless there is a clear requirement.

The initial architecture should remain:

Next.js
+
TypeScript
+
Cloudinary
+
GitHub
+
GitHub Pages

Keep the system simple while allowing future migration to a CMS/backend.

34. Future Scalability

The architecture should allow future migration to:

Next.js
    |
    +---- CMS
    |
    +---- Database
    |
    +---- Authentication
    |
    +---- Cloudinary

without requiring a complete frontend rewrite.

Therefore:

Keep artwork data separated from UI.
Keep Cloudinary logic separated from components.
Keep types centralized.
Keep business logic out of presentation components.
Avoid tightly coupling the application to static files.
35. Migration Strategy

Do NOT rewrite everything at once without validation.

Follow this order:

Phase 1

Analyze the existing website.

Document:

Existing pages
Components
Features
Media
Styling
Dependencies
Problems
Phase 2

Create the new Next.js project structure.

Phase 3

Migrate the global layout/navigation.

Phase 4

Migrate the homepage.

Phase 5

Migrate gallery and artwork components.

Phase 6

Integrate Cloudinary.

Phase 7

Implement responsive media optimization.

Phase 8

Implement artwork detail pages.

Phase 9

Implement SEO/accessibility.

Phase 10

Configure GitHub Pages deployment.

Phase 11

Performance testing.

Phase 12

Final cleanup and documentation.

At every phase, ensure the project remains buildable.

36. Performance Validation

Before considering the implementation complete, verify:

No unnecessary large media downloads
Gallery images are lazy-loaded
Videos aren't downloaded unnecessarily
Cloudinary transformations are being used
Images have appropriate dimensions
No layout shifts caused by missing dimensions
Mobile loading is reasonable
Desktop loading is reasonable
No unnecessary JavaScript
No console errors
No broken links
No broken images
No hydration errors
Production build succeeds

Use Lighthouse/PageSpeed Insights where appropriate.

Aim for excellent Core Web Vitals rather than optimizing purely for a Lighthouse score.

37. Development Rules

While implementing:

Do not make assumptions about existing functionality.
Inspect existing code before replacing it.
Reuse good existing logic where possible.
Do not introduce unnecessary dependencies.
Keep components small.
Keep data separate from UI.
Keep media logic separate from UI.
Keep configuration separate from business logic.
Use TypeScript types everywhere appropriate.
Optimize media at the source.
Do not sacrifice accessibility for visual effects.
Do not sacrifice maintainability for premature optimization.
Prefer simple solutions.
Keep the application statically deployable.
Keep the codebase easy for another developer to understand.
38. Expected Deliverables

At the end of development, provide:

Source code

Complete Next.js + TypeScript application.

Configuration
Next.js static export configuration
GitHub Pages configuration
GitHub Actions workflow
ESLint
Prettier
TypeScript
Cloudinary

Reusable image/video utilities.

Documentation

README containing:

Setup
Environment variables
Development
Build
Deployment
Cloudinary setup
Adding artwork
Troubleshooting
Verification

Confirm:

npm install
npm run lint
npm run build

work successfully.

Also verify the generated static output can be deployed to GitHub Pages.

Most Important Requirement

The final codebase should NOT simply be:

"The existing HTML website converted into React."

It should be a properly structured, maintainable Next.js application.

The design should remain faithful to the existing website, but the underlying architecture should be improved.

The primary goals, in order, are:

Fast media loading
Scalable media delivery
Clean and maintainable code
Simple content management
Responsive design
Accessibility
SEO
Easy GitHub Pages deployment
Ability to migrate to a CMS/backend in the future

Before writing implementation code, first analyze the existing codebase and provide:

Current architecture
Problems identified
Proposed Next.js architecture
Proposed folder structure
Migration plan
Cloudinary media strategy
GitHub Pages deployment strategy
Any functionality that may be lost or changed during migration

Only after that analysis should implementation begin.