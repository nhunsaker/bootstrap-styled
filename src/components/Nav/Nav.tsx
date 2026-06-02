import React from 'react'
import styled from 'styled-components'

export const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`

export const NavItem = styled.li``

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  disabled?: boolean
  as?: React.ElementType
}

const StyledNavLink = styled.a<{ $active?: boolean; $disabled?: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${(p) => (p.$active ? 'var(--bs-body-color)' : 'var(--bs-link-color)')};
  ${(p) => (p.$active ? 'font-weight: 600;' : '')}
  transition: color 0.15s ease-in-out;
  &:hover {
    color: var(--bs-link-hover-color);
  }
  ${(p) =>
    p.$disabled
      ? 'color: var(--bs-secondary); pointer-events: none; cursor: default;'
      : ''}
`

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active, disabled, ...rest }, ref) => (
    <StyledNavLink
      ref={ref}
      $active={active}
      $disabled={disabled}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  ),
)
NavLink.displayName = 'NavLink'
