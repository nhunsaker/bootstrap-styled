import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// ---------------------------------------------------------------------------
// useScrollspy — IntersectionObserver implementation.
//
// DELIBERATE PARITY DECISION (2026-07-13): Bootstrap 5.3.8 rewrote Scrollspy
// away from the old `getBoundingClientRect`/scroll-offset math onto
// IntersectionObserver — verified directly in the oracle bundle
// (`_getNewObserver(){…return new IntersectionObserver(…)}`). So "matching
// bootstrap.js" here means matching its IO behavior, NOT re-introducing the
// legacy scroll-offset mode (that would DIVERGE from 5.3.8). We therefore:
//   1. adopt Bootstrap's exact IO config defaults — `rootMargin:'0px 0px -25%'`,
//      `threshold:[0.1,0.5,1]` (oracle: `ks={offset:null,rootMargin:"0px 0px
//      -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]}`), and
//   2. replicate Bootstrap's scroll-direction-aware selection in
//      `_observerCallback`: track the scroll container's scrollTop to know if
//      we're scrolling down vs up, and only promote an entry that's *below* the
//      last active one while scrolling down (or *above* while scrolling up).
// This makes the active-switch point pixel-track Bootstrap's, rather than the
// simpler "topmost visible wins" heuristic it replaces.
// ---------------------------------------------------------------------------

export interface UseScrollspyOptions {
  /** DOM ids of the sections to spy on, in document order. */
  ids: string[]
  /** Scroll container. Defaults to the viewport. */
  root?: Element | null
  /** IntersectionObserver rootMargin. Default = Bootstrap 5.3.8's `0px 0px -25%`. */
  rootMargin?: string
  /** IntersectionObserver threshold(s). Default = Bootstrap 5.3.8's `[0.1, 0.5, 1]`. */
  threshold?: number | number[]
}

export function useScrollspy({
  ids,
  root = null,
  rootMargin = '0px 0px -25%',
  threshold = [0.1, 0.5, 1],
}: UseScrollspyOptions): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0])
  const key = ids.join('|')
  const thresholdKey = Array.isArray(threshold) ? threshold.join(',') : String(threshold)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)
    if (elements.length === 0) return

    const rootEl = (root as HTMLElement | null) ?? document.documentElement
    // Mirrors Bootstrap's `_previousScrollData`.
    const scrollData = { parentScrollTop: 0, visibleEntryTop: 0 }
    let currentActive: string | undefined = activeId

    const activate = (id: string) => {
      if (currentActive === id) return
      currentActive = id
      setActiveId(id)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const scrollTop = rootEl.scrollTop
        const scrollingDown = scrollTop >= scrollData.parentScrollTop
        scrollData.parentScrollTop = scrollTop
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const entryBelowLastActive = el.offsetTop >= scrollData.visibleEntryTop
          if (scrollingDown && entryBelowLastActive) {
            scrollData.visibleEntryTop = el.offsetTop
            activate(el.id)
            // Bootstrap bails when at the very top (scrollTop 0) to keep the
            // first link lit; guarded so a full initial burst still resolves.
            if (!scrollTop) return
          } else if (!scrollingDown && !entryBelowLastActive) {
            scrollData.visibleEntryTop = el.offsetTop
            activate(el.id)
          }
        }
      },
      { root, rootMargin, threshold },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, root, rootMargin, thresholdKey])

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
  /* .list-group-item-action tokens (oracle) — scrollspy items are links, so
     inactive ones take the greyed action color, not the body color. */
  --bs-list-group-action-color: var(--bs-secondary-color);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-tertiary-bg);
  display: flex;
  flex-direction: column;
  border-radius: var(--bs-border-radius);
`

const ListItem = styled.a<{ $active?: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);
  text-align: inherit;
  text-decoration: none;
  color: ${(p) =>
    p.$active ? 'var(--bs-list-group-active-color)' : 'var(--bs-list-group-action-color)'};
  background-color: ${(p) => (p.$active ? 'var(--bs-list-group-active-bg)' : 'var(--bs-list-group-bg)')};
  border: var(--bs-list-group-border-width) solid
    ${(p) => (p.$active ? 'var(--bs-list-group-active-border-color)' : 'var(--bs-list-group-border-color)')};
  &:hover,
  &:focus {
    z-index: 1;
    text-decoration: none;
    color: ${(p) =>
      p.$active ? 'var(--bs-list-group-active-color)' : 'var(--bs-list-group-action-hover-color)'};
    background-color: ${(p) =>
      p.$active ? 'var(--bs-list-group-active-bg)' : 'var(--bs-list-group-action-hover-bg)'};
  }
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
            className={`list-group-item list-group-item-action${it.id === active ? ' active' : ''}`}
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
