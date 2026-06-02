import React, { useState } from 'react'
import styled from 'styled-components'
import {
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

export interface TooltipProps {
  content: React.ReactNode
  placement?: Placement
  /** Single focusable element to attach the tooltip to. */
  children: React.ReactElement
}

const Bubble = styled.div`
  z-index: 1080;
  max-width: 200px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: #000;
  border-radius: var(--bs-border-radius);
`

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  })
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  const child = children as React.ReactElement<any>
  const childProps = (child.props ?? {}) as Record<string, unknown>

  return (
    <>
      {React.cloneElement(child, {
        ref: refs.setReference,
        ...getReferenceProps(childProps),
      })}
      {open && (
        <FloatingPortal>
          <Bubble ref={refs.setFloating} style={floatingStyles} {...(getFloatingProps() as object)}>
            {content}
          </Bubble>
        </FloatingPortal>
      )}
    </>
  )
}
