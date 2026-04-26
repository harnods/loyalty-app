import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

function css(relPath) {
  return readFileSync(resolve(__dirname, '../..', relPath), 'utf8')
}

// Returns the declarations block for the first matching simple selector.
// selector is a plain CSS selector string like '.shell' or '.ep__container'.
function extractRule(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`)
  const m = source.match(re)
  return m ? m[1] : null
}

// Returns the value of a property within a declarations block string.
function prop(block, property) {
  if (!block) return null
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(?:^|;|\\s)${escaped}\\s*:\\s*([^;]+)`)
  const m = block.match(re)
  return m ? m[1].trim() : null
}

// Checks that a padding shorthand has zero horizontal (left/right) values.
function assertNoHorizontalPadding(block) {
  const p = prop(block, 'padding')
  if (p) {
    const parts = p.split(/\s+/)
    if (parts.length === 1) expect(parts[0]).toBe('0')
    if (parts.length === 2) expect(parts[1]).toBe('0')
    if (parts.length === 3) expect(parts[1]).toBe('0')
    if (parts.length === 4) {
      expect(parts[1]).toBe('0') // right
      expect(parts[3]).toBe('0') // left
    }
  }
  expect(prop(block, 'padding-left')).toBeNull()
  expect(prop(block, 'padding-right')).toBeNull()
}

// ─── Shell ────────────────────────────────────────────────────────────────────

describe('Shell (.shell) — App.css', () => {
  const src = css('src/App.css')
  const block = extractRule(src, '.shell')

  it('is full width', () => {
    expect(prop(block, 'width')).toBe('100%')
  })

  it('is centered via margin auto', () => {
    expect(prop(block, 'margin')).toBe('0 auto')
  })

  it('has 16px horizontal padding (gutter lives here, not in sections)', () => {
    expect(prop(block, 'padding')).toBe('0 16px')
  })

  it('does not set max-width at base mobile breakpoint', () => {
    expect(prop(block, 'max-width')).toBeNull()
  })
})

// ─── Body ─────────────────────────────────────────────────────────────────────

describe('Body — index.css', () => {
  const src = css('src/index.css')
  const block = extractRule(src, 'body')

  it('does not use flex centering (causes shell width to be content-sized)', () => {
    expect(prop(block, 'display')).not.toBe('flex')
  })
})

// ─── Header ───────────────────────────────────────────────────────────────────

describe('Header (.header) — no horizontal padding', () => {
  const src = css('src/components/Header/Header.css')
  const block = extractRule(src, '.header')

  it('has no horizontal padding', () => {
    assertNoHorizontalPadding(block)
  })
})

// ─── Section components — no horizontal padding ───────────────────────────────

describe('Section components — no horizontal padding', () => {
  const cases = [
    ['PointsCard (.points-section)', 'src/components/PointsCard/PointsCard.css', '.points-section'],
    ['QuickActions (.quick-actions)', 'src/components/QuickActions/QuickActions.css', '.quick-actions'],
    ['VoucherSection (.voucher-section)', 'src/components/VoucherSection/VoucherSection.css', '.voucher-section'],
  ]

  for (const [label, file, selector] of cases) {
    it(`${label}`, () => {
      const block = extractRule(css(file), selector)
      assertNoHorizontalPadding(block)
    })
  }
})

// ─── Page containers — no horizontal padding (shell provides it) ──────────────

describe('Page containers — no horizontal padding', () => {
  const cases = [
    ['EarnPoints (.ep__container)', 'src/pages/EarnPoints/EarnPointsPage.css', '.ep__container'],
    ['PointsHistory (.ph__container)', 'src/pages/PointsHistory/PointsHistoryPage.css', '.ph__container'],
    ['RedeemRewards (.rr__container)', 'src/pages/RedeemRewards/RedeemRewardsPage.css', '.rr__container'],
    ['Vouchers (.vp-container)', 'src/pages/Vouchers/VouchersPage.css', '.vp-container'],
  ]

  for (const [label, file, selector] of cases) {
    it(`${label}`, () => {
      const block = extractRule(css(file), selector)
      assertNoHorizontalPadding(block)
    })
  }
})

// ─── Auth wrapper — no horizontal padding ─────────────────────────────────────

describe('Auth (.auth-wrapper) — no horizontal padding', () => {
  const src = css('src/pages/Auth/auth.css')
  const block = extractRule(src, '.auth-wrapper')

  it('has no horizontal padding', () => {
    assertNoHorizontalPadding(block)
  })
})

// ─── Breakpoints ──────────────────────────────────────────────────────────────

describe('Shell breakpoints', () => {
  const src = css('src/App.css')

  it('tablet ≥600px sets max-width: 520px', () => {
    expect(src).toMatch(/min-width:\s*600px[\s\S]*?max-width:\s*520px/)
  })

  it('desktop ≥1024px sets fixed width to 684px', () => {
    expect(src).toMatch(/min-width:\s*1024px[\s\S]*?min-width:\s*684px/)
    expect(src).toMatch(/min-width:\s*1024px[\s\S]*?max-width:\s*684px/)
  })
})
