import React from 'react'
import styled from 'styled-components'

export interface PaginationProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Size variant → Bootstrap `.pagination-sm` / `.pagination-lg` (padding, font-size, radius). */
  size?: 'sm' | 'lg'
  as?: React.ElementType
}

const StyledPagination = styled.ul<{ $size?: 'sm' | 'lg' }>`
  /* Bootstrap 5.3.8 .pagination tokens (runtime-overridable via --bs-pagination-*). */
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
  --bs-pagination-font-size: 1rem;
  --bs-pagination-border-radius: var(--bs-border-radius);
  ${(p) =>
    p.$size === 'sm'
      ? `--bs-pagination-padding-x: 0.5rem;
         --bs-pagination-padding-y: 0.25rem;
         --bs-pagination-font-size: 0.875rem;
         --bs-pagination-border-radius: var(--bs-border-radius-sm);`
      : ''}
  ${(p) =>
    p.$size === 'lg'
      ? `--bs-pagination-padding-x: 1.5rem;
         --bs-pagination-padding-y: 0.75rem;
         --bs-pagination-font-size: 1.25rem;
         --bs-pagination-border-radius: var(--bs-border-radius-lg);`
      : ''}

  display: flex;
  padding-left: 0;
  margin: 0;
  list-style: none;

  & > li:not(:first-child) a {
    margin-left: calc(-1 * var(--bs-border-width, 1px));
  }
  & > li:first-child a {
    border-top-left-radius: var(--bs-pagination-border-radius);
    border-bottom-left-radius: var(--bs-pagination-border-radius);
  }
  & > li:last-child a {
    border-top-right-radius: var(--bs-pagination-border-radius);
    border-bottom-right-radius: var(--bs-pagination-border-radius);
  }
`

export const Pagination = React.forwardRef<HTMLUListElement, PaginationProps>(
  ({ size, ...rest }, ref) => <StyledPagination ref={ref} $size={size} {...rest} />,
)
Pagination.displayName = 'Pagination'

export const PageItem = styled.li``

export interface PageLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  disabled?: boolean
  as?: React.ElementType
}

const StyledPageLink = styled.a<{ $active?: boolean; $disabled?: boolean }>`
  position: relative;
  display: block;
  /* size-driven via --bs-pagination-* set on the parent .pagination */
  padding: var(--bs-pagination-padding-y, 0.375rem) var(--bs-pagination-padding-x, 0.75rem);
  font-size: var(--bs-pagination-font-size, 1rem);
  text-decoration: none;
  color: ${(p) => (p.$active ? 'var(--bs-primary-contrast)' : 'var(--bs-link-color)')};
  background-color: ${(p) => (p.$active ? 'var(--bs-primary)' : 'var(--bs-body-bg)')};
  border: var(--bs-border-width, 1px) solid ${(p) => (p.$active ? 'var(--bs-primary)' : 'var(--bs-border-color)')};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  &:hover {
    ${(p) =>
      p.$active
        ? ''
        : 'z-index: 2; color: var(--bs-link-hover-color); background-color: var(--bs-tertiary-bg); border-color: var(--bs-border-color);'}
  }
  ${(p) =>
    p.$disabled
      ? 'color: var(--bs-secondary-color); pointer-events: none; background-color: var(--bs-secondary-bg); border-color: var(--bs-border-color);'
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
