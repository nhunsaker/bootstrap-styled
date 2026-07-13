import React, { useState } from 'react'
import styled from 'styled-components'

export interface TabProps {
  eventKey: string
  title: React.ReactNode
  disabled?: boolean
  children?: React.ReactNode
}

// Marker component — Tabs reads its props; it never renders on its own.
export function Tab(_props: TabProps): null {
  return null
}

export interface TabsProps {
  /** Controlled active key. */
  activeKey?: string
  /** Uncontrolled initial active key. */
  defaultActiveKey?: string
  onSelect?: (key: string) => void
  children: React.ReactNode
}

const TabList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--bs-border-color);
`

const TabButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  margin-bottom: -1px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius);
  color: ${(p) => (p.$active ? 'var(--bs-body-color)' : 'var(--bs-link-color)')};

  &:hover {
    ${(p) => (p.$active ? '' : 'border-color: color-mix(in srgb, var(--bs-body-color) 12%, var(--bs-body-bg));')}
  }
  ${(p) =>
    p.$active
      ? `background-color: var(--bs-body-bg);
         border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);`
      : ''}
  ${(p) => (p.$disabled ? 'color: var(--bs-secondary); pointer-events: none;' : '')}
`

// Bootstrap .tab-pane has no padding (matches oracle).
const TabPanel = styled.div``

export function Tabs({ activeKey, defaultActiveKey, onSelect, children }: TabsProps) {
  const tabs = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<TabProps> => React.isValidElement(c),
  )
  const firstKey = tabs[0]?.props.eventKey
  const [internalKey, setInternalKey] = useState<string | undefined>(defaultActiveKey ?? firstKey)
  const current = activeKey ?? internalKey

  const select = (key: string) => {
    if (activeKey === undefined) setInternalKey(key)
    onSelect?.(key)
  }

  const active = tabs.find((t) => t.props.eventKey === current) ?? tabs[0]

  return (
    <div>
      <TabList role="tablist">
        {tabs.map((t) => {
          const key = t.props.eventKey
          const isActive = key === active?.props.eventKey
          return (
            <li key={key} role="presentation">
              <TabButton
                role="tab"
                type="button"
                aria-selected={isActive}
                $active={isActive}
                $disabled={t.props.disabled}
                disabled={t.props.disabled}
                onClick={() => select(key)}
              >
                {t.props.title}
              </TabButton>
            </li>
          )
        })}
      </TabList>
      <TabPanel role="tabpanel">{active?.props.children}</TabPanel>
    </div>
  )
}
