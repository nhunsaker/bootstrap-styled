import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

// Bootstrap 5.3 .progress: track bg = the body-secondary bg token (#e9ecef),
// with the inset box-shadow. Bars are always white text on the variant color.
export const Progress = styled.div`
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: var(--bs-secondary-bg, #e9ecef);
  border-radius: var(--bs-border-radius);
  box-shadow: var(--bs-box-shadow-inset, inset 0 1px 2px rgba(0, 0, 0, 0.075));
`

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  now?: number
  variant?: ColorName
}

const StyledBar = styled.div<{ $now: number; $variant: ColorName }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  color: #fff;
  background-color: var(--bs-${(p) => p.$variant});
  width: ${(p) => Math.max(0, Math.min(100, p.$now))}%;
  transition: width 0.6s ease;
`

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ now = 0, variant = 'primary', children, ...rest }, ref) => (
    <StyledBar
      ref={ref}
      $now={now}
      $variant={variant}
      role="progressbar"
      aria-valuenow={now}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      {children}
    </StyledBar>
  ),
)
ProgressBar.displayName = 'ProgressBar'
