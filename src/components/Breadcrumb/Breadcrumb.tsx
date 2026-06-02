import React from 'react'
import styled from 'styled-components'

// Separator lives on the (prop-stable) parent as `& > li + li::before`.
// (Putting it on the item via `& + &` breaks across an active item, whose
// prop-driven styles get a different styled-components class.)
export const Breadcrumb = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;

  & > li + li::before {
    content: '/';
    padding: 0 0.5rem;
    color: var(--bs-secondary);
  }
`

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
}

const StyledItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  color: ${(p) => (p.$active ? 'var(--bs-secondary)' : 'inherit')};

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
