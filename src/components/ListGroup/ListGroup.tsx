import React from 'react'
import styled, { css } from 'styled-components'
import type { ColorName } from '../../theme/types'
import { defaultTheme } from '../../theme/defaultTheme'

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

const BREAKPOINTS: Record<Breakpoint, string> = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}

export interface ListGroupProps extends React.HTMLAttributes<HTMLElement> {
  /** Bootstrap `.list-group-flush` — remove outer border + radius (for cards). */
  flush?: boolean
  /** Bootstrap `.list-group-numbered` — CSS-counter numbering on each item. */
  numbered?: boolean
  /** Bootstrap `.list-group-horizontal{-bp}` — lay items in a row (optionally above a breakpoint). */
  horizontal?: boolean | Breakpoint
  as?: React.ElementType
}

// Bootstrap 5.3.8 `.list-group` token block (verbatim; runtime-overridable).
// The `--bs-list-group-*` custom properties inherit to the items, so an item
// reads them without re-declaring — a contextual variant simply re-sets them.
const listGroupVars = css`
  --bs-list-group-color: var(--bs-body-color);
  --bs-list-group-bg: var(--bs-body-bg);
  --bs-list-group-border-color: var(--bs-border-color);
  --bs-list-group-border-width: var(--bs-border-width);
  --bs-list-group-border-radius: var(--bs-border-radius);
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  --bs-list-group-action-color: var(--bs-secondary-color);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-tertiary-bg);
  --bs-list-group-action-active-color: var(--bs-body-color);
  --bs-list-group-action-active-bg: var(--bs-secondary-bg);
  --bs-list-group-disabled-color: var(--bs-secondary-color);
  --bs-list-group-disabled-bg: var(--bs-body-bg);
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: #0d6efd;
  --bs-list-group-active-border-color: #0d6efd;
`

// Horizontal layout rules (shared by base + responsive variants). `& > li`
// targets the list items directly since our items render as generated-class
// elements, not literal `.list-group-item`.
// `&&&` triples specificity so these overrides win the tie against the item's
// own `border` rules (StyledListGroupItem is inserted after this parent, so an
// equal-specificity selector would otherwise lose on source order).
const horizontalRules = css`
  flex-direction: row;
  &&& > *:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  &&& > *:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  &&& > *.active {
    margin-top: 0;
  }
  &&& > * + * {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
`

const StyledListGroup = styled.ul<{
  $flush?: boolean
  $numbered?: boolean
  $horizontal?: boolean | Breakpoint
}>`
  ${listGroupVars}
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: var(--bs-list-group-border-radius);
  list-style: none;

  ${(p) =>
    p.$numbered
      ? css`
          list-style-type: none;
          counter-reset: section;
          & > *::before {
            content: counters(section, '.') '. ';
            counter-increment: section;
          }
        `
      : ''}

  ${(p) =>
    p.$horizontal === true
      ? horizontalRules
      : typeof p.$horizontal === 'string'
        ? css`
            @media (min-width: ${BREAKPOINTS[p.$horizontal]}) {
              ${horizontalRules}
            }
          `
        : ''}

  ${(p) =>
    p.$flush
      ? css`
          border-radius: 0;
          /* &&& wins the specificity tie against the item's own \`border\`. */
          &&& > * {
            border-width: 0 0 var(--bs-list-group-border-width);
          }
          &&& > *:last-child {
            border-bottom-width: 0;
          }
        `
      : ''}
`

export const ListGroup = React.forwardRef<HTMLElement, ListGroupProps>(
  ({ flush, numbered, horizontal, as, ...rest }, ref) => (
    <StyledListGroup
      as={as ?? (numbered ? 'ol' : 'ul')}
      ref={ref as React.Ref<HTMLUListElement>}
      $flush={flush}
      $numbered={numbered}
      $horizontal={horizontal}
      {...rest}
    />
  ),
)
ListGroup.displayName = 'ListGroup'

// --- Item ------------------------------------------------------------------

export interface ListGroupItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean
  disabled?: boolean
  /** Bootstrap `.list-group-item-action` — hover/focus/active affordance for interactive items. */
  action?: boolean
  /** Contextual color variant (`.list-group-item-<color>`). */
  variant?: ColorName
  as?: React.ElementType
  href?: string
}

// `.list-group-item-<color>` remaps the inherited `--bs-list-group-*` vars to
// the color's -subtle/-emphasis tokens (Alert-style: read the runtime `--bs-*`
// var, fall back to the exact 5.3.8 default for Provider-less use).
const variantVars = (v: ColorName): string => {
  const d = defaultTheme.colorTokens[v]
  return `
    --bs-list-group-color: var(--bs-${v}-text-emphasis, ${d.emphasis});
    --bs-list-group-bg: var(--bs-${v}-bg-subtle, ${d.bgSubtle});
    --bs-list-group-border-color: var(--bs-${v}-border-subtle, ${d.borderSubtle});
    --bs-list-group-action-hover-color: var(--bs-emphasis-color, #000);
    --bs-list-group-action-hover-bg: var(--bs-${v}-border-subtle, ${d.borderSubtle});
    --bs-list-group-action-active-color: var(--bs-emphasis-color, #000);
    --bs-list-group-action-active-bg: var(--bs-${v}-border-subtle, ${d.borderSubtle});
    --bs-list-group-active-color: var(--bs-${v}-bg-subtle, ${d.bgSubtle});
    --bs-list-group-active-bg: var(--bs-${v}-text-emphasis, ${d.emphasis});
    --bs-list-group-active-border-color: var(--bs-${v}-text-emphasis, ${d.emphasis});
  `
}

const StyledListGroupItem = styled.li<{
  $active?: boolean
  $disabled?: boolean
  $action?: boolean
  $variant?: ColorName
}>`
  ${(p) => (p.$variant ? variantVars(p.$variant) : '')}
  position: relative;
  display: block;
  padding: var(--bs-list-group-item-padding-y, 0.5rem) var(--bs-list-group-item-padding-x, 1rem);
  color: var(--bs-list-group-color, var(--bs-body-color));
  text-decoration: none;
  background-color: var(--bs-list-group-bg, var(--bs-body-bg));
  border: var(--bs-list-group-border-width, var(--bs-border-width, 1px)) solid
    var(--bs-list-group-border-color, var(--bs-border-color));

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  /* Bootstrap collapses the shared border between adjacent items
     (.list-group-item + .list-group-item { border-top-width: 0 }). */
  &:not(:first-child) {
    border-top-width: 0;
  }

  ${(p) =>
    p.$action
      ? css`
          width: 100%;
          color: var(--bs-list-group-action-color, var(--bs-secondary-color));
          text-align: inherit;
          cursor: pointer;
          &:not(.active):hover,
          &:not(.active):focus {
            z-index: 1;
            color: var(--bs-list-group-action-hover-color, var(--bs-emphasis-color));
            text-decoration: none;
            background-color: var(--bs-list-group-action-hover-bg, var(--bs-tertiary-bg));
          }
          &:not(.active):active {
            color: var(--bs-list-group-action-active-color, var(--bs-body-color));
            background-color: var(--bs-list-group-action-active-bg, var(--bs-secondary-bg));
          }
        `
      : ''}

  ${(p) =>
    p.$disabled
      ? css`
          color: var(--bs-list-group-disabled-color, var(--bs-secondary-color));
          pointer-events: none;
          background-color: var(--bs-list-group-disabled-bg, var(--bs-body-bg));
        `
      : ''}

  ${(p) =>
    p.$active
      ? css`
          z-index: 2;
          color: var(--bs-list-group-active-color, #fff);
          background-color: var(--bs-list-group-active-bg, #0d6efd);
          border-color: var(--bs-list-group-active-border-color, #0d6efd);
          /* .list-group-item + .list-group-item.active restores the top border
             (an active item that follows another item, i.e. not the first). */
          &:not(:first-child) {
            margin-top: calc(-1 * var(--bs-list-group-border-width, var(--bs-border-width, 1px)));
            border-top-width: var(--bs-list-group-border-width, var(--bs-border-width, 1px));
          }
        `
      : ''}
`

export const ListGroupItem = React.forwardRef<HTMLElement, ListGroupItemProps>(
  ({ active, disabled, action, variant, as, className, ...rest }, ref) => {
    // `.active` / `.disabled` class mirrors Bootstrap so the CSS selectors that
    // key off them (e.g. action's :not(.active), item+item.active) still apply.
    const cls = [className, active && 'active', disabled && 'disabled']
      .filter(Boolean)
      .join(' ')
    return (
      <StyledListGroupItem
        as={as ?? (action ? 'button' : 'li')}
        ref={ref as React.Ref<HTMLLIElement>}
        className={cls || undefined}
        $active={active}
        $disabled={disabled}
        $action={action}
        $variant={variant}
        aria-current={active ? 'true' : undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      />
    )
  },
)
ListGroupItem.displayName = 'ListGroupItem'
