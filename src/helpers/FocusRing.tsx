import React from 'react'
import styled, { css } from 'styled-components'
import { cx } from './cx'
import { THEME_COLOR_RGB, type ThemeColor } from './colors'

// Bootstrap 5.3.8 focus-ring helper.
//   .focus-ring:focus {
//     outline: 0;
//     box-shadow: var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0)
//                 var(--bs-focus-ring-blur, 0) var(--bs-focus-ring-width)
//                 var(--bs-focus-ring-color);
//   }
//   .focus-ring-{color} {
//     --bs-focus-ring-color: rgba(var(--bs-{color}-rgb), var(--bs-focus-ring-opacity));
//   }
// Oracle `:root` defaults: --bs-focus-ring-width: 0.25rem; --bs-focus-ring-opacity: 0.25;
// --bs-focus-ring-color: rgba(13, 110, 253, 0.25). Those defaults are inlined as
// fallbacks so the ring renders without Bootstrap's `:root` block.
const StyledFocusRing = styled.div<{ $rgb: string | null }>`
  ${(p) =>
    p.$rgb &&
    css`
      --bs-focus-ring-color: rgba(${p.$rgb}, var(--bs-focus-ring-opacity, 0.25));
    `}

  &:focus {
    outline: 0;
    box-shadow: var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0)
      var(--bs-focus-ring-blur, 0) var(--bs-focus-ring-width, 0.25rem)
      var(--bs-focus-ring-color, rgba(13, 110, 253, 0.25));
  }
`

export interface FocusRingProps
  extends React.HTMLAttributes<HTMLElement>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'download'> {
  /**
   * Optional theme color for the ring (the `.focus-ring-{color}` variant).
   * Omit for the default primary ring.
   */
  color?: ThemeColor
  /** Defaults to `<div>`; usually rendered as an `<a>` or `<button>`. */
  as?: React.ElementType
}

/**
 * Adds a Bootstrap focus ring (box-shadow) on `:focus`. Emits `.focus-ring`
 * (plus `.focus-ring-{color}` when a color is given) and inlines the exact
 * oracle box-shadow with the `:root` defaults as fallbacks.
 */
export const FocusRing = React.forwardRef<HTMLDivElement, FocusRingProps>(
  ({ color, className, ...rest }, ref) => (
    <StyledFocusRing
      ref={ref}
      $rgb={color ? THEME_COLOR_RGB[color] : null}
      className={cx('focus-ring', color && `focus-ring-${color}`, className)}
      {...rest}
    />
  ),
)
FocusRing.displayName = 'FocusRing'
