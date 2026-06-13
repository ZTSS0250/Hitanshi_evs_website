# Release Notes — Hitanshi EVS Website

---

## [Unreleased]

### Features
- Initial website launch with Home, Vehicles, Book Test Drive, and Contact Us pages
- **hevs-002**: Email notifications via EmailJS on all three form submissions (Test Drive booking, Contact Us message, Floating Help quick query) — emails delivered to `hitanshievs@gmail.com` with full field details; loading state on submit button; user-facing error on send failure

### Internal
- Project scaffolded with React 18 + Vite 5 + React Router 6
- Dark-theme design system with CSS variables (green #00D45E, blue #0066FF)
- 6 Zelio vehicle models with dummy data in `src/data/vehicles.js`
- Animated SVG scooter illustrations, floating help button, toast notifications
- Fully responsive layout for mobile, tablet, and desktop

---

<!-- When releasing: rename [Unreleased] to [1.0.0] — YYYY-MM-DD and add a fresh [Unreleased] above -->
