import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export const Progress = styled.div`
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: color-mix(in srgb, var(--bs-body-color) 10%, var(--bs-body-bg));
  border-radius: var(--bs-border-radius);
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
  color: var(--bs-${(p) => p.$variant}-contrast);
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
