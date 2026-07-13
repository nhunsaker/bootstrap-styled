import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'
import { defaultTheme } from '../../theme/defaultTheme'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ColorName
  as?: React.ElementType
}

// Bootstrap 5.3's .alert-<variant> consumes the -text-emphasis / -bg-subtle /
// -border-subtle token trio (NOT a runtime color-mix). We read those `--bs-*`
// vars — so a live token override re-shades the alert — with the exact 5.3.8
// defaults as fallbacks (verified against parity/oracle/bootstrap.min.css) for
// use without the Provider.
const variantVars = (v: ColorName): string => {
  const d = defaultTheme.colorTokens[v]
  return `
    --bs-alert-color: var(--bs-${v}-text-emphasis, ${d.emphasis});
    --bs-alert-bg: var(--bs-${v}-bg-subtle, ${d.bgSubtle});
    --bs-alert-border-color: var(--bs-${v}-border-subtle, ${d.borderSubtle});
    --bs-alert-link-color: var(--bs-${v}-text-emphasis, ${d.emphasis});
  `
}

const StyledAlert = styled.div<{ $variant: ColorName }>`
  ${(p) => variantVars(p.$variant)}
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  line-height: var(--bs-body-line-height, 1.5);
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: var(--bs-border-width, 1px) solid var(--bs-alert-border-color);
  border-radius: var(--bs-border-radius);

  .alert-link {
    font-weight: 700;
    color: var(--bs-alert-link-color);
  }
`

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'primary', role = 'alert', ...rest }, ref) => (
    <StyledAlert ref={ref} $variant={variant} role={role} {...rest} />
  ),
)
Alert.displayName = 'Alert'
