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
import { PortalScope } from '../../theme/PortalScope'

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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${(p) => (p.$size ? SIZES[p.$size] : '500px')};
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color-translucent);
  border-radius: var(--bs-border-radius-lg);
  box-shadow: var(--bs-box-shadow);
  outline: 0;
`

export function Modal({ show, onHide, size, centered, staticBackdrop, children }: ModalProps) {
  const { refs, context } = useFloating({
    open: show,
    onOpenChange: (o) => {
      if (!o) onHide()
    },
  })
  // No reference element (opened by an external button), so outsidePress would
  // treat the opening click as a dismiss. Use Escape here + an explicit backdrop
  // mousedown below instead.
  const dismiss = useDismiss(context, { outsidePress: false, escapeKey: true })
  const role = useRole(context)
  const { getFloatingProps } = useInteractions([dismiss, role])

  if (!show) return null

  return (
    <FloatingPortal>
      <PortalScope>
        <Overlay
          lockScroll
          $centered={centered}
          onMouseDown={(e) => {
            if (!staticBackdrop && e.target === e.currentTarget) onHide()
          }}
        >
          <FloatingFocusManager context={context} modal>
            <Dialog ref={refs.setFloating} $size={size} aria-modal="true" {...getFloatingProps()}>
              {children}
            </Dialog>
          </FloatingFocusManager>
        </Overlay>
      </PortalScope>
    </FloatingPortal>
  )
}

const INNER_RADIUS = 'calc(var(--bs-border-radius-lg) - 1px)'

export const ModalHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--bs-border-color);
  border-top-left-radius: ${INNER_RADIUS};
  border-top-right-radius: ${INNER_RADIUS};
`
export const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
`
export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`
export const ModalFooter = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid var(--bs-border-color);
  border-bottom-right-radius: ${INNER_RADIUS};
  border-bottom-left-radius: ${INNER_RADIUS};
`
