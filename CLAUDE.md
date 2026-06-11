# CLAUDE.md — Hitanshi EVS Website

> **Project key**: `hevs`
> **Type**: React.js Frontend Website
> **Client**: Hitanshi EVS, Shajapur, Madhya Pradesh
> **Business**: Authorized Zelio E-Mobility franchise showroom
> **Last updated**: 2026-06-11

---

## Quick Start

```bash
npm install        # install dependencies (run once)
npm run dev        # start dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^18.3.1 |
| Routing | React Router DOM | ^6.26.0 |
| Build tool | Vite | ^5.4.0 |
| Icons | React Icons | ^5.3.0 |
| Styling | Plain CSS (per-component files) | — |
| Animations | CSS keyframes (no external lib) | — |
| State | React hooks only (useState, useEffect, useRef) | — |
| Data | Static JS file (no API / backend) | — |

No TypeScript. No Redux. No Tailwind. No Framer Motion.

---

## Project Structure

```
Hitanshi_evs_website/
├── CLAUDE.md                        ← This file
├── README.md
├── index.html                       ← Vite root HTML, loads Google Fonts
├── package.json
├── vite.config.js                   ← { plugins: [react()] } — no extras
├── backlog/
│   ├── planning/                    ← New feature tasks (Status: planning)
│   ├── specification/               ← Gate-approved tasks ready to code
│   └── done/                        ← Completed tasks
├── documents/
│   └── security-rules.md            ← SEC-### rules (SEC-001 onwards)
├── TODO.md                          ← All tasks at a glance
├── RELEASE_NOTES.md                 ← Changelog
└── src/
    ├── main.jsx                     ← ReactDOM.createRoot entry point
    ├── App.jsx                      ← BrowserRouter + Routes + layout wrap
    ├── index.css                    ← Global design system (CSS vars, reset, utilities)
    ├── data/
    │   └── vehicles.js              ← All static data (vehicles, testimonials, stats)
    ├── components/
    │   ├── Navbar.jsx / .css        ← Sticky nav, mobile drawer, active link
    │   ├── Footer.jsx / .css        ← 4-col footer, social icons, quick links
    │   ├── FloatingHelpButton.jsx / .css  ← FAB → modal quick-contact form
    │   └── Toast.jsx / .css         ← Auto-dismiss success notification
    └── pages/
        ├── Home.jsx / .css          ← Landing page (6 sections)
        ├── Vehicles.jsx / .css      ← Catalog with search + filter
        ├── BookTestDrive.jsx / .css ← 7-field booking form
        └── ContactUs.jsx / .css     ← Contact info + message form
```

---

## Routing  (`src/App.jsx`)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page |
| `/vehicles` | `Vehicles` | Vehicle catalog |
| `/book-test-drive` | `BookTestDrive` | Test drive booking form |
| `/contact` | `ContactUs` | Contact info + message form |

`ScrollToTop` component inside App resets scroll to top on every route change.
`Navbar`, `Footer`, `FloatingHelpButton` are rendered outside `<Routes>` — always visible.

---

## Design System (`src/index.css`)

### CSS Variables (copy these when writing new CSS)

```css
/* Colors */
--green:        #00D45E;
--green-dark:   #00A84A;
--green-glow:   rgba(0, 212, 94, 0.22);
--blue:         #0066FF;
--blue-dark:    #0047CC;
--blue-glow:    rgba(0, 102, 255, 0.22);

/* Backgrounds */
--bg-primary:   #07090F;   /* page background */
--bg-secondary: #0D1117;   /* section alternate bg */
--bg-card:      #111827;   /* card background */
--bg-hover:     #1A2232;   /* hover / input background */

/* Borders */
--border:       #1F2937;
--border-light: #2D3748;

/* Text */
--text-primary:   #F1F5F9;
--text-secondary: #94A3B8;
--text-muted:     #64748B;

/* Gradients */
--gradient:      linear-gradient(135deg, #00D45E 0%, #0066FF 100%);
--gradient-card: linear-gradient(145deg, #111827, #0D1117);

/* Typography */
--font-body:    'Inter', sans-serif;
--font-heading: 'Poppins', sans-serif;

/* Layout */
--navbar-h: 70px;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,.45);
--shadow-md: 0 4px 16px rgba(0,0,0,.55);
--shadow-lg: 0 8px 32px rgba(0,0,0,.65);

/* Border Radius */
--radius-sm:   8px;
--radius-md:   14px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-full: 9999px;

--transition: .25s ease;
```

### Global Utility Classes

```
.container          → max-width 1280px, centered, 1.5rem padding
.section-padding    → padding 5.5rem 0 (3.5rem on mobile)
.text-center        → text-align: center
.gradient-text      → background-clip gradient text effect
.section-badge      → green pill label above section headings
.section-title      → Poppins 700, clamp(1.7rem→2.7rem)
.section-subtitle   → gray, max-width 560px
.section-header     → wrapper for badge + title + subtitle
.btn-primary        → gradient green→blue pill button
.btn-outline        → transparent bordered pill button
.glass              → glassmorphism card (bg + backdrop-filter)
.animate-float      → CSS float keyframe
.animate-fadeInUp   → CSS fadeInUp keyframe
```

### Keyframe Animations (defined in index.css)

| Name | Effect | Usage |
|------|--------|-------|
| `fadeInUp` | opacity 0→1 + translateY 28px→0 | Cards, sections |
| `fadeIn` | opacity 0→1 | Modals, overlays |
| `float` | translateY 0↔−14px | Hero scooter SVG |
| `spin` | rotate 0→360deg | Showcase rings |
| `pulse` | scale + opacity oscillate | FAB button, map pin |
| `slideDown` | opacity + translateY | Toast notification |
| `scaleIn` | opacity + scale .92→1 | Modal open, success state |

---

## Data File (`src/data/vehicles.js`)

### Exports

#### `vehicles` — Array of 6 objects
```js
{
  id: 1,                          // 1–6, used as key
  name: 'Eeva E',
  category: 'Economy',            // Economy | Standard | Premium | Premium+ | Commuter | Compact
  tagline: 'Ideal for daily…',
  price: '₹79,990',               // display string
  priceNumeric: 79990,            // for sorting/filtering
  range: '80 km',
  topSpeed: '25 km/h',
  batteryType: 'Lithium-Ion 60V/28Ah',
  chargingTime: '4–5 Hours',
  accentColor: '#00D45E',         // unique per vehicle, used for card theming
  features: ['Feature 1', ...],  // array of strings
  description: '…',
  warranty: '3 Years Motor Warranty',
  weight: '95 kg',
  loadCapacity: '150 kg',
}
```

**Vehicle list:**

| id | name | category | price | range | topSpeed | accentColor |
|----|------|----------|-------|-------|----------|------------|
| 1 | Eeva E | Economy | ₹79,990 | 80 km | 25 km/h | #00D45E |
| 2 | Eeva Eco LX | Standard | ₹89,990 | 100 km | 25 km/h | #0066FF |
| 3 | Eeva Eco ZX | Premium | ₹99,990 | 120 km | 25 km/h | #A855F7 |
| 4 | Eeva ZX Plus | Premium+ | ₹1,09,990 | 140 km | 45 km/h | #F59E0B |
| 5 | Gracy New | Commuter | ₹85,990 | 90 km | 25 km/h | #06B6D4 |
| 6 | Gracy Little | Compact | ₹74,990 | 75 km | 25 km/h | #EF4444 |

#### `testimonials` — Array of 4 objects
```js
{ id, name, location, rating (1-5), review, vehicle, date, avatarColor }
```

#### `stats` — Array of 4 objects
```js
{ id, value (number), suffix ('+'), label }
// Values: 500 customers, 650 sold, 1200 test drives, 3 years
```

---

## Components

### `Navbar` (`src/components/Navbar.jsx`)
- **State**: `menuOpen` (bool), `scrolled` (bool)
- **Behaviour**: Transparent at top → glass background on scroll (>20px). Mobile drawer slides in from right. Active route gets a green underline indicator. Body scroll locked when mobile menu is open.
- **Links**: Home `/`, Vehicles `/vehicles`, Book Test Drive `/book-test-drive`, Contact Us `/contact`
- **CSS trick**: `.navbar.scrolled` uses `backdrop-filter: blur(20px)` + semi-transparent bg.

### `Footer` (`src/components/Footer.jsx`)
- **Layout**: 4-col grid (1.6fr 1fr 1fr 1.4fr). Collapses to 2-col at 1024px, 1-col at 600px.
- **Columns**: Brand + socials | Quick Links | Our Vehicles | Contact details
- **Socials**: Facebook, Instagram, WhatsApp, YouTube, Twitter (all `href="#"` — replace with real URLs)

### `FloatingHelpButton` (`src/components/FloatingHelpButton.jsx`)
- **State**: `open`, `form` {name, mobile, address}, `errors`, `success`
- **Trigger**: Pulsing green FAB fixed at `bottom:2rem; right:2rem`, z-index 998.
- **Modal**: Slides up from FAB, z-index 1002. Backdrop at 1001.
- **Validation**: name required, mobile required + `/^[6-9]\d{9}$/`, address required.
- **Success**: Replaces form with success state. Closing resets everything after 300ms.

### `Toast` (`src/components/Toast.jsx`)
- **Props**: `message` (string), `onClose` (function), `duration` (ms, default 4000)
- **Position**: Fixed, `bottom:2rem; left:50%; transform:translateX(-50%)`
- **Auto-dismisses** via `setTimeout(onClose, duration)`.
- **Usage**: `{toast && <Toast message="..." onClose={() => setToast(false)} />}`

---

## Pages

### `Home` (`src/pages/Home.jsx`)

**Sections (in order):**
1. **Hero** — Full-viewport, dark bg with green/blue orbs + CSS grid lines. Left: headline + CTAs + trust chips. Right: animated scooter showcase with 3 floating stat pills. The right panel is hidden on mobile.
2. **Why Choose Us** — 6 feature cards in 3-col grid. Each card has `--c` CSS variable for accent color. Bottom bar animates to full width on hover.
3. **Featured Vehicles** — 3-col grid of `HomeVehicleCard`. Each card uses `ACCENT[]` array by index for color.
4. **Stats** — Full-width section with green/blue gradient tint. 4 animated counters using `IntersectionObserver` to trigger `useCounter` hook when section scrolls into view.
5. **Testimonials** — 2-col grid of review cards with star ratings and avatar initials.
6. **CTA** — Centered card with orb glow effects.

**Key internal components (defined inside Home.jsx):**
- `ScooterSVG({ color, className })` — inline SVG scooter silhouette, reused across pages
- `useCounter(end, duration, active)` — animates number from 0 to `end` with easeOut cubic
- `StatCard({ value, suffix, label, animate })` — renders one counter
- `HomeVehicleCard({ vehicle, index })` — compact vehicle card for home grid

### `Vehicles` (`src/pages/Vehicles.jsx`)

**Features:**
- `CATEGORIES` derived from `vehicles` data: `['All', 'Economy', 'Standard', 'Premium', 'Premium+', 'Commuter', 'Compact']`
- Filter state: `query` (text search) + `category` (chip filter)
- `filtered` computed via `useMemo` — matches name, category, or batteryType
- Each `VehicleCard` has local `expanded` state to toggle feature list
- `ScooterSVG` re-defined locally (same SVG, different sizing class `.v-scooter-svg`)
- Specs shown in a 4-col mini grid: Range, Top Speed, Charge Time, Warranty
- CTA button links to `/book-test-drive`

### `BookTestDrive` (`src/pages/BookTestDrive.jsx`)

**Form fields:** fullName, mobile, email (optional), address, vehicle (select), date, time (select)

**Validation rules:**
- `fullName` — required
- `mobile` — required + `/^[6-9]\d{9}$/`
- `email` — optional but validates format if provided
- `address` — required
- `vehicle` — required (select from vehicles data)
- `date` — required, cannot be in the past (min = today's ISO date)
- `time` — required (9 time slots from 09:00 AM to 06:00 PM)

**State:** `form`, `errors`, `toast` (bool), `bookings` (array — stores submissions in session)

**Layout:** 2-col grid — form card (left) + sidebar (right). Sidebar has: contact info card, "Why test drive?" checklist, booking count badge.

### `ContactUs` (`src/pages/ContactUs.jsx`)

**Layout:**
- 4 info cards at top (address, phone, email, hours) — 4-col grid
- 2-col main grid: map placeholder (left) + contact form (right)

**Form fields:** name, mobile, email (optional), address (optional), message (required)

**Map placeholder:** Decorative grid + animated pulsing pin + address text + "Open in Google Maps" link pointing to `https://maps.google.com/?q=Shajapur,Madhya+Pradesh`

**Social links:** WhatsApp, Facebook, Instagram, Call Now (all `href="#"` except call)

---

## CSS Patterns Used in This Project

### Per-card accent color via CSS custom property
```css
/* JSX: style={{ '--c': vehicle.accentColor }} */
.card { border-color: var(--c); }
.card:hover { box-shadow: 0 0 0 1px color-mix(in srgb, var(--c) 20%, transparent); }
```

### Glassmorphism header
```css
background: rgba(7,9,15,.93);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### Orb background decorations (used in hero, headers, CTA)
```css
.orb { position:absolute; border-radius:50%; filter:blur(80px); opacity:.28;
       background: radial-gradient(circle, #00D45E, transparent 70%); }
```

### `color-mix()` for tinted backgrounds
```css
background: color-mix(in srgb, var(--c) 14%, transparent);
/* Supported in all modern browsers — creates tinted bg from accent color */
```

---

## SDD Process for This Project

**Project key**: `hevs`

Task naming: `hevs-{001}-{type}-{short-description}`

**Folder structure:**
```
backlog/
  planning/       ← hevs-001-feature-xyz.md  (Status: planning)
  specification/  ← moved here after 3 gates pass
  done/           ← moved here after PR merged
documents/
  security-rules.md
TODO.md
RELEASE_NOTES.md
```

When adding a new feature:
1. Create `backlog/planning/hevs-NNN-type-description.md` using the task template from global CLAUDE.md
2. Add a row to `TODO.md`
3. Fill the Planning section (developer)
4. Say **"move to specification"** → Claude reads codebase, fills Specification + Test Cases + runs 3 gates
5. Say **"fix it"** → Claude writes the code
6. Run tests, say **"all tests pass, create PR"** → Claude generates PR message, moves file to `done/`, updates RELEASE_NOTES

---

## Known Placeholder Data (replace before going live)

| Location | Placeholder | Replace with |
|----------|-------------|-------------|
| `Navbar.jsx:25` | `+91 70000 00000` | Real phone number |
| `Footer.jsx` | `info@hitanshievs.in` | Real email |
| `Footer.jsx` | Social `href="#"` | Real social profile URLs |
| `ContactUs.jsx` | Social `href="#"` | Real social profile URLs |
| `Footer.jsx` | Address text | Verified showroom address |
| `ContactUs.jsx` map link | `?q=Shajapur,Madhya+Pradesh` | Exact Google Maps coordinates |
| All forms | React state only | Wire to backend API / EmailJS / Firebase |

---

## Adding a New Vehicle

Edit `src/data/vehicles.js` — add a new object to the `vehicles` array following the existing schema. Both the Vehicles page and Home page pull from this array automatically. Choose a unique `accentColor` and increment `id`.

## Adding a New Page

1. Create `src/pages/NewPage.jsx` and `src/pages/NewPage.css`
2. Add route in `src/App.jsx`: `<Route path="/new-page" element={<NewPage />} />`
3. Add nav link in `src/components/Navbar.jsx` (`NAV_LINKS` array)
4. Add footer link in `src/components/Footer.jsx` (`quickLinks` array)
