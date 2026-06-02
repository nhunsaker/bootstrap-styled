import React from 'react'
import styled from 'styled-components'

export const Breadcrumb = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
}

const StyledItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  color: ${(p) => (p.$active ? 'var(--bs-secondary)' : 'inherit')};

  & + &::before {
    content: '/';
    padding: 0 0.5rem;
    color: var(--bs-secondary);
  }
  a {
    color: var(--bs-link-color);
    text-decoration: none;
  }
  a:hover {
    color: var(--bs-link-hover-color);
  }
`

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ active, ...rest }, ref) => (
    <StyledItem ref={ref} $active={active} aria-current={active ? 'page' : undefined} {...rest} />
  ),
)
BreadcrumbItem.displayName = 'BreadcrumbItem'
