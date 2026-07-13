import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Background color; text + links use the contrast color. */
  variant?: ColorName
  as?: React.ElementType
}

const StyledNavbar = styled.nav<{ $variant?: ColorName }>`
  /* Bootstrap 5.3.8 .navbar box-model tokens (runtime-overridable). */
  --bs-navbar-padding-y: 0.5rem;
  --bs-navbar-padding-x: 0;
  --bs-navbar-brand-padding-y: 0.3125rem;
  --bs-navbar-brand-margin-end: 1rem;
  --bs-navbar-brand-font-size: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);
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
  /* Bootstrap 5.3.8 .navbar-brand: py 0.3125rem, mr 1rem, fs 1.25rem, weight 400. */
  padding-top: var(--bs-navbar-brand-padding-y, 0.3125rem);
  padding-bottom: var(--bs-navbar-brand-padding-y, 0.3125rem);
  margin-right: var(--bs-navbar-brand-margin-end, 1rem);
  font-size: var(--bs-navbar-brand-font-size, 1.25rem);
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
`
