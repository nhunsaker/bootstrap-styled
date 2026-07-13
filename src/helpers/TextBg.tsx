import React from 'react'
import styled from 'styled-components'
import { cx } from './cx'
import { THEME_COLOR_RGB, TEXT_BG_CONTRAST, type ThemeColor } from './colors'

// Bootstrap 5.3.8 color & background helper.
//   .text-bg-{color} {
//     color: #fff | #000 !important;
//     background-color: RGBA(var(--bs-{color}-rgb), var(--bs-bg-opacity, 1)) !important;
//   }
// The contrast color (#fff/#000) and the RGB triple are transcribed verbatim
// from the oracle. `--bs-bg-opacity` is honored (default 1) so callers can dim
// the background with a utility/style override just like Bootstrap.
const StyledTextBg = styled.div<{ $color: ThemeColor }>`
  color: ${(p) => TEXT_BG_CONTRAST[p.$color]} !important;
  background-color: rgba(${(p) => THEME_COLOR_RGB[p.$color]}, var(--bs-bg-opacity, 1)) !important;
`

export interface TextBgProps extends React.HTMLAttributes<HTMLElement> {
  /** One of the eight theme colors. Sets the background + a legible text color. */
  color: ThemeColor
  as?: React.ElementType
}

/**
 * Sets a theme-color background with an accessible contrasting text color —
 * the `.text-bg-{color}` helper. Emits the matching class and inlines the exact
 * oracle values.
 */
export const TextBg = React.forwardRef<HTMLDivElement, TextBgProps>(
  ({ color, className, ...rest }, ref) => (
    <StyledTextBg ref={ref} $color={color} className={cx(`text-bg-${color}`, className)} {...rest} />
  ),
)
TextBg.displayName = 'TextBg'
