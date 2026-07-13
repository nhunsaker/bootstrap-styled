import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render } from '@testing-library/react'
import { Icon } from './Icon'
import { IconBase } from './IconBase'
import { BsIconAlarm } from './icons'

/** Pull every <path d="…"> value out of a chunk of SVG markup, in order. */
function pathData(svg: string): string[] {
  return [...svg.matchAll(/<path[^>]*\sd="([^"]*)"/g)].map((m) => m[1])
}

describe('Icon (dynamic)', () => {
  it('renders an SVG with Bootstrap Icons defaults', () => {
    const { container } = render(<Icon name="alarm" />)
    const svg = container.querySelector('svg')!
    expect(svg).toBeTruthy()
    expect(svg.getAttribute('viewBox')).toBe('0 0 16 16')
    expect(svg.getAttribute('fill')).toBe('currentColor')
    expect(svg.getAttribute('width')).toBe('1em')
    expect(svg.getAttribute('height')).toBe('1em')
    expect(svg.getAttribute('class')).toBe('bi bi-alarm')
  })

  it('is decorative (aria-hidden) by default', () => {
    const { container } = render(<Icon name="alarm" />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.getAttribute('focusable')).toBe('false')
    expect(svg.hasAttribute('role')).toBe(false)
  })

  it('becomes meaningful (role=img + aria-label) when labelled', () => {
    const { container } = render(<Icon name="alarm" label="Alarm" />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('role')).toBe('img')
    expect(svg.getAttribute('aria-label')).toBe('Alarm')
    expect(svg.hasAttribute('aria-hidden')).toBe(false)
  })

  it('emits a <title> and uses it as the accessible name', () => {
    const { container } = render(<Icon name="alarm" title="Set alarm" />)
    const svg = container.querySelector('svg')!
    expect(svg.querySelector('title')?.textContent).toBe('Set alarm')
    expect(svg.getAttribute('role')).toBe('img')
    expect(svg.getAttribute('aria-label')).toBe('Set alarm')
  })

  it('sizes via the size prop (number → px, string passthrough)', () => {
    const { container: c1 } = render(<Icon name="alarm" size={32} />)
    expect(c1.querySelector('svg')!.getAttribute('width')).toBe('32')
    const { container: c2 } = render(<Icon name="alarm" size="2rem" />)
    expect(c2.querySelector('svg')!.getAttribute('height')).toBe('2rem')
  })

  it('merges a passed className after the bi classes', () => {
    const { container } = render(<Icon name="alarm" className="me-2" />)
    expect(container.querySelector('svg')!.getAttribute('class')).toBe('bi bi-alarm me-2')
  })

  it('renders nothing for an unknown name', () => {
    const { container } = render(<Icon name="not-a-real-icon-xyz" />)
    expect(container.querySelector('svg')).toBeNull()
  })
})

describe('tree-shakeable per-icon export', () => {
  it('BsIconAlarm renders the alarm glyph', () => {
    const { container } = render(<BsIconAlarm />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('class')).toBe('bi bi-alarm')
    expect(svg.querySelectorAll('path').length).toBe(2)
  })

  it('accepts the same a11y/size props as <Icon>', () => {
    const { container } = render(<BsIconAlarm label="Alarm" size={24} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('role')).toBe('img')
    expect(svg.getAttribute('aria-label')).toBe('Alarm')
    expect(svg.getAttribute('width')).toBe('24')
  })
})

describe('SVG fidelity vs the vendored bootstrap-icons set', () => {
  it('path data matches alarm.svg byte-for-byte (dynamic + per-icon)', () => {
    const vendored = readFileSync(
      resolve(__dirname, '../../../node_modules/bootstrap-icons/icons/alarm.svg'),
      'utf8',
    )
    const expected = pathData(vendored)
    expect(expected.length).toBe(2)

    const dyn = render(<Icon name="alarm" />).container.querySelector('svg')!.innerHTML
    const bs = render(<BsIconAlarm />).container.querySelector('svg')!.innerHTML

    expect(pathData(dyn)).toEqual(expected)
    expect(pathData(bs)).toEqual(expected)
  })
})

describe('IconBase', () => {
  it('is the low-level renderer used by both forms', () => {
    const { container } = render(<IconBase svgInner={'<path d="M0 0h16v16H0z"/>'} bsName="probe" />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('class')).toBe('bi bi-probe')
    expect(svg.querySelector('path')!.getAttribute('d')).toBe('M0 0h16v16H0z')
  })
})
