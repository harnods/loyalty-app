# Design Reference

## Figma Source

| Asset | Link |
|---|---|
| **Main file** | [Qontak — Loyalty Portal](https://www.figma.com/design/03DgfOGS2jmnhk51R8BVMl/Qontak---Loyalty-Portal?node-id=3-346) |
| **Frame** | `node-id: 3-346` |

> All visual decisions defer to the Figma source. When there's a conflict between this document and Figma, **Figma wins**.

---

## Design Tokens

### Color

| Token | Value | Usage |
|---|---|---|
| `background-base` | `#F7F8F9` | App background |
| `text-default` | `#272B32` | Primary text |
| `text-secondary` | `#656F80` | Captions, meta |
| `text-link` | `#4B61DC` | Interactive links |
| `border-default` | `#DCDFE4` | Card borders |
| `action-blue` | `#B5D9FF` | Earn points card |
| `action-orange` | `#FFE0C3` | Redeem rewards card |
| `action-teal` | `#D0F1F1` | Points history card |
| `tier-platinum` | `#000000` | Platinum badge text |

### Spacing

| Token | Value |
|---|---|
| `space-3xs` | `4px` |
| `space-xs` | `8px` |
| `space-sm` | `12px` |
| `space-md` | `16px` |
| `space-lg` | `20px` |
| `space-xl` | `24px` |
| `space-2xl` | `32px` |

### Typography

| Style | Family | Weight | Size | Line Height |
|---|---|---|---|---|
| Heading H2 | Inter | 600 | 20px | 32px |
| Heading H3 | Inter | 600 | 16px | 24px |
| Points value | Inter | 700 | 32px | 1 |
| Label semibold | Inter | 600 | 14px | 20px |
| Label regular | Inter | 400 | 14px | 20px |
| Caption | Inter | 400 | 12px | 16px |

### Border Radius

| Token | Value |
|---|---|
| `radii-sm` | `4px` |
| `radii-md` | `6px` |
| `radii-xl` | `12px` |
| `radii-full` | `999px` |

### Elevation

| Token | Value |
|---|---|
| `elevation-m` | `0 20px 25px rgba(0,0,0,.10), 0 10px 10px rgba(0,0,0,.04)` |

---

## Component Inventory

| Component | Node ID | Description |
|---|---|---|
| `Header` | `3:517` | Logo + avatar row |
| `PointsCard` | `3:792` | Total points summary with hero illustration |
| `ActionCard` | `9:838–842` | Quick action tile (earn / redeem / history) |
| `QuickActions` | `9:836` | Section containing 3 `ActionCard` tiles |
| `VoucherItem` | `12:895, 12:973` | Single voucher row |
| `VoucherSection` | `12:892` | Section with header + voucher list |
| `Footer` | `12:1057` | Powered-by attribution |
| `BackNav` | `14:1441` | Back button with chevron — bg `#f4faff`, padding `12px 8px`, gap `12px` |
| `StepList` | `14:1447` | Numbered step list with mixed bold/regular inline text |
| `WarningBanner` | `14:1456` | Warning callout — bg `#fdf6dd`, border-radius `6px`, padding `12px 16px`, gap `12px` |

---

## Earn Points Page (node `14-1438`)

### Stage Card

```
background      : #f4faff
border-radius   : 8px
overflow        : hidden
margin          : 0 16px
```

### BackNav

```
background      : #f4faff
padding         : 12px 8px
gap             : 12px
icon            : chevron-left 20×20px
label font      : 14px / 400 / 20px line-height / #272b32
```

### Page Hero

```
background      : #f4faff
padding         : 16px
gap             : 8px
h1 font         : 24px / 600 / 32px / letter-spacing -0.2px / #000000
body font       : 14px / 400 / 24px / #272b32
```

### Content Area

```
padding         : 16px
gap             : 24px   (between StepList and WarningBanner)
```

### StepList

```
title font      : 20px / 600 / 32px / #272b32
badge           : 24×24px / bg #272b32 / border-radius 999px / white 14px/400/24px
step row        : padding 8px 0 / gap 12px (badge → text)
text bold part  : 14px / 600
text regular    : 14px / 400
line-height     : 24px
```

### WarningBanner

```
background      : #fdf6dd
border-radius   : 6px
padding         : 12px 16px
gap             : 12px
icon            : warning 20×20px / margin-top 2px
text font       : 14px / 400 / 20px / #272b32
```

---

## Layout

```
Shell max-width
  Mobile   (<600px)  : 100% fluid
  Tablet   (≥600px)  : 520px
  Desktop  (≥1024px) : 684px — fixed (min = max)

Gutter : 16px (left + right)
```

---

## Background Gradient

The decorative gradient lives on `body::before` so it bleeds to full viewport width and is never clipped by the shell container. It is centered to the upper-right to keep the logo area on a clean background.

```css
background: radial-gradient(
  ellipse 75% 90% at 72% -15%,
  #7fcadd 0%, #a5daeb 18%, #bfe8f3 30%,
  rgba(195,235,244,0.4) 48%, transparent 65%
);
```

---

## Asset Notes

Image assets are currently served from the Figma CDN (temporary URLs, 7-day TTL). Before production these must be:

1. Exported from Figma as optimised PNG/SVG
2. Added to `src/assets/`
3. Updated in `src/data/loyalty.js`
