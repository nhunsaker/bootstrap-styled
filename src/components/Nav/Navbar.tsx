import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Background color; text + links use the contrast color. */
  variant?: ColorName
  as?: React.ElementType
}

const StyledNavbar = styled.nav<{ $variant?: ColorName }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 1rem;
  ${(p) =>
    p.$variant
      ? `
    background-color: var(--bs-${p.$variant});
    color: var(--bs-${p.$variant}-contrast);
    a { color: var(--bs-${p.$variant}-contrast); }
  `
      : ''}
`

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ variant, ...rest }, ref) => <StyledNavbar ref={ref} $variant={variant} {...rest} />,
)
Navbar.displayName = 'Navbar'

export const NavbarBrand = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
`
