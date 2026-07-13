import React from 'react'
import {
  Box,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  BsIconStar,
  BsIconHouse,
  BsIconGear,
  BsIconChevronDown,
} from '../../index'

/**
 * Example page — Sidebar (styled).
 *
 * Mirrors Bootstrap's `/examples/sidebars`: a fixed-width vertical sidebar with
 * a brand, a `nav-pills flex-column` list, a flush `ListGroup` section, and a
 * dropdown user footer pinned to the bottom. Built from bootstrap-styled
 * components — `Box` (wrapper), `Nav` (main list), `ListGroup` (teams), `BsIcon*`.
 *
 * DETERMINISM (see Sidebar.native.tsx for the oracle twin):
 *  - Icons + avatar are inline SVG (`<BsIcon*>` / an identical `<svg>` circle) on
 *    BOTH sides — no external images or icon fonts.
 *  - Fixed 280×640 box so the `margin-top:auto` footer lands deterministically.
 *  - The user footer renders CLOSED (avatar + name + chevron); the open dropdown
 *    menu is behavioral and out of scope for the static pixel diff.
 */

const EMPHASIS = 'var(--bs-emphasis-color, #000)'
const SECONDARY = 'var(--bs-secondary-color, rgba(33, 37, 41, 0.75))'
const BORDER = 'var(--bs-border-color, #dee2e6)'

const asideStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: '280px',
  height: '640px',
  padding: '1rem',
  borderRight: `1px solid ${BORDER}`,
}
const hrStyle: React.CSSProperties = {
  margin: '1rem 0',
  color: 'inherit',
  border: 0,
  borderTop: '1px solid',
  opacity: 0.25,
}
const brandStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: EMPHASIS,
}
const navLinkStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.5rem' }
const labelStyle: React.CSSProperties = {
  marginBottom: '0.5rem',
  fontSize: '0.875rem',
  color: SECONDARY,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}
const userLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: EMPHASIS,
}

/** Generic circular avatar — identical inline SVG on both sides (no image). */
const Avatar = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden focusable={false}>
    <circle cx="16" cy="16" r="16" fill="#6c757d" />
    <circle cx="16" cy="12.5" r="5" fill="#fff" />
    <path d="M6 30a10 10 0 0 1 20 0z" fill="#fff" />
  </svg>
)

export function Sidebar() {
  return (
    <Box as="aside" style={asideStyle}>
      {/* Brand */}
      <a href="#" style={brandStyle}>
        <BsIconStar size={32} aria-hidden />
        <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem' }}>Sidebar</span>
      </a>
      <hr style={hrStyle} />

      {/* Main nav — pills, vertical */}
      <Nav variant="pills" style={{ flexDirection: 'column' }}>
        <NavItem>
          <NavLink href="#" active style={navLinkStyle}>
            <BsIconHouse size={16} aria-hidden />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" style={navLinkStyle}>
            <BsIconStar size={16} aria-hidden />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" style={navLinkStyle}>
            <BsIconGear size={16} aria-hidden />
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" style={navLinkStyle}>
            <BsIconChevronDown size={16} aria-hidden />
            Orders
          </NavLink>
        </NavItem>
      </Nav>

      <hr style={hrStyle} />

      {/* Teams — flush ListGroup */}
      <div style={labelStyle}>Your teams</div>
      <ListGroup flush>
        <ListGroupItem>Design</ListGroupItem>
        <ListGroupItem>Engineering</ListGroupItem>
        <ListGroupItem>Marketing</ListGroupItem>
      </ListGroup>

      {/* User footer — pinned bottom */}
      <div style={{ marginTop: 'auto' }}>
        <hr style={hrStyle} />
        <a href="#" style={userLinkStyle}>
          <Avatar />
          <strong style={{ marginLeft: '0.5rem' }}>mdo</strong>
          <BsIconChevronDown size="0.75em" aria-hidden style={{ marginLeft: 'auto' }} />
        </a>
      </div>
    </Box>
  )
}

export default Sidebar
