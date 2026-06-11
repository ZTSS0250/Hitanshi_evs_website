/**
 * HITANSHI EVS — Image Asset Management
 *
 * HOW TO ADD A REAL IMAGE:
 * 1. Place the file in the correct subfolder under src/assets/images/
 * 2. Add an import below and replace `null` with it.
 *
 * While an export is null, the component renders an SVG placeholder instead.
 *
 * FOLDER MAP:
 *   logo/         → logo.png
 *   hero/         → hero-bike.png  (dedicated bike product shot, optional)
 *   banners/      → banner_1.png (hero showcase), banner_2.png (offer section)
 *   vehicles/     → eeva-e.jpg, eeva-eco-lx.jpg … (product shots, none yet)
 *   showroom/     → showroom photos (none yet)
 *   gallery/      → customer.png, customer_2/3/5/6.png, showroom.png
 *   posters/      → poster_1.png, poster_2.png
 */

// ── Imports ───────────────────────────────────────────
import logo        from './logo/logo.png'
import banner1     from './banners/banner_1.png'
import banner2     from './banners/banner_2.png'
import poster1     from './posters/poster_1.png'
import poster2     from './posters/poster_2.png'
import gShowroom   from './gallery/showroom.png'
import gCustomer1  from './gallery/customer.png'
import gCustomer2  from './gallery/customer_2.png'
import gCustomer3  from './gallery/customer_3.png'
import gCustomer5  from './gallery/customer_5.png'
import gCustomer6  from './gallery/customer_6.png'
import vEevaZX     from './vehicles/1775646602_EEVA_ECO_ZX_Electric_Scooter.webp'
import vEevaZXPlus from './vehicles/1775646603_Eeva_ZX+_Electric_Scooter.webp'
import vGracyNew   from './vehicles/1780380431_Gracy.webp'
import vGracyLittle from './vehicles/1775646603_Little_Gracy_Electric_Scooty.webp'

// ── Logo ──────────────────────────────────────────────
export const LOGO = logo

// ── Hero bike showcase (right side of homepage hero) ──
export const HERO_BIKE = banner1

// ── Offer / promo banner (homepage section) ───────────
export const OFFER_BANNER = banner2

// ── Vehicle product images ────────────────────────────
// Keys must match the `imageKey` field in src/data/vehicles.js
export const VEHICLE_IMAGES = {
  'eeva-e':       null,
  'eeva-eco-lx':  null,
  'eeva-eco-zx':  vEevaZX,
  'eeva-zx-plus': vEevaZXPlus,
  'gracy-new':    vGracyNew,
  'gracy-little': vGracyLittle,
}

// ── Showroom photos (for future showroom section) ─────
export const SHOWROOM_IMAGES = [
  gShowroom,
  null,
  null,
]

// ── Gallery page items ────────────────────────────────
export const GALLERY_ITEMS = [
  { id: 1, src: gShowroom,  title: 'Our Showroom',        category: 'showroom' },
  { id: 2, src: poster1,    title: 'Special Offer',        category: 'showroom' },
  { id: 3, src: poster2,    title: 'Promotional Offer',    category: 'showroom' },
  { id: 4, src: gCustomer1, title: 'Happy Customer',       category: 'events'   },
  { id: 5, src: gCustomer2, title: 'Customer Delivery',    category: 'events'   },
  { id: 6, src: gCustomer3, title: 'Test Drive Experience',category: 'events'   },
  { id: 7, src: gCustomer5, title: 'Customer Smiles',      category: 'events'   },
  { id: 8, src: gCustomer6, title: 'At the Showroom',      category: 'events'   },
  { id: 9, src: null,       title: 'Charging Demo',        category: 'events'   },
]
