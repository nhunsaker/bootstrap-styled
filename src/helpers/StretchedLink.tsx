import React from 'react'
import styled from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 stretched-link helper.
//   .stretched-link::after {
//     position: absolute; top: 0; right: 0; bottom: 0; left: 0;
//     z-index: 1; content: "";
//   }
// Makes a nested link's clickable area cover its nearest positioned ancestor.
const StyledStretchedLink = styled.a`
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: '';
  }
`

export interface StretchedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Defaults to `<a>`. */
  as?: React.ElementType
}

/**
 * Expands a link's hit area to fill its nearest positioned ancestor via an
 * absolute `::after` overlay — the `.stretched-link` helper. Renders an `<a>`
 * by default and inlines the exact oracle rule.
 */
export const StretchedLink = React.forwardRef<HTMLAnchorElement, StretchedLinkProps>(
  ({ className, ...rest }, ref) => (
    <StyledStretchedLink ref={ref} className={cx('stretched-link', className)} {...rest} />
  ),
)
StretchedLink.displayName = 'StretchedLink'
