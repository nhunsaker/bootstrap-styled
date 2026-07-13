import React from 'react'
import styled, { css } from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 visually-hidden helpers.
//   .visually-hidden,
//   .visually-hidden-focusable:not(:focus):not(:focus-within) {
//     width: 1px !important; height: 1px !important; padding: 0 !important;
//     margin: -1px !important; overflow: hidden !important;
//     clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important;
//     border: 0 !important;
//   }
//   .visually-hidden-focusable:not(:focus):not(:focus-within):not(caption),
//   .visually-hidden:not(caption) { position: absolute !important }
//   .visually-hidden *,
//   .visually-hidden-focusable:not(:focus):not(:focus-within) * { overflow: hidden !important }
// Values transcribed verbatim from the oracle.

const clip = css`
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`

const StyledVisuallyHidden = styled.span<{ $focusable: boolean }>`
  ${(p) =>
    p.$focusable
      ? css`
          &:not(:focus):not(:focus-within) {
            ${clip}
          }
          &:not(:focus):not(:focus-within):not(caption) {
            position: absolute !important;
          }
          &:not(:focus):not(:focus-within) * {
            overflow: hidden !important;
          }
        `
      : css`
          ${clip}
          &:not(caption) {
            position: absolute !important;
          }
          & * {
            overflow: hidden !important;
          }
        `}
`

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLElement>,
    Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'download'> {
  /**
   * Reveal the content when it receives focus (`.visually-hidden-focusable`),
   * e.g. skip-links. Defaults to always-hidden (`.visually-hidden`).
   */
  focusable?: boolean
  /** Defaults to `<span>`. */
  as?: React.ElementType
}

/**
 * Hides content visually while keeping it available to assistive tech — the
 * `.visually-hidden` / `.visually-hidden-focusable` helpers. Inlines the exact
 * oracle clip pattern.
 */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ focusable = false, className, ...rest }, ref) => (
    <StyledVisuallyHidden
      ref={ref}
      $focusable={focusable}
      className={cx(focusable ? 'visually-hidden-focusable' : 'visually-hidden', className)}
      {...rest}
    />
  ),
)
VisuallyHidden.displayName = 'VisuallyHidden'
