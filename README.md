# Loyalty Portal

A mobile-first web app for the Qontak customer loyalty program.

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
    ├── contexts/
    │   └── AuthContext.jsx      # Auth state + localStorage persistence
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
    │   ├── Vouchers/
    │   │   ├── VouchersPage.jsx        # All vouchers, active/expired groups
    │   │   └── VouchersPage.css
    │   └── Auth/
    │       ├── auth.css                # Shared auth page styles
    │       ├── SignInPage.jsx          # Phone number + Send OTP
    │       ├── SignUpPage.jsx          # Name + phone + Send OTP
    │       └── OtpPage.jsx            # OTP entry + verify
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

- **Auth flow** — Sign in and Sign up with phone number + OTP (dummy `123456`); session persisted in `localStorage`; all app routes protected; unauthenticated users redirected to `/login`
- **Header** — Client logo + profile avatar
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

- Color, spacing, typography, and border-radius tokens
- Component inventory with Figma node IDs
- Layout breakpoints
- Background gradient formula
- Asset migration notes (Figma CDN → local)

---

## Changelog

All notable changes are documented here in reverse-chronological order.

---
