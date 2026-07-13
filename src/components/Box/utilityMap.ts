/**
 * utilityMap.ts — the Box deliverable.
 *
 * A hand-transcribed 1:1 map from Box utility-prop values to the exact Bootstrap
 * 5.3.x utility CLASS names, derived from Bootstrap's `_utilities.scss` conventions
 * and verified against the vendored oracle (`parity/oracle/bootstrap.min.css`).
 *
 * We emit the *real* Bootstrap utility classNames rather than styled-components
 * dynamic CSS: the oracle already defines every one of these classes, so parity is
 * exact by construction and there is no dynamic-prop CSS explosion to guard against.
 *
 * Class shape (per Bootstrap): `{prefix}[-{breakpoint}]-{suffix}`
 *   e.g. m={3}            → prefix "m",             suffix "3"      → "m-3"
 *        d="flex"         → prefix "d",             suffix "flex"   → "d-flex"
 *        bg="primary"     → prefix "bg",            suffix "primary"→ "bg-primary"
 *        justify="between"→ prefix "justify-content", suffix "between"→ "justify-content-between"
 * A `""` (empty) suffix means the class is the bare prefix (e.g. border → "border").
 *
 * Only utilities that Bootstrap generates responsively (`responsive: true` in
 * _utilities.scss) accept a responsive object value; for those the breakpoint
 * infix is inserted between prefix and suffix (`m-md-4`, `d-md-flex`). `base` = no infix.
 */

export const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
export type Breakpoint = (typeof BREAKPOINTS)[number]

/** A utility value, either a single value or a per-breakpoint object (`base` = no infix). */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>

// ---- Value unions (TS, per §3) --------------------------------------------------

export type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5
export type MarginScale = SpaceScale | 'auto'
export type Display =
  | 'none' | 'inline' | 'inline-block' | 'block' | 'grid' | 'inline-grid'
  | 'table' | 'table-row' | 'table-cell' | 'flex' | 'inline-flex'
export type FlexValue =
  | 'row' | 'column' | 'row-reverse' | 'column-reverse'
  | 'wrap' | 'nowrap' | 'wrap-reverse' | 'fill'
  | 'grow-0' | 'grow-1' | 'shrink-0' | 'shrink-1'
export type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
export type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type AlignSelf = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type ThemeColor =
  | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
export type BgColor =
  | ThemeColor | 'body' | 'white' | 'black' | 'transparent'
  | 'body-secondary' | 'body-tertiary'
  | 'primary-subtle' | 'secondary-subtle' | 'success-subtle' | 'danger-subtle'
  | 'warning-subtle' | 'info-subtle' | 'light-subtle' | 'dark-subtle'
export type TextValue =
  // color
  | ThemeColor | 'body' | 'muted' | 'white' | 'black' | 'white-50' | 'black-50' | 'reset'
  | 'body-secondary' | 'body-tertiary' | 'body-emphasis'
  | 'primary-emphasis' | 'secondary-emphasis' | 'success-emphasis' | 'danger-emphasis'
  | 'warning-emphasis' | 'info-emphasis' | 'light-emphasis' | 'dark-emphasis'
  // alignment (note: Bootstrap makes text-align responsive; here `text` is non-responsive —
  // use className="text-md-center" for responsive alignment)
  | 'start' | 'end' | 'center'
export type BorderColor = ThemeColor | 'white' | 'black'
export type Border =
  | boolean | 0 | 'top' | 'bottom' | 'start' | 'end'
  | 'top-0' | 'bottom-0' | 'start-0' | 'end-0'
export type BorderWidth = 0 | 1 | 2 | 3 | 4 | 5
export type Rounded =
  | boolean | 0 | 1 | 2 | 3 | 4 | 5
  | 'circle' | 'pill' | 'top' | 'bottom' | 'start' | 'end'
export type Shadow = boolean | 'none' | 'sm' | 'lg' | 'regular'
export type Sizing = 25 | 50 | 75 | 100 | 'auto'
export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
export type Overflow = 'auto' | 'hidden' | 'visible' | 'scroll'
export type Opacity = 0 | 25 | 50 | 75 | 100
export type ZIndex = -1 | 0 | 1 | 2 | 3

// ---- Spec table -----------------------------------------------------------------

interface UtilitySpec {
  /** Bootstrap class prefix (e.g. "m", "d", "justify-content"). */
  prefix: string
  /** Whether Bootstrap generates responsive (breakpoint-infixed) variants. */
  responsive: boolean
  /** Map of stringified prop value -> class suffix ("" = bare prefix). */
  values: Record<string, string>
}

/** identity map: value === suffix (e.g. "flex" -> "flex"). */
const idMap = (vals: readonly string[]): Record<string, string> =>
  Object.fromEntries(vals.map((v) => [v, v]))

/** numeric scale 0..5 (suffix = the number), plus any extra literal keys. */
const scaleMap = (extra: readonly string[] = []): Record<string, string> => {
  const m: Record<string, string> = {}
  for (let i = 0; i <= 5; i++) m[String(i)] = String(i)
  for (const e of extra) m[e] = e
  return m
}

const BG_COLORS = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
  'body', 'white', 'black', 'transparent', 'body-secondary', 'body-tertiary',
  'primary-subtle', 'secondary-subtle', 'success-subtle', 'danger-subtle',
  'warning-subtle', 'info-subtle', 'light-subtle', 'dark-subtle',
]

const TEXT_VALUES = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
  'body', 'muted', 'white', 'black', 'white-50', 'black-50', 'reset',
  'body-secondary', 'body-tertiary', 'body-emphasis',
  'primary-emphasis', 'secondary-emphasis', 'success-emphasis', 'danger-emphasis',
  'warning-emphasis', 'info-emphasis', 'light-emphasis', 'dark-emphasis',
  'start', 'end', 'center',
]

const BORDER_COLORS = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
  'white', 'black',
]

/**
 * The authoritative prop -> Bootstrap-utility map. Insertion order here is the
 * class-emission order (deterministic output).
 */
export const UTILITIES: Record<string, UtilitySpec> = {
  // --- Spacing: margin (0-5 + auto) & padding (0-5). Responsive. ---
  m:  { prefix: 'm',  responsive: true, values: scaleMap(['auto']) },
  mt: { prefix: 'mt', responsive: true, values: scaleMap(['auto']) },
  mb: { prefix: 'mb', responsive: true, values: scaleMap(['auto']) },
  ms: { prefix: 'ms', responsive: true, values: scaleMap(['auto']) },
  me: { prefix: 'me', responsive: true, values: scaleMap(['auto']) },
  mx: { prefix: 'mx', responsive: true, values: scaleMap(['auto']) },
  my: { prefix: 'my', responsive: true, values: scaleMap(['auto']) },
  p:  { prefix: 'p',  responsive: true, values: scaleMap() },
  pt: { prefix: 'pt', responsive: true, values: scaleMap() },
  pb: { prefix: 'pb', responsive: true, values: scaleMap() },
  ps: { prefix: 'ps', responsive: true, values: scaleMap() },
  pe: { prefix: 'pe', responsive: true, values: scaleMap() },
  px: { prefix: 'px', responsive: true, values: scaleMap() },
  py: { prefix: 'py', responsive: true, values: scaleMap() },

  // --- Display & flexbox. Responsive. ---
  d: {
    prefix: 'd', responsive: true,
    values: idMap([
      'none', 'inline', 'inline-block', 'block', 'grid', 'inline-grid',
      'table', 'table-row', 'table-cell', 'flex', 'inline-flex',
    ]),
  },
  flex: {
    prefix: 'flex', responsive: true,
    values: idMap([
      'row', 'column', 'row-reverse', 'column-reverse',
      'wrap', 'nowrap', 'wrap-reverse', 'fill',
      'grow-0', 'grow-1', 'shrink-0', 'shrink-1',
    ]),
  },
  justify:   { prefix: 'justify-content', responsive: true, values: idMap(['start', 'end', 'center', 'between', 'around', 'evenly']) },
  align:     { prefix: 'align-items',     responsive: true, values: idMap(['start', 'end', 'center', 'baseline', 'stretch']) },
  alignSelf: { prefix: 'align-self',      responsive: true, values: idMap(['auto', 'start', 'end', 'center', 'baseline', 'stretch']) },
  gap:       { prefix: 'gap',             responsive: true, values: scaleMap() },

  // --- Colors (non-responsive). ---
  bg:   { prefix: 'bg',   responsive: false, values: idMap(BG_COLORS) },
  text: { prefix: 'text', responsive: false, values: idMap(TEXT_VALUES) },

  // --- Borders (non-responsive). ---
  // border: true -> "border"; 0 -> "border-0"; side -> "border-top"; side-0 -> "border-top-0".
  border: {
    prefix: 'border', responsive: false,
    values: {
      true: '', false: '__none__', '0': '0',
      top: 'top', bottom: 'bottom', start: 'start', end: 'end',
      'top-0': 'top-0', 'bottom-0': 'bottom-0', 'start-0': 'start-0', 'end-0': 'end-0',
    },
  },
  borderColor: { prefix: 'border', responsive: false, values: idMap(BORDER_COLORS) },
  borderWidth: { prefix: 'border', responsive: false, values: scaleMap() },

  // --- Radius (non-responsive). rounded: true -> "rounded"; 3 -> "rounded-3"; "pill" -> "rounded-pill". ---
  rounded: {
    prefix: 'rounded', responsive: false,
    values: {
      true: '', false: '__none__',
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
      circle: 'circle', pill: 'pill',
      top: 'top', bottom: 'bottom', start: 'start', end: 'end',
    },
  },

  // --- Shadow (non-responsive). true|"regular" -> "shadow". ---
  shadow: {
    prefix: 'shadow', responsive: false,
    values: { true: '', false: '__none__', regular: '', none: 'none', sm: 'sm', lg: 'lg' },
  },

  // --- Sizing (non-responsive). ---
  w: { prefix: 'w', responsive: false, values: idMap(['25', '50', '75', '100', 'auto']) },
  h: { prefix: 'h', responsive: false, values: idMap(['25', '50', '75', '100', 'auto']) },

  // --- Position / overflow / opacity / z-index (non-responsive). ---
  position: { prefix: 'position', responsive: false, values: idMap(['static', 'relative', 'absolute', 'fixed', 'sticky']) },
  overflow: { prefix: 'overflow', responsive: false, values: idMap(['auto', 'hidden', 'visible', 'scroll']) },
  opacity:  { prefix: 'opacity',  responsive: false, values: idMap(['0', '25', '50', '75', '100']) },
  zIndex:   { prefix: 'z',        responsive: false, values: { '-1': 'n1', '0': '0', '1': '1', '2': '2', '3': '3' } },
}

/** The set of prop names that are utility props (Box uses this to split DOM props). */
export const UTILITY_PROP_KEYS = new Set(Object.keys(UTILITIES))

// ---- The typed public prop surface ---------------------------------------------

export interface UtilityProps {
  m?: Responsive<MarginScale>
  mt?: Responsive<MarginScale>
  mb?: Responsive<MarginScale>
  ms?: Responsive<MarginScale>
  me?: Responsive<MarginScale>
  mx?: Responsive<MarginScale>
  my?: Responsive<MarginScale>
  p?: Responsive<SpaceScale>
  pt?: Responsive<SpaceScale>
  pb?: Responsive<SpaceScale>
  ps?: Responsive<SpaceScale>
  pe?: Responsive<SpaceScale>
  px?: Responsive<SpaceScale>
  py?: Responsive<SpaceScale>
  d?: Responsive<Display>
  flex?: Responsive<FlexValue>
  justify?: Responsive<Justify>
  align?: Responsive<Align>
  alignSelf?: Responsive<AlignSelf>
  gap?: Responsive<SpaceScale>
  bg?: BgColor
  text?: TextValue
  border?: Border
  borderColor?: BorderColor
  borderWidth?: BorderWidth
  rounded?: Rounded
  shadow?: Shadow
  w?: Sizing
  h?: Sizing
  position?: Position
  overflow?: Overflow
  opacity?: Opacity
  zIndex?: ZIndex
}

// ---- Class computation ----------------------------------------------------------

/** Turn one resolved (single) value + breakpoint into a Bootstrap class, or undefined. */
function toClass(spec: UtilitySpec, value: unknown, bp: Breakpoint): string | undefined {
  if (value === false) return undefined // `border={false}` etc. — emit nothing
  const suffix = spec.values[String(value)]
  if (suffix === undefined || suffix === '__none__') return undefined
  const parts: string[] = [spec.prefix]
  if (bp !== 'base') parts.push(bp)
  if (suffix !== '') parts.push(suffix)
  return parts.join('-')
}

function isBreakpointObject(v: unknown): v is Partial<Record<Breakpoint, unknown>> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Compute the space-joined Bootstrap utility className string for a set of utility props.
 * Emission order follows UTILITIES insertion order (deterministic). Breakpoint order is
 * base → sm → md → lg → xl → xxl.
 */
function computeUtilityClasses(props: Record<string, unknown>): string {
  const classes: string[] = []
  for (const key of Object.keys(UTILITIES)) {
    const raw = props[key]
    if (raw === undefined || raw === null) continue
    const spec = UTILITIES[key]
    if (spec.responsive && isBreakpointObject(raw)) {
      for (const bp of BREAKPOINTS) {
        const v = (raw as Record<string, unknown>)[bp]
        if (v === undefined || v === null) continue
        const c = toClass(spec, v, bp)
        if (c) classes.push(c)
      }
    } else if (isBreakpointObject(raw)) {
      // non-responsive utility given an object: only `base` is meaningful.
      const v = (raw as Record<string, unknown>).base
      if (v !== undefined && v !== null) {
        const c = toClass(spec, v, 'base')
        if (c) classes.push(c)
      }
    } else {
      const c = toClass(spec, raw, 'base')
      if (c) classes.push(c)
    }
  }
  return classes.join(' ')
}

/**
 * Perf guard (§3): memoize the computed className string per unique prop combination.
 * We emit static Bootstrap classes (no styled-components dynamic-prop CSS), so the only
 * cost is the string build — this module-level cache, keyed on the serialized utility
 * props, makes repeated identical prop sets a Map hit instead of a recompute.
 */
const cache = new Map<string, string>()

export function getUtilityClasses(utilProps: Record<string, unknown>): string {
  // Stable key: iterate UTILITIES order so key ordering is prop-order-independent.
  const keyParts: string[] = []
  for (const key of Object.keys(UTILITIES)) {
    const v = utilProps[key]
    if (v === undefined || v === null) continue
    keyParts.push(`${key}:${JSON.stringify(v)}`)
  }
  const cacheKey = keyParts.join('|')
  const hit = cache.get(cacheKey)
  if (hit !== undefined) return hit
  const computed = computeUtilityClasses(utilProps)
  cache.set(cacheKey, computed)
  return computed
}
