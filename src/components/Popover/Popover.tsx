import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
  arrow,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react'
import { PortalScope } from '../../theme/PortalScope'

export interface PopoverProps {
  title?: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  /** Render shown from the first paint (harness/static use). */
  defaultOpen?: boolean
  /** Single element that toggles the popover on click. */
  children: React.ReactElement
}

type Side = 'top' | 'bottom' | 'left' | 'right'

// ≙ Bootstrap `.popover`.
const Card = styled.div`
  z-index: 1070;
  max-width: 276px;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  background-clip: padding-box;
  border: 1px solid var(--bs-border-color-translucent);
  border-radius: var(--bs-border-radius-lg);
  /* Bootstrap's default .popover applies no box-shadow (var defined, not used). */
`
const Header = styled.div`
  padding: 0.5rem 1rem;
  margin: 0;
  font-size: 1rem;
  color: inherit;
  background-color: var(--bs-secondary-bg);
  border-bottom: 1px solid var(--bs-border-color-translucent);
  border-top-left-radius: calc(var(--bs-border-radius-lg) - 1px);
  border-top-right-radius: calc(var(--bs-border-radius-lg) - 1px);
`
const Body = styled.div`
  padding: 1rem;
  color: var(--bs-body-color);
`

// ≙ Bootstrap `.popover-arrow` (::before = border edge, ::after = fill).
const Arrow = styled.div<{ $side: Side }>`
  position: absolute;
  display: block;
  width: ${(p) => (p.$side === 'left' || p.$side === 'right' ? '0.5rem' : '1rem')};
  height: ${(p) => (p.$side === 'left' || p.$side === 'right' ? '1rem' : '0.5rem')};
  &::before,
  &::after {
    position: absolute;
    display: block;
    content: '';
    border-color: transparent;
    border-style: solid;
    border-width: 0;
  }
  ${(p) =>
    p.$side === 'top' &&
    `bottom: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0.5rem 0; }
     &::before { bottom: 0; border-top-color: var(--bs-border-color-translucent); }
     &::after { bottom: 1px; border-top-color: var(--bs-body-bg); }`}
  ${(p) =>
    p.$side === 'bottom' &&
    `top: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0 0.5rem 0.5rem; }
     &::before { top: 0; border-bottom-color: var(--bs-border-color-translucent); }
     &::after { top: 1px; border-bottom-color: var(--bs-body-bg); }`}
  ${(p) =>
    p.$side === 'left' &&
    `right: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0 0.5rem 0.5rem; }
     &::before { right: 0; border-left-color: var(--bs-border-color-translucent); }
     &::after { right: 1px; border-left-color: var(--bs-body-bg); }`}
  ${(p) =>
    p.$side === 'right' &&
    `left: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0.5rem 0.5rem 0; }
     &::before { left: 0; border-right-color: var(--bs-border-color-translucent); }
     &::after { left: 1px; border-right-color: var(--bs-body-bg); }`}
`

export function Popover({
  title,
  content,
  placement = 'top',
  defaultOpen = false,
  children,
}: PopoverProps) {
  const [open, setOpen] = useState(defaultOpen)
  const arrowRef = useRef<HTMLDivElement>(null)
  const { refs, floatingStyles, context, middlewareData, placement: finalPlacement } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const child = children as React.ReactElement<any>
  const childProps = (child.props ?? {}) as Record<string, unknown>

  const side = finalPlacement.split('-')[0] as Side
  const { x: ax, y: ay } = middlewareData.arrow ?? {}
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
            <FloatingFocusManager context={context} modal={false}>
              <Card
                ref={refs.setFloating}
                style={floatingStyles}
                {...(getFloatingProps() as object)}
              >
                <Arrow ref={arrowRef} $side={side} style={arrowStyle} />
                {title != null && <Header>{title}</Header>}
                <Body>{content}</Body>
              </Card>
            </FloatingFocusManager>
          </PortalScope>
        </FloatingPortal>
      )}
    </>
  )
}
