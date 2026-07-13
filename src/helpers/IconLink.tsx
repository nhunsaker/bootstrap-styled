import React from 'react'
import styled, { css } from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 icon-link helper.
//   .icon-link {
//     display: inline-flex; gap: .375rem; align-items: center;
//     text-decoration-color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 0.5));
//     text-underline-offset: 0.25em; backface-visibility: hidden;
//   }
//   .icon-link > .bi {
//     flex-shrink: 0; width: 1em; height: 1em; fill: currentcolor;
//     transition: .2s ease-in-out transform;
//   }
//   @media (prefers-reduced-motion: reduce) { .icon-link > .bi { transition: none } }
//   .icon-link-hover:focus-visible > .bi, .icon-link-hover:hover > .bi {
//     transform: var(--bs-icon-link-transform, translate3d(.25em, 0, 0));
//   }
// Oracle `:root`: --bs-link-color-rgb: 13,110,253 (inlined as fallback).
// This helper does NOT import the Icon component — it styles the `.bi` slot;
// pass an icon (any node carrying the `.bi` class) plus text as children.
const StyledIconLink = styled.a<{ $hover: boolean }>`
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  -webkit-text-decoration-color: rgba(var(--bs-link-color-rgb, 13, 110, 253), var(--bs-link-opacity, 0.5));
  text-decoration-color: rgba(var(--bs-link-color-rgb, 13, 110, 253), var(--bs-link-opacity, 0.5));
  text-underline-offset: 0.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  & > .bi {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    fill: currentcolor;
    transition: 0.2s ease-in-out transform;
  }

  @media (prefers-reduced-motion: reduce) {
    & > .bi {
      transition: none;
    }
  }

  ${(p) =>
    p.$hover &&
    css`
      &:focus-visible > .bi,
      &:hover > .bi {
        transform: var(--bs-icon-link-transform, translate3d(0.25em, 0, 0));
      }
    `}
`

export interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Animate the `.bi` icon on hover/focus (`.icon-link-hover`). */
  hover?: boolean
  /** Defaults to `<a>`. */
  as?: React.ElementType
}

/**
 * Aligns an icon + text link with the exact Bootstrap `.icon-link` spacing and
 * underline treatment. Renders an `<a>` by default. Pass the icon (carrying the
 * `.bi` class) and the label as children.
 */
export const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  ({ hover = false, className, ...rest }, ref) => (
    <StyledIconLink
      ref={ref}
      $hover={hover}
      className={cx('icon-link', hover && 'icon-link-hover', className)}
      {...rest}
    />
  ),
)
IconLink.displayName = 'IconLink'
