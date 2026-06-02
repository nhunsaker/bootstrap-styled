import React, { createContext, useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
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
  activeIndex: number | null
  getReferenceProps: (p?: Record<string, unknown>) => Record<string, unknown>
  getFloatingProps: (p?: Record<string, unknown>) => Record<string, unknown>
  getItemProps: (p?: Record<string, unknown>) => Record<string, unknown>
  elementsRef: React.MutableRefObject<Array<HTMLElement | null>>
  labelsRef: React.MutableRefObject<Array<string | null>>
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const elementsRef = useRef<Array<HTMLElement | null>>([])
  const labelsRef = useRef<Array<string | null>>([])

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
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  })
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
  ])

  return (
    <DropdownCtx.Provider
      value={{
        open,
        setOpen,
        refs,
        floatingStyles,
        context,
        activeIndex,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        elementsRef,
        labelsRef,
      }}
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
  const { open, refs, floatingStyles, context, getFloatingProps, elementsRef, labelsRef } =
    useDropdown()
  if (!open) return null
  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false}>
        <Menu ref={refs.setFloating} style={floatingStyles} {...(getFloatingProps() as object)}>
          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {children}
          </FloatingList>
        </Menu>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}

const Item = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  font: inherit;
  text-align: left;
  color: var(--bs-body-color);
  background: ${(p) =>
    p.$active ? 'color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg))' : 'none'};
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
  }
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

export function DropdownItem({ children, onClick, disabled, ...rest }: DropdownItemProps) {
  const { activeIndex, getItemProps, setOpen } = useDropdown()
  const { ref, index } = useListItem({
    label: typeof children === 'string' ? children : undefined,
  })
  const isActive = activeIndex === index
  return (
    <Item
      ref={ref}
      disabled={disabled}
      {...rest}
      {...(getItemProps({
        onClick(e: React.MouseEvent<HTMLButtonElement>) {
          onClick?.(e)
          if (!disabled) setOpen(false)
        },
      }) as object)}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      $active={isActive}
    >
      {children}
    </Item>
  )
}

export const DropdownDivider = styled.hr`
  height: 0;
  margin: 0.5rem 0;
  border: 0;
  border-top: 1px solid var(--bs-border-color);
`
