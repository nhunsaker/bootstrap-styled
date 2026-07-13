import React from 'react'
import styled, { css } from 'styled-components'

// Bootstrap 5.3.8 image helpers (verified against parity/oracle/bootstrap.min.css):
// `.img-fluid`, `.img-thumbnail`, and the `.rounded` helper.

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** `.img-fluid` — max-width: 100%; height: auto (responsive). */
  fluid?: boolean
  /** `.img-thumbnail` — bordered, padded, rounded thumbnail frame. */
  thumbnail?: boolean
  /** `.rounded` — rounded corners. */
  rounded?: boolean
}

const StyledImage = styled.img<{
  $fluid?: boolean
  $thumbnail?: boolean
  $rounded?: boolean
}>`
  ${(p) =>
    p.$fluid &&
    css`
      max-width: 100%;
      height: auto;
    `}
  ${(p) =>
    p.$thumbnail &&
    css`
      padding: 0.25rem;
      background-color: var(--bs-body-bg, #fff);
      border: var(--bs-border-width, 1px) solid var(--bs-border-color, #dee2e6);
      border-radius: var(--bs-border-radius, 0.375rem);
      max-width: 100%;
      height: auto;
    `}
  ${(p) =>
    p.$rounded &&
    css`
      border-radius: var(--bs-border-radius, 0.375rem);
    `}
`

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ fluid, thumbnail, rounded, ...rest }, ref) => (
    <StyledImage ref={ref} $fluid={fluid} $thumbnail={thumbnail} $rounded={rounded} {...rest} />
  ),
)
Image.displayName = 'Image'
