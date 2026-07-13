import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react'
import { PortalScope } from '../../theme/PortalScope'

export interface TooltipProps {
  content: React.ReactNode
  placement?: Placement
  /** Render shown from the first paint (harness/static use). */
  defaultOpen?: boolean
  /** Single focusable element to attach the tooltip to. */
  children: React.ReactElement
}

type Side = 'top' | 'bottom' | 'left' | 'right'

// Outer floating element ≙ Bootstrap `.tooltip`: transparent, carries the
// opacity + holds the arrow. `.show` → opacity var(--bs-tooltip-opacity)=0.9.
const TooltipRoot = styled.div`
  z-index: 1080;
  opacity: 0.9;
`

// Inner black bubble ≙ Bootstrap `.tooltip-inner`.
const Inner = styled.div`
  max-width: 200px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--bs-body-bg);
  text-align: center;
  background-color: var(--bs-emphasis-color);
  border-radius: var(--bs-border-radius);
`

// Arrow ≙ Bootstrap `.tooltip-arrow` + its ::before border-triangle.
const Arrow = styled.div<{ $side: Side }>`
  position: absolute;
  display: block;
  width: ${(p) => (p.$side === 'left' || p.$side === 'right' ? '0.4rem' : '0.8rem')};
  height: ${(p) => (p.$side === 'left' || p.$side === 'right' ? '0.8rem' : '0.4rem')};
  &::before {
    position: absolute;
    content: '';
    border-color: transparent;
    border-style: solid;
  }
  ${(p) =>
    p.$side === 'top' &&
    `bottom: -0.4rem;
     &::before { top: -1px; border-width: 0.4rem 0.4rem 0; border-top-color: var(--bs-emphasis-color); }`}
  ${(p) =>
    p.$side === 'bottom' &&
    `top: -0.4rem;
     &::before { bottom: -1px; border-width: 0 0.4rem 0.4rem; border-bottom-color: var(--bs-emphasis-color); }`}
  ${(p) =>
    p.$side === 'left' &&
    `right: -0.4rem;
     &::before { left: -1px; border-width: 0.4rem 0 0.4rem 0.4rem; border-left-color: var(--bs-emphasis-color); }`}
  ${(p) =>
    p.$side === 'right' &&
    `left: -0.4rem;
     &::before { right: -1px; border-width: 0.4rem 0.4rem 0.4rem 0; border-right-color: var(--bs-emphasis-color); }`}
`

export function Tooltip({ content, placement = 'top', defaultOpen = false, children }: TooltipProps) {
  const [open, setOpen] = useState(defaultOpen)
  const arrowRef = useRef<HTMLDivElement>(null)
  const { refs, floatingStyles, context, middlewareData, placement: finalPlacement } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  })
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  const child = children as React.ReactElement<any>
  const childProps = (child.props ?? {}) as Record<string, unknown>

  const side = finalPlacement.split('-')[0] as Side
  const { x: ax, y: ay } = middlewareData.arrow ?? {}
  // Cross-axis offset only; the static-side inset is baked into the styled Arrow.
  const arrowStyle: React.CSSProperties = {
    left: ax != null ? `${ax}px` : undefined,
    top: ay != null ? `${ay}px` : undefined,
  }

  return (
    <>
      {React.cloneElement(child, {
        ref: refs.setReference,
        ...getReferenceProps(childProps),
      })}
      {open && (
        <FloatingPortal>
          <PortalScope>
            <TooltipRoot
              ref={refs.setFloating}
              style={floatingStyles}
              {...(getFloatingProps() as object)}
            >
              <Arrow ref={arrowRef} $side={side} style={arrowStyle} />
              <Inner>{content}</Inner>
            </TooltipRoot>
          </PortalScope>
        </FloatingPortal>
      )}
    </>
  )
}
