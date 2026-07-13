import React from 'react'
import styled from 'styled-components'

// Small form scaffolding pieces (labels, help text, groups) + the form-layout
// helpers (row / col / col-form-label). Values are exact from the 5.3.8 oracle.

// `.form-label { margin-bottom:.5rem }` — Bootstrap labels carry no weight/color
// of their own (they inherit body).
export const FormLabel = styled.label`
  margin-bottom: 0.5rem;
`

// `.form-text { margin-top:.25rem;font-size:.875em;color:var(--bs-secondary-color) }`
export const FormText = styled.small`
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
`

/** Vertical spacing wrapper (≈ Bootstrap's `mb-3` grouping). */
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`

// ── Form layout: row / col / col-form-label ──────────────────────────────────
// Mirrors Bootstrap's grid the way Grid.tsx does: the row assigns the gutter
// custom properties (which inherit) + negative margins; each column reads them
// for its own padding. Self-contained so a form layout needs nothing else.

const GUTTER: Record<number, string> = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
}

// n/12 widths, exact strings as emitted by the oracle.
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

export type GutterScale = 0 | 1 | 2 | 3 | 4 | 5
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type RowAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'

const ALIGN: Record<RowAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
}

export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `.gx-*` — horizontal gutter between columns (0–5). Default 3 (1.5rem). */
  gx?: GutterScale
  /** `.gy-*` — vertical gutter between wrapped rows (0–5). Default 0. */
  gy?: GutterScale
  /** Cross-axis alignment — `center` gives a classic horizontal form. */
  align?: RowAlign
}

// `.row { --bs-gutter-x:1.5rem;--bs-gutter-y:0;display:flex;flex-wrap:wrap;
//   margin-top:calc(-1 * var(--bs-gutter-y));margin-right/left:calc(-.5 * var(--bs-gutter-x)) }`
const StyledRow = styled.div<{ $gx?: GutterScale; $gy?: GutterScale; $align?: RowAlign }>`
  --bs-gutter-x: ${(p) => (p.$gx !== undefined ? GUTTER[p.$gx] : '1.5rem')};
  --bs-gutter-y: ${(p) => (p.$gy !== undefined ? GUTTER[p.$gy] : '0')};
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  ${(p) => (p.$align ? `align-items: ${ALIGN[p.$align]};` : '')}
`

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ gx, gy, align, ...rest }, ref) => (
    <StyledRow ref={ref} $gx={gx} $gy={gy} $align={align} {...rest} />
  ),
)
FormRow.displayName = 'FormRow'

export interface FormColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column span at the base breakpoint: 1–12, `'auto'`, or `true` (equal-width). */
  span?: ColSpan | 'auto' | true
  /** Column span at ≥576px (the usual horizontal-form breakpoint). */
  sm?: ColSpan | 'auto'
}

const spanCss = (v?: ColSpan | 'auto' | true) => {
  if (v === undefined) return ''
  if (v === true) return 'flex: 1 0 0%;'
  if (v === 'auto') return 'flex: 0 0 auto; width: auto;'
  return `flex: 0 0 auto; width: ${COL_PCT[v]};`
}

// Reads the row's inherited `--bs-gutter-x` for its side padding (matching how
// Grid.tsx's Col resolves gutters), so FormCol + FormRow compose without extra
// wiring. A bare FormCol is an equal-width column.
const StyledCol = styled.div<{ $span?: ColSpan | 'auto' | true; $sm?: ColSpan | 'auto' }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  margin-top: var(--bs-gutter-y, 0);
  ${(p) => (p.$span !== undefined ? spanCss(p.$span) : p.$sm !== undefined ? '' : 'flex: 1 0 0%;')}
  ${(p) => (p.$sm !== undefined ? `@media (min-width: 576px) { ${spanCss(p.$sm)} }` : '')}
`

export const FormCol = React.forwardRef<HTMLDivElement, FormColProps>(
  ({ span, sm, ...rest }, ref) => <StyledCol ref={ref} $span={span} $sm={sm} {...rest} />,
)
FormCol.displayName = 'FormCol'

export type ColFormLabelSize = 'sm' | 'lg'

export interface ColFormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Match the paired control's size so vertical padding lines the label up. */
  size?: ColFormLabelSize
  /** Column span at ≥576px, e.g. `sm={2}` → `col-sm-2 col-form-label`. */
  sm?: ColSpan | 'auto'
}

// `.col-form-label { padding-top:calc(.375rem + var(--bs-border-width));
//   padding-bottom:calc(.375rem + var(--bs-border-width));margin-bottom:0;
//   font-size:inherit;line-height:1.5 }`
// `.col-form-label-lg { padding:calc(.5rem + bw); font-size:1.25rem }`
// `.col-form-label-sm { padding:calc(.25rem + bw); font-size:.875rem }`
const colFormLabelPad = (s?: ColFormLabelSize) =>
  s === 'lg' ? '0.5rem' : s === 'sm' ? '0.25rem' : '0.375rem'
const colFormLabelFont = (s?: ColFormLabelSize) =>
  s === 'lg' ? '1.25rem' : s === 'sm' ? '0.875rem' : 'inherit'

const StyledColFormLabel = styled.label<{ $size?: ColFormLabelSize; $sm?: ColSpan | 'auto' }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-top: calc(${(p) => colFormLabelPad(p.$size)} + var(--bs-border-width, 1px));
  padding-bottom: calc(${(p) => colFormLabelPad(p.$size)} + var(--bs-border-width, 1px));
  margin-top: var(--bs-gutter-y, 0);
  margin-bottom: 0;
  font-size: ${(p) => colFormLabelFont(p.$size)};
  line-height: 1.5;
  ${(p) => (p.$sm !== undefined ? `@media (min-width: 576px) { ${spanCss(p.$sm)} }` : '')}
`

export const ColFormLabel = React.forwardRef<HTMLLabelElement, ColFormLabelProps>(
  ({ size, sm, ...rest }, ref) => (
    <StyledColFormLabel ref={ref} $size={size} $sm={sm} {...rest} />
  ),
)
ColFormLabel.displayName = 'ColFormLabel'
