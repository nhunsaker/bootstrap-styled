import styled from 'styled-components'

// Bootstrap 5.3.8 figure helpers (verified against parity/oracle/bootstrap.min.css):
// `.figure`, `.figure-img`, `.figure-caption`.

/** `.figure` — an inline-block wrapper for an image + caption. */
export const Figure = styled.figure`
  display: inline-block;
`

/**
 * `.figure-img` — the image inside a figure. Bootstrap layers `.img-fluid`
 * onto figure images too; apply the `<Image fluid>` component (or `img-fluid`)
 * for the responsive behavior. This element adds the figure-specific spacing.
 */
export const FigureImage = styled.img`
  margin-bottom: 0.5rem;
  line-height: 1;
`

/** `.figure-caption` — the muted caption below a figure image. */
export const FigureCaption = styled.figcaption`
  font-size: 0.875em;
  color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
`
