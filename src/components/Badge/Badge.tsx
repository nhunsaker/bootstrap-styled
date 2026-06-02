import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ColorName
  /** Fully rounded (rounded-pill). */
  pill?: boolean
  as?: React.ElementType
}

const StyledBadge = styled.span<{ $variant: ColorName; $pill?: boolean }>`
  ${(p) => `
    --bs-badge-bg: var(--bs-${p.$variant});
    --bs-badge-color: var(--bs-${p.$variant}-contrast);
  `}
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: var(--bs-font-weight-bold, 700);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  color: var(--bs-badge-color);
  background-color: var(--bs-badge-bg);
  border-radius: ${(p) => (p.$pill ? 'var(--bs-border-radius-pill)' : 'var(--bs-border-radius)')};
`

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', pill, ...rest }, ref) => (
    <StyledBadge ref={ref} $variant={variant} $pill={pill} {...rest} />
  ),
)
Badge.displayName = 'Badge'
