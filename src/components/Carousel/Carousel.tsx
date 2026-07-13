import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// ---------------------------------------------------------------------------
// Bootstrap 5.3.8 carousel control icons — SVG data-URIs copied verbatim from
// parity/oracle/bootstrap.min.css (fill %23fff; recolored to black in dark mode
// via the --bs-carousel-control-icon-filter invert, exactly like the oracle).
// ---------------------------------------------------------------------------
const PREV_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'/%3e%3c/svg%3e\")"
const NEXT_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e\")"

const SLIDE_MS = 600

// Every rule below is copied from the oracle; the transition-class choreography
// (item-next/-prev + item-start/-end) is driven by the state machine in Carousel
// exactly the way bootstrap.bundle.js drives it, so the visual result matches.
const CarouselRoot = styled.div`
  position: relative;

  &.carousel-dark,
  [data-bs-theme='dark'] & {
    --bs-carousel-indicator-active-bg: #000;
    --bs-carousel-caption-color: #000;
    --bs-carousel-control-icon-filter: invert(1) grayscale(100);
  }

  .carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .carousel-inner::after {
    display: block;
    clear: both;
    content: '';
  }

  .carousel-item {
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
    transition: transform 0.6s ease-in-out;
  }
  .carousel-item-next,
  .carousel-item-prev,
  .carousel-item.active {
    display: block;
  }
  .carousel-item-end,
  .carousel-item-next:not(.carousel-item-start) {
    transform: translateX(100%);
  }
  .carousel-item-start,
  .carousel-item-prev:not(.carousel-item-end) {
    transform: translateX(-100%);
  }

  &.carousel-fade .carousel-item {
    opacity: 0;
    transition-property: opacity;
    transform: none;
  }
  &.carousel-fade .carousel-item.active,
  &.carousel-fade .carousel-item-next.carousel-item-start,
  &.carousel-fade .carousel-item-prev.carousel-item-end {
    z-index: 1;
    opacity: 1;
  }
  &.carousel-fade .active.carousel-item-start,
  &.carousel-fade .active.carousel-item-end {
    z-index: 0;
    opacity: 0;
    transition: opacity 0s 0.6s;
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: none;
    filter: var(--bs-carousel-control-icon-filter);
    border: 0;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }
  .carousel-control-prev:hover,
  .carousel-control-prev:focus,
  .carousel-control-next:hover,
  .carousel-control-next:focus {
    color: #fff;
    text-decoration: none;
    outline: 0;
    opacity: 0.9;
  }
  .carousel-control-prev {
    left: 0;
  }
  .carousel-control-next {
    right: 0;
  }
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
  }
  .carousel-control-prev-icon {
    background-image: ${PREV_ICON};
  }
  .carousel-control-next-icon {
    background-image: ${NEXT_ICON};
  }

  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: 1rem;
    margin-left: 15%;
    list-style: none;
  }
  .carousel-indicators [data-bs-target] {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: var(--bs-carousel-indicator-active-bg, #fff);
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  }
  .carousel-indicators .active {
    opacity: 1;
  }

  .carousel-caption {
    position: absolute;
    right: 15%;
    bottom: 1.25rem;
    left: 15%;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    color: var(--bs-carousel-caption-color, #fff);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel-item,
    .carousel-control-prev,
    .carousel-control-next,
    .carousel-indicators [data-bs-target],
    &.carousel-fade .active.carousel-item-start,
    &.carousel-fade .active.carousel-item-end {
      transition: none;
    }
  }
`

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-slide autoplay dwell time (ms). Overrides the carousel `interval`. */
  interval?: number
  children?: React.ReactNode
}

/** A single slide. The parent Carousel injects the transition classes + aria. */
export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, children, interval: _interval, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={['carousel-item', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
})

/** `.carousel-caption` — a caption block positioned over a slide. */
export const CarouselCaption = styled.div.attrs({ className: 'carousel-caption' })``

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Controlled active slide index. */
  activeIndex?: number
  /** Uncontrolled initial index. */
  defaultActiveIndex?: number
  onSelect?: (index: number, direction: 'next' | 'prev') => void
  /** Autoplay. `'carousel'` (or true) cycles automatically. */
  ride?: boolean | 'carousel'
  /** Autoplay dwell time in ms. Default 5000. Set 0/null to disable. */
  interval?: number | null
  /** Left/Right arrow navigation when focused. Default true. */
  keyboard?: boolean
  /** `'hover'` pauses autoplay while hovered. Default `'hover'`. */
  pause?: 'hover' | false
  /** Wrap from last→first (and first→last). Default true. */
  wrap?: boolean
  /** Crossfade instead of slide (`.carousel-fade`). */
  fade?: boolean
  /** Render the indicator dots. Default true. */
  indicators?: boolean
  /** Render the prev/next controls. Default true. */
  controls?: boolean
  /** Dark control/indicator/caption theming (`.carousel-dark`). */
  dark?: boolean
  children: React.ReactNode
}

const clampIndex = (i: number, total: number) =>
  total === 0 ? 0 : Math.min(Math.max(i, 0), total - 1)

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    activeIndex,
    defaultActiveIndex = 0,
    onSelect,
    ride = false,
    interval = 5000,
    keyboard = true,
    pause = 'hover',
    wrap = true,
    fade = false,
    indicators = true,
    controls = true,
    dark = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const slides = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
    CarouselItemProps
  >[]
  const total = slides.length

  const isControlled = activeIndex != null
  const [internal, setInternal] = useState(() => clampIndex(defaultActiveIndex, total))
  const desired = clampIndex(isControlled ? (activeIndex as number) : internal, total)

  const [settled, setSettled] = useState(desired)
  const [slide, setSlide] = useState<{ to: number; order: 'next' | 'prev' } | null>(null)
  const [moving, setMoving] = useState(false)
  const [paused, setPaused] = useState(false)

  const pendingOrder = useRef<'next' | 'prev' | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  // Begin a slide when the desired index diverges from the settled one.
  useEffect(() => {
    if (slide || desired === settled) return
    const order = pendingOrder.current ?? (desired > settled ? 'next' : 'prev')
    pendingOrder.current = null
    setSlide({ to: desired, order })
  }, [desired, settled, slide])

  // Two-phase animation: phase 0 places the entering item offscreen; a reflow +
  // double-rAF then adds the directional (-start/-end) classes to animate; a
  // SLIDE_MS timer finalizes (mirrors bootstrap's transitionend + fallback).
  useEffect(() => {
    if (!slide) return
    const el = innerRef.current
    if (el) void el.offsetHeight // reflow the phase-0 position
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMoving(true))
    })
    const timer = setTimeout(() => {
      setSettled(slide.to)
      onSelect?.(slide.to, slide.order)
      setSlide(null)
      setMoving(false)
    }, SLIDE_MS)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide])

  // Move by ±1 with wrap + explicit direction (so last→first reads as "next").
  const step = useCallback(
    (delta: 1 | -1) => {
      if (slide || total < 2) return
      const raw = settled + delta
      let target: number
      if (raw < 0) target = wrap ? total - 1 : 0
      else if (raw >= total) target = wrap ? 0 : total - 1
      else target = raw
      if (target === settled) return
      pendingOrder.current = delta > 0 ? 'next' : 'prev'
      if (isControlled) onSelect?.(target, pendingOrder.current)
      else setInternal(target)
    },
    [slide, total, settled, wrap, isControlled, onSelect],
  )

  const goTo = useCallback(
    (target: number) => {
      if (slide || target === settled) return
      pendingOrder.current = target > settled ? 'next' : 'prev'
      if (isControlled) onSelect?.(target, pendingOrder.current)
      else setInternal(target)
    },
    [slide, settled, isControlled, onSelect],
  )

  // Autoplay — re-armed after each settle; guarded against pause + in-flight slide.
  const stepRef = useRef(step)
  stepRef.current = step
  useEffect(() => {
    const active = ride === true || ride === 'carousel'
    if (!active || !interval || interval <= 0 || paused || total < 2) return
    // Per-slide interval override.
    const perSlide = slides[settled]?.props.interval
    const ms = typeof perSlide === 'number' ? perSlide : interval
    const id = setTimeout(() => stepRef.current(1), ms)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ride, interval, paused, settled, total])

  // Emits only the state/transition modifier classes; CarouselItem supplies the
  // `carousel-item` base itself (so it isn't duplicated).
  const itemClass = (i: number): string => {
    if (!slide) return i === settled ? 'active' : ''
    const { to, order } = slide
    const dir = order === 'next' ? 'start' : 'end'
    if (!moving) {
      if (i === settled) return 'active'
      if (i === to) return `carousel-item-${order}`
      return ''
    }
    if (i === settled) return `active carousel-item-${dir}`
    if (i === to) return `carousel-item-${order} carousel-item-${dir}`
    return ''
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!keyboard) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    }
    rest.onKeyDown?.(e)
  }

  return (
    <CarouselRoot
      ref={ref}
      className={['carousel', 'slide', fade ? 'carousel-fade' : '', dark ? 'carousel-dark' : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      onMouseEnter={pause === 'hover' ? () => setPaused(true) : undefined}
      onMouseLeave={pause === 'hover' ? () => setPaused(false) : undefined}
      {...rest}
    >
      {indicators && total > 1 && (
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target=""
              className={i === settled ? 'active' : undefined}
              aria-current={i === settled ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      <div className="carousel-inner" ref={innerRef}>
        {slides.map((child, i) =>
          React.cloneElement(child, {
            className: [itemClass(i), child.props.className].filter(Boolean).join(' '),
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': `${i + 1} of ${total}`,
          }),
        )}
      </div>

      {controls && total > 1 && (
        <>
          <button className="carousel-control-prev" type="button" onClick={() => step(-1)}>
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <VisuallyHidden>Previous</VisuallyHidden>
          </button>
          <button className="carousel-control-next" type="button" onClick={() => step(1)}>
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <VisuallyHidden>Next</VisuallyHidden>
          </button>
        </>
      )}
    </CarouselRoot>
  )
})
