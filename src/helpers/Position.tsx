import React from 'react'
import styled, { css } from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 positioning helpers.
//   .fixed-top    { position: fixed; top: 0; right: 0; left: 0; z-index: 1030 }
//   .fixed-bottom { position: fixed; right: 0; bottom: 0; left: 0; z-index: 1030 }
//   .sticky-top   { position: sticky; top: 0; z-index: 1020 }
//   .sticky-bottom{ position: sticky; bottom: 0; z-index: 1020 }
//   .sticky-{bp}-top / -bottom — same, wrapped in a min-width media query.
//   .translate-middle   { transform: translate(-50%, -50%) !important }
//   .translate-middle-x { transform: translateX(-50%) !important }
//   .translate-middle-y { transform: translateY(-50%) !important }
//   .position-absolute  { position: absolute !important }
//   .top-0/-50/-100     { top: 0 / 50% / 100% !important }  (start = left, etc.)
// Values transcribed verbatim from the oracle.

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

// Oracle grid breakpoint minimums.
const BP_MIN: Record<Breakpoint, string> = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}

/* --------------------------------- fixed --------------------------------- */

const StyledFixedTop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
`

const StyledFixedBottom = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
`

export interface PositionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export const FixedTop = React.forwardRef<HTMLDivElement, PositionProps>(
  ({ className, ...rest }, ref) => (
    <StyledFixedTop ref={ref} className={cx('fixed-top', className)} {...rest} />
  ),
)
FixedTop.displayName = 'FixedTop'

export const FixedBottom = React.forwardRef<HTMLDivElement, PositionProps>(
  ({ className, ...rest }, ref) => (
    <StyledFixedBottom ref={ref} className={cx('fixed-bottom', className)} {...rest} />
  ),
)
FixedBottom.displayName = 'FixedBottom'

/* --------------------------------- sticky -------------------------------- */

const stickyBody = (edge: 'top' | 'bottom') => css`
  position: -webkit-sticky;
  position: sticky;
  ${edge}: 0;
  z-index: 1020;
`

const StyledSticky = styled.div<{ $edge: 'top' | 'bottom'; $bp: Breakpoint | null }>`
  ${(p) =>
    p.$bp
      ? css`
          @media (min-width: ${BP_MIN[p.$bp]}) {
            ${stickyBody(p.$edge)}
          }
        `
      : stickyBody(p.$edge)}
`

export interface StickyProps extends PositionProps {
  /** Apply the sticky behavior only at/above this breakpoint (`.sticky-{bp}-top`). */
  breakpoint?: Breakpoint
}

export const StickyTop = React.forwardRef<HTMLDivElement, StickyProps>(
  ({ breakpoint, className, ...rest }, ref) => (
    <StyledSticky
      ref={ref}
      $edge="top"
      $bp={breakpoint ?? null}
      className={cx(breakpoint ? `sticky-${breakpoint}-top` : 'sticky-top', className)}
      {...rest}
    />
  ),
)
StickyTop.displayName = 'StickyTop'

export const StickyBottom = React.forwardRef<HTMLDivElement, StickyProps>(
  ({ breakpoint, className, ...rest }, ref) => (
    <StyledSticky
      ref={ref}
      $edge="bottom"
      $bp={breakpoint ?? null}
      className={cx(breakpoint ? `sticky-${breakpoint}-bottom` : 'sticky-bottom', className)}
      {...rest}
    />
  ),
)
StickyBottom.displayName = 'StickyBottom'

/* ----------------------------- translate-middle ---------------------------- */

export type Edge = 0 | 50 | 100

const EDGE_VALUE: Record<Edge, string> = {
  0: '0',
  50: '50%',
  100: '100%',
}

const StyledTranslateMiddle = styled.div<{
  $axis: 'both' | 'x' | 'y'
  $absolute: boolean
  $top: Edge | null
  $start: Edge | null
  $bottom: Edge | null
  $end: Edge | null
}>`
  ${(p) => p.$absolute && css`
    position: absolute !important;
  `}
  ${(p) => p.$top != null && css`top: ${EDGE_VALUE[p.$top]} !important;`}
  ${(p) => p.$start != null && css`left: ${EDGE_VALUE[p.$start]} !important;`}
  ${(p) => p.$bottom != null && css`bottom: ${EDGE_VALUE[p.$bottom]} !important;`}
  ${(p) => p.$end != null && css`right: ${EDGE_VALUE[p.$end]} !important;`}
  transform: ${(p) =>
    p.$axis === 'x'
      ? 'translateX(-50%)'
      : p.$axis === 'y'
        ? 'translateY(-50%)'
        : 'translate(-50%, -50%)'} !important;
`

export interface TranslateMiddleProps extends React.HTMLAttributes<HTMLElement> {
  /** Which axis to center on. Defaults to `'both'`. */
  axis?: 'both' | 'x' | 'y'
  /** Add `.position-absolute` (for the absolute-centering pattern). */
  absolute?: boolean
  /** `.top-{0|50|100}` edge offset. */
  top?: Edge
  /** `.start-{0|50|100}` (left) edge offset. */
  start?: Edge
  /** `.bottom-{0|50|100}` edge offset. */
  bottom?: Edge
  /** `.end-{0|50|100}` (right) edge offset. */
  end?: Edge
  as?: React.ElementType
}

/**
 * The Bootstrap centering helper. On its own it emits `.translate-middle`
 * (or `-x`/`-y`) and the matching transform. Combine `absolute` + `top`/`start`
 * to reproduce the classic `.position-absolute .top-0 .start-0 .translate-middle`
 * absolute-centering pattern. All values are inlined verbatim from the oracle.
 */
export const TranslateMiddle = React.forwardRef<HTMLDivElement, TranslateMiddleProps>(
  ({ axis = 'both', absolute = false, top, start, bottom, end, className, ...rest }, ref) => (
    <StyledTranslateMiddle
      ref={ref}
      $axis={axis}
      $absolute={absolute}
      $top={top ?? null}
      $start={start ?? null}
      $bottom={bottom ?? null}
      $end={end ?? null}
      className={cx(
        axis === 'x'
          ? 'translate-middle-x'
          : axis === 'y'
            ? 'translate-middle-y'
            : 'translate-middle',
        absolute && 'position-absolute',
        top != null && `top-${top}`,
        start != null && `start-${start}`,
        bottom != null && `bottom-${bottom}`,
        end != null && `end-${end}`,
        className,
      )}
      {...rest}
    />
  ),
)
TranslateMiddle.displayName = 'TranslateMiddle'
