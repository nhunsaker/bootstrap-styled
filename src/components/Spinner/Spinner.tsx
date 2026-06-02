import React from 'react'
import styled, { keyframes } from 'styled-components'
import type { ColorName } from '../../theme/types'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ColorName
  size?: 'sm'
  as?: React.ElementType
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const StyledSpinner = styled.div<{ $variant?: ColorName; $size?: 'sm' }>`
  display: inline-block;
  vertical-align: -0.125em;
  width: ${(p) => (p.$size === 'sm' ? '1rem' : '2rem')};
  height: ${(p) => (p.$size === 'sm' ? '1rem' : '2rem')};
  color: ${(p) => (p.$variant ? `var(--bs-${p.$variant})` : 'currentColor')};
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite ${spin};
`

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant, size, role = 'status', ...rest }, ref) => (
    <StyledSpinner ref={ref} $variant={variant} $size={size} role={role} {...rest} />
  ),
)
Spinner.displayName = 'Spinner'
