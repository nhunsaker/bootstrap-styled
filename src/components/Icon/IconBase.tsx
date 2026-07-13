import * as React from 'react'

/**
 * Shared props for every icon form — the per-icon tree-shakeable exports
 * (`<BsIconAlarm/>`) and the dynamic `<Icon name="…"/>` convenience.
 *
 * Bootstrap Icons render as a 16×16 `viewBox` SVG that paints with
 * `fill="currentColor"`, so color comes from the CSS `color` of the parent
 * (or a `--bs-*` token) with zero extra API. Sizing is `em`-based by default
 * so an icon tracks the surrounding font-size like Bootstrap's own `.bi`.
 */
export interface IconBaseProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /**
   * Width & height. Number → px; string passes through (`'1.5rem'`, `'2em'`…).
   * Defaults to `'1em'` so the glyph scales with the parent font-size.
   */
  size?: string | number
  /**
   * Accessible name. When set, the icon becomes meaningful content
   * (`role="img"` + `aria-label`) instead of the decorative default.
   */
  label?: string
  /**
   * SVG `<title>`. Adds an in-SVG tooltip/title and, when no `label` is
   * given, also supplies the accessible name.
   */
  title?: string
}

/** Internal renderer props — icon modules feed it the raw inner SVG markup. */
export interface IconRenderProps extends IconBaseProps {
  /** Raw inner SVG markup (the `<path>`…), verbatim from the vendored set. */
  svgInner: string
  /** viewBox (Bootstrap Icons is always `'0 0 16 16'`). */
  viewBox?: string
  /** Bootstrap icon slug, e.g. `'alarm'` → adds `class="bi bi-alarm"`. */
  bsName?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * The one place an SVG element is actually rendered. Every icon component
 * delegates here so a11y, sizing, coloring and class semantics stay 1:1 with
 * Bootstrap Icons across all forms.
 */
export const IconBase = React.forwardRef<SVGSVGElement, IconRenderProps>(function IconBase(
  { size = '1em', label, title, svgInner, viewBox = '0 0 16 16', bsName, className, role, ...rest },
  ref,
) {
  const labelled = label != null || title != null

  // Decorative by default (aria-hidden); meaningful when named.
  const a11y: Record<string, unknown> = labelled
    ? { role: role ?? 'img', 'aria-label': label ?? title }
    : { 'aria-hidden': true, focusable: false, ...(role ? { role } : {}) }

  const cls = ['bi', bsName ? `bi-${bsName}` : null, className].filter(Boolean).join(' ')

  const __html = title ? `<title>${escapeHtml(title)}</title>${svgInner}` : svgInner

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      className={cls}
      {...a11y}
      {...rest}
      dangerouslySetInnerHTML={{ __html }}
    />
  )
})
IconBase.displayName = 'IconBase'
