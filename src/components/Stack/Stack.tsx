import React from 'react'
import styled from 'styled-components'

export type GapScale = 0 | 1 | 2 | 3 | 4 | 5

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'vertical' (vstack) or 'horizontal' (hstack). */
  direction?: 'vertical' | 'horizontal'
  /** Spacing-scale gap (0–5), maps to the theme spacing scale. */
  gap?: GapScale
  as?: React.ElementType
}

const StyledStack = styled.div<{ $direction: 'vertical' | 'horizontal'; $gap: GapScale }>`
  display: flex;
  flex-direction: ${(p) => (p.$direction === 'horizontal' ? 'row' : 'column')};
  ${(p) => (p.$direction === 'horizontal' ? 'align-items: center;' : 'justify-content: flex-start;')}
  gap: ${(p) => p.theme.spacing[p.$gap]};
`

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'vertical', gap = 0, ...rest }, ref) => (
    <StyledStack ref={ref} $direction={direction} $gap={gap} {...rest} />
  ),
)
Stack.displayName = 'Stack'
