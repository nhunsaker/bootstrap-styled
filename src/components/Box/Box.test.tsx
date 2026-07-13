import type { ReactElement } from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Box } from './Box'
import { getUtilityClasses } from './utilityMap'

// Box emits plain Bootstrap utility classNames on a DOM element; it needs no
// theme provider (unlike styled-components components), so we render bare.
function classesOf(ui: ReactElement): string {
  const { container } = render(ui)
  return (container.firstElementChild as HTMLElement).className
}

describe('Box · class mapping', () => {
  it('maps m={3} d="flex" bg="primary" → "m-3 d-flex bg-primary"', () => {
    expect(classesOf(<Box m={3} d="flex" bg="primary" />)).toBe('m-3 d-flex bg-primary')
  })

  it('maps responsive m={{ base: 2, md: 4 }} → "m-2 m-md-4"', () => {
    expect(classesOf(<Box m={{ base: 2, md: 4 }} />)).toBe('m-2 m-md-4')
  })

  it('emits every breakpoint infix in base→xxl order', () => {
    expect(getUtilityClasses({ p: { base: 0, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 } })).toBe(
      'p-0 p-sm-1 p-md-2 p-lg-3 p-xl-4 p-xxl-5',
    )
  })

  it('maps flex / justify / align / gap to real Bootstrap classes', () => {
    expect(
      classesOf(<Box d="flex" flex="column" justify="between" align="center" gap={2} />),
    ).toBe('d-flex flex-column justify-content-between align-items-center gap-2')
  })

  it('maps margin auto and directional spacing', () => {
    // emission order follows the UTILITIES table (m, mt, mb, ms, me, mx, my, p…), not prop order
    expect(classesOf(<Box mx="auto" mt={2} pb={4} />)).toBe('mt-2 mx-auto pb-4')
  })

  it('maps border / borderColor / borderWidth / rounded / shadow', () => {
    expect(
      classesOf(<Box border borderColor="primary" borderWidth={2} rounded="pill" shadow="sm" />),
    ).toBe('border border-primary border-2 rounded-pill shadow-sm')
  })

  it('maps border sides and removals', () => {
    expect(classesOf(<Box border="top" />)).toBe('border-top')
    expect(classesOf(<Box border={0} />)).toBe('border-0')
    expect(classesOf(<Box border="end-0" />)).toBe('border-end-0')
    expect(classesOf(<Box border={false} />)).toBe('')
  })

  it('maps bare-prefix utilities: rounded / shadow / border true', () => {
    expect(classesOf(<Box rounded shadow border />)).toBe('border rounded shadow')
  })

  it('maps sizing / position / overflow / opacity / zIndex', () => {
    expect(
      classesOf(<Box w={50} h={100} position="absolute" overflow="hidden" opacity={75} zIndex={3} />),
    ).toBe('w-50 h-100 position-absolute overflow-hidden opacity-75 z-3')
    expect(classesOf(<Box zIndex={-1} />)).toBe('z-n1')
  })

  it('maps text and bg subtle variants', () => {
    expect(classesOf(<Box bg="primary-subtle" text="danger-emphasis" />)).toBe(
      'bg-primary-subtle text-danger-emphasis',
    )
  })
})

describe('Box · className passthrough (order)', () => {
  it('appends user className AFTER generated classes so it can override', () => {
    expect(classesOf(<Box m={3} className="mt-3" />)).toBe('m-3 mt-3')
  })

  it('renders className alone when no utility props', () => {
    expect(classesOf(<Box className="custom" />)).toBe('custom')
  })

  it('emits no class attribute when nothing is provided', () => {
    const { container } = render(<Box />)
    expect((container.firstElementChild as HTMLElement).hasAttribute('class')).toBe(false)
  })
})

describe('Box · polymorphism & DOM props', () => {
  it('defaults to a div', () => {
    const { container } = render(<Box m={1} />)
    expect(container.firstElementChild?.tagName).toBe('DIV')
  })

  it('renders as another element via as="section" and forwards DOM props', () => {
    const { container } = render(
      <Box as="section" id="hero" p={4} data-testid="x">
        hi
      </Box>,
    )
    const el = container.firstElementChild as HTMLElement
    expect(el.tagName).toBe('SECTION')
    expect(el.id).toBe('hero')
    expect(el.className).toBe('p-4')
    expect(el.getAttribute('data-testid')).toBe('x')
    // utility props must NOT leak to the DOM
    expect(el.hasAttribute('p')).toBe(false)
  })
})

describe('getUtilityClasses · memoization', () => {
  it('returns identical (===) strings for equal prop sets', () => {
    const a = getUtilityClasses({ m: 3, d: 'flex' })
    const b = getUtilityClasses({ m: 3, d: 'flex' })
    expect(a).toBe(b)
  })

  it('is prop-order-independent in its cache key', () => {
    expect(getUtilityClasses({ d: 'flex', m: 3 })).toBe('m-3 d-flex')
  })
})
