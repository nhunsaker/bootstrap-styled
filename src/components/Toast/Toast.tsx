import React from 'react'
import styled from 'styled-components'
import { CloseButton } from '../CloseButton'

// Shared close handler so <ToastHeader>'s dismiss button can close its <Toast>.
interface ToastCtx {
  onClose?: () => void
}
const ToastContext = React.createContext<ToastCtx>({})

export type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled visibility. Omit to use `defaultShow` (uncontrolled). */
  show?: boolean
  /** Uncontrolled initial visibility. Defaults to `true` so the toast renders statically. */
  defaultShow?: boolean
  /** Fired when the toast requests dismissal (autohide elapsed or close button). */
  onClose?: () => void
  /** Bootstrap `autohide` — auto-dismiss after `delay` ms while shown. */
  autohide?: boolean
  /** Auto-dismiss delay in ms (Bootstrap default 5000). */
  delay?: number
  as?: React.ElementType
}

// Bootstrap 5.3.8 `.toast` token block (verbatim; runtime-overridable). Note:
// 5.3.8 uses a translucent rgba() background (no backdrop-filter) + box-shadow.
const StyledToast = styled.div<{ $show: boolean }>`
  --bs-toast-zindex: 1090;
  --bs-toast-padding-x: 0.75rem;
  --bs-toast-padding-y: 0.5rem;
  --bs-toast-spacing: 1.5rem;
  --bs-toast-max-width: 350px;
  --bs-toast-font-size: 0.875rem;
  --bs-toast-color: ;
  --bs-toast-bg: rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85);
  --bs-toast-border-width: var(--bs-border-width, 1px);
  --bs-toast-border-color: var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));
  --bs-toast-border-radius: var(--bs-border-radius, 0.375rem);
  --bs-toast-box-shadow: var(--bs-box-shadow, 0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  --bs-toast-header-color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
  --bs-toast-header-bg: rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85);
  --bs-toast-header-border-color: var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));

  width: var(--bs-toast-max-width);
  max-width: 100%;
  font-size: var(--bs-toast-font-size);
  color: var(--bs-toast-color);
  pointer-events: auto;
  background-color: var(--bs-toast-bg);
  background-clip: padding-box;
  border: var(--bs-toast-border-width) solid var(--bs-toast-border-color);
  box-shadow: var(--bs-toast-box-shadow);
  border-radius: var(--bs-toast-border-radius);
  ${(p) => (p.$show ? '' : 'display: none;')}
`

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      show,
      defaultShow = true,
      onClose,
      autohide = false,
      delay = 5000,
      role = 'alert',
      ...rest
    },
    ref,
  ) => {
    const isControlled = show !== undefined
    const [internalShow, setInternalShow] = React.useState(defaultShow)
    const shown = isControlled ? show : internalShow

    const handleClose = React.useCallback(() => {
      if (!isControlled) setInternalShow(false)
      onClose?.()
    }, [isControlled, onClose])

    React.useEffect(() => {
      if (!shown || !autohide) return
      const id = window.setTimeout(handleClose, delay)
      return () => window.clearTimeout(id)
    }, [shown, autohide, delay, handleClose])

    const ctx = React.useMemo<ToastCtx>(() => ({ onClose: handleClose }), [handleClose])

    return (
      <ToastContext.Provider value={ctx}>
        <StyledToast
          ref={ref}
          $show={!!shown}
          role={role}
          aria-live="assertive"
          aria-atomic="true"
          {...rest}
        />
      </ToastContext.Provider>
    )
  },
)
Toast.displayName = 'Toast'

// --- Header ----------------------------------------------------------------

export interface ToastHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render the built-in dismiss button (wired to the parent Toast). Default true. */
  closeButton?: boolean
  as?: React.ElementType
}

const StyledToastHeader = styled.div`
  display: flex;
  align-items: center;
  padding: var(--bs-toast-padding-y, 0.5rem) var(--bs-toast-padding-x, 0.75rem);
  color: var(--bs-toast-header-color, var(--bs-secondary-color));
  background-color: var(--bs-toast-header-bg, rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85));
  background-clip: padding-box;
  border-bottom: var(--bs-toast-border-width, var(--bs-border-width, 1px)) solid
    var(--bs-toast-header-border-color, var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175)));
  border-top-left-radius: calc(
    var(--bs-toast-border-radius, 0.375rem) - var(--bs-toast-border-width, 1px)
  );
  border-top-right-radius: calc(
    var(--bs-toast-border-radius, 0.375rem) - var(--bs-toast-border-width, 1px)
  );

  /* .toast-header .btn-close spacing. */
  & > button[aria-label='Close'] {
    margin-right: calc(-0.5 * var(--bs-toast-padding-x, 0.75rem));
    margin-left: var(--bs-toast-padding-x, 0.75rem);
  }
`

export const ToastHeader = React.forwardRef<HTMLDivElement, ToastHeaderProps>(
  ({ closeButton = true, children, ...rest }, ref) => {
    const { onClose } = React.useContext(ToastContext)
    return (
      <StyledToastHeader ref={ref} {...rest}>
        {children}
        {closeButton && <CloseButton onClick={onClose} />}
      </StyledToastHeader>
    )
  },
)
ToastHeader.displayName = 'ToastHeader'

// --- Body ------------------------------------------------------------------

export const ToastBody = styled.div`
  padding: var(--bs-toast-padding-x, 0.75rem);
  word-wrap: break-word;
`

// --- Container -------------------------------------------------------------

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed-position placement of the toast stack (Bootstrap position utilities). */
  position?: ToastPosition
  as?: React.ElementType
}

const positionCss = (pos?: ToastPosition): string => {
  switch (pos) {
    case 'top-start':
      return 'position: fixed; top: 0; left: 0;'
    case 'top-center':
      return 'position: fixed; top: 0; left: 50%; transform: translateX(-50%);'
    case 'top-end':
      return 'position: fixed; top: 0; right: 0;'
    case 'middle-start':
      return 'position: fixed; top: 50%; left: 0; transform: translateY(-50%);'
    case 'middle-center':
      return 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'
    case 'middle-end':
      return 'position: fixed; top: 50%; right: 0; transform: translateY(-50%);'
    case 'bottom-start':
      return 'position: fixed; bottom: 0; left: 0;'
    case 'bottom-center':
      return 'position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);'
    case 'bottom-end':
      return 'position: fixed; bottom: 0; right: 0;'
    default:
      return 'position: absolute;'
  }
}

const StyledToastContainer = styled.div<{ $position?: ToastPosition }>`
  --bs-toast-zindex: 1090;
  ${(p) => positionCss(p.$position)}
  z-index: var(--bs-toast-zindex);
  width: max-content;
  max-width: 100%;
  pointer-events: none;

  & > :not(:last-child) {
    margin-bottom: var(--bs-toast-spacing, 1.5rem);
  }
`

export const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position, ...rest }, ref) => (
    <StyledToastContainer ref={ref} $position={position} {...rest} />
  ),
)
ToastContainer.displayName = 'ToastContainer'
