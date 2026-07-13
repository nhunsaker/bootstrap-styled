import React from 'react'
import styled, { keyframes, css } from 'styled-components'

export type PlaceholderSize = 'xs' | 'sm' | 'lg'

export interface PlaceholderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Bootstrap `.placeholder-xs/-sm/-lg` — min-height of the shimmer bar. */
  size?: PlaceholderSize
  /** Grid column width (1–12) → `width: (col / 12) * 100%`, like `.col-{n}`. */
  col?: number
  as?: React.ElementType
}

const sizeMinHeight = (s?: PlaceholderSize): string =>
  s === 'xs' ? '0.6em' : s === 'sm' ? '0.8em' : s === 'lg' ? '1.2em' : '1em'

// Bootstrap 5.3.8 `.placeholder`.
const StyledPlaceholder = styled.span<{ $size?: PlaceholderSize; $col?: number }>`
  display: inline-block;
  min-height: ${(p) => sizeMinHeight(p.$size)};
  vertical-align: middle;
  cursor: wait;
  background-color: currentcolor;
  opacity: 0.5;
  ${(p) => (p.$col != null ? `width: ${(p.$col / 12) * 100}%;` : '')}
`

export const Placeholder = React.forwardRef<HTMLSpanElement, PlaceholderProps>(
  ({ size, col, ...rest }, ref) => (
    <StyledPlaceholder ref={ref} $size={size} $col={col} {...rest} />
  ),
)
Placeholder.displayName = 'Placeholder'

// --- Animations ------------------------------------------------------------

const glow = keyframes`
  50% { opacity: 0.2; }
`

const wave = keyframes`
  100% {
    -webkit-mask-position: -200% 0%;
    mask-position: -200% 0%;
  }
`

export interface PlaceholderAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

// `.placeholder-glow` — animate opacity of the placeholders inside it. We target
// the Placeholder styled component directly (component selector) since our
// placeholders carry a generated class, not a literal `.placeholder`.
export const PlaceholderGlow = styled.div`
  & ${StyledPlaceholder} {
    animation: ${glow} 2s ease-in-out infinite;
  }
`

// `.placeholder-wave` — the wrapper itself carries the masked shimmer sweep.
export const PlaceholderWave = styled.div`
  ${css`
    -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
    mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    animation: ${wave} 2s linear infinite;
  `}
`
