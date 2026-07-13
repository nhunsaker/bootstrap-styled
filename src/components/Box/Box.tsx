import React from 'react'
import { UTILITY_PROP_KEYS, getUtilityClasses, type UtilityProps } from './utilityMap'

/**
 * `<Box as="…">` — a polymorphic layout primitive (default `div`) that carries
 * Bootstrap's utility API as typed props. Each prop value maps 1:1 to the exact
 * Bootstrap utility CLASS (see `utilityMap.ts`), so a Box renders identically to a
 * native `<div class="…">` given the same values.
 *
 *   <Box m={3} d="flex" bg="primary" />   →  <div class="m-3 d-flex bg-primary" />
 *   <Box m={{ base: 2, md: 4 }} />        →  <div class="m-2 m-md-4" />
 *
 * CSS note: Box only *renders* correctly when Bootstrap's utility CSS is present.
 *   - In-app: the utilities ship via GlobalStyles / the consumer's stylesheet
 *     (a theme-owner decision — Box does NOT inject them; flagged in the handoff).
 *   - In the parity harness: both the Box cell and the native `<div class="…">`
 *     control get the same vendored oracle CSS, so the diff is apples-to-apples.
 *
 * `className` passthrough: the user's `className` is appended AFTER the generated
 * classes, so `className="mt-3"` still works and can override generated utilities.
 */
export interface BoxProps
  extends UtilityProps,
    Omit<React.HTMLAttributes<HTMLElement>, keyof UtilityProps> {
  /** The element (or component) to render. Defaults to `div`. */
  as?: React.ElementType
  className?: string
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
  const { as: As = 'div', className, ...rest } = props

  // Split utility props (compiled to classes) from pass-through DOM/component props.
  const utilProps: Record<string, unknown> = {}
  const domProps: Record<string, unknown> = {}
  for (const key of Object.keys(rest)) {
    if (UTILITY_PROP_KEYS.has(key)) utilProps[key] = (rest as Record<string, unknown>)[key]
    else domProps[key] = (rest as Record<string, unknown>)[key]
  }

  const generated = getUtilityClasses(utilProps)
  // Generated first, user className last (so consumer classes win the cascade order).
  const finalClassName = [generated, className].filter(Boolean).join(' ') || undefined

  return <As ref={ref} className={finalClassName} {...domProps} />
})
Box.displayName = 'Box'
