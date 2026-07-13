import React from 'react'
import styled from 'styled-components'
import { cx } from './cx'

// Bootstrap 5.3.8 vertical-rule helper.
//   .vr {
//     display: inline-block; align-self: stretch;
//     width: var(--bs-border-width); min-height: 1em;
//     background-color: currentcolor; opacity: .25;
//   }
// Oracle `:root`: --bs-border-width: 1px (inlined as the fallback).
const StyledVr = styled.div`
  display: inline-block;
  align-self: stretch;
  width: var(--bs-border-width, 1px);
  min-height: 1em;
  background-color: currentcolor;
  opacity: 0.25;
`

export interface VrProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

/**
 * A vertical divider — the `.vr` helper. Stretches to the height of a flex
 * parent (or shows `min-height: 1em`). Inlines the exact oracle rule.
 */
export const Vr = React.forwardRef<HTMLDivElement, VrProps>(({ className, ...rest }, ref) => (
  <StyledVr ref={ref} className={cx('vr', className)} {...rest} />
))
Vr.displayName = 'Vr'
