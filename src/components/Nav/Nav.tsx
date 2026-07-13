import React from 'react'
import styled from 'styled-components'

export type NavVariant = 'tabs' | 'pills'

export interface NavProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Style variant → Bootstrap `.nav-tabs` (bordered tabs) / `.nav-pills` (filled active pill). */
  variant?: NavVariant
  /** `.nav-fill` — items grow to fill the width, proportional to their content. */
  fill?: boolean
  /** `.nav-justified` — items grow to fill the width, all equal. */
  justified?: boolean
  as?: React.ElementType
}

const StyledNav = styled.ul<{ $variant?: NavVariant; $fill?: boolean; $justified?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0; /* zero the default <ul> margin so nav items align with siblings */
  list-style: none;

  ${(p) =>
    p.$variant === 'tabs'
      ? `
    border-bottom: var(--bs-border-width, 1px) solid var(--bs-border-color);
    & > li > a {
      margin-bottom: calc(-1 * var(--bs-border-width, 1px));
      border: var(--bs-border-width, 1px) solid transparent;
      border-top-left-radius: var(--bs-border-radius);
      border-top-right-radius: var(--bs-border-radius);
    }
    & > li > a:hover {
      border-color: var(--bs-secondary-bg) var(--bs-secondary-bg) var(--bs-border-color);
    }
    & > li > a[aria-current='page'] {
      color: var(--bs-emphasis-color);
      background-color: var(--bs-body-bg);
      border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);
    }
  `
      : ''}

  ${(p) =>
    p.$variant === 'pills'
      ? `
    & > li > a { border-radius: var(--bs-border-radius); }
    & > li > a[aria-current='page'] {
      color: var(--bs-primary-contrast);
      background-color: var(--bs-primary);
    }
  `
      : ''}

  ${(p) =>
    p.$fill
      ? `
    & > li { flex: 1 1 auto; text-align: center; }
    & > li > a { width: 100%; }
  `
      : ''}

  ${(p) =>
    p.$justified
      ? `
    & > li { flex-grow: 1; flex-basis: 0; text-align: center; }
    & > li > a { width: 100%; }
  `
      : ''}
`

export const Nav = React.forwardRef<HTMLUListElement, NavProps>(
  ({ variant, fill, justified, ...rest }, ref) => (
    <StyledNav ref={ref} $variant={variant} $fill={fill} $justified={justified} {...rest} />
  ),
)
Nav.displayName = 'Nav'

export const NavItem = styled.li``

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  disabled?: boolean
  as?: React.ElementType
}

// Colors read the --bs-nav-link-* custom props (Bootstrap's `.nav-link` tokens)
// with the plain link colors as fallbacks, so a bare Nav is unchanged but a
// Navbar can cascade its --bs-navbar-* link theming down through .navbar-nav.
const StyledNavLink = styled.a<{ $disabled?: boolean }>`
  display: block;
  padding: var(--bs-nav-link-padding-y, 0.5rem) var(--bs-nav-link-padding-x, 1rem);
  text-decoration: none;
  color: var(--bs-nav-link-color, var(--bs-link-color));
  background: none;
  border: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  &:hover {
    color: var(--bs-nav-link-hover-color, var(--bs-link-hover-color));
  }
  ${(p) =>
    p.$disabled
      ? 'color: var(--bs-nav-link-disabled-color, var(--bs-secondary-color)); pointer-events: none; cursor: default;'
      : ''}
`

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active, disabled, ...rest }, ref) => (
    <StyledNavLink
      ref={ref}
      $disabled={disabled}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  ),
)
NavLink.displayName = 'NavLink'
