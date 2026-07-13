import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true the content is expanded; false collapses it. Drives the transition. */
  show?: boolean
  /** Collapse along the inline (width) axis — Bootstrap's `.collapse-horizontal`. */
  horizontal?: boolean
  children?: React.ReactNode
}

// Bootstrap 5.3.8 verbatim:
//   .collapse:not(.show){display:none}
//   .collapsing{height:0;overflow:hidden;transition:height .35s ease}
//   .collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}
//   @media (prefers-reduced-motion:reduce){.collapsing{transition:none}}
// The runtime transition target (the pixel height/width) is written as an inline
// style during the animation; these class rules supply everything else. Status is
// driven imperatively via `data-collapse` so React never clobbers the mid-flight
// class the way it would a rendered prop.
const CollapseRoot = styled.div`
  &[data-collapse='hide'] {
    display: none;
  }
  &[data-collapse='collapsing'] {
    height: 0;
    overflow: hidden;
    transition: height 0.35s ease;
  }
  &.collapse-horizontal[data-collapse='collapsing'] {
    width: 0;
    height: auto;
    transition: width 0.35s ease;
  }
  @media (prefers-reduced-motion: reduce) {
    &[data-collapse='collapsing'] {
      transition: none;
    }
  }
`

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { show = false, horizontal = false, className, children, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const mounted = useRef(false)
  const dim = horizontal ? 'width' : 'height'
  const scrollDim = horizontal ? 'scrollWidth' : 'scrollHeight'

  // Ref callback — set the settled status synchronously on mount (pre-paint) so
  // there's no flash and `show` renders statically for the harness.
  const setNode = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (node && !node.dataset.collapse) {
        node.dataset.collapse = show ? 'show' : 'hide'
      }
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    // `show` intentionally read once for the initial paint only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    // Skip the very first effect run — the mount status is already set above.
    if (!mounted.current) {
      mounted.current = true
      return
    }

    let raf = 0
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el) return
      el.dataset.collapse = show ? 'show' : 'hide'
      el.style[dim] = ''
      el.removeEventListener('transitionend', onEnd)
    }

    if (show) {
      // opening: collapsing @ 0 → scroll size
      el.dataset.collapse = 'collapsing'
      el.style[dim] = '0px'
      void el.offsetHeight // reflow so the 0 baseline is committed
      raf = requestAnimationFrame(() => {
        el.style[dim] = `${el[scrollDim]}px`
      })
    } else {
      // closing: current size → 0
      el.style[dim] = `${el.getBoundingClientRect()[dim]}px`
      void el.offsetHeight // reflow so the explicit size is committed
      el.dataset.collapse = 'collapsing'
      raf = requestAnimationFrame(() => {
        el.style[dim] = '0px'
      })
    }
    el.addEventListener('transitionend', onEnd)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('transitionend', onEnd)
    }
  }, [show, dim, scrollDim])

  return (
    <CollapseRoot
      ref={setNode}
      className={['collapse', horizontal ? 'collapse-horizontal' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </CollapseRoot>
  )
})

// ---------------------------------------------------------------------------
// useCollapse — optional toggler-aria wiring helper.
//
// Bootstrap wires a `[data-bs-toggle="collapse"]` trigger to a collapse region
// by keeping `aria-expanded` on the trigger in sync with the region's shown
// state and pointing `aria-controls` at the region's id (see the oracle's
// Collapse plugin, `Bt='[data-bs-toggle="collapse"]'`). This hook does that
// coordination for a *provided* trigger without coupling Collapse to any
// particular consumer (Accordion, Navbar, a bare button, …): spread
// `toggleProps` onto the trigger and `collapseProps` onto <Collapse>. It stays
// a standalone primitive — nothing here imports Accordion/Navbar.
// ---------------------------------------------------------------------------

export interface UseCollapseOptions {
  /** Uncontrolled initial open state. Default false. */
  defaultOpen?: boolean
  /** Controlled open state. When provided, the hook does not own the state. */
  open?: boolean
  /** id linking the trigger (`aria-controls`) to the collapse region. Auto-generated if omitted. */
  id?: string
  /** Called whenever the open state changes (fires in controlled + uncontrolled modes). */
  onToggle?: (open: boolean) => void
}

export interface UseCollapseReturn {
  /** Current open state. */
  open: boolean
  /** Imperatively set the open state. */
  setOpen: (open: boolean) => void
  /** Flip the open state. */
  toggle: () => void
  /** Spread onto the trigger (button/link): wires `aria-expanded`/`aria-controls`/`onClick`. */
  toggleProps: {
    'aria-expanded': boolean
    'aria-controls': string
    onClick: () => void
  }
  /** Spread onto `<Collapse>`: supplies the matching `id` + `show`. */
  collapseProps: { id: string; show: boolean }
}

export function useCollapse(options: UseCollapseOptions = {}): UseCollapseReturn {
  const generatedId = React.useId()
  const id = options.id ?? generatedId
  const isControlled = options.open != null
  const [internal, setInternal] = useState(options.defaultOpen ?? false)
  const open = isControlled ? (options.open as boolean) : internal

  // Keep the latest onToggle without churning the memoized callbacks.
  const onToggleRef = useRef(options.onToggle)
  onToggleRef.current = options.onToggle

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next)
      onToggleRef.current?.(next)
    },
    [isControlled],
  )
  const toggle = useCallback(() => setOpen(!open), [setOpen, open])

  return useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      toggleProps: { 'aria-expanded': open, 'aria-controls': id, onClick: toggle },
      collapseProps: { id, show: open },
    }),
    [open, setOpen, toggle, id],
  )
}
