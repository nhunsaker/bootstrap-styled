import React, { createContext, useContext, useId, useMemo, useState } from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'
import { Collapse } from '../Collapse'

/** `expand` breakpoint: a token expands ≥ that breakpoint; `true` = always expanded. */
export type NavbarExpand = boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

// Bootstrap 5.3.8 grid breakpoint min-widths (the `.navbar-expand-{bp}` gate).
const BREAKPOINT_MIN: Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', string> = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}

// Bootstrap 5.3.8 .navbar-toggler-icon SVG (light + dark stroke), copied verbatim
// from parity/oracle/bootstrap.min.css.
const TOGGLER_ICON_LIGHT =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
const TOGGLER_ICON_DARK =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"

// The responsive gate: at/above the expand breakpoint Bootstrap forces the
// collapse open (`display:flex !important` beats the Collapse primitive's
// `[data-collapse='hide']{display:none}`), lays the nav out horizontally, and
// hides the toggler. Below it, the Collapse primitive drives the show/hide.
function expandCss(expand?: NavbarExpand): string {
  if (!expand) return ''
  const min = expand === true ? '0' : BREAKPOINT_MIN[expand]
  return `
  @media (min-width: ${min}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    .navbar-nav {
      flex-direction: row;
    }
    .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
      height: auto !important;
      overflow: visible !important;
    }
    .navbar-toggler {
      display: none;
    }
  }
  `
}

// ---------------------------------------------------------------------------
// NavbarContext — lets NavbarToggler + NavbarCollapse coordinate the expanded
// state + share the aria-controls id, the way Bootstrap's Collapse plugin links
// `[data-bs-toggle]` to `#target`.
// ---------------------------------------------------------------------------
interface NavbarContextValue {
  expanded: boolean
  setExpanded: (v: boolean) => void
  toggle: () => void
  collapseId: string
  expand?: NavbarExpand
}

const NavbarContext = createContext<NavbarContextValue | null>(null)

function useNavbarContext(component: string): NavbarContextValue {
  const ctx = useContext(NavbarContext)
  if (!ctx) {
    throw new Error(`${component} must be rendered inside a <Navbar>.`)
  }
  return ctx
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Background color; text + links use the contrast color. */
  variant?: ColorName
  /**
   * Responsive expand breakpoint. A token (`'sm'..'xxl'`) expands the navbar at
   * and above that width and collapses below it; `true` = always expanded;
   * omitted/`false` = always collapsed (toggler-driven).
   */
  expand?: NavbarExpand
  /** Controlled expanded (collapse-open) state. */
  expanded?: boolean
  /** Uncontrolled initial expanded state. Default false. */
  defaultExpanded?: boolean
  /** Notified when the toggler expands/collapses the navbar. */
  onToggle?: (expanded: boolean) => void
  as?: React.ElementType
}

const StyledNavbar = styled.nav<{ $variant?: ColorName; $expand?: NavbarExpand }>`
  /* Bootstrap 5.3.8 .navbar box-model tokens (runtime-overridable). */
  --bs-navbar-padding-y: 0.5rem;
  --bs-navbar-padding-x: 0;
  --bs-navbar-brand-padding-y: 0.3125rem;
  --bs-navbar-brand-margin-end: 1rem;
  --bs-navbar-brand-font-size: 1.25rem;
  --bs-navbar-toggler-padding-y: 0.25rem;
  --bs-navbar-toggler-padding-x: 0.75rem;
  --bs-navbar-toggler-font-size: 1.25rem;
  --bs-navbar-toggler-border-color: rgba(0, 0, 0, 0.15);
  --bs-navbar-toggler-border-radius: var(--bs-border-radius, 0.375rem);
  --bs-navbar-toggler-focus-width: 0.25rem;
  --bs-navbar-toggler-icon-bg: ${TOGGLER_ICON_LIGHT};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);

  /* Sub-part base styles (only bite when NavbarNav/Collapse/Toggler are used). */
  .navbar-nav {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
  }
  .navbar-text {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .navbar-toggler {
    padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
    font-size: var(--bs-navbar-toggler-font-size);
    line-height: 1;
    color: var(--bs-navbar-color, rgba(0, 0, 0, 0.55));
    background-color: transparent;
    border: var(--bs-border-width, 1px) solid var(--bs-navbar-toggler-border-color);
    border-radius: var(--bs-navbar-toggler-border-radius);
    transition: box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
  .navbar-toggler:focus {
    text-decoration: none;
    outline: 0;
    box-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width) rgba(0, 0, 0, 0.25);
  }
  .navbar-toggler-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    background-image: var(--bs-navbar-toggler-icon-bg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }

  &[data-bs-theme='dark'],
  [data-bs-theme='dark'] & {
    --bs-navbar-toggler-icon-bg: ${TOGGLER_ICON_DARK};
    --bs-navbar-toggler-border-color: rgba(255, 255, 255, 0.15);
  }

  ${(p) =>
    p.$variant
      ? `
    background-color: var(--bs-${p.$variant});
    color: var(--bs-${p.$variant}-contrast);
    a { color: var(--bs-${p.$variant}-contrast); }
    .navbar-toggler { color: var(--bs-${p.$variant}-contrast); }
  `
      : ''}

  ${(p) => expandCss(p.$expand)}
`

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    variant,
    expand,
    expanded: controlledExpanded,
    defaultExpanded = false,
    onToggle,
    className,
    ...rest
  },
  ref,
) {
  const collapseId = useId()
  const isControlled = controlledExpanded != null
  const [internal, setInternal] = useState(defaultExpanded)
  const expanded = isControlled ? (controlledExpanded as boolean) : internal

  const setExpanded = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setInternal(v)
      onToggle?.(v)
    },
    [isControlled, onToggle],
  )

  const ctx = useMemo<NavbarContextValue>(
    () => ({
      expanded,
      setExpanded,
      toggle: () => setExpanded(!expanded),
      collapseId,
      expand,
    }),
    [expanded, setExpanded, collapseId, expand],
  )

  const expandClass =
    expand === true ? 'navbar-expand' : expand ? `navbar-expand-${expand}` : ''

  return (
    <NavbarContext.Provider value={ctx}>
      <StyledNavbar
        ref={ref}
        $variant={variant}
        $expand={expand}
        className={['navbar', expandClass, className].filter(Boolean).join(' ')}
        {...rest}
      />
    </NavbarContext.Provider>
  )
})
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

export interface NavbarTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

/**
 * The hamburger button. Wires `aria-expanded`/`aria-controls` to the sibling
 * NavbarCollapse and toggles the shared expanded state (Bootstrap's
 * `[data-bs-toggle="collapse"]` role for the navbar).
 */
export const NavbarToggler = React.forwardRef<HTMLButtonElement, NavbarTogglerProps>(
  function NavbarToggler(
    { className, children, onClick, 'aria-label': ariaLabel, ...rest },
    ref,
  ) {
    const { expanded, toggle, collapseId } = useNavbarContext('NavbarToggler')
    return (
      <button
        ref={ref}
        type="button"
        className={['navbar-toggler', className].filter(Boolean).join(' ')}
        aria-controls={collapseId}
        aria-expanded={expanded}
        aria-label={ariaLabel ?? 'Toggle navigation'}
        onClick={(e) => {
          toggle()
          onClick?.(e)
        }}
        {...rest}
      >
        {children ?? <span className="navbar-toggler-icon" />}
      </button>
    )
  },
)
NavbarToggler.displayName = 'NavbarToggler'

export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

/**
 * The collapsible region (holds NavbarNav/NavbarText). Below the `expand`
 * breakpoint it collapses/expands via the Collapse primitive's height
 * transition; at/above the breakpoint the media query in StyledNavbar forces it
 * open. Its `id` matches the toggler's `aria-controls`.
 */
export const NavbarCollapse = React.forwardRef<HTMLDivElement, NavbarCollapseProps>(
  function NavbarCollapse({ className, children, ...rest }, ref) {
    const { expanded, collapseId } = useNavbarContext('NavbarCollapse')
    return (
      <Collapse
        ref={ref}
        id={collapseId}
        show={expanded}
        className={['navbar-collapse', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </Collapse>
    )
  },
)
NavbarCollapse.displayName = 'NavbarCollapse'

/** `.navbar-nav` — the link list inside a NavbarCollapse. */
export const NavbarNav = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  function NavbarNav({ className, ...rest }, ref) {
    return <ul ref={ref} className={['navbar-nav', className].filter(Boolean).join(' ')} {...rest} />
  },
)
NavbarNav.displayName = 'NavbarNav'

/** `.navbar-text` — inline text inside the navbar. */
export const NavbarText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function NavbarText({ className, ...rest }, ref) {
    return <span ref={ref} className={['navbar-text', className].filter(Boolean).join(' ')} {...rest} />
  },
)
NavbarText.displayName = 'NavbarText'
