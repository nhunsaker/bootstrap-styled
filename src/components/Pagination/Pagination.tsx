import React from 'react'
import styled from 'styled-components'

export const Pagination = styled.ul`
  display: flex;
  padding-left: 0;
  margin: 0;
  list-style: none;

  & > li:first-child a {
    border-top-left-radius: var(--bs-border-radius);
    border-bottom-left-radius: var(--bs-border-radius);
  }
  & > li:last-child a {
    border-top-right-radius: var(--bs-border-radius);
    border-bottom-right-radius: var(--bs-border-radius);
  }
`

export const PageItem = styled.li``

export interface PageLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  disabled?: boolean
  as?: React.ElementType
}

const StyledPageLink = styled.a<{ $active?: boolean; $disabled?: boolean }>`
  display: block;
  padding: 0.375rem 0.75rem;
  margin-left: -1px;
  text-decoration: none;
  color: ${(p) => (p.$active ? 'var(--bs-primary-contrast)' : 'var(--bs-link-color)')};
  background-color: ${(p) => (p.$active ? 'var(--bs-primary)' : 'var(--bs-body-bg)')};
  border: 1px solid ${(p) => (p.$active ? 'var(--bs-primary)' : 'var(--bs-border-color)')};
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

  &:hover {
    ${(p) =>
      p.$active
        ? ''
        : 'background-color: color-mix(in srgb, var(--bs-body-color) 6%, var(--bs-body-bg)); color: var(--bs-link-hover-color);'}
  }
  ${(p) =>
    p.$disabled
      ? 'color: var(--bs-secondary); pointer-events: none; background-color: var(--bs-body-bg);'
      : ''}
`

export const PageLink = React.forwardRef<HTMLAnchorElement, PageLinkProps>(
  ({ active, disabled, ...rest }, ref) => (
    <StyledPageLink
      ref={ref}
      $active={active}
      $disabled={disabled}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    />
  ),
)
PageLink.displayName = 'PageLink'
