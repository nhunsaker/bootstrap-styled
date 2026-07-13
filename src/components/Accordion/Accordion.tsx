import React, { useState } from 'react'
import styled from 'styled-components'

export interface AccordionItemProps {
  eventKey: string
  header: React.ReactNode
  children?: React.ReactNode
}

// Marker component — Accordion reads its props.
export function AccordionItem(_props: AccordionItemProps): null {
  return null
}

export interface AccordionProps {
  /** Controlled open key(s). */
  activeKey?: string | string[]
  defaultActiveKey?: string | string[]
  /** Allow multiple items open at once. */
  alwaysOpen?: boolean
  onSelect?: (key: string | string[]) => void
  children: React.ReactNode
}

const Item = styled.div`
  border: 1px solid var(--bs-border-color);
  &:not(:first-child) {
    border-top: 0;
  }
  &:first-child {
    border-top-left-radius: var(--bs-border-radius);
    border-top-right-radius: var(--bs-border-radius);
  }
  &:last-child {
    border-bottom-left-radius: var(--bs-border-radius);
    border-bottom-right-radius: var(--bs-border-radius);
  }
`

// Bootstrap 5.3.8 accordion chevron icons (SVG data-URIs; light-theme stroke colors).
const CHEVRON_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23212529' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"
const CHEVRON_ACTIVE_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23052c65' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"
// Dark-theme ([data-bs-theme=dark]) chevron — stroke #6ea8fe for both states.
const CHEVRON_ICON_DARK =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236ea8fe' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"

const HeaderButton = styled.button<{ $open?: boolean }>`
  /* Bootstrap 5.3.8 .accordion active-state tokens (runtime-overridable). */
  --bs-accordion-active-bg: var(--bs-primary-bg-subtle, #cfe2ff);
  --bs-accordion-active-color: var(--bs-primary-text-emphasis, #052c65);
  --bs-accordion-btn-icon: ${CHEVRON_ICON};
  --bs-accordion-btn-active-icon: ${CHEVRON_ACTIVE_ICON};
  --bs-accordion-btn-icon-width: 1.25rem;
  [data-bs-theme='dark'] & {
    --bs-accordion-btn-icon: ${CHEVRON_ICON_DARK};
    --bs-accordion-btn-active-icon: ${CHEVRON_ICON_DARK};
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  /* Native .accordion-button sits in an <h2> and inherits heading line-height (1.2). */
  line-height: 1.2;
  text-align: left;
  cursor: pointer;
  border: 0;
  background-color: ${(p) =>
    p.$open ? 'var(--bs-accordion-active-bg)' : 'var(--bs-body-bg)'};
  color: ${(p) => (p.$open ? 'var(--bs-accordion-active-color)' : 'var(--bs-body-color)')};
  box-shadow: ${(p) =>
    p.$open ? 'inset 0 calc(-1 * var(--bs-border-width, 1px)) 0 var(--bs-border-color)' : 'none'};

  &::after {
    flex-shrink: 0;
    width: var(--bs-accordion-btn-icon-width);
    height: var(--bs-accordion-btn-icon-width);
    margin-left: auto;
    content: '';
    background-repeat: no-repeat;
    background-size: var(--bs-accordion-btn-icon-width);
    background-image: ${(p) =>
      p.$open ? 'var(--bs-accordion-btn-active-icon)' : 'var(--bs-accordion-btn-icon)'};
    transform: ${(p) => (p.$open ? 'rotate(-180deg)' : 'none')};
    transition: transform 0.2s ease-in-out;
  }
`

const Body = styled.div<{ $open?: boolean }>`
  display: grid;
  grid-template-rows: ${(p) => (p.$open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.2s ease;
  & > div {
    overflow: hidden;
  }
`

const BodyInner = styled.div`
  padding: 1rem 1.25rem;
`

const toArray = (k?: string | string[]): string[] => (k == null ? [] : Array.isArray(k) ? k : [k])

export function Accordion({
  activeKey,
  defaultActiveKey,
  alwaysOpen = false,
  onSelect,
  children,
}: AccordionProps) {
  const items = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<AccordionItemProps> => React.isValidElement(c),
  )
  const [internal, setInternal] = useState<string[]>(toArray(defaultActiveKey))
  const open = activeKey !== undefined ? toArray(activeKey) : internal

  const toggle = (key: string) => {
    let next: string[]
    if (open.includes(key)) next = open.filter((k) => k !== key)
    else next = alwaysOpen ? [...open, key] : [key]
    if (activeKey === undefined) setInternal(next)
    onSelect?.(alwaysOpen ? next : (next[0] ?? ''))
  }

  return (
    <div>
      {items.map((it) => {
        const key = it.props.eventKey
        const isOpen = open.includes(key)
        return (
          <Item key={key}>
            <HeaderButton type="button" $open={isOpen} aria-expanded={isOpen} onClick={() => toggle(key)}>
              {it.props.header}
            </HeaderButton>
            <Body $open={isOpen} role="region">
              <div>
                <BodyInner>{it.props.children}</BodyInner>
              </div>
            </Body>
          </Item>
        )
      })}
    </div>
  )
}
