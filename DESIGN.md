# Design Reference — Qontak Loyalty Portal

## Figma Source

| Asset | Link |
|---|---|
| **Main file** | [Qontak — Loyalty Portal](https://www.figma.com/design/03DgfOGS2jmnhk51R8BVMl/Qontak---Loyalty-Portal) |
| **Home** | `node-id: 3-346` |
| **Earn Points** | `node-id: 14-1438` |
| **Points History** | `node-id: 14-1971` |
| **Redeem Rewards** | `node-id: 15-2311` |

> All visual decisions defer to the Figma source. When there's a conflict between this document and Figma, **Figma wins**.

---

## Design Tokens

### Color

| Token | Value | Usage |
|---|---|---|
| `background-base` | `#F7F8F9` | App background |
| `background-stage` | `#FFFFFF` | Stage card background |
| `background-hero` | `#F4FAFF` | Page hero + BackNav band |
| `background-warning` | `#FDF6DD` | WarningBanner fill |
| `background-neutral` | `#F0F1F3` | Avatar bg, inactive filter chip |
| `background-bold` | `#4C5460` | Active filter chip, lock badge, locked item text |
| `text-default` | `#272B32` | Primary text |
| `text-secondary` | `#656F80` | Captions, meta, footer |
| `text-placeholder` | `#8690A2` | Search input placeholder |
| `text-link` | `#4B61DC` | "View all" link |
| `text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `text-negative` | `#E5443A` | Negative point values (redemptions) |
| `border-default` | `#DCDFE4` | Voucher card border |
| `border-subtle` | `#F0F1F3` | Transaction / reward row divider |
| `border-form` | `rgba(29,31,36,0.16)` | Search input border |
| `action-blue` | `#B5D9FF` | Earn points action card |
| `action-orange` | `#FFE0C3` | Redeem rewards action card |
| `action-teal` | `#D0F1F1` | Points history action card |

### Typography

All text uses **Inter** (sans-serif). Font smoothing: `-webkit-font-smoothing: antialiased`.

| Style | Weight | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| Page title (H1) | 600 | 24px | 32px | −0.2px | Page hero heading |
| Section title (H2) | 600 | 20px | 32px | 0 | Section headings |
| Points value | 700 | 32px | 1 | −1px | Points card large number |
| Label semibold | 600 | 14px | 20px | 0 | Row names, points, chip labels |
| Label regular | 400 | 14px | 20px | 0 | Body copy, BackNav label, search |
| Body regular | 400 | 14px | 24px | 0 | Hero description, step text |
| Caption | 400 | 12px | 16px | 0 | Category tags, meta text |
| Overline semibold | 600 | 10px | 12px | 0 | Lock badge |
| Welcome heading | 600 | 20px | 32px | 0 | Home welcome text |

### Spacing

| Token | Value |
|---|---|
| `space-4xs` | `2px` |
| `space-3xs` | `4px` |
| `space-xs` | `8px` |
| `space-sm` | `12px` |
| `space-md` | `16px` |
| `space-lg` | `20px` |
| `space-xl` | `24px` |
| `space-2xl` | `32px` |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radii-sm` | `4px` | — |
| `radii-md` | `6px` | Voucher cards, action cards, reward thumbs, warning banner |
| `radii-lg` | `8px` | Stage card |
| `radii-xl` | `12px` | Points card |
| `radii-full` | `999px` | Filter chips, step badges, avatar, lock badge |

### Elevation

| Token | Value | Usage |
|---|---|---|
| `elevation-m` | `0 20px 25px rgba(0,0,0,.10), 0 10px 10px rgba(0,0,0,.04)` | Points card |

---

## Global Layout

### Shell

The root `<div className="shell">` constrains all page content to a mobile-first column.

```
Mobile   (<600px)   : width 100%, fluid
Tablet   (≥600px)   : max-width 520px, centered
Desktop  (≥1024px)  : min-width 684px, max-width 684px (fixed)
```

The shell is `display: flex; flex-direction: column; min-height: 100vh`.

### Background Gradient

A full-viewport decorative gradient is painted on `body::before` so it bleeds behind the shell and is never clipped. It creates the blue-teal wash visible in the upper-right corner.

```css
background: radial-gradient(
  ellipse 75% 90% at 72% -15%,
  #7fcadd 0%, #a5daeb 18%, #bfe8f3 30%,
  rgba(195,235,244,0.4) 48%, transparent 65%
);
height: 280px; position: fixed; top: 0; left: 0; right: 0;
```

### Stage Card Pattern

Every sub-page (Earn Points, Points History, Redeem Rewards) wraps its content in a stage card — a white rounded card with 16px horizontal gutters:

```
Container : padding 0 16px, flex: 1, flex-direction: column
Stage     : background white, border-radius 8px, overflow hidden, flex: 1
```

The stage contains the BackNav bar and hero area, both sharing `background: #f4faff`. Content below the hero has `padding: 16px`.

### Gutter Rule

Left and right gutter is always **16px** at every breakpoint. The stage card sits within this gutter.

### Routing

```
/login           → SignInPage      (public)
/signup          → SignUpPage      (public)
/otp             → OtpPage        (public, requires location.state)
/                → Home           (protected)
/earn-points     → EarnPointsPage (protected)
/points-history  → PointsHistoryPage (protected)
/redeem-rewards  → RedeemRewardsPage (protected)
/vouchers        → VouchersPage   (protected)
```

Router: `react-router-dom v7`, `BrowserRouter` in `main.jsx`, `Routes`/`Route` in `App.jsx`.

**Protected routes:** `ProtectedRoute` in `App.jsx` checks `AuthContext.user`; redirects to `/login` if null. Auth pages redirect to `/` if already logged in.

**Auth persistence:** `localStorage` key `loyalty_user` stores `{ name, phone }` as JSON. Read on mount via `useState` initializer in `AuthContext`.

---

## Data Layer — `src/data/loyalty.js`

Single source of truth for all content and image URLs. All pages import from here.

### `IMAGES`

All assets are served from the Figma CDN (`https://www.figma.com/api/mcp/asset/{uuid}`). TTL: 7 days. Before production, export to `src/assets/` and update these references.

| Key | Usage |
|---|---|
| `logo` | Header — machimoto wordmark (132×56px) |
| `avatar` | Header — user avatar icon (36×36px) |
| `crown` | PointsCard — tier badge icon (20×20px) |
| `heroCoins` | PointsCard — decorative coins illustration |
| `iconEarn` | ActionCard — earn points icon (32×32px) |
| `iconRedeem` | ActionCard — redeem rewards icon (32×32px) |
| `iconHistory` | ActionCard — points history icon (32×32px) |
| `arrow` | ActionCard — arrow chevron (20×20px) |
| `mekariQontak` | Footer — mekari qontak logo (78×24px) |
| `chevronLeft` | BackNav — back chevron (20×20px, inset 26.25% 36.25%) |
| `warning` | WarningBanner — warning icon (20×20px, inset 8.75% 6.25%) |
| `searchIcon` | RedeemRewardsPage — search icon (20×20px, inset 6.25%) |
| `closeIcon` | Bottom sheets — close button X (32×32px, inset 16.25%) |
| `doneIcon` | RewardDetailSheet success state — green checkmark (80×80px, inset 6.25%) |
| `rewardDripBag` | Reward thumb — free drip bag coffee |
| `rewardOnigiri` | Reward thumb — free onigiri |
| `rewardDiscount` | Reward thumb — 20% off next purchase |
| `rewardToteBag` | Reward thumb — signature tote bag |
| `rewardBento` | Reward thumb — free bento set |
| `rewardPourOver` | Reward thumb — ceramic pour-over kit |

### `USER`

```js
{ name, points, tier, lastUpdated }
```

### `QUICK_ACTIONS`

Array of `{ id, color, icon, label: [line1, line2], href }`. Maps to ActionCard tiles on Home.

### `EARN_POINTS`

```js
{
  hero: { title, description },
  sections: [
    { id, title, steps: [{ id, parts: [{ bold, text }] }] },
    { id, title, intro, steps, warning: [{ bold, text }] },
  ]
}
```

### `POINTS_HISTORY`

```js
{
  totalPoints,
  groups: [{ id, month, transactions: [{ id, title, date, location, points }] }]
}
```

`points` is a string prefixed with `+` or `−`. Negative values render red.

### `VOUCHERS`

```js
[{
  id, name, code, expiry, thumb,
  thumbStyle: { width, height, top, left },
  status,        // e.g. 'Active'
  cost,          // e.g. '45pts'
  redeemedDate,  // e.g. '19 Apr 2026, 17:45'
}]
```

`thumbStyle` uses absolute positioning within a 56×56px overflow-hidden container to match Figma crop precisely.

### `REDEEM_REWARDS`

```js
{
  filters: ['All', 'Coffee', 'Matcha', 'Breakfast', 'Bento', 'Merch', 'Discount'],
  rewards: [{
    id, name, category, points,
    locked, lockLabel?,
    thumbKey,           // key into IMAGES
    thumbStyle?,        // null = object-cover; object = absolute-position crop
    description,        // reward description text
    terms,              // string[]
    voucherCode,        // e.g. 'VC08282147Q'
    voucherExpiry,      // e.g. 'Expires 15 May 2026'
  }]
}
```

---

---

## Auth Pages

**Figma node:** `22-4226`  
**Files:** `src/pages/Auth/` + `src/contexts/AuthContext.jsx`

All three auth pages share `auth.css` and the same layout structure:

```
auth-page (flex: 1, flex-direction: column, padding-top: 80px)
└─ auth-wrapper (flex: 1, flex-col, justify-content: space-between, padding: 0 16px)
   ├─ auth-card (white, border-radius: 12px, shadow elevation-M, padding: 24px)
   │   ├─ auth-card__header (flex-col, gap: 32px, padding-bottom: 20px)
   │   │   logo (132×56px, IMAGES.logo)
   │   │   title (24px / 600 / -0.2px / #272b32)
   │   └─ auth-form (flex-col)
   │       input groups + button group
   └─ auth-footer (flex-col, align-items: center, gap: 4px, padding: 12px 0 24px)
       "Powered by" (14px / 400 / #656f80)
       IMAGES.mekariQontak logo (78×24px)
```

### Sign In (`/login`)

- Phone number label + input
- Send OTP button → navigates to `/otp` with `state: { mode: 'signin', phone }`
- "Don't have an account? Sign up" link → `/signup`

### Sign Up (`/signup`)

- Full name label + input
- Phone number label + input
- Send OTP button → navigates to `/otp` with `state: { mode: 'signup', phone, name }`
- "Already have an account? Sign in" link → `/login`

### OTP (`/otp`)

- Requires `location.state.phone`; redirects to `/login` if missing
- Hint: "We sent the code to {maskedPhone}" (format: `0812****789`)
- Single OTP input: `type="tel"`, `maxLength=6`, centered, `font-size: 24px`, `letter-spacing: 0.4em`
- Verify button: checks against dummy code `123456`; on match → calls `login({ name, phone })` → navigates to `/`
- "Didn't receive it? Resend OTP" — clears input, shows "OTP resent!" for 3 s

### Input spec (shared)

```
background: white
border: 1px solid rgba(29, 31, 36, 0.16)
border-radius: 6px
padding: 8px 12px
font: 14px / 400 / #272b32
focus border-color: #4b61dc
error border-color: #e5443a
placeholder color: #8690a2
```

---

## Components

### `Header`

**File:** `src/components/Header/Header.jsx`  
**Props:** `userName: string`  
**Figma node:** `3:517`

Full-width bar at the top of every page. Logo on the left, circular avatar button on the right.

```
Layout  : flex, space-between, padding 16px, flex-shrink 0
Logo    : 132×56px image
Avatar  : 36×36px circular button, background #f0f1f3
```

---

### `Footer`

**File:** `src/components/Footer/Footer.jsx`  
**Props:** none  
**Figma node:** `12:1057`

Attribution footer used on every page. Sits at the bottom of the shell via `margin-top: auto`.

```
Layout  : flex column, align-items center, gap 4px, padding 12px 0 24px
Text    : "Powered by" — 14px / 400 / 20px / #656f80
Logo    : mekari qontak mark — 78×24px
```

---

### `BackNav`

**File:** `src/components/BackNav/BackNav.jsx`  
**Props:** `label?: string` (default `'Back'`), `to?: string | number` (default `-1`)  
**Figma node:** `14:1441`

Navigation bar used at the top of every sub-page stage card. Shares `#f4faff` background with the hero section below it so both visually merge into one band.

```
Layout       : flex, align-items center, gap 12px, padding 12px 8px
Background   : #f4faff
Width        : 100%
Icon wrapper : 20×20px, overflow hidden
Icon path    : absolute, inset 26.25% 36.25% (CSS inset shorthand)
Label font   : 14px / 400 / 20px / #272b32
```

On click, calls `navigate(to)` from `react-router-dom`.

---

### `WarningBanner`

**File:** `src/components/WarningBanner/WarningBanner.jsx`  
**Props:** `parts: Array<{ bold: boolean, text: string }>`  
**Figma node:** `14:1456`

Yellow callout banner for warnings. Accepts mixed bold/regular inline text via the `parts` array.

```
Layout      : flex, align-items flex-start, gap 12px, padding 12px 16px
Background  : #fdf6dd
Radius      : 6px
Icon        : 20×20px, inset 8.75% 6.25%
Text font   : 14px / 400 / 20px / #272b32
Bold parts  : font-weight 600
```

Usage:
```jsx
<WarningBanner parts={[
  { bold: true, text: 'Vouchers expire 30 days after you redeem them.' },
  { bold: false, text: ' Use them before the clock runs out.' },
]} />
```

---

### `PointsCard`

**File:** `src/components/PointsCard/PointsCard.jsx`  
**Props:** `user: { name, points, tier, lastUpdated }`  
**Figma node:** `3:792`

Hero card on the Home page showing the user's total points, tier, and a decorative coins illustration.

```
Section         : flex column, gap 8px, padding 0 16px 32px
Welcome text    : 20px / 600 / 32px / #272b32

Card            : background white, border-radius 12px
                  box-shadow elevation-m, padding 20px, position relative
Label           : 16px / 600 / 24px / #272b32
Points value    : 32px / 700 / 1 / #272b32, letter-spacing −1px, lining tabular nums
Tier row        : flex, gap 8px, crown icon 20×20px
Tier text       : 14px / 600 / 20px / #000
Last updated    : 12px / 400 / 16px / #656f80

Hero illustration (coins)
  Container   : absolute, top −8px, right 8px, 132×128px, overflow hidden
  Image       : absolute, width 105.96%, height 111.72%, left −5.82%, top −8.82%
```

---

### `ActionCard`

**File:** `src/components/ActionCard/ActionCard.jsx`  
**Props:** `color: 'blue'|'orange'|'teal'`, `icon: string (URL)`, `label: [string, string]`, `href: string`  
**Figma nodes:** `9:838–842`

Tappable quick-action tile. Three instances live inside `QuickActions`.

```
Layout       : flex column, justify-content space-between
Size         : flex 1 0 0, height 160px
Padding      : 12px
Radius       : 6px
Hover        : opacity 0.88

Colors       : blue → #b5d9ff / orange → #ffe0c3 / teal → #d0f1f1
Icon         : 32×32px, object-fit contain
Label        : 16px / 400 / 24px / #272b32, two lines
Arrow icon   : 20×20px, bottom-right aligned

Breakpoint ≤360px : cards stack vertically (flex-direction column in parent)
```

---

### `QuickActions`

**File:** `src/components/QuickActions/QuickActions.jsx`  
**Props:** `actions: QUICK_ACTIONS[]`  
**Figma node:** `9:836`

Section wrapper for the three `ActionCard` tiles.

```
Layout       : flex column, gap 8px, padding 8px 16px 32px
Title        : "Quick actions" — 20px / 600 / 32px / #272b32
List         : flex row, gap 4px
```

---

### Bottom Sheet Pattern

All bottom sheets share the same animation and interaction contract:

**Mount animation:** `requestAnimationFrame(() => setVisible(true))` triggers CSS transitions after the first paint, avoiding a flicker where the sheet would appear already open.

**Dismiss animation:** `setVisible(false)` triggers the slide-down CSS transition; `setTimeout(onClose, 280)` unmounts after the transition completes.

**Scroll lock:** `document.body.style.overflow = 'hidden'` while the sheet is mounted; cleared in the `useEffect` cleanup.

**Backdrop click:** clicking the overlay calls `handleClose`. `e.stopPropagation()` on the sheet prevents backdrop-click from firing when the user taps inside the sheet.

```css
/* Overlay */
position: fixed; inset: 0; z-index: 200;
background: rgba(0,0,0,0) → rgba(0,0,0,0.4) on --open;
transition: background 0.28s ease;
pointer-events: none → auto on --open;

/* Sheet */
border-radius: 32px 32px 0 0;
padding: 32px 20px 20px;
max-height: 92vh; overflow-y: auto;
transform: translateY(100%) → translateY(0) on --open;
transition: transform 0.28s ease;

/* Responsive max-width */
<600px  : 100%
≥600px  : 520px
≥1024px : 684px
```

**Close button:** 32×32px, `background: none; border: none`. Inner path span uses `position: absolute; inset: 16.25%` to position the X icon within its box.

---

### `VoucherDetailSheet`

**File:** `src/components/VoucherDetailSheet/VoucherDetailSheet.jsx`  
**Props:** `voucher: VOUCHERS[n]`, `onClose: () => void`  
**Figma node:** `17-2883`

Bottom sheet opened when a user taps a voucher row on the Home page.

```
Header         : flex, justify-content flex-end
                 Close button (32×32px)

Title section  : centered, voucher.name
                 24px / 600 / 32px / #272b32

Hint           : "Show this code at the cashier in any store."
                 12px / 400 / 16px / #656f80, centered

Voucher code card
  Container    : background #f4faff, border 1px solid #7586e5, border-radius 6px, padding 0 12px
  Top section  : flex column, align-items center, padding 8px 0, border-bottom 1px solid #f0f1f3
    Label      : "Voucher code" — 12px / 400 / 16px / #272b32
    Code       : voucher.code — 20px / 600 / 32px / #272b32, letter-spacing 0.5px
  Bottom section: flex, justify-content center, padding 8px 0
    Expiry     : voucher.expiry (with 'Exp.' replaced by 'Expires') — 12px / 400 / 16px / #272b32

Details card
  Container    : border 1px solid #dcdfe4, border-radius 6px, padding 8px 12px
  Row (Status) : flex, space-between; value = green pill badge (#1c8459, white, 0 12px padding)
  Row (Cost)   : flex, space-between; value = voucher.cost
  Row (Redeemed date) : flex, space-between; value = voucher.redeemedDate
  Row font     : 14px / 400 / 20px / #272b32

Close button   : full-width pill, background white, border 1px solid #dcdfe4
                 14px / 600 / 20px / #4b61dc, border-radius 999px, padding 12px 16px
```

---

### `VoucherItem`

**File:** `src/components/VoucherItem/VoucherItem.jsx`  
**Props:** `name`, `code`, `expiry`, `thumb`, `thumbStyle: { width, height, top, left }`, `onClick?: () => void`  
**Figma nodes:** `12:895`, `12:973`

Single voucher row. Thumbnail uses absolute positioning to implement Figma's precise crop (the image overflows the container; the container clips it).

```
Layout       : flex row, align-items center, gap 12px, padding 12px
Background   : white, border 1px #dcdfe4, border-radius 6px
Hover        : background #fafbfc

Thumb        : 56×56px, border-radius 6px, overflow hidden, position relative
Thumb img    : position absolute, max-width none (crop via thumbStyle)

Name         : 16px / 600 / 24px / #272b32
Meta row     : flex, gap 8px, font 14px / 400 / 20px / #656f80
Dot separator: 2×2px circle, #656f80
```

---

### `VoucherSection`

**File:** `src/components/VoucherSection/VoucherSection.jsx`  
**Props:** `vouchers: VOUCHERS[]`, `onSelect?: (voucher) => void`  
**Figma node:** `12:892`

Section wrapper for the voucher list. Renders a header row with a "View all" link.

```
Layout         : flex column, gap 8px, padding 8px 16px 32px
Title          : "Your vouchers" — 20px / 600 / 32px / #272b32
View all link  : 14px / 400 / 20px / #4b61dc, hover underline
List           : flex column, gap 8px
```

---

### `RewardDetailSheet`

**File:** `src/components/RewardDetailSheet/RewardDetailSheet.jsx`  
**Props:** `reward: REDEEM_REWARDS.rewards[n]`, `onClose: () => void`  
**Figma nodes:** `17-2807` (detail), `17-2837` (success)

Bottom sheet opened when a user taps a reward row on the Redeem Rewards page. Has two internal states toggled by `redeemed: boolean`.

#### Detail state (`redeemed = false`)

```
Header         : flex, space-between
  Left col     : reward.name (24px / 600 / 32px / #272b32)
                 reward.category (14px / 400 / 20px / #656f80)
  Right        : Close button (32×32px)

Thumbnail      : 201×200px (or matching aspect), border-radius 12px, overflow hidden, centered
  thumbStyle   : absolute-positioned crop (same as RewardRow)
  no thumbStyle: object-fit cover

Description    : reward.description — 14px / 400 / 24px / #272b32, left-aligned, width 100%

Terms          : "TERMS" label — 12px / 600 / 16px / #656f80, uppercase
                 disc list — 12px / 400 / 20px / #272b32, padding-left 18px

Pricing card
  Container    : border 1px solid #dcdfe4, border-radius 6px, padding 0 12px
  Cost row     : flex, space-between, padding 8px 0, border-bottom 1px solid #f0f1f3
    Label      : "Cost" — 16px / 400 / 24px / #272b32
    Value      : reward.points — 16px / 600 / 24px / #272b32
  Balance rows : flex column, padding 8px 0
    Your balance: user points (formatted) — 14px / 400 / 20px / #272b32
    After redeem: balance minus cost, same style

Redeem CTA     : full-width pill, background #4b61dc, white text
                 14px / 600 / 20px, border-radius 999px, padding 12px 16px
```

Points math: `parsePts(str)` strips non-digits; `formatPts(n)` formats with dot thousands separator (`1205 → "1.205pts"`).

#### Success state (`redeemed = true`)

```
Header         : flex, justify-content flex-end
                 Close button (32×32px)

Done icon      : 80×80px span, inset 6.25% inner path, centered

Title section  : flex column, align-items center
  "Redeemed"   : 14px / 400 / 24px / #272b32
  reward.name  : 24px / 600 / 32px / #272b32

Hint           : "Show this code at the cashier in any store." — 12px / 400 / 16px / #656f80, centered

Voucher code card (same spec as VoucherDetailSheet code card)
  Background   : #f4faff, border 1px solid #7586e5
  Code         : reward.voucherCode — 20px / 600 / 32px
  Expiry       : reward.voucherExpiry — 12px / 400 / 16px

Button group   : flex, gap 16px
  "All vouchers" : secondary pill — white bg, border #dcdfe4, color #4b61dc
  "Done"         : primary pill — bg #4b61dc, white text
```

---

### `StepList`

**File:** `src/components/StepList/StepList.jsx`  
**Props:** `title: string`, `steps: Array<{ id, parts: [{ bold, text }] }>`  
**Figma node:** `14:1447`

Numbered step list used on the Earn Points page. The `parts` array enables mixed bold/regular inline text within a single step.

```
Title       : 20px / 600 / 32px / #272b32, margin-bottom 8px
List        : ol, list-style none, flex column
Step row    : flex, align-items flex-start, gap 12px, padding 8px 0
Badge       : 24×24px circle, bg #272b32, white 14px / 400 / 24px, text-align center
Text        : 14px / 400 / 24px / #272b32
Bold spans  : font-weight 600
```

---

## Pages

### Home (`/`)

**File:** `src/pages/Home/Home.jsx`

Component stack (top to bottom):

```
Header
PointsCard
QuickActions
VoucherSection   ← onSelect={setSelectedVoucher}
Footer
VoucherDetailSheet (mounted when selectedVoucher !== null)
```

No stage card — content flows directly in the shell. Tapping a voucher sets `selectedVoucher` state, which mounts `VoucherDetailSheet`; closing it resets state to `null`.

---

### Earn Points (`/earn-points`)

**File:** `src/pages/EarnPoints/EarnPointsPage.jsx`

Uses the **stage card pattern**.

```
Header
└─ Container (padding 0 16px)
   └─ Stage (white, border-radius 8px, overflow hidden)
      ├─ BackNav               ← background #f4faff
      ├─ Hero section          ← background #f4faff, padding 16px, gap 8px
      │    h1 "Earn points with every purchase"
      │    p  "No complicated rules…"
      └─ Content (padding 16px, gap 24px between sections)
           ├─ Section: "How it works"
           │    StepList (3 steps with bold/regular inline text)
           └─ Section: "Redeem points for rewards"
                intro text
                StepList (4 plain-text steps)
                WarningBanner (mixed bold/regular)
Footer
```

---

### Points History (`/points-history`)

**File:** `src/pages/PointsHistory/PointsHistoryPage.jsx`

Uses the **stage card pattern**.

```
Header
└─ Container (padding 0 16px)
   └─ Stage (white, border-radius 8px, overflow hidden)
      ├─ BackNav               ← background #f4faff
      ├─ Hero section          ← background #f4faff, padding 16px, gap 8px
      │    h1 "Points history"
      │    p  "Total points: 1,250 pts"
      └─ Content (padding 16px)
           └─ TransactionGroup[] (grouped by month)
                Month label     : 12px / 600 / 16px / #656f80, uppercase
                TransactionRow[] :
                  Title         : 14px / 600 / 20px / #272b32
                  Meta row      : date · location, 14px / 400 / 20px / #656f80, gap 8px
                  Points        : 14px / 600 / 20px / #272b32 (positive)
                                  color #e5443a (negative, i.e. starts with '−')
                  Divider       : 1px solid #f0f1f3 (all rows except last in group)
Footer
```

**Negative points rule:** any `points` string starting with `'-'` renders in `#e5443a`.

---

### Redeem Rewards (`/redeem-rewards`)

**File:** `src/pages/RedeemRewards/RedeemRewardsPage.jsx`

Uses the **stage card pattern**. Has interactive state (search + filter + selected reward).

```
Header
└─ Container (padding 0 16px)
   └─ Stage (white, border-radius 8px, overflow hidden)
      ├─ BackNav               ← background #f4faff
      ├─ Hero section          ← background #f4faff, padding 16px, gap 8px
      │    h1 "Redeem rewards"
      │    p  "Total points: 1,250 pts"
      └─ Content (padding 16px, gap 24px)
           ├─ Filter section (gap 12px)
           │    Search input      (see Search Bar spec below)
           │    Filter chips row  (see Filter Chips spec below)
           └─ Reward list
                RewardRow[] (see Reward Row spec below)
Footer
RewardDetailSheet (mounted when selected !== null)
```

Tapping a reward row sets `selected` state; `RewardDetailSheet` handles both the detail and success states internally.

---

### Vouchers (`/vouchers`)

**File:** `src/pages/Vouchers/VouchersPage.jsx`

Uses the **stage card pattern**. Accessible via "View all" on Home.

```
Header
└─ Container (padding 0 16px)
   └─ Stage (white, border-radius 8px, overflow hidden)
      ├─ BackNav ("Your vouchers", to="/")
      └─ Content (padding 16px, gap 24px)
           ├─ Group: ACTIVE
           │    label: "ACTIVE" — 12px / 600 / 16px / #656f80, uppercase
           │    VoucherItem[] (clickable, opens VoucherDetailSheet)
           └─ Group: EXPIRED
                label: "EXPIRED" — same style
                VoucherItem[] (faded — opacity 0.55, opens VoucherDetailSheet)
Footer
VoucherDetailSheet (mounted when selectedVoucher !== null)
```

Items are split by `voucher.status === 'Expired'`. Expired items render with the `faded` prop on `VoucherItem`.

---

#### Search Bar

```
Layout      : flex, align-items center, gap 8px, padding 8px 12px
Border      : 1px solid rgba(29,31,36,0.16)
Radius      : 999px (full pill)
Background  : white

Icon wrapper: 20×20px, overflow hidden
Icon inset  : absolute, inset 6.25%

Input       : flex 1, border none, outline none, background transparent
              14px / 400 / 20px / #272b32
Placeholder : color #8690a2
```

Filtering: live, case-insensitive, matches reward `name`. Combines with the active category filter.

#### Filter Chips

```
Row         : flex, gap 8px, overflow-x auto, scrollbar hidden
Chip        : padding 4px 12px, border-radius 999px, border none, cursor pointer
              14px / 400 / 20px

Active      : background #4c5460, color white
Inactive    : background #f0f1f3, color #272b32
```

Filters: All, Coffee, Matcha, Breakfast, Bento, Merch, Discount.

#### Reward Row

```
Layout      : flex, align-items flex-start, gap 12px, padding 12px 0
Divider     : border-bottom 1px solid #f0f1f3 (all rows except last)
Overflow    : hidden

Thumbnail   : 40×40px, border-radius 6px, overflow hidden
  object-cover   → img fills container with object-fit cover
  thumbStyle set → img uses absolute positioning for precise Figma crop

Name        : 14px / 600 / 20px
  Unlocked  : color #272b32
  Locked    : color #4c5460

Meta row    : flex, align-items center, gap 8px
  Category  : 12px / 400 / 16px / #656f80
  Lock badge: 10px / 600 / 12px / white, background #4c5460
              padding 2px 4px, border-radius 999px
              text "Unlock at platinum+"

Points      : 14px / 600 / 20px, white-space nowrap, flex-shrink 0
  Unlocked  : color #272b32
  Locked    : color #4c5460
```

**Locked state:** applies to items requiring a higher tier. Name, points, and category text shift to `#4c5460`; a dark pill badge appears next to the category.

---

## Asset Notes

Image assets are currently served from the Figma CDN (temporary URLs, **7-day TTL**). Before production:

1. Export all assets from Figma as optimised PNG or SVG
2. Add them to `src/assets/`
3. Update keys in `src/data/loyalty.js` `IMAGES` object
4. Remove Figma CDN URLs entirely

Icon paths (chevron, warning, search, avatar) are vector paths exported as small PNGs. They use an inner `position: absolute` span with `inset` percentages to correctly position the path within its 20×20px overflow-hidden container, exactly matching the Figma bounding box.
