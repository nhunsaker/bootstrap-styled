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
import { PortalScope } from '../../theme/PortalScope'

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
}

const DropdownCtx = createContext<DropdownContextValue | null>(null)
const useDropdown = () => {
  const ctx = useContext(DropdownCtx)
  if (!ctx) throw new Error('Dropdown.* must be used within <Dropdown>')
  return ctx
}

export interface DropdownProps {
  children: React.ReactNode
  /** Render the menu open from the first paint (harness/static use). */
  defaultOpen?: boolean
}

export function Dropdown({ children, defaultOpen = false }: DropdownProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Registered menuitem elements, for roving-tabindex arrow-key navigation.
  const elementsRef = useRef<Array<HTMLElement | null>>([])
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    // Bootstrap's dropdown Popper offset is [0, 2] (--bs-dropdown-spacer 0.125rem).
    middleware: [offset(2), flip(), shift({ padding: 8 })],
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
      }}
    >
      <FloatingList elementsRef={elementsRef}>
        <span style={{ display: 'inline-block', position: 'relative' }}>{children}</span>
      </FloatingList>
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
  font-size: 1rem;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color-translucent);
  border-radius: var(--bs-border-radius);
  z-index: 1000;
  outline: 0;
  /* Bootstrap's default .dropdown-menu carries no box-shadow. */
`

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const { open, refs, floatingStyles, context, getFloatingProps } = useDropdown()
  if (!open) return null
  return (
    <FloatingPortal>
      <PortalScope>
        <FloatingFocusManager context={context} modal={false}>
          <Menu ref={refs.setFloating} style={floatingStyles} {...(getFloatingProps() as object)}>
            {children}
          </Menu>
        </FloatingFocusManager>
      </PortalScope>
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
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: 0;
    color: var(--bs-body-color);
    background-color: var(--bs-tertiary-bg);
  }
  &.active,
  &:active {
    color: #fff;
    text-decoration: none;
    background-color: var(--bs-primary);
  }
  &:disabled {
    color: var(--bs-tertiary-color);
    pointer-events: none;
    background-color: transparent;
  }
`

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownItem({ onClick, disabled, ...rest }: DropdownItemProps) {
  const { setOpen, activeIndex, getItemProps } = useDropdown()
  const { ref, index } = useListItem()
  const isActive = activeIndex === index
  return (
    <Item
      ref={ref}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...(getItemProps({
        ...rest,
        onClick(e: React.MouseEvent<HTMLButtonElement>) {
          onClick?.(e)
          if (!disabled) setOpen(false)
        },
      }) as object)}
    />
  )
}

export const DropdownDivider = styled.hr`
  height: 0;
  margin: 0.5rem 0;
  border: 0;
  border-top: 1px solid var(--bs-border-color);
`
