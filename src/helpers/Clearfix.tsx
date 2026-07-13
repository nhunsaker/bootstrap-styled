import React from 'react'
import styled from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 `.clearfix` helper.
//   .clearfix::after { display: block; clear: both; content: "" }
const StyledClearfix = styled.div`
  &::after {
    display: block;
    clear: both;
    content: '';
  }
`

export interface ClearfixProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. `'section'`). Defaults to `<div>`. */
  as?: React.ElementType
}

/**
 * Clears floated children by rendering an empty block `::after`. Emits the
 * `.clearfix` class and inlines the exact oracle rule so it works standalone.
 */
export const Clearfix = React.forwardRef<HTMLDivElement, ClearfixProps>(
  ({ className, ...rest }, ref) => (
    <StyledClearfix ref={ref} className={cx('clearfix', className)} {...rest} />
  ),
)
Clearfix.displayName = 'Clearfix'
