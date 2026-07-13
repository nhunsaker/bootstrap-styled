import React from 'react'
import styled, { css } from 'styled-components'
import type { ColorName } from '../../theme/types'

// Bootstrap 5.3.8 `.table` (verified against parity/oracle/bootstrap.min.css).
// The whole system is driven by `--bs-table-*` custom properties that inherit
// from the table down to each cell; each cell paints via `background-color`
// (the base bg) plus an `inset` box-shadow (the striped/hover/active accent).
// A contextual variant simply re-sets the vars on the table (or on a `tr`/`td`
// via `className="table-<color>"`), and the cells re-render for free.

export type TableSize = 'sm'
export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

// `--bs-emphasis-color-rgb` is not emitted by the theme (only `--bs-body-*-rgb`
// is), so the accent tints fall back to Bootstrap's exact light-mode 0,0,0.
const EMPH_RGB = 'var(--bs-emphasis-color-rgb, 0, 0, 0)'

const baseVars = css`
  --bs-table-color-type: initial;
  --bs-table-bg-type: initial;
  --bs-table-color-state: initial;
  --bs-table-bg-state: initial;
  --bs-table-color: var(--bs-emphasis-color, #000);
  --bs-table-bg: var(--bs-body-bg, #fff);
  --bs-table-border-color: var(--bs-border-color, #dee2e6);
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: var(--bs-emphasis-color, #000);
  --bs-table-striped-bg: rgba(${EMPH_RGB}, 0.05);
  --bs-table-active-color: var(--bs-emphasis-color, #000);
  --bs-table-active-bg: rgba(${EMPH_RGB}, 0.1);
  --bs-table-hover-color: var(--bs-emphasis-color, #000);
  --bs-table-hover-bg: rgba(${EMPH_RGB}, 0.075);
`

// Exact 5.3.8 contextual palettes (`.table-<color>`).
type Ctx = { color: string; bg: string; border: string; striped: string; active: string; hover: string }
const CONTEXTUAL: Record<ColorName, Ctx> = {
  primary: { color: '#000', bg: '#cfe2ff', border: '#a6b5cc', striped: '#c5d7f2', active: '#bacbe6', hover: '#bfd1ec' },
  secondary: { color: '#000', bg: '#e2e3e5', border: '#b5b6b7', striped: '#d7d8da', active: '#cbccce', hover: '#d1d2d4' },
  success: { color: '#000', bg: '#d1e7dd', border: '#a7b9b1', striped: '#c7dbd2', active: '#bcd0c7', hover: '#c1d6cc' },
  danger: { color: '#000', bg: '#f8d7da', border: '#c6acae', striped: '#eccccf', active: '#dfc2c4', hover: '#e5c7ca' },
  warning: { color: '#000', bg: '#fff3cd', border: '#ccc2a4', striped: '#f2e7c3', active: '#e6dbb9', hover: '#ece1be' },
  info: { color: '#000', bg: '#cff4fc', border: '#a6c3ca', striped: '#c5e8ef', active: '#badce3', hover: '#bfe2e9' },
  light: { color: '#000', bg: '#f8f9fa', border: '#c6c7c8', striped: '#ecedee', active: '#dfe0e1', hover: '#e5e6e7' },
  dark: { color: '#fff', bg: '#212529', border: '#4d5154', striped: '#2c3034', active: '#373b3e', hover: '#323539' },
}

const contextualVars = (c: Ctx): string => `
  --bs-table-color: ${c.color};
  --bs-table-bg: ${c.bg};
  --bs-table-border-color: ${c.border};
  --bs-table-striped-bg: ${c.striped};
  --bs-table-striped-color: ${c.color};
  --bs-table-active-bg: ${c.active};
  --bs-table-active-color: ${c.color};
  --bs-table-hover-bg: ${c.hover};
  --bs-table-hover-color: ${c.color};
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
`

// Nested `.table-<color>` / `.table-active` class rules so per-row/cell
// contextual (via className) works exactly like native Bootstrap.
const contextualClassRules = css`
  ${(Object.keys(CONTEXTUAL) as ColorName[]).map(
    (name) => css`
      & .table-${name} {
        ${contextualVars(CONTEXTUAL[name])}
      }
    `,
  )}
  & .table-active {
    --bs-table-color-state: var(--bs-table-active-color);
    --bs-table-bg-state: var(--bs-table-active-bg);
  }
`

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** `.table-striped` — zebra-stripe the tbody rows. */
  striped?: boolean
  /** `.table-striped-columns` — zebra-stripe alternate columns. */
  stripedColumns?: boolean
  /** `.table-hover` — hover highlight on tbody rows. */
  hover?: boolean
  /** `.table-bordered` — borders on all sides of every cell. */
  bordered?: boolean
  /** `.table-borderless` — remove all borders. */
  borderless?: boolean
  /** `.table-sm` — halve the cell padding. */
  size?: TableSize
  /** `.table-<color>` — contextual color for the whole table. */
  variant?: ColorName
  /** Wrap in `.table-responsive` (true) or `.table-responsive-<bp>`. */
  responsive?: boolean | ResponsiveBreakpoint
  as?: React.ElementType
}

const RESPONSIVE_BP: Record<ResponsiveBreakpoint, string> = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}

const StyledTable = styled.table<{
  $striped?: boolean
  $stripedColumns?: boolean
  $hover?: boolean
  $bordered?: boolean
  $borderless?: boolean
  $sm?: boolean
  $variant?: ColorName
}>`
  ${baseVars}
  ${(p) => (p.$variant ? contextualVars(CONTEXTUAL[p.$variant]) : '')}
  width: 100%;
  margin-bottom: 1rem;
  vertical-align: top;
  border-color: var(--bs-table-border-color);
  caption-side: bottom;
  border-collapse: collapse;

  /* Cell baseline (mirrors Reboot so borders render Provider-less too). */
  & > :not(caption) > * > * {
    padding: ${(p) => (p.$sm ? '0.25rem 0.25rem' : '0.5rem 0.5rem')};
    color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
    background-color: var(--bs-table-bg);
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    border-bottom-width: var(--bs-border-width, 1px);
    box-shadow: inset 0 0 0 9999px
      var(--bs-table-bg-state, var(--bs-table-bg-type, var(--bs-table-accent-bg)));
  }

  & > tbody, & > tfoot, & > thead, & > tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  & caption {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
    text-align: left;
  }
  & .caption-top {
    caption-side: top;
  }

  & .table-group-divider {
    border-top: calc(var(--bs-border-width, 1px) * 2) solid currentColor;
  }

  ${(p) =>
    p.$striped &&
    css`
      & > tbody > tr:nth-of-type(odd) > * {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
      }
    `}

  ${(p) =>
    p.$stripedColumns &&
    css`
      & > :not(caption) > tr > :nth-child(2n) {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
      }
    `}

  ${(p) =>
    p.$hover &&
    css`
      & > tbody > tr:hover > * {
        --bs-table-color-state: var(--bs-table-hover-color);
        --bs-table-bg-state: var(--bs-table-hover-bg);
      }
    `}

  ${(p) =>
    p.$bordered &&
    css`
      & > :not(caption) > * {
        border-width: var(--bs-border-width, 1px) 0;
      }
      & > :not(caption) > * > * {
        border-width: 0 var(--bs-border-width, 1px);
      }
    `}

  ${(p) =>
    p.$borderless &&
    css`
      & > :not(caption) > * > * {
        border-bottom-width: 0;
      }
      & > :not(caption):not(:first-child) {
        border-top-width: 0;
      }
    `}

  ${contextualClassRules}
`

const ResponsiveWrapper = styled.div<{ $bp?: ResponsiveBreakpoint }>`
  ${(p) =>
    p.$bp
      ? css`
          @media (max-width: ${RESPONSIVE_BP[p.$bp]}) {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        `
      : css`
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        `}
`

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    { striped, stripedColumns, hover, bordered, borderless, size, variant, responsive, as, ...rest },
    ref,
  ) => {
    const table = (
      <StyledTable
        as={as}
        ref={ref}
        $striped={striped}
        $stripedColumns={stripedColumns}
        $hover={hover}
        $bordered={bordered}
        $borderless={borderless}
        $sm={size === 'sm'}
        $variant={variant}
        {...rest}
      />
    )
    if (!responsive) return table
    return (
      <ResponsiveWrapper $bp={typeof responsive === 'string' ? responsive : undefined}>
        {table}
      </ResponsiveWrapper>
    )
  },
)
Table.displayName = 'Table'
