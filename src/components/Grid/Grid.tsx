import React from 'react'
import styled from 'styled-components'

// ── Container ─────────────────────────────────────────────────────────────────
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean
  as?: React.ElementType
}

const StyledContainer = styled.div<{ $fluid?: boolean }>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  ${(p) =>
    p.$fluid
      ? ''
      : `
    @media (min-width: 576px)  { max-width: 540px; }
    @media (min-width: 768px)  { max-width: 720px; }
    @media (min-width: 992px)  { max-width: 960px; }
    @media (min-width: 1200px) { max-width: 1140px; }
    @media (min-width: 1400px) { max-width: 1320px; }
  `}
`

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ fluid, ...rest }, ref) => <StyledContainer ref={ref} $fluid={fluid} {...rest} />,
)
Container.displayName = 'Container'

// ── Row ───────────────────────────────────────────────────────────────────────
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

// --bs-gutter-x is a custom property → it inherits, so Cols read the Row's value.
const StyledRow = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
`

export const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => (
  <StyledRow ref={ref} {...props} />
))
Row.displayName = 'Row'

// ── Col ─────────────────────────────────────────────────────────────────────
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpan
  sm?: ColSpan
  md?: ColSpan
  lg?: ColSpan
  xl?: ColSpan
  as?: React.ElementType
}

const pct = (n: ColSpan) => `${((n / 12) * 100).toFixed(6).replace(/\.?0+$/, '')}%`
const at = (min: number, n?: ColSpan) =>
  n ? `@media (min-width: ${min}px) { flex: 0 0 auto; width: ${pct(n)}; }` : ''

const StyledCol = styled.div<{
  $span?: ColSpan
  $sm?: ColSpan
  $md?: ColSpan
  $lg?: ColSpan
  $xl?: ColSpan
}>`
  box-sizing: border-box;
  flex-shrink: 0;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  margin-top: var(--bs-gutter-y, 0);
  flex: 1 0 0%;
  ${(p) => (p.$span ? `flex: 0 0 auto; width: ${pct(p.$span)};` : '')}
  ${(p) => at(576, p.$sm)}
  ${(p) => at(768, p.$md)}
  ${(p) => at(992, p.$lg)}
  ${(p) => at(1200, p.$xl)}
`

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ span, sm, md, lg, xl, ...rest }, ref) => (
    <StyledCol ref={ref} $span={span} $sm={sm} $md={md} $lg={lg} $xl={xl} {...rest} />
  ),
)
Col.displayName = 'Col'
