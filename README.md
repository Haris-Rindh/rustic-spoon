# The Rustic Spoon

A premium five-star restaurant website built with Next.js, featuring a complete multi-page experience for a farm-to-table dining establishment based in Napa Valley, California.

---

## Overview

The Rustic Spoon is a full-featured restaurant website that provides guests with a seamless digital experience — from exploring the seasonal menu and discovering individual dishes, to making table reservations and inquiring about private dining events. The site is designed to reflect the quality and elegance of a five-star dining establishment.

The project is built entirely with the Next.js App Router, TypeScript, and Tailwind CSS v4. It uses Framer Motion for animations, Lucide React for iconography, and jsPDF for client-side menu PDF generation.

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, about section, classic text menu, experiences, testimonials, and gallery |
| `/menu` | Full menu page with image-card dish grid and tab filtering |
| `/our-story` | Restaurant philosophy, values grid, and milestone timeline |
| `/reservations` | Table reservation widget with step-by-step booking flow |
| `/private-dining` | The Harvest Room — private event inquiries and amenities |
| `/chefs-counter` | Exclusive tasting menu counter experience details |
| `/patio-seating` | Al fresco vineyard terrace dining details |
| `/dish/[slug]` | Dynamic individual dish pages with full-bleed imagery and related dishes |

---

## Features

**Menu**
- Filterable tab menu on the homepage in a classic dot-leader typographic style
- Each dish links to a dedicated dynamic page at `/dish/[slug]`
- Full image-card grid on the dedicated `/menu` page
- PDF export of the complete menu generated client-side using jsPDF

**Reservations**
- Multi-step reservation widget with date, time, party size, and guest details
- Real-time form validation with a confirmation step

**Private Dining**
- Dedicated inquiry form with event type, party size, and details fields
- Submission success state — no page reload required

**Gallery**
- Uniform 4:3 aspect ratio grid with smooth hover overlays
- Full-screen lightbox with animated entry and exit

**Custom Cursor**
- Dual-layer cursor with a dot that snaps to pointer position and a ring that lags behind with interpolation
- Colour shifts to amber on hover over interactive elements
- Hidden automatically on mobile and touch devices

**Performance and SEO**
- Per-page metadata with Open Graph and Twitter card tags
- Semantic HTML structure with a single `h1` per page
- Next.js `next/image` with optimised remote image patterns
- Google Fonts loaded via `next/font` with no layout shift

**Security**
- HTTP security headers applied globally via `next.config.ts`
- Headers include X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy

---

## Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts via next/font (Playfair Display, Lato) |
| PDF Generation | jsPDF + jspdf-autotable |
| Image Hosting | Unsplash CDN (remote patterns configured) |

---

## Project Structure

```
src/
  app/
    page.tsx                  Homepage
    layout.tsx                Root layout with metadata and custom cursor
    globals.css               Design system tokens, animations, and utilities
    menu/page.tsx             Full menu page
    our-story/page.tsx        Our story page
    reservations/page.tsx     Reservations page
    private-dining/page.tsx   Private dining page
    chefs-counter/page.tsx    Chef's counter page
    patio-seating/page.tsx    Patio seating page
    dish/[slug]/page.tsx      Dynamic dish pages
  components/
    Navbar.tsx                Responsive navigation with mobile drawer
    Hero.tsx                  Homepage hero with staggered animation
    About.tsx                 Our story section with offset image border
    MenuClassic.tsx           Text-based menu for homepage
    Menu.tsx                  Image-card menu for the menu page
    Events.tsx                Curated experiences section
    Testimonials.tsx          Carousel testimonials
    Gallery.tsx               Photo gallery with lightbox
    Footer.tsx                Multi-column footer with newsletter input
    CustomCursor.tsx          Custom cursor with lag ring
    ReservationWidget.tsx     Step-by-step reservation form
    PrivateDiningForm.tsx     Private event inquiry form
    GiftCardModal.tsx         Gift card modal overlay
  data.ts                     Centralised menu, testimonials, and gallery data
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application starts on `http://localhost:3000`.

> Note: The `--webpack` flag is used in `dev` for local Windows compatibility. The production build does not use this flag and will compile with the default SWC compiler on Vercel.

### Production Build

```bash
npm run build
npm run start
```

---

## Deployment on Vercel

The project is configured and ready for deployment on Vercel with zero additional configuration required.

### Steps

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. Log in to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Vercel will automatically detect Next.js and set the correct build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Click **Deploy**.

No environment variables are required for the base deployment.

### Notes

- The `--webpack` flag has been intentionally kept in the `dev` script only. Vercel uses SWC by default and does not need it.
- All external images (Unsplash, Pexels) are declared in `remotePatterns` inside `next.config.ts` and will work correctly in production.
- Security headers are applied globally on all routes and will be active in the Vercel deployment.

---

## Customisation

### Updating Menu Items

All menu content is centralised in `src/data.ts`. Each dish requires the following fields:

```typescript
{
  id: number;
  slug: string;       // URL-safe identifier, e.g. "wood-fired-ribeye"
  name: string;
  price: string;      // e.g. "$42"
  description: string;
  image: string;      // Full URL to a high-resolution food photograph
}
```

Adding a new dish automatically creates a page at `/dish/[slug]` through the dynamic route.

### Updating Testimonials

Edit the `testimonialsData` array in `src/data.ts`. Each entry requires `rating`, `text`, `authorInitials`, and `authorName`.

### Updating Gallery Images

Edit the `galleryData` array in `src/data.ts` with full image URLs from Unsplash or Pexels. Ensure any new hostnames are added to `remotePatterns` in `next.config.ts`.

---

## Design System

The colour palette is defined as CSS custom properties in `globals.css` using the `@theme` block.

| Token | Description |
|---|---|
| `rustic-50` to `rustic-900` | Warm neutral tones from cream to deep walnut |
| `embers-400` to `embers-700` | Amber to deep brick-red accent palette |

Typography uses **Playfair Display** for headings (serif, high contrast, elegant) and **Lato** for body text (clean, highly legible).

---

## License

This project is private and was developed as a custom client project. All rights reserved.
