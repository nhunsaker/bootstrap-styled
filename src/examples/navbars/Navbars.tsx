import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavbarCollapse,
  NavbarNav,
  NavItem,
  NavLink,
  Button,
  FormControl,
  Container,
  BsIconStar,
  BsIconChevronDown,
} from '../../index'

/**
 * Example page — Navbars (styled).
 *
 * Mirrors Bootstrap's `/examples/navbars`: the canonical responsive navbar set
 * (brand + collapsible nav + right-side search form / dropdown) across a couple
 * of color schemes. Built ENTIRELY from bootstrap-styled components.
 *
 * DETERMINISM (see Navbars.native.tsx for the 1:1 oracle twin):
 *  - Rendered in the EXPANDED desktop state (`expand="lg"`): at ≥992px the
 *    toggler is `display:none` and the collapse is forced open, so the static
 *    screenshot is stable. The toggler + below-lg collapse animation are
 *    JS-behavioral and out of scope for the pixel diff.
 *  - Icons use `<BsIcon*>` on BOTH sides (identical inline SVG) — no icon fonts.
 *  - The `<Navbar>` shell does not yet cascade `--bs-navbar-*` link theming to
 *    nav-links, so this example sets the exact Bootstrap navbar link colors +
 *    padding inline (referencing the same `--bs-*` tokens, with Bootstrap-default
 *    fallbacks) so it stays runtime-bindable AND matches the oracle to the pixel.
 *  - The "Dropdown" nav item renders CLOSED (text + chevron). The open menu +
 *    Popper caret are behavioral and out of scope for the static diff.
 */

// Exact Bootstrap 5.3.8 navbar link colors, token-referenced with default
// fallbacks so the styled story renders correctly without the full ThemeVars
// layer (Ladle ships GlobalStyles only) and re-skins live under the Provider.
// Bootstrap 5.3.8: navbar link = rgba(emphasis-rgb, 0.65), active = alpha 1.
// (dark/primary hardcode 255s since the styled side stays in the light token
// scope — the oracle twin gets there via data-bs-theme="dark".)
const LINK_LIGHT = 'rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 0.65)'
const LINK_LIGHT_ACTIVE = 'rgba(var(--bs-emphasis-color-rgb, 0, 0, 0), 1)'
const LINK_DARK = 'rgba(255, 255, 255, 0.65)'
const LINK_DARK_ACTIVE = 'rgba(255, 255, 255, 1)'
const NAV_LINK_PADDING = '0.5rem 0.5rem' // .navbar-expand-lg .navbar-nav .nav-link

interface Scheme {
  bg: string
  link: string
  linkActive: string
  brand: string
}

const LIGHT: Scheme = {
  bg: 'var(--bs-tertiary-bg, #f8f9fa)',
  link: LINK_LIGHT,
  linkActive: LINK_LIGHT_ACTIVE,
  brand: 'var(--bs-emphasis-color, #000)',
}
const DARK: Scheme = {
  bg: 'var(--bs-dark, #212529)',
  link: LINK_DARK,
  linkActive: LINK_DARK_ACTIVE,
  brand: LINK_DARK_ACTIVE,
}
const PRIMARY: Scheme = {
  bg: 'var(--bs-primary, #0d6efd)',
  link: LINK_DARK,
  linkActive: LINK_DARK_ACTIVE,
  brand: LINK_DARK_ACTIVE,
}

function navLinkStyle(scheme: Scheme, active: boolean): React.CSSProperties {
  return { padding: NAV_LINK_PADDING, color: active ? scheme.linkActive : scheme.link }
}

// Bootstrap applies `display:flex` to a `.navbar > .container(-fluid)` via CSS;
// the styled `<Navbar>` shell doesn't cascade that yet, so the example sets it
// inline (the oracle twin gets it for free from `.navbar > .container-fluid`).
const navbarContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const brandStyle = (scheme: Scheme): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: scheme.brand,
})

/** Brand mark — identical inline SVG glyph on both sides (no external asset). */
const Brand = ({ scheme }: { scheme: Scheme }) => (
  <NavbarBrand href="#" style={brandStyle(scheme)}>
    <BsIconStar size={24} aria-hidden />
    Bootstrap
  </NavbarBrand>
)

export function Navbars() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 1 · Light scheme — brand + nav + dropdown link + right-side search form */}
      <Navbar expand="lg" style={{ backgroundColor: LIGHT.bg }}>
        <Container fluid style={navbarContainerStyle}>
          <Brand scheme={LIGHT} />
          <NavbarToggler />
          <NavbarCollapse>
            <NavbarNav style={{ marginRight: 'auto' }}>
              <NavItem>
                <NavLink href="#" active style={navLinkStyle(LIGHT, true)}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(LIGHT, false)}>
                  Features
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(LIGHT, false)}>
                  Pricing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  style={{ ...navLinkStyle(LIGHT, false), display: 'inline-flex', alignItems: 'center' }}
                >
                  Dropdown
                  <BsIconChevronDown size="0.75em" aria-hidden style={{ marginLeft: '0.35em' }} />
                </NavLink>
              </NavItem>
            </NavbarNav>
            <form role="search" style={{ display: 'flex', gap: '0.5rem' }}>
              <FormControl type="search" placeholder="Search" aria-label="Search" />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </form>
          </NavbarCollapse>
        </Container>
      </Navbar>

      {/* 2 · Dark scheme — brand + nav + right-side outline button */}
      <Navbar expand="lg" style={{ backgroundColor: DARK.bg }}>
        <Container fluid style={navbarContainerStyle}>
          <Brand scheme={DARK} />
          <NavbarToggler />
          <NavbarCollapse>
            <NavbarNav style={{ marginRight: 'auto' }}>
              <NavItem>
                <NavLink href="#" active style={navLinkStyle(DARK, true)}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(DARK, false)}>
                  Docs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(DARK, false)}>
                  About
                </NavLink>
              </NavItem>
            </NavbarNav>
            <Button variant="outline-light" type="button">
              Sign up
            </Button>
          </NavbarCollapse>
        </Container>
      </Navbar>

      {/* 3 · Primary (colored) scheme — brand + nav + solid button */}
      <Navbar expand="lg" style={{ backgroundColor: PRIMARY.bg }}>
        <Container fluid style={navbarContainerStyle}>
          <Brand scheme={PRIMARY} />
          <NavbarToggler />
          <NavbarCollapse>
            <NavbarNav style={{ marginRight: 'auto' }}>
              <NavItem>
                <NavLink href="#" active style={navLinkStyle(PRIMARY, true)}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(PRIMARY, false)}>
                  Features
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={navLinkStyle(PRIMARY, false)}>
                  Pricing
                </NavLink>
              </NavItem>
            </NavbarNav>
            <Button variant="light" type="button">
              Get started
            </Button>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbars
