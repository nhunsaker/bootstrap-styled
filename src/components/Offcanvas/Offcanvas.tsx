import React from 'react'
import styled from 'styled-components'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'

export type OffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom'

export interface OffcanvasProps {
  show: boolean
  onHide: () => void
  placement?: OffcanvasPlacement
  children?: React.ReactNode
}

const placementCss = (p: OffcanvasPlacement) => {
  switch (p) {
    case 'end':
      return 'top: 0; right: 0; height: 100%; width: min(400px, 100%); border-left: 1px solid var(--bs-border-color);'
    case 'top':
      return 'top: 0; left: 0; width: 100%; height: 30vh; border-bottom: 1px solid var(--bs-border-color);'
    case 'bottom':
      return 'bottom: 0; left: 0; width: 100%; height: 30vh; border-top: 1px solid var(--bs-border-color);'
    case 'start':
    default:
      return 'top: 0; left: 0; height: 100%; width: min(400px, 100%); border-right: 1px solid var(--bs-border-color);'
  }
}

const Panel = styled.div<{ $placement: OffcanvasPlacement }>`
  position: fixed;
  z-index: 1045;
  display: flex;
  flex-direction: column;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  outline: 0;
  ${(p) => placementCss(p.$placement)}
`

export function Offcanvas({ show, onHide, placement = 'start', children }: OffcanvasProps) {
  const { refs, context } = useFloating({
    open: show,
    onOpenChange: (o) => {
      if (!o) onHide()
    },
  })
  // Referenceless (external trigger) — Escape via useDismiss + explicit backdrop
  // mousedown below (outsidePress would dismiss on the opening click).
  const dismiss = useDismiss(context, { outsidePress: false, escapeKey: true })
  const role = useRole(context)
  const { getFloatingProps } = useInteractions([dismiss, role])

  if (!show) return null

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll
        style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1044 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onHide()
        }}
      >
        <FloatingFocusManager context={context} modal>
          <Panel ref={refs.setFloating} $placement={placement} aria-modal="true" {...getFloatingProps()}>
            {children}
          </Panel>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}

export const OffcanvasHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--bs-border-color);
`
export const OffcanvasTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
`
export const OffcanvasBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
`
