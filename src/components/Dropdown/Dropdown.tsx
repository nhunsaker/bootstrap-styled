import React, { createContext, useContext, useState } from 'react'
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
} from '@floating-ui/react'
import { Button } from '../Button/Button'
import type { ButtonProps } from '../Button/Button'

interface DropdownContextValue {
  open: boolean
  setOpen: (o: boolean) => void
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: React.CSSProperties
  context: ReturnType<typeof useFloating>['context']
  getReferenceProps: (p?: Record<string, unknown>) => Record<string, unknown>
  getFloatingProps: (p?: Record<string, unknown>) => Record<string, unknown>
}

const DropdownCtx = createContext<DropdownContextValue | null>(null)
const useDropdown = () => {
  const ctx = useContext(DropdownCtx)
  if (!ctx) throw new Error('Dropdown.* must be used within <Dropdown>')
  return ctx
}

export interface DropdownProps {
  children: React.ReactNode
}

export function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  return (
    <DropdownCtx.Provider
      value={{ open, setOpen, refs, floatingStyles, context, getReferenceProps, getFloatingProps }}
    >
      <span style={{ display: 'inline-block', position: 'relative' }}>{children}</span>
    </DropdownCtx.Provider>
  )
}

export interface DropdownToggleProps extends ButtonProps {}

export function DropdownToggle({ variant = 'secondary', children, ...rest }: DropdownToggleProps) {
  const { refs, getReferenceProps, open } = useDropdown()
  return (
    <Button
      ref={refs.setReference as React.Ref<HTMLButtonElement>}
      variant={variant}
      aria-haspopup="menu"
      aria-expanded={open}
      {...(getReferenceProps(rest as Record<string, unknown>) as object)}
    >
      {children}
    </Button>
  )
}

const Menu = styled.div`
  min-width: 10rem;
  padding: 0.5rem 0;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 1000;
  outline: 0;
`

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const { open, refs, floatingStyles, context, getFloatingProps } = useDropdown()
  if (!open) return null
  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <Menu ref={refs.setFloating} style={floatingStyles} {...(getFloatingProps() as object)}>
          {children}
        </Menu>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}

const Item = styled.button`
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  font: inherit;
  text-align: left;
  color: var(--bs-body-color);
  background: none;
  border: 0;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: 0;
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
  }
  &:disabled {
    color: var(--bs-secondary);
    pointer-events: none;
  }
`

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownItem({ onClick, disabled, ...rest }: DropdownItemProps) {
  const { setOpen } = useDropdown()
  return (
    <Item
      role="menuitem"
      disabled={disabled}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (!disabled) setOpen(false)
      }}
    />
  )
}

export const DropdownDivider = styled.hr`
  height: 0;
  margin: 0.5rem 0;
  border: 0;
  border-top: 1px solid var(--bs-border-color);
`
