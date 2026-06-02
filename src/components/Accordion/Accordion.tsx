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

const HeaderButton = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border: 0;
  background-color: ${(p) =>
    p.$open ? 'color-mix(in srgb, var(--bs-primary) 10%, var(--bs-body-bg))' : 'var(--bs-body-bg)'};
  color: ${(p) => (p.$open ? 'var(--bs-primary)' : 'var(--bs-body-color)')};

  &::after {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(${(p) => (p.$open ? '-135deg' : '45deg')});
    transition: transform 0.2s ease;
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
