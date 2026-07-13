import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderWithTheme, screen, act } from '../../test/render'
import { ScrollspyNav, type ScrollspyItem } from './Scrollspy'

// ---------------------------------------------------------------------------
// Mock IntersectionObserver — jsdom has none. Captures the callback + config so
// tests can drive intersection entries and assert Bootstrap's IO config is used.
// ---------------------------------------------------------------------------
type IOCallback = (entries: IntersectionObserverEntry[]) => void
interface MockIO {
  callback: IOCallback
  options: IntersectionObserverInit
  observed: Element[]
}
let ios: MockIO[] = []

class MockIntersectionObserver {
  callback: IOCallback
  options: IntersectionObserverInit
  observed: Element[] = []
  constructor(cb: IOCallback, options: IntersectionObserverInit = {}) {
    this.callback = cb
    this.options = options
    ios.push(this as unknown as MockIO)
  }
  observe(el: Element) {
    this.observed.push(el)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

const items: ScrollspyItem[] = [
  { id: 'sec-a', label: 'A' },
  { id: 'sec-b', label: 'B' },
  { id: 'sec-c', label: 'C' },
]

function makeSections() {
  items.forEach((it, i) => {
    const el = document.createElement('section')
    el.id = it.id
    Object.defineProperty(el, 'offsetTop', { configurable: true, value: i * 500 })
    document.body.appendChild(el)
  })
}

const entry = (id: string, isIntersecting: boolean): IntersectionObserverEntry =>
  ({
    target: document.getElementById(id) as Element,
    isIntersecting,
  }) as IntersectionObserverEntry

beforeEach(() => {
  ios = []
  ;(globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver
  makeSections()
  document.documentElement.scrollTop = 0
})

afterEach(() => {
  items.forEach((it) => document.getElementById(it.id)?.remove())
})

describe('Scrollspy', () => {
  it('defaults the active item to the first section', () => {
    renderWithTheme(<ScrollspyNav items={items} />)
    expect(screen.getByText('A').closest('a')).toHaveClass('active')
  })

  it("uses Bootstrap 5.3.8's IO config defaults (rootMargin + threshold)", () => {
    renderWithTheme(<ScrollspyNav items={items} />)
    expect(ios.length).toBeGreaterThan(0)
    expect(ios[0].options.rootMargin).toBe('0px 0px -25%')
    expect(ios[0].options.threshold).toEqual([0.1, 0.5, 1])
    expect(ios[0].observed).toHaveLength(3)
  })

  it('activates a lower section as it intersects while scrolling down', () => {
    renderWithTheme(<ScrollspyNav items={items} />)
    // Scroll down, section B enters.
    document.documentElement.scrollTop = 400
    act(() => {
      ios[0].callback([entry('sec-b', true)])
    })
    expect(screen.getByText('B').closest('a')).toHaveClass('active')
    expect(screen.getByText('A').closest('a')).not.toHaveClass('active')
  })

  it('renders list-group items with the greyed .list-group-item-action class', () => {
    renderWithTheme(<ScrollspyNav items={items} variant="list-group" />)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link).toHaveClass('list-group-item')
      expect(link).toHaveClass('list-group-item-action')
    }
    // Active item keeps the active class on top of the action class.
    expect(screen.getByText('A').closest('a')).toHaveClass('active')
  })
})
