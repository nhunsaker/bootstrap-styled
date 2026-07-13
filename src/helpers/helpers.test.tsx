import { describe, it, expect } from 'vitest'
import { renderWithTheme, screen } from '../test/render'
import {
  Clearfix,
  TextBg,
  FocusRing,
  IconLink,
  FixedTop,
  FixedBottom,
  StickyTop,
  StickyBottom,
  TranslateMiddle,
  StretchedLink,
  TextTruncate,
  Vr,
  VisuallyHidden,
} from './index'

// The theme Provider wraps children in a div, so assert on the helper itself
// (queried by test id), not container.firstChild.
const T = 'h'

describe('Helpers — emit exact Bootstrap classes', () => {
  it('Clearfix emits .clearfix and passes className through', () => {
    renderWithTheme(<Clearfix data-testid={T} className="extra" />)
    expect(screen.getByTestId(T)).toHaveClass('clearfix', 'extra')
  })

  it('TextBg emits .text-bg-{color}', () => {
    renderWithTheme(
      <TextBg data-testid={T} color="danger">
        x
      </TextBg>,
    )
    expect(screen.getByTestId(T)).toHaveClass('text-bg-danger')
  })

  it('FocusRing emits .focus-ring and the color variant', () => {
    renderWithTheme(<FocusRing data-testid={T} color="success" />)
    expect(screen.getByTestId(T)).toHaveClass('focus-ring', 'focus-ring-success')
  })

  it('FocusRing without color emits only .focus-ring', () => {
    renderWithTheme(<FocusRing data-testid={T} />)
    const el = screen.getByTestId(T)
    expect(el).toHaveClass('focus-ring')
    expect(el.className).not.toMatch(/focus-ring-/)
  })

  it('IconLink renders an <a> and toggles .icon-link-hover', () => {
    renderWithTheme(
      <IconLink data-testid={T} href="#" hover>
        link
      </IconLink>,
    )
    const el = screen.getByTestId(T)
    expect(el.tagName).toBe('A')
    expect(el).toHaveClass('icon-link', 'icon-link-hover')
  })

  it('Position helpers emit fixed/sticky classes (with breakpoint)', () => {
    renderWithTheme(<FixedTop data-testid="ft" />)
    expect(screen.getByTestId('ft')).toHaveClass('fixed-top')
    renderWithTheme(<FixedBottom data-testid="fb" />)
    expect(screen.getByTestId('fb')).toHaveClass('fixed-bottom')
    renderWithTheme(<StickyTop data-testid="st" />)
    expect(screen.getByTestId('st')).toHaveClass('sticky-top')
    renderWithTheme(<StickyBottom data-testid="sb" />)
    expect(screen.getByTestId('sb')).toHaveClass('sticky-bottom')
    renderWithTheme(<StickyTop data-testid="stbp" breakpoint="lg" />)
    expect(screen.getByTestId('stbp')).toHaveClass('sticky-lg-top')
  })

  it('TranslateMiddle composes the absolute-centering pattern', () => {
    renderWithTheme(<TranslateMiddle data-testid={T} absolute top={0} start={0} />)
    expect(screen.getByTestId(T)).toHaveClass(
      'translate-middle',
      'position-absolute',
      'top-0',
      'start-0',
    )
  })

  it('TranslateMiddle honors the axis variant', () => {
    renderWithTheme(<TranslateMiddle data-testid={T} axis="x" />)
    expect(screen.getByTestId(T)).toHaveClass('translate-middle-x')
  })

  it('StretchedLink renders an <a> with .stretched-link', () => {
    renderWithTheme(
      <StretchedLink data-testid={T} href="#">
        go
      </StretchedLink>,
    )
    const el = screen.getByTestId(T)
    expect(el.tagName).toBe('A')
    expect(el).toHaveClass('stretched-link')
  })

  it('TextTruncate emits .text-truncate', () => {
    renderWithTheme(<TextTruncate data-testid={T}>x</TextTruncate>)
    expect(screen.getByTestId(T)).toHaveClass('text-truncate')
  })

  it('Vr emits .vr', () => {
    renderWithTheme(<Vr data-testid={T} />)
    expect(screen.getByTestId(T)).toHaveClass('vr')
  })

  it('VisuallyHidden toggles between .visually-hidden and -focusable', () => {
    renderWithTheme(<VisuallyHidden data-testid="vh">x</VisuallyHidden>)
    expect(screen.getByTestId('vh')).toHaveClass('visually-hidden')
    renderWithTheme(
      <VisuallyHidden data-testid="vhf" focusable>
        x
      </VisuallyHidden>,
    )
    expect(screen.getByTestId('vhf')).toHaveClass('visually-hidden-focusable')
  })
})
