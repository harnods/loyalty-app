# Loyalty Portal

A mobile-first web app for the Qontak customer loyalty program — built from a pixel-perfect Figma spec and delivered as a componentised React application.

---

## Table of Contents

- [Stack](#stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Design](#design)
- [Changelog](#changelog)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 5](https://vite.dev/) |
| Styling | Plain CSS (component-scoped, co-located) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Data | Static constants in `src/data/loyalty.js` |
| Node | ≥ 20.14 |

No CSS framework, no component library — intentional. The design system is implemented directly against the Figma token spec.

---

## Project Structure

```
loyalty/
├── index.html                  # Entry HTML — loads Inter font
├── vite.config.js
├── package.json
├── README.md                   # ← you are here
├── DESIGN.md                   # Design tokens, layout rules, component map
└── src/
    ├── main.jsx                # React root mount
    ├── index.css               # Global reset + body gradient
    ├── App.jsx                 # Shell wrapper, composes all sections
    ├── App.css                 # Responsive shell widths
    ├── data/
    │   └── loyalty.js          # All static data + image URL constants
    ├── pages/
    │   ├── Home/
    │   │   └── Home.jsx            # Home screen composition
    │   └── EarnPoints/
    │       ├── EarnPointsPage.jsx  # Earn points static page
    │       └── EarnPointsPage.css
    └── components/
        ├── BackNav/
        │   ├── BackNav.jsx     # Back button with chevron
        │   └── BackNav.css
        ├── Header/
        │   ├── Header.jsx      # Logo + avatar
        │   └── Header.css
        ├── PointsCard/
        │   ├── PointsCard.jsx  # Welcome message, points, tier, hero illustration
        │   └── PointsCard.css
        ├── QuickActions/
        │   ├── QuickActions.jsx  # Section wrapper for action cards
        │   └── QuickActions.css
        ├── ActionCard/
        │   ├── ActionCard.jsx  # Individual quick-action tile
        │   └── ActionCard.css
        ├── StepList/
        │   ├── StepList.jsx    # Numbered step list with mixed bold/regular text
        │   └── StepList.css
        ├── VoucherSection/
        │   ├── VoucherSection.jsx  # Voucher list + "View all" header
        │   └── VoucherSection.css
        ├── VoucherItem/
        │   ├── VoucherItem.jsx # Single voucher row
        │   └── VoucherItem.css
        ├── WarningBanner/
        │   ├── WarningBanner.jsx  # Yellow warning callout
        │   └── WarningBanner.css
        └── Footer/
            ├── Footer.jsx      # Powered-by attribution
            └── Footer.css
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20.14
- npm ≥ 10

### Install

```bash
git clone https://github.com/harnods/loyalty-app.git
cd loyalty-app
npm install
```

### Develop

```bash
npm run dev
# → http://localhost:5173
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Features

### Implemented

- **Header** — machimoto logo + profile avatar
- **Points card** — total points, tier badge (Platinum), hero coin illustration, last-updated timestamp
- **Quick actions** — 3 interactive tiles: Earn points · Redeem rewards · Points history; each navigates to its page
- **Earn Points page** — static page with hero card, numbered how-it-works steps, and warning banner
- **Voucher section** — list of active vouchers with thumbnail, code, and expiry
- **Footer** — Powered by Mekari Qontak attribution
- **Client-side routing** — react-router-dom v7 with `BrowserRouter`

### Responsive behaviour

| Breakpoint | Shell width | Quick actions layout |
|---|---|---|
| < 360px | 100% fluid | Stacked vertically |
| 360px – 599px | 100% fluid | 3-column row |
| 600px – 1023px | 520px centered | 3-column row |
| ≥ 1024px | **684px fixed** | 3-column row |

### Background gradient

Radial gradient anchored to `body::before` — bleeds to full viewport width regardless of shell size, positioned upper-right so the logo area stays on a clean background.

---

## Design

All visual specifications live in [`DESIGN.md`](./DESIGN.md):

- Figma source file + node IDs
- Color, spacing, typography, and border-radius tokens
- Component inventory with Figma node IDs
- Layout breakpoints
- Background gradient formula
- Asset migration notes (Figma CDN → local)

---

## Changelog

All notable changes are documented here in reverse-chronological order.

---

### [0.3.0] — 2026-04-25

#### Added
- **Earn Points page** (`/earn-points`) — pixel-perfect from Figma node `14-1438`
  - `BackNav` component — chevron + Back button, bg `#f4faff`
  - `StepList` component — numbered steps with mixed bold/regular inline text
  - `WarningBanner` component — yellow callout with warning icon, bg `#fdf6dd`
- Client-side routing via react-router-dom v7 (`BrowserRouter` in `main.jsx`)
- `pages/Home/` — home screen extracted from `App.jsx` into its own page component
- `EARN_POINTS` data structure in `src/data/loyalty.js`
- `chevronLeft` and `warning` icon URLs added to `IMAGES`

#### Changed
- `ActionCard` now accepts `href` prop and navigates via `useNavigate`
- `App.jsx` refactored to routing shell (`Routes` + `Route`)
- `DESIGN.md` updated with full Earn Points page token documentation

---

### [0.2.0] — 2026-04-25

#### Added
- Converted standalone HTML prototype to full React + Vite application
- Component-scoped CSS co-located with each component
- `src/data/loyalty.js` as single source of truth for all static data and image URLs
- `DESIGN.md` documenting tokens, layout, and component inventory

#### Changed
- Desktop shell set to **684px fixed** (min-width = max-width) at ≥ 1024px
- Tablet shell expanded to 520px at ≥ 600px

---

### [0.1.0] — 2026-04-25

#### Added
- Pixel-perfect HTML prototype from Figma spec (`node-id: 3-346`)
- All assets fetched as transparent PNGs at exact Figma dimensions via Figma MCP
- Mobile-first layout — 393px baseline, centered on desktop
- Background gradient on `body::before` for full-viewport bleed without container clipping
- Quick action cards: Earn points · Redeem rewards · Points history
- Arrow icon on each action card (exact 20 × 20px Figma asset)
- Consistent two-line labels across all action cards
- Vertical card stack on screens ≤ 360px
- Voucher list with overflow-cropped thumbnails matching Figma positioning
- Mekari Qontak footer logo at exact 78 × 24px
- No drop shadow on shell — seamless integration with page background
