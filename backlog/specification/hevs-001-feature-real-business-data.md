## Metadata
- **Task ID**: hevs-001-feature-real-business-data
- **Title**: Update Website with Real Business Data & Centralized Content System
- **Type**: feature
- **Status**: specification
- **Complexity**: HIGH
- **Created**: 2026-06-11
- **Author**: Hitanshi EVS Team
- **Quality Gates**: Gate 1: Approved | Gate 2: Approved | Gate 3: Approved

---

## Planning

**Description**:
The website was built with dummy/placeholder data. Now replace all placeholders with real
Hitanshi EVS business information and build a centralized content management structure so
future updates require changing only config/data files — not UI components.

**Goal**:
A fully live-ready website where every phone number, address, email, social link, and map
link reflects the actual business. Any staff member can update business details by editing
one config file (`companyInfo.js`) without touching React components.

**Objectives**:
- [x] Create centralized `src/config/companyInfo.js` with all business info
- [x] Create `src/assets/images/index.js` for image management with graceful fallback
- [x] Create `src/assets/images/` folder structure (logo, vehicles, showroom, banners, gallery, posters)
- [x] Update Navbar — real phones, WhatsApp button, Gallery nav link
- [x] Update Footer — real address, phones, email, Instagram
- [x] Update ContactUs — real info, click-to-call/WhatsApp/email, future-ready Maps embed
- [x] Update BookTestDrive sidebar — real contact info from companyInfo
- [x] Add Gallery page with lightbox and category filter
- [x] Add `/gallery` route and Gallery link in Nav + Footer
- [x] Update `vehicles.js` — add `imageKey` field for future image management
- [x] SEO improvements in `index.html` — real title, meta description, OG/Twitter tags

**Deliverables**:
- [x] `src/config/companyInfo.js`
- [x] `src/assets/images/index.js`
- [x] `src/assets/images/` folder structure (9 subfolders / placeholder READMEs)
- [x] `src/pages/Gallery.jsx` + `Gallery.css`
- [x] Updated: Navbar, Footer, ContactUs, BookTestDrive, App.jsx, index.html, vehicles.js

---

## Specification

**Complexity**: HIGH

**Reason**: 14 files changed (4 new + 10 modified), new page + route + nav entry, new config
architecture, image fallback system. Cross-cuts every component and page in the project.

---

### Code Changes

| File | Action | Description |
|------|--------|-------------|
| `src/config/companyInfo.js` | **create** | Single source of truth: name, address object, phones array, email, social links, WhatsApp URL, Maps URL, hours, SEO meta |
| `src/assets/images/index.js` | **create** | Exports LOGO, HERO_BANNER, VEHICLE_IMAGES map, SHOWROOM_IMAGES array, GALLERY_ITEMS array — all null by default, replaced with real imports as images are added |
| `src/pages/Gallery.jsx` | **create** | Gallery page: responsive masonry grid, category chip filter (All / Showroom / Vehicles / Events), lightbox overlay with keyboard nav (Escape, ←→ arrows), lazy loading |
| `src/pages/Gallery.css` | **create** | Gallery page styles: 3-col grid → 2-col → 1-col, lightbox overlay, image cards with hover overlay |
| `index.html` | **modify** | Real SEO title, meta description, keywords, Open Graph (og:title, og:description, og:type, og:url), Twitter Card tags, favicon link |
| `src/App.jsx` | **modify** | Import Gallery, add `<Route path="/gallery" element={<Gallery />} />` |
| `src/components/Navbar.jsx` | **modify** | Import COMPANY from companyInfo; update phone to primary phone; add WhatsApp icon button; add Gallery to NAV_LINKS array; update mobile drawer |
| `src/components/Navbar.css` | **modify** | Add `.navbar-wa` style for WhatsApp icon button; adjust CTA gap for 3 items |
| `src/components/Footer.jsx` | **modify** | Import COMPANY; replace all hardcoded address/phone/email/socials with companyInfo values; conditionally render Facebook/YouTube/Twitter only when not null; add Gallery to quickLinks |
| `src/components/Footer.css` | **modify** | No structural change; minor social icon color adjustments if needed |
| `src/pages/ContactUs.jsx` | **modify** | Import COMPANY; replace all hardcoded CONTACT_INFO array with dynamic values from companyInfo; update map section to render `<iframe>` if `COMPANY.maps.embedUrl` exists else enhanced placeholder; all external links get `rel="noopener noreferrer"` |
| `src/pages/ContactUs.css` | **modify** | Add `.map-iframe` styles for embedded Google Map sizing |
| `src/pages/BookTestDrive.jsx` | **modify** | Import COMPANY; replace hardcoded address/phone/email in sidebar info card |
| `src/data/vehicles.js` | **modify** | Add `imageKey` field to each vehicle (e.g. `'eeva-e'`); matches keys in `VEHICLE_IMAGES` from assets/images/index.js |

---

### Implementation Notes

#### `src/config/companyInfo.js` — exact structure to implement

```js
export const COMPANY = {
  name: 'Hitanshi EVS',
  tagline: 'Authorized Zelio Electric Vehicle Showroom',

  address: {
    line1: '316/29 Krashi Upaj Mandi Samiti',
    line2: 'AB Road, Shajapur',
    state: 'Madhya Pradesh',
    country: 'India',
    pincode: '465001',
    // Use full for single-line display (meta, map links, etc.)
    full: '316/29 Krashi Upaj Mandi Samiti, AB Road, Shajapur, Madhya Pradesh 465001',
  },

  // phones[0] is primary (used in Navbar and prominent spots)
  phones: [
    { number: '9893776584', display: '+91 98937 76584', primary: true },
    { number: '8234888811', display: '+91 82348 88811', primary: false },
  ],

  email: 'hitanshievs@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/hitanshi_evs',
    facebook: null,   // set to URL when Facebook page is created
    youtube: null,    // set to URL when YouTube channel is created
    twitter: null,
    whatsapp: 'https://wa.me/919893776584',
  },

  // WhatsApp click-to-chat URL — 91 = India country code
  whatsapp: {
    number: '9893776584',
    url: 'https://wa.me/919893776584',
  },

  maps: {
    // Direct Google Maps link — opens in new tab
    googleMapsUrl: 'https://maps.google.com/?q=316/29+Krashi+Upaj+Mandi+Samiti+AB+Road+Shajapur+Madhya+Pradesh+465001',
    // Paste Google Maps iframe src URL here when available (null = show placeholder)
    embedUrl: null,
  },

  hours: {
    weekdays: { days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
    sunday:   { days: 'Sunday',            time: '10:00 AM – 4:00 PM' },
  },

  seo: {
    title:       'Hitanshi EVS | Authorized Zelio Electric Scooter Dealer in Shajapur',
    description: 'Hitanshi EVS is an authorized Zelio Electric Vehicle showroom in Shajapur, Madhya Pradesh offering electric scooters, test drives, sales, and customer support.',
    keywords:    'Hitanshi EVS, Zelio Electric Scooter, Electric Vehicle Shajapur, EV Dealer MP, Zelio franchise, Madhya Pradesh EV',
    siteUrl:     'https://hitanshievs.in',  // update when domain is live
    ogImage:     '/og-image.jpg',           // place a 1200×630 image in /public/
  },
}
```

#### `src/assets/images/index.js` — null-first pattern

```js
// HOW TO ADD A REAL IMAGE:
// 1. Place the image file in the correct subfolder
// 2. Add: import myImage from './subfolder/filename.jpg'
// 3. Replace null with myImage

export const LOGO = null
// → import logo from './logo/logo.png'

export const HERO_BANNER  = null
export const OFFER_BANNER = null

// Vehicle images — keys must match vehicle.imageKey in vehicles.js
export const VEHICLE_IMAGES = {
  'eeva-e':       null,
  'eeva-eco-lx':  null,
  'eeva-eco-zx':  null,
  'eeva-zx-plus': null,
  'gracy-new':    null,
  'gracy-little': null,
}

export const SHOWROOM_IMAGES = [
  null, // showroom-1.jpg
  null, // showroom-2.jpg
  null, // showroom-3.jpg
]

export const GALLERY_ITEMS = [
  { id: 1,  src: null, title: 'Showroom Entrance',     category: 'showroom' },
  { id: 2,  src: null, title: 'Vehicle Display Area',  category: 'showroom' },
  { id: 3,  src: null, title: 'Eeva E Display',        category: 'vehicles' },
  { id: 4,  src: null, title: 'Eeva ZX Plus',          category: 'vehicles' },
  { id: 5,  src: null, title: 'Customer Delivery',     category: 'events'   },
  { id: 6,  src: null, title: 'Team at Showroom',      category: 'showroom' },
  { id: 7,  src: null, title: 'Gracy New Launch',      category: 'events'   },
  { id: 8,  src: null, title: 'Promotional Poster',    category: 'showroom' },
  { id: 9,  src: null, title: 'Charging Demo',         category: 'events'   },
]
```

#### Gallery Lightbox — key implementation details
- State: `lightboxIndex` (number | null). `null` = closed.
- `useEffect` on `lightboxIndex` — lock body scroll when open: `document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''`
- `useEffect` for keyboard: attach `keydown` listener → `Escape` closes, `ArrowLeft`/`ArrowRight` navigates
- Only show gallery items where `src !== null` OR always show them with a placeholder tile when `src === null`
- Decision: **Always show all items** even when `src === null`, render a placeholder tile (gradient + label). This way the gallery grid always has content and the user can see what images are needed.
- `loading="lazy"` on every real `<img>` tag

#### Navbar WhatsApp button
- Add `<a>` tag in `.navbar-cta` area with class `navbar-wa`
- Use `FaWhatsapp` icon from react-icons/fa
- Style: green icon, circular button, 36×36px
- On mobile drawer: show as full-width WhatsApp button above Book Test Drive CTA

#### ContactUs embedded map
```jsx
{COMPANY.maps.embedUrl ? (
  <iframe
    src={COMPANY.maps.embedUrl}
    className="map-iframe"
    title="Hitanshi EVS Location on Google Maps"
    loading="lazy"
    allowFullScreen
  />
) : (
  <div className="map-placeholder">
    {/* existing placeholder with real address and directions link */}
  </div>
)}
```
The iframe `src` must come from `COMPANY.maps.embedUrl` in companyInfo.js — never hardcoded.

#### vehicles.js `imageKey` field
Add `imageKey: 'eeva-e'` (slug format matching VEHICLE_IMAGES keys) to each vehicle object.
In vehicle card components, resolve the image:
```jsx
import { VEHICLE_IMAGES } from '../assets/images'
const vehicleImage = VEHICLE_IMAGES[vehicle.imageKey]
// Render: vehicleImage ? <img src={vehicleImage} onError={handleImgError} loading="lazy" /> : <ScooterSVG />
```

---

## Test Cases

### Unit Tests

| # | Test Name | Input / Condition | Expected Result | Status |
|---|-----------|-------------------|-----------------|--------|
| 1 | companyInfo primary phone | `COMPANY.phones.find(p => p.primary)` | Returns `{ number: '9893776584', display: '+91 98937 76584', primary: true }` | pending |
| 2 | companyInfo WhatsApp URL | `COMPANY.whatsapp.url` | Equals `'https://wa.me/919893776584'` | pending |
| 3 | companyInfo null socials | `COMPANY.social.facebook` | Equals `null` | pending |
| 4 | VEHICLE_IMAGES keys | `Object.keys(VEHICLE_IMAGES)` | Contains all 6 imageKey slugs | pending |
| 5 | vehicles imageKey field | Each vehicle in `vehicles` array | Has `imageKey` string property that is a key in `VEHICLE_IMAGES` | pending |
| 6 | GALLERY_ITEMS count | `GALLERY_ITEMS.length` | Equals 9 | pending |
| 7 | companyInfo address full | `COMPANY.address.full` | Contains 'Shajapur' and 'Madhya Pradesh' | pending |

### Functional Tests

| # | Test Name | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 1 | Navbar phone number | Open any page, view Navbar | Shows '+91 98937 76584' (real primary phone) | pending |
| 2 | Navbar WhatsApp button | Click WhatsApp icon in Navbar | Opens `https://wa.me/919893776584` in new tab | pending |
| 3 | Footer Instagram link | Click Instagram icon in Footer | Opens `https://www.instagram.com/hitanshi_evs` in new tab | pending |
| 4 | Footer Facebook hidden | View Footer | Facebook icon NOT visible (it is null) | pending |
| 5 | Footer real address | View Footer contact column | Shows '316/29 Krashi Upaj Mandi Samiti' and 'Shajapur' | pending |
| 6 | ContactUs click-to-call | Click phone number on Contact page | Browser initiates phone call / shows call dialog | pending |
| 7 | ContactUs WhatsApp | Click WhatsApp link on Contact page | Opens wa.me URL in new tab | pending |
| 8 | ContactUs map placeholder | View Contact page | Map section shows address with 'Get Directions' link | pending |
| 9 | Gallery page loads | Navigate to `/gallery` | Gallery page renders with 9 placeholder tiles | pending |
| 10 | Gallery category filter | Click 'Showroom' chip on Gallery | Only items with `category: 'showroom'` are visible | pending |
| 11 | Gallery lightbox open | Click any gallery tile | Lightbox overlay appears with image/placeholder | pending |
| 12 | Gallery lightbox close | Press Escape with lightbox open | Lightbox closes, body scroll restores | pending |
| 13 | Gallery lightbox arrows | Press ArrowRight in lightbox | Navigates to next image | pending |
| 14 | Gallery nav link | View Navbar | 'Gallery' link is present and navigates to `/gallery` | pending |
| 15 | BookTestDrive real contact | View sidebar on Book Test Drive page | Shows real address '316/29 Krashi Upaj Mandi Samiti' | pending |
| 16 | SEO title | View page source / browser tab | Title is 'Hitanshi EVS \| Authorized Zelio Electric Scooter Dealer in Shajapur' | pending |
| 17 | Vehicle card image fallback | All VEHICLE_IMAGES are null | Vehicle cards show SVG scooter illustration (no broken image icon) | pending |

### Edge Cases

| # | Scenario | Expected Behaviour | Status |
|---|----------|--------------------|--------|
| 1 | `VEHICLE_IMAGES[vehicle.imageKey]` is null | Component renders `<ScooterSVG>` instead of `<img>` — no broken image icon | pending |
| 2 | `COMPANY.social.facebook` is null | Facebook icon NOT rendered in Footer or ContactUs — no `href="null"` link | pending |
| 3 | `COMPANY.maps.embedUrl` is null | ContactUs renders placeholder div, NOT an `<iframe>` | pending |
| 4 | Gallery lightbox at last item, ArrowRight pressed | Wraps to first item | pending |
| 5 | Gallery lightbox at first item, ArrowLeft pressed | Wraps to last item | pending |
| 6 | Gallery filtered to 0 results | "No photos in this category" empty state shown | pending |
| 7 | External link `target="_blank"` | All social/map/WhatsApp links have `rel="noopener noreferrer"` | pending |
| 8 | `<img>` tag with real image receives 404 | `onError` handler fires, image replaced with placeholder gradient | pending |
| 9 | Navbar on 768–1100px viewport | 5 nav links + WhatsApp + Book Test Drive button do not overflow navbar | pending |
| 10 | WhatsApp URL country code | URL uses `919893776584` (with country code 91), NOT `9893776584` | pending |
| 11 | Gallery lightbox body scroll | While lightbox is open, background page does not scroll | pending |
| 12 | Map iframe `title` attribute | When `embedUrl` is set and iframe renders, it has `title="Hitanshi EVS Location on Google Maps"` | pending |

### QA Test Plan

**Scope**: All website pages after real business data integration. Focus on contact
information accuracy, link behaviour, Gallery page, and SEO correctness.

**Pre-conditions**:
- Dev server running (`npm run dev`)
- All 14 files updated per the Code Changes table
- Tested in Chrome on desktop + mobile viewport (375px)

**QA Steps**:
1. Open Home page — check browser tab shows real SEO title
2. Inspect `<head>` in DevTools — verify `og:title`, `og:description`, `meta name="description"` are present with real values
3. Check Navbar — verify real phone number `+91 98937 76584`, WhatsApp green icon visible
4. Click Navbar WhatsApp icon — confirm opens `wa.me` URL in new tab
5. Navigate to `/gallery` — verify page loads, 9 placeholder tiles visible
6. Click category chips (All / Showroom / Vehicles / Events) — verify filter works
7. Click a gallery tile — verify lightbox overlay opens
8. Press Escape — verify lightbox closes and body scroll is restored
9. Press ArrowLeft / ArrowRight in lightbox — verify navigation between tiles
10. Scroll to Footer — verify real address, both phone numbers, real email, Instagram icon visible, Facebook icon NOT visible
11. Click Instagram icon in Footer — opens `instagram.com/hitanshi_evs` in new tab
12. Navigate to Contact page — verify address shows '316/29 Krashi Upaj Mandi Samiti'
13. Click phone number on Contact page — browser dial prompt appears
14. Click WhatsApp button on Contact page — opens `wa.me` in new tab
15. Click 'Get Directions' on Contact page — opens Google Maps URL in new tab
16. Navigate to Book Test Drive — verify sidebar shows real address and phone
17. On mobile (375px) — verify hamburger menu works, WhatsApp in mobile drawer
18. Check all `target="_blank"` links have `rel="noopener noreferrer"` in source

**Expected Outcomes**:
- All real business data visible and accurate across all pages
- No `href="#"` placeholder links remaining for phone/email/WhatsApp/Instagram
- Gallery loads with 9 tiles, filter and lightbox work correctly
- No broken image icons (SVG fallback shows for all vehicle cards)
- SEO meta tags present with real content

**Out of Scope**:
- Backend form submission (forms remain React state only)
- Actual image uploads (image slots remain null until photos provided)
- Google Maps iframe embed (embedUrl remains null until Google Maps embed code obtained)
- Payment or e-commerce functionality

---

## Quality Gates

### Gate 1 — Senior Developer Review
Date: 2026-06-11 | Status: **Approved**

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|
| 1 | HIGH | WhatsApp pre-filled message URL — `encodeURIComponent` required if message text is included in `wa.me` URL; encoding bugs cause broken links | companyInfo.js WhatsApp definition | **Fixed**: `whatsapp.url` stores plain `https://wa.me/919893776584` — no pre-filled text, no encoding needed |
| 2 | HIGH | `BookTestDrive.jsx` sidebar has hardcoded address and phone number (`+91 70000 00000`) — not in original spec but must be updated with real data | Deliverables section | **Fixed**: `BookTestDrive.jsx` added to Code Changes table (modify action) |
| 3 | MEDIUM | Footer currently maps over a static socials array including YouTube and Twitter — these are `null` in companyInfo; filter must exclude nulls or render will produce `href="null"` broken links | Footer.jsx modify | **Fixed**: Implementation Notes specify conditional render — only render social icon when its value is not null |
| 4 | MEDIUM | `COMPANY.address.full` string format must be verified — Google Maps URL in `googleMapsUrl` must match actual business location | companyInfo.js address | **Fixed**: `googleMapsUrl` uses the full real address string for best accuracy |
| 5 | LOW | Footer `quickLinks` array needs Gallery entry — spec mentions Navbar Gallery link but omits Footer | Footer.jsx modify | **Fixed**: Implementation Notes specify Gallery added to Footer quickLinks |

Verdict: **Approved** (all HIGH/MEDIUM findings resolved)

---

### Gate 2 — Security & Performance Review
Date: 2026-06-11 | Status: **Approved**

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|
| 1 | HIGH | All external links using `target="_blank"` are missing `rel="noopener noreferrer"` — exposes site to reverse tabnapping attack where the opened page can redirect the parent tab | ContactUs.jsx, Footer.jsx, Navbar.jsx social/WhatsApp links | **Fixed**: Implementation Notes and Test Case (Edge Case #7) explicitly require `rel="noopener noreferrer"` on ALL external links. QA step 18 verifies this. |
| 2 | MEDIUM | Gallery page loads all `GALLERY_ITEMS` simultaneously — when real images are added, no lazy loading = slow initial page load | Gallery.jsx create | **Fixed**: Implementation Notes specify `loading="lazy"` on every `<img>` tag; also documented in Functional Test #9 |
| 3 | MEDIUM | Google Maps `<iframe>` missing `title` attribute — WCAG accessibility violation; also required by some browser CSP policies | ContactUs.jsx modify (map iframe) | **Fixed**: Implementation Notes show iframe with `title="Hitanshi EVS Location on Google Maps"`. Edge Case #12 tests this. |
| 4 | LOW | Real phone numbers (9893776584, 8234888811) will be visible in page source — acceptable for a public business website; this is intentional and expected | companyInfo.js | Accepted — business phones are meant to be public |
| 5 | LOW | `COMPANY.seo.siteUrl` is `'https://hitanshievs.in'` but domain may not be registered yet — OG tags with wrong URL are harmless but misleading | index.html OG tags | Acceptable — will be corrected when domain goes live; not a security risk |

Verdict: **Approved** (1 HIGH fixed, 2 MEDIUM fixed)

---

### Gate 3 — Pre-Development Sweep
Date: 2026-06-11 | Status: **Approved**

**Part A — Gate 1 & 2 resolution confirmed**:

| Finding | Present in current spec? |
|---------|--------------------------|
| G1-H1: WhatsApp plain URL (no pre-filled message) | ✅ companyInfo.js section shows plain `https://wa.me/919893776584` |
| G1-H2: BookTestDrive.jsx in Code Changes table | ✅ Row added to Code Changes: "replace hardcoded address/phone in sidebar" |
| G1-M3: Conditional social rendering (null check) | ✅ Implementation Notes: "conditionally render Facebook/YouTube/Twitter only when not null" |
| G1-M5: Gallery in Footer quickLinks | ✅ Implementation Notes: Footer section mentions adding Gallery to quickLinks |
| G2-H1: `rel="noopener noreferrer"` on all external links | ✅ Implementation Notes + Edge Case #7 + QA Step 18 |
| G2-M2: `loading="lazy"` on gallery images | ✅ Implementation Notes: "loading='lazy' on every real `<img>` tag" |
| G2-M3: iframe title attribute | ✅ Implementation Notes show iframe with title attribute; Edge Case #12 |

**Part B — Predicted implementation bugs**:

| # | Pattern | Predicted Bug | Edge Case Added? |
|---|---------|--------------|-----------------|
| 1 | Vite null image import | `<img src={null}>` renders as broken image icon (empty grey box) | ✅ Edge Case #1 — must use `{vehicleImage ? <img /> : <ScooterSVG />}` conditional |
| 2 | Gallery lightbox body scroll | Opening lightbox does not lock background scroll — user can scroll behind overlay | ✅ Edge Case #11 — `document.body.style.overflow = 'hidden'` on open, restore on close |
| 3 | Gallery lightbox keyboard | No keyboard handler attached — Escape does not close; arrows do not navigate | ✅ Functional Tests #12 + #13 — must attach `keydown` useEffect |
| 4 | Footer null social link | Iterating over socials array without null check produces `<a href="null">` broken links | ✅ Edge Case #2 — explicit null guard required |
| 5 | Navbar 5 links overflow | Adding Gallery makes 5 nav links; combined with phone + WhatsApp + button, overflows on 900–1024px tablets | ✅ Edge Case #9 — Navbar.css must hide phone text at ≤900px (currently ≤1024px) |
| 6 | WhatsApp country code | Developer writes `wa.me/9893776584` (missing country code 91) — WhatsApp cannot route the number | ✅ Edge Case #10 — verified in companyInfo that `919893776584` is used |
| 7 | `img.onError` not set | When real image is added later but file path is wrong — broken image icon appears instead of SVG fallback | ✅ Edge Case #8 — must set `onError` handler on every `<img>` tag that renders vehicle images |
| 8 | Gallery empty filter state | Filtering to a category with 0 real images shows completely empty page with no feedback | ✅ Edge Case #6 — "No photos in this category" empty state required |
| 9 | companyInfo maps link encoding | Address has `/` and spaces — if manually concatenated into URL string, breaks the link | ✅ Implementation Notes specify using pre-built `COMPANY.maps.googleMapsUrl` string, not manual concatenation |

Verdict: **Approved**
- All Gate 1 & 2 HIGH/CRITICAL findings confirmed in spec text ✅
- All 9 predicted bugs have been added as edge cases ✅

---

## Done
*(Claude fills this when tests pass and PR is merged)*

- **PR**: #—
- **Merged**: —
- **Release Notes entry**: —
