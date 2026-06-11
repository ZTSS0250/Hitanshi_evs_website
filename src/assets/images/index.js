/**
 * HITANSHI EVS — Image Asset Management
 *
 * HOW TO ADD A REAL IMAGE:
 * 1. Place the file in the correct subfolder under src/assets/images/
 * 2. Add an import at the top:  import myImg from './subfolder/filename.jpg'
 * 3. Replace `null` with `myImg`
 *
 * While an export is null, the component renders an SVG placeholder instead.
 * No broken image icons — the UI always looks complete.
 *
 * FOLDER MAP:
 *   logo/         → logo.png
 *   vehicles/     → eeva-e.jpg, eeva-eco-lx.jpg, eeva-eco-zx.jpg,
 *                   eeva-zx-plus.jpg, gracy-new.jpg, gracy-little.jpg
 *   showroom/     → showroom-1.jpg, showroom-2.jpg, showroom-3.jpg
 *   banners/      → hero-banner.jpg, offer-banner.jpg
 *   posters/      → poster-1.jpg, poster-2.jpg
 *   gallery/      → gallery-1.jpg … gallery-9.jpg
 */

// ── Logo ──────────────────────────────────────────────
export const LOGO = null
// When ready: import logo from './logo/logo.png'

// ── Banners ───────────────────────────────────────────
export const HERO_BANNER  = null
export const OFFER_BANNER = null
// When ready: import heroBanner from './banners/hero-banner.jpg'

// ── Vehicle images ────────────────────────────────────
// Keys must match the `imageKey` field in src/data/vehicles.js
export const VEHICLE_IMAGES = {
  'eeva-e':       null,   // → import eevaE from './vehicles/eeva-e.jpg'
  'eeva-eco-lx':  null,
  'eeva-eco-zx':  null,
  'eeva-zx-plus': null,
  'gracy-new':    null,
  'gracy-little': null,
}

// ── Showroom photos ───────────────────────────────────
export const SHOWROOM_IMAGES = [
  null,   // showroom-1.jpg
  null,   // showroom-2.jpg
  null,   // showroom-3.jpg
]

// ── Gallery items ─────────────────────────────────────
// src: null = shows a placeholder tile (gradient + title label)
// src: <import> = shows the real image with lightbox support
export const GALLERY_ITEMS = [
  { id: 1, src: null, title: 'Showroom Entrance',    category: 'showroom' },
  { id: 2, src: null, title: 'Vehicle Display Area', category: 'showroom' },
  { id: 3, src: null, title: 'Eeva E Display',       category: 'vehicles' },
  { id: 4, src: null, title: 'Eeva ZX Plus',         category: 'vehicles' },
  { id: 5, src: null, title: 'Customer Delivery',    category: 'events'   },
  { id: 6, src: null, title: 'Team at Showroom',     category: 'showroom' },
  { id: 7, src: null, title: 'Gracy New Launch',     category: 'events'   },
  { id: 8, src: null, title: 'Promotional Poster',   category: 'showroom' },
  { id: 9, src: null, title: 'Charging Demo',        category: 'events'   },
]
