import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// ---------------------------------------------------------------------------
// useScrollspy — modern IntersectionObserver implementation (no scroll math).
// Observes the target sections and reports the id of the one currently anchored
// at the top of the scroll region. Bootstrap's 5.3 rewrite also moved to
// IntersectionObserver; this mirrors that behavior (topmost intersecting wins,
// with the last section-above-the-fold retained as you scroll past it).
// ---------------------------------------------------------------------------

export interface UseScrollspyOptions {
  /** DOM ids of the sections to spy on, in document order. */
  ids: string[]
  /** Scroll container. Defaults to the viewport. */
  root?: Element | null
  /**
   * IntersectionObserver rootMargin. The default `-40%` bottom inset makes a
   * section "active" once it reaches the top ~60% of the viewport, matching
   * Bootstrap's feel where the item you've scrolled to lights up.
   */
  rootMargin?: string
}

export function useScrollspy({
  ids,
  root = null,
  rootMargin = '0px 0px -40% 0px',
}: UseScrollspyOptions): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Topmost (earliest in document order) currently-visible section wins.
        const next = ids.find((id) => visible.has(id))
        if (next) setActiveId(next)
      },
      { root, rootMargin, threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, root, rootMargin])

  return activeId
}

// ---------------------------------------------------------------------------
// ScrollspyNav — a small nav that highlights the active section. Consumes the
// hook; pass `activeId` to override (static harness rendering / controlled use).
// ---------------------------------------------------------------------------

export interface ScrollspyItem {
  /** id of the section this item points at. */
  id: string
  label: React.ReactNode
}

export interface ScrollspyNavProps {
  items: ScrollspyItem[]
  /** Controlled/static active id. When set, the observer is not used. */
  activeId?: string
  /** Nav look — Bootstrap `.nav` links or `.list-group` items. */
  variant?: 'nav' | 'list-group'
  root?: Element | null
  rootMargin?: string
  onActiveChange?: (id: string) => void
}

// Base `.nav` token defaults (oracle: `.nav{...}`).
const Nav = styled.ul`
  --bs-nav-link-padding-x: 1rem;
  --bs-nav-link-padding-y: 0.5rem;
  --bs-nav-link-color: var(--bs-link-color);
  --bs-nav-link-hover-color: var(--bs-link-hover-color);
  --bs-nav-link-disabled-color: var(--bs-secondary-color);
  --bs-nav-pills-border-radius: var(--bs-border-radius);
  --bs-nav-pills-link-active-color: #fff;
  --bs-nav-pills-link-active-bg: var(--bs-primary, #0d6efd);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`

// `.nav-link` + `.nav-pills .nav-link.active` (oracle values).
const NavLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  text-decoration: none;
  background: 0 0;
  border: 0;
  border-radius: var(--bs-nav-pills-border-radius);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  color: ${(p) => (p.$active ? 'var(--bs-nav-pills-link-active-color)' : 'var(--bs-nav-link-color)')};
  background-color: ${(p) => (p.$active ? 'var(--bs-nav-pills-link-active-bg)' : 'transparent')};

  &:hover,
  &:focus {
    color: ${(p) => (p.$active ? 'var(--bs-nav-pills-link-active-color)' : 'var(--bs-nav-link-hover-color)')};
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

// `.list-group` + `.list-group-item` + `.list-group-item.active` (oracle values).
const ListGroup = styled.div`
  --bs-list-group-color: var(--bs-body-color);
  --bs-list-group-bg: var(--bs-body-bg);
  --bs-list-group-border-color: var(--bs-border-color);
  --bs-list-group-border-width: var(--bs-border-width);
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: var(--bs-primary, #0d6efd);
  --bs-list-group-active-border-color: var(--bs-primary, #0d6efd);
  display: flex;
  flex-direction: column;
  border-radius: var(--bs-border-radius);
`

const ListItem = styled.a<{ $active?: boolean }>`
  position: relative;
  display: block;
  padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);
  text-decoration: none;
  color: ${(p) => (p.$active ? 'var(--bs-list-group-active-color)' : 'var(--bs-list-group-color)')};
  background-color: ${(p) => (p.$active ? 'var(--bs-list-group-active-bg)' : 'var(--bs-list-group-bg)')};
  border: var(--bs-list-group-border-width) solid
    ${(p) => (p.$active ? 'var(--bs-list-group-active-border-color)' : 'var(--bs-list-group-border-color)')};
  &:not(:first-child) {
    border-top-width: 0;
  }
  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
`

export function ScrollspyNav({
  items,
  activeId,
  variant = 'nav',
  root = null,
  rootMargin,
  onActiveChange,
}: ScrollspyNavProps) {
  const ids = items.map((i) => i.id)
  const spied = useScrollspy({ ids, root, rootMargin })
  const active = activeId ?? spied

  const lastNotified = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (active && active !== lastNotified.current) {
      lastNotified.current = active
      onActiveChange?.(active)
    }
  }, [active, onActiveChange])

  if (variant === 'list-group') {
    return (
      <ListGroup>
        {items.map((it) => (
          <ListItem
            key={it.id}
            href={`#${it.id}`}
            $active={it.id === active}
            aria-current={it.id === active ? 'true' : undefined}
          >
            {it.label}
          </ListItem>
        ))}
      </ListGroup>
    )
  }

  return (
    <Nav className="nav nav-pills">
      {items.map((it) => (
        <li key={it.id} className="nav-item">
          <NavLink
            className={`nav-link${it.id === active ? ' active' : ''}`}
            href={`#${it.id}`}
            $active={it.id === active}
            aria-current={it.id === active ? 'true' : undefined}
          >
            {it.label}
          </NavLink>
        </li>
      ))}
    </Nav>
  )
}
