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
    ├── App.jsx                 # Router shell — all Route declarations
    ├── App.css                 # Responsive shell widths
    ├── data/
    │   └── loyalty.js          # All static data + image URL constants
    ├── pages/
    │   ├── Home/
    │   │   └── Home.jsx                # Home screen
    │   ├── EarnPoints/
    │   │   ├── EarnPointsPage.jsx
    │   │   └── EarnPointsPage.css
    │   ├── PointsHistory/
    │   │   ├── PointsHistoryPage.jsx
    │   │   └── PointsHistoryPage.css
    │   ├── RedeemRewards/
    │   │   ├── RedeemRewardsPage.jsx   # Search + category filter
    │   │   └── RedeemRewardsPage.css
    │   └── Vouchers/
    │       ├── VouchersPage.jsx        # All vouchers, active/expired groups
    │       └── VouchersPage.css
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
        │   ├── QuickActions.jsx
        │   └── QuickActions.css
        ├── ActionCard/
        │   ├── ActionCard.jsx  # Quick-action tile
        │   └── ActionCard.css
        ├── StepList/
        │   ├── StepList.jsx    # Numbered steps with mixed bold/regular text
        │   └── StepList.css
        ├── VoucherSection/
        │   ├── VoucherSection.jsx  # Home voucher list + "View all" nav
        │   └── VoucherSection.css
        ├── VoucherItem/
        │   ├── VoucherItem.jsx # Single voucher row (supports faded/expired state)
        │   └── VoucherItem.css
        ├── VoucherDetailSheet/
        │   ├── VoucherDetailSheet.jsx  # Bottom sheet for voucher details
        │   └── VoucherDetailSheet.css
        ├── RewardDetailSheet/
        │   ├── RewardDetailSheet.jsx   # Bottom sheet: reward detail + success state
        │   └── RewardDetailSheet.css
        ├── WarningBanner/
        │   ├── WarningBanner.jsx
        │   └── WarningBanner.css
        └── Footer/
            ├── Footer.jsx
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
- **Quick actions** — 3 interactive tiles: Earn points · Redeem rewards · Points history
- **Earn Points page** (`/earn-points`) — how-it-works steps and redemption flow walkthrough
- **Points History page** (`/points-history`) — transaction log grouped by month, negative points in red
- **Redeem Rewards page** (`/redeem-rewards`) — live search + category filter chips, 12 reward items; tapping a row opens `RewardDetailSheet`
- **RewardDetailSheet** — bottom sheet with reward thumbnail, description, terms, pricing (balance / after-redeem); Redeem CTA transitions to a success state with voucher code card
- **Vouchers page** (`/vouchers`) — all vouchers grouped into Active and Expired sections; accessible from "View all" on Home
- **VoucherDetailSheet** — bottom sheet for voucher details; adapts badge color and messaging for expired vouchers
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

### [0.5.0] — 2026-04-26

#### Added
- **Vouchers page** (`/vouchers`) — full voucher list with Active / Expired section groups; expired rows rendered at reduced opacity
- **VoucherDetailSheet** — bottom sheet for voucher detail: code card, expiry, status badge, cost, redeemed date; closes via backdrop tap, close button, or CTA
  - Expired state: grey badge, dimmed code card, "Expired …" expiry label, descriptive hint copy
- **RewardDetailSheet** — bottom sheet for reward detail with two internal states:
  - *Detail*: thumbnail, description (left-aligned), terms list, pricing card (cost / balance / after-redeem), Redeem CTA
  - *Success*: done icon, voucher code card, "All vouchers" + "Done" buttons
- `closeIcon` and `doneIcon` added to `IMAGES` in `loyalty.js`
- `status`, `cost`, `redeemedDate` fields added to each `VOUCHERS` entry
- `description`, `terms`, `voucherCode`, `voucherExpiry` fields added to each `REDEEM_REWARDS.rewards` entry
- Two expired vouchers added to `VOUCHERS` for realistic data coverage
- Bottom sheet animation pattern: `requestAnimationFrame` enter + `setTimeout` exit (280 ms), scroll-lock, backdrop click-to-dismiss

#### Changed
- `VoucherItem` accepts `onClick` and `faded` props — fully clickable rows with keyboard support
- `VoucherSection` accepts `onSelect` prop and navigates to `/vouchers` on "View all"
- `Home` manages `selectedVoucher` state and mounts `VoucherDetailSheet`
- `RedeemRewardsPage` manages `selected` state and mounts `RewardDetailSheet`
- `DESIGN.md` updated with bottom sheet pattern, `VoucherDetailSheet`, `RewardDetailSheet`, `VouchersPage`, updated data shapes and IMAGES keys

---

### [0.4.0] — 2026-04-25

#### Added
- **Points History page** (`/points-history`) — transaction log grouped by month with positive/negative points rendering
- **Redeem Rewards page** (`/redeem-rewards`) — live search (full-pill input), category filter chips (horizontal scroll), reward grid with locked-state support
- `searchIcon` added to `IMAGES`
- `POINTS_HISTORY` and `REDEEM_REWARDS` data structures in `loyalty.js`
- 12 reward items across Coffee, Matcha, Breakfast, Bento, Merch, Discount categories
- Filter chips: All, Coffee, Matcha, Breakfast, Bento, Merch, Discount

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
