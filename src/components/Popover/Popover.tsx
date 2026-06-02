import React, { useState } from 'react'
import styled from 'styled-components'
import {
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

export interface PopoverProps {
  title?: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  /** Single element that toggles the popover on click. */
  children: React.ReactElement
}

const Card = styled.div`
  z-index: 1070;
  max-width: 276px;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`
const Header = styled.div`
  padding: 0.5rem 0.75rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  background-color: color-mix(in srgb, var(--bs-body-color) 4%, var(--bs-body-bg));
  border-bottom: 1px solid var(--bs-border-color);
`
const Body = styled.div`
  padding: 0.75rem;
`

export function Popover({ title, content, placement = 'top', children }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

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
          <FloatingFocusManager context={context} modal={false}>
            <Card ref={refs.setFloating} style={floatingStyles} {...(getFloatingProps() as object)}>
              {title != null && <Header>{title}</Header>}
              <Body>{content}</Body>
            </Card>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
