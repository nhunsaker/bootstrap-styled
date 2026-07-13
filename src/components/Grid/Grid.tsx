import React from 'react'
import styled from 'styled-components'

// ── Shared breakpoint model (Bootstrap 5.3.8) ─────────────────────────────────
// The five responsive breakpoints above the `xs` (0) base. `xxl` (1400px) was
// added in Bootstrap 5. Values are exact min-widths from the oracle.
const BREAKPOINTS = [
  ['sm', 576],
  ['md', 768],
  ['lg', 992],
  ['xl', 1200],
  ['xxl', 1400],
] as const

type Breakpoint = (typeof BREAKPOINTS)[number][0]

// Exact percentage strings as emitted by Bootstrap's compiled CSS, so the
// generated rules are byte-for-byte identical to the oracle (n/12 * 100%).
const COL_PCT: Record<number, string> = {
  1: '8.33333333%',
  2: '16.66666667%',
  3: '25%',
  4: '33.33333333%',
  5: '41.66666667%',
  6: '50%',
  7: '58.33333333%',
  8: '66.66666667%',
  9: '75%',
  10: '83.33333333%',
  11: '91.66666667%',
  12: '100%',
}

// row-cols widths (1 / n): 1→100% … 6→16.66666667%
const ROW_COLS_PCT: Record<number, string> = {
  1: '100%',
  2: '50%',
  3: '33.33333333%',
  4: '25%',
  5: '20%',
  6: '16.66666667%',
}

// Gutter scale → --bs-gutter value (Bootstrap $spacers 0–5).
const GUTTER: Record<number, string> = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
}

const minWidth = (bp: Breakpoint) =>
  BREAKPOINTS.find(([name]) => name === bp)![1]

/** Wrap a body of declarations in the breakpoint's min-width media query. */
const mq = (bp: Breakpoint, body: string) =>
  body ? `@media (min-width: ${minWidth(bp)}px) { ${body} }` : ''

// ── Container ─────────────────────────────────────────────────────────────────
// Responsive max-widths per breakpoint min-width (exact oracle values).
const CONTAINER_MAX: Array<[Breakpoint, number, number]> = [
  ['sm', 576, 540],
  ['md', 768, 720],
  ['lg', 992, 960],
  ['xl', 1200, 1140],
  ['xxl', 1400, 1320],
]

export type ContainerBreakpoint = Breakpoint

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `.container-fluid` — full width at every breakpoint. */
  fluid?: boolean
  /**
   * Responsive container: `.container-{sm|md|lg|xl|xxl}` — 100% wide until the
   * chosen breakpoint, then max-width-constrained. Ignored when `fluid`.
   */
  breakpoint?: ContainerBreakpoint
  as?: React.ElementType
}

const containerMaxWidths = (fluid?: boolean, breakpoint?: ContainerBreakpoint) => {
  if (fluid) return ''
  // Default `.container` == `.container-sm` behaviour (constrains from sm up).
  const from = minWidth(breakpoint ?? 'sm')
  return CONTAINER_MAX.filter(([, min]) => min >= from)
    .map(([, min, max]) => `@media (min-width: ${min}px) { max-width: ${max}px; }`)
    .join('\n')
}

const StyledContainer = styled.div<{
  $fluid?: boolean
  $breakpoint?: ContainerBreakpoint
}>`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
  ${(p) => containerMaxWidths(p.$fluid, p.$breakpoint)}
`

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ fluid, breakpoint, ...rest }, ref) => (
    <StyledContainer ref={ref} $fluid={fluid} $breakpoint={breakpoint} {...rest} />
  ),
)
Container.displayName = 'Container'

// ── Row ───────────────────────────────────────────────────────────────────────
export type GutterScale = 0 | 1 | 2 | 3 | 4 | 5
export type RowColsValue = 'auto' | 1 | 2 | 3 | 4 | 5 | 6

/** Responsive props: `sm`..`xxl` variants of a base prop, keyed by capitalised bp. */
type Responsive<T> = Partial<Record<Breakpoint, T>>

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `.row-cols-*` — number of equal-width columns per row (base). */
  cols?: RowColsValue
  /** Responsive `.row-cols-{bp}-*`. */
  colsSm?: RowColsValue
  colsMd?: RowColsValue
  colsLg?: RowColsValue
  colsXl?: RowColsValue
  colsXxl?: RowColsValue
  /** `.g-*` — horizontal + vertical gutter (base). */
  g?: GutterScale
  gSm?: GutterScale
  gMd?: GutterScale
  gLg?: GutterScale
  gXl?: GutterScale
  gXxl?: GutterScale
  /** `.gx-*` — horizontal gutter only. */
  gx?: GutterScale
  gxSm?: GutterScale
  gxMd?: GutterScale
  gxLg?: GutterScale
  gxXl?: GutterScale
  gxXxl?: GutterScale
  /** `.gy-*` — vertical gutter only. */
  gy?: GutterScale
  gySm?: GutterScale
  gyMd?: GutterScale
  gyLg?: GutterScale
  gyXl?: GutterScale
  gyXxl?: GutterScale
  as?: React.ElementType
}

// `&&` doubles the row's class specificity (0,2,0) so the row-cols child-width
// rule reliably beats a bare <Col>'s own base `flex:1 0 0` (0,1,0) regardless of
// stylesheet injection order — mirroring Bootstrap's source-order win of
// `.row-cols-*>*` over `.col`.
const rowColsCss = (v?: RowColsValue) =>
  v === undefined
    ? ''
    : v === 'auto'
      ? `&& > * { flex: 0 0 auto; width: auto; }`
      : `&& > * { flex: 0 0 auto; width: ${ROW_COLS_PCT[v]}; }`

// gutter custom-property assignments (they inherit → cols read them)
const gxCss = (v?: GutterScale) => (v === undefined ? '' : `--bs-gutter-x: ${GUTTER[v]};`)
const gyCss = (v?: GutterScale) => (v === undefined ? '' : `--bs-gutter-y: ${GUTTER[v]};`)
const gCss = (v?: GutterScale) => (v === undefined ? '' : gxCss(v) + gyCss(v))

const StyledRow = styled.div<{
  $cols: WithXs<RowColsValue>
  $g: WithXs<GutterScale>
  $gx: WithXs<GutterScale>
  $gy: WithXs<GutterScale>
}>`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));

  /* --- gutters (custom props inherit to child cols) --- */
  ${(p) => gCss(p.$g.xs)}
  ${(p) => gxCss(p.$gx.xs)}
  ${(p) => gyCss(p.$gy.xs)}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, gCss(p.$g[bp]))).join('\n')}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, gxCss(p.$gx[bp]))).join('\n')}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, gyCss(p.$gy[bp]))).join('\n')}

  /* --- row-cols --- */
  ${(p) => rowColsCss(p.$cols.xs)}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, rowColsCss(p.$cols[bp]))).join('\n')}
`

// `xs` is our internal key for the un-suffixed (base) value.
type WithXs<T> = Responsive<T> & { xs?: T }

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    {
      cols,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      colsXxl,
      g,
      gSm,
      gMd,
      gLg,
      gXl,
      gXxl,
      gx,
      gxSm,
      gxMd,
      gxLg,
      gxXl,
      gxXxl,
      gy,
      gySm,
      gyMd,
      gyLg,
      gyXl,
      gyXxl,
      ...rest
    },
    ref,
  ) => {
    const $cols: WithXs<RowColsValue> = { xs: cols, sm: colsSm, md: colsMd, lg: colsLg, xl: colsXl, xxl: colsXxl }
    const $g: WithXs<GutterScale> = { xs: g, sm: gSm, md: gMd, lg: gLg, xl: gXl, xxl: gXxl }
    const $gx: WithXs<GutterScale> = { xs: gx, sm: gxSm, md: gxMd, lg: gxLg, xl: gxXl, xxl: gxXxl }
    const $gy: WithXs<GutterScale> = { xs: gy, sm: gySm, md: gyMd, lg: gyLg, xl: gyXl, xxl: gyXxl }
    return <StyledRow ref={ref} $cols={$cols} $g={$g} $gx={$gx} $gy={$gy} {...rest} />
  },
)
Row.displayName = 'Row'

// ── Col ─────────────────────────────────────────────────────────────────────
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
/** `true` → equal-width `.col`/`.col-{bp}`; `'auto'` → shrink-to-content. */
export type ColValue = ColSpan | 'auto' | boolean
export type OffsetSpan = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type OrderValue = 'first' | 'last' | 0 | 1 | 2 | 3 | 4 | 5

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column span: 1–12, `'auto'`, or `true` for equal-width (base). */
  span?: ColValue
  sm?: ColValue
  md?: ColValue
  lg?: ColValue
  xl?: ColValue
  xxl?: ColValue
  /** `.offset-*` — push the column right by N/12 (base). */
  offset?: OffsetSpan
  offsetSm?: OffsetSpan
  offsetMd?: OffsetSpan
  offsetLg?: OffsetSpan
  offsetXl?: OffsetSpan
  offsetXxl?: OffsetSpan
  /** `.order-*` — flex order; `'first'` (-1) / `'last'` (6) / 0–5 (base). */
  order?: OrderValue
  orderSm?: OrderValue
  orderMd?: OrderValue
  orderLg?: OrderValue
  orderXl?: OrderValue
  orderXxl?: OrderValue
  as?: React.ElementType
}

const colCss = (v?: ColValue) => {
  if (v === undefined || v === false) return ''
  // Bare / equal-width column: `.col` / `.col-{bp}` → flex: 1 0 0
  if (v === true) return `flex: 1 0 0%;`
  if (v === 'auto') return `flex: 0 0 auto; width: auto;`
  return `flex: 0 0 auto; width: ${COL_PCT[v]};`
}

const offsetCss = (v?: OffsetSpan) =>
  v === undefined ? '' : `margin-left: ${v === 0 ? '0' : COL_PCT[v]};`

const orderCss = (v?: OrderValue) => {
  if (v === undefined) return ''
  const n = v === 'first' ? -1 : v === 'last' ? 6 : v
  return `order: ${n} !important;`
}

const StyledCol = styled.div<{
  $span: WithXs<ColValue>
  $offset: WithXs<OffsetSpan>
  $order: WithXs<OrderValue>
}>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);

  /* Base flex. A bare Col (no span at any breakpoint) is an equal-width
     col (flex: 1 0 0). A responsive-only col (e.g. md=6) has NO base col
     rule -- it stacks full-width (width:100% above) until its breakpoint. */
  ${(p) =>
    p.$span.xs !== undefined
      ? colCss(p.$span.xs)
      : BREAKPOINTS.some(([bp]) => p.$span[bp] !== undefined)
        ? ''
        : 'flex: 1 0 0%;'}
  ${(p) => offsetCss(p.$offset.xs)}
  ${(p) => orderCss(p.$order.xs)}

  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, colCss(p.$span[bp]))).join('\n')}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, offsetCss(p.$offset[bp]))).join('\n')}
  ${(p) => BREAKPOINTS.map(([bp]) => mq(bp, orderCss(p.$order[bp]))).join('\n')}
`

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  (
    {
      span,
      sm,
      md,
      lg,
      xl,
      xxl,
      offset,
      offsetSm,
      offsetMd,
      offsetLg,
      offsetXl,
      offsetXxl,
      order,
      orderSm,
      orderMd,
      orderLg,
      orderXl,
      orderXxl,
      ...rest
    },
    ref,
  ) => {
    const $span: WithXs<ColValue> = { xs: span, sm, md, lg, xl, xxl }
    const $offset: WithXs<OffsetSpan> = {
      xs: offset,
      sm: offsetSm,
      md: offsetMd,
      lg: offsetLg,
      xl: offsetXl,
      xxl: offsetXxl,
    }
    const $order: WithXs<OrderValue> = {
      xs: order,
      sm: orderSm,
      md: orderMd,
      lg: orderLg,
      xl: orderXl,
      xxl: orderXxl,
    }
    return <StyledCol ref={ref} $span={$span} $offset={$offset} $order={$order} {...rest} />
  },
)
Col.displayName = 'Col'
