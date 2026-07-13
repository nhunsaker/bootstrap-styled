import React from 'react'
import styled from 'styled-components'

// Separator + spacing live on the (prop-stable) parent, mirroring Bootstrap's
// `.breadcrumb-item+.breadcrumb-item{padding-left}` and its
// `::before{float:left;padding-right}`. (Putting it on the item via `& + &`
// breaks across an active item, whose prop-driven styles get a different
// styled-components class.) Splitting the 0.5rem padding-x — padding-left on the
// item, padding-right on the floated divider — instead of `padding:0 0.5rem` on
// the ::before is what matches the oracle exactly and drops the separator
// whitespace/positioning artifact to 0.
export const Breadcrumb = styled.ol`
  --bs-breadcrumb-item-padding-x: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  /* Bootstrap --bs-breadcrumb-margin-bottom: 1rem (Reboot keeps the list gap). */
  margin: 0 0 1rem;
  list-style: none;

  & > li + li {
    padding-left: var(--bs-breadcrumb-item-padding-x);
  }
  & > li + li::before {
    float: left;
    padding-right: var(--bs-breadcrumb-item-padding-x);
    color: var(--bs-secondary);
    content: '/';
  }
`

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
}

// No display:flex here — Bootstrap's `.breadcrumb-item` is a plain flex child of
// the <ol>, so the ::before divider stays in normal flow and its `float:left`
// takes effect (float is ignored on flex items).
const StyledItem = styled.li<{ $active?: boolean }>`
  color: ${(p) => (p.$active ? 'var(--bs-secondary)' : 'inherit')};

  /* Bootstrap breadcrumb links keep the Reboot underline (no .btn/.nav reset),
     so match it rather than the earlier text-decoration:none override. */
  a {
    color: var(--bs-link-color);
    text-decoration: underline;
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
