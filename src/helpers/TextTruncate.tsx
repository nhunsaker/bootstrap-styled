import React from 'react'
import styled from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 text-truncation helper.
//   .text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
// Note: as in Bootstrap, single-line truncation only clips when the element is
// block/inline-block with a constrained width.
const StyledTextTruncate = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export interface TextTruncateProps extends React.HTMLAttributes<HTMLElement> {
  /** Defaults to `<div>` (e.g. use `as="span"` for inline truncation). */
  as?: React.ElementType
}

/**
 * Truncates overflowing single-line text with an ellipsis — the
 * `.text-truncate` helper. Inlines the exact oracle rule.
 */
export const TextTruncate = React.forwardRef<HTMLDivElement, TextTruncateProps>(
  ({ className, ...rest }, ref) => (
    <StyledTextTruncate ref={ref} className={cx('text-truncate', className)} {...rest} />
  ),
)
TextTruncate.displayName = 'TextTruncate'
