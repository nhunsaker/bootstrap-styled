import React from 'react'
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import { renderWithTheme, fireEvent, waitFor } from '../../test/render'
import { Carousel, CarouselItem, type CarouselSlideEvent } from './Carousel'

// jsdom has no PointerEvent — polyfill one that carries pointerType + clientX so
// fireEvent.pointerDown/Up can drive the swipe handlers.
beforeAll(() => {
  if (typeof (globalThis as { PointerEvent?: unknown }).PointerEvent === 'undefined') {
    class PointerEventPolyfill extends MouseEvent {
      pointerType: string
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init)
        this.pointerType = init.pointerType ?? ''
      }
    }
    ;(globalThis as { PointerEvent?: unknown }).PointerEvent = PointerEventPolyfill
    ;(window as { PointerEvent?: unknown }).PointerEvent = PointerEventPolyfill
  }
})

function ThreeSlides(props: Omit<React.ComponentProps<typeof Carousel>, 'children'>) {
  return (
    <Carousel {...props}>
      <CarouselItem>One</CarouselItem>
      <CarouselItem>Two</CarouselItem>
      <CarouselItem>Three</CarouselItem>
    </Carousel>
  )
}

const setHidden = (hidden: boolean) => {
  Object.defineProperty(document, 'hidden', { configurable: true, value: hidden })
}

afterEach(() => setHidden(false))

describe('Carousel', () => {
  it('advances with ArrowRight / ArrowLeft (keyboard still works)', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const root = container.querySelector('.carousel') as HTMLElement

    fireEvent.keyDown(root, { key: 'ArrowRight' })
    await waitFor(() =>
      expect(onSlide).toHaveBeenCalledWith(
        expect.objectContaining({ from: 0, to: 1, direction: 'next' }),
      ),
    )
  })

  it('ArrowLeft from the first slide wraps backwards to the last', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const root = container.querySelector('.carousel') as HTMLElement

    fireEvent.keyDown(root, { key: 'ArrowLeft' })
    await waitFor(() =>
      expect(onSlide).toHaveBeenCalledWith(
        expect.objectContaining({ from: 0, to: 2, direction: 'prev' }),
      ),
    )
  })

  it('fires distinct onSlide (begin) then onSlid (settle)', async () => {
    const events: string[] = []
    const onSlide = (e: CarouselSlideEvent) => events.push(`slide:${e.from}->${e.to}`)
    const onSlid = (e: CarouselSlideEvent) => events.push(`slid:${e.from}->${e.to}`)
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} onSlid={onSlid} />)
    const root = container.querySelector('.carousel') as HTMLElement

    fireEvent.keyDown(root, { key: 'ArrowRight' })
    await waitFor(() => expect(events).toContain('slide:0->1'))
    // onSlide must fire before onSlid, and onSlid must eventually arrive.
    await waitFor(() => expect(events).toContain('slid:0->1'))
    expect(events.indexOf('slide:0->1')).toBeLessThan(events.indexOf('slid:0->1'))
  })

  it('swipe left (touch pointer) advances to the next slide', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const inner = container.querySelector('.carousel-inner') as HTMLElement

    fireEvent.pointerDown(inner, { pointerType: 'touch', clientX: 300 })
    fireEvent.pointerUp(inner, { pointerType: 'touch', clientX: 100 })
    await waitFor(() =>
      expect(onSlide).toHaveBeenCalledWith(expect.objectContaining({ to: 1, direction: 'next' })),
    )
  })

  it('swipe right (touch pointer) goes to the previous slide (wraps)', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const inner = container.querySelector('.carousel-inner') as HTMLElement

    fireEvent.pointerDown(inner, { pointerType: 'touch', clientX: 100 })
    fireEvent.pointerUp(inner, { pointerType: 'touch', clientX: 300 })
    await waitFor(() =>
      expect(onSlide).toHaveBeenCalledWith(expect.objectContaining({ to: 2, direction: 'prev' })),
    )
  })

  it('a sub-threshold drag (<=40px) does not slide', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const inner = container.querySelector('.carousel-inner') as HTMLElement

    fireEvent.pointerDown(inner, { pointerType: 'touch', clientX: 300 })
    fireEvent.pointerUp(inner, { pointerType: 'touch', clientX: 270 })
    await new Promise((r) => setTimeout(r, 60))
    expect(onSlide).not.toHaveBeenCalled()
  })

  it('a mouse pointer does not trigger swipe', async () => {
    const onSlide = vi.fn()
    const { container } = renderWithTheme(<ThreeSlides onSlide={onSlide} />)
    const inner = container.querySelector('.carousel-inner') as HTMLElement

    fireEvent.pointerDown(inner, { pointerType: 'mouse', clientX: 300 })
    fireEvent.pointerUp(inner, { pointerType: 'mouse', clientX: 100 })
    await new Promise((r) => setTimeout(r, 60))
    expect(onSlide).not.toHaveBeenCalled()
  })

  it('does not autoplay while the document is hidden, resumes when visible', async () => {
    setHidden(true)
    const onSlide = vi.fn()
    renderWithTheme(<ThreeSlides ride="carousel" interval={40} onSlide={onSlide} />)

    // Hidden: the interval tick is suppressed.
    await new Promise((r) => setTimeout(r, 120))
    expect(onSlide).not.toHaveBeenCalled()

    // Become visible → autoplay re-arms and advances.
    setHidden(false)
    fireEvent(document, new Event('visibilitychange'))
    await waitFor(() => expect(onSlide).toHaveBeenCalled(), { timeout: 500 })
  })
})
