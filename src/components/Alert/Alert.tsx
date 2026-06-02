import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ColorName
  as?: React.ElementType
}

// BS5.3 derives alert colors from -subtle/-emphasis tokens; we don't model those
// yet, so derive a soft fill + readable text from the base color via color-mix —
// which keeps it tracking runtime overrides.
const StyledAlert = styled.div<{ $variant: ColorName }>`
  ${(p) => `
    --bs-alert-bg: color-mix(in srgb, var(--bs-${p.$variant}) 12%, var(--bs-body-bg));
    --bs-alert-border-color: color-mix(in srgb, var(--bs-${p.$variant}) 30%, var(--bs-body-bg));
    --bs-alert-color: color-mix(in srgb, var(--bs-${p.$variant}) 75%, #000);
  `}
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: 1px solid var(--bs-alert-border-color);
  border-radius: var(--bs-border-radius);
`

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'primary', role = 'alert', ...rest }, ref) => (
    <StyledAlert ref={ref} $variant={variant} role={role} {...rest} />
  ),
)
Alert.displayName = 'Alert'
