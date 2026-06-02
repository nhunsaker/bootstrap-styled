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

export interface ModalProps {
  show: boolean
  onHide: () => void
  size?: 'sm' | 'lg' | 'xl'
  centered?: boolean
  /** Don't close on backdrop click. */
  staticBackdrop?: boolean
  children?: React.ReactNode
}

const Overlay = styled(FloatingOverlay)<{ $centered?: boolean }>`
  z-index: 1050;
  display: grid;
  place-items: ${(p) => (p.$centered ? 'center' : 'start center')};
  padding: 1.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.5);
`

const SIZES = { sm: '300px', lg: '800px', xl: '1140px' } as const

const Dialog = styled.div<{ $size?: 'sm' | 'lg' | 'xl' }>`
  width: 100%;
  max-width: ${(p) => (p.$size ? SIZES[p.$size] : '500px')};
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  outline: 0;
`

export function Modal({ show, onHide, size, centered, staticBackdrop, children }: ModalProps) {
  const { refs, context } = useFloating({
    open: show,
    onOpenChange: (o) => {
      if (!o) onHide()
    },
  })
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
    outsidePress: !staticBackdrop,
    escapeKey: true,
  })
  const role = useRole(context)
  const { getFloatingProps } = useInteractions([dismiss, role])

  if (!show) return null

  return (
    <FloatingPortal>
      <Overlay lockScroll $centered={centered}>
        <FloatingFocusManager context={context} modal>
          <Dialog ref={refs.setFloating} $size={size} aria-modal="true" {...getFloatingProps()}>
            {children}
          </Dialog>
        </FloatingFocusManager>
      </Overlay>
    </FloatingPortal>
  )
}

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--bs-border-color);
`
export const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
`
export const ModalBody = styled.div`
  padding: 1rem;
`
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid var(--bs-border-color);
`
