import React from 'react'
import { BsIconStar, BsIconHouse, BsIconGear, BsIconChevronDown } from '../../index'

/**
 * Native twin of Sidebar.tsx — raw Bootstrap 5.3.8 markup + classes under the
 * vendored oracle CSS. Inline layout styles are copied VERBATIM from the styled
 * side so the two are byte-equivalent in geometry; class-driven bits (nav-pills
 * active pill, list-group borders) come from the oracle. Icons/avatar are the
 * same inline SVG on both sides.
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

const Avatar = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden focusable={false}>
    <circle cx="16" cy="16" r="16" fill="#6c757d" />
    <circle cx="16" cy="12.5" r="5" fill="#fff" />
    <path d="M6 30a10 10 0 0 1 20 0z" fill="#fff" />
  </svg>
)

export function SidebarNative() {
  return (
    <aside style={asideStyle}>
      <a href="#" style={brandStyle}>
        <BsIconStar size={32} aria-hidden />
        <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem' }}>Sidebar</span>
      </a>
      <hr style={hrStyle} />

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" style={navLinkStyle}>
            <BsIconHouse size={16} aria-hidden />
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" style={navLinkStyle}>
            <BsIconStar size={16} aria-hidden />
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" style={navLinkStyle}>
            <BsIconGear size={16} aria-hidden />
            Settings
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" style={navLinkStyle}>
            <BsIconChevronDown size={16} aria-hidden />
            Orders
          </a>
        </li>
      </ul>

      <hr style={hrStyle} />

      <div style={labelStyle}>Your teams</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Design</li>
        <li className="list-group-item">Engineering</li>
        <li className="list-group-item">Marketing</li>
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <hr style={hrStyle} />
        <a href="#" style={userLinkStyle}>
          <Avatar />
          <strong style={{ marginLeft: '0.5rem' }}>mdo</strong>
          <BsIconChevronDown size="0.75em" aria-hidden style={{ marginLeft: 'auto' }} />
        </a>
      </div>
    </aside>
  )
}

export default SidebarNative
