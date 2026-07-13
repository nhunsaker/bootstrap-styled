import * as React from 'react'
import { IconBase, type IconBaseProps } from './IconBase'
import { icons } from './registry'

export interface IconProps extends IconBaseProps {
  /**
   * Bootstrap Icons slug, e.g. `"alarm"`, `"chevron-down"`. Rendered inline
   * from the vendored set. Unknown names render nothing (and warn in dev).
   *
   * This is the convenience form; for zero-bundle-tax usage prefer the
   * tree-shakeable per-icon exports (`<BsIconAlarm/>`).
   */
  name: string
}

/**
 * Dynamic icon convenience — `<Icon name="alarm" />`. Looks the slug up in the
 * bundled registry and renders the matching SVG inline (sync). Only icons
 * present in the registry resolve; the committed build ships a representative
 * subset, a full `npm run gen:icons` populates the generated registry.
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, ...rest },
  ref,
) {
  const svgInner = icons[name]
  if (svgInner == null) {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`<Icon>: unknown icon name "${name}" — not found in the bundled registry.`)
    }
    return null
  }
  return <IconBase ref={ref} bsName={name} svgInner={svgInner} {...rest} />
})
Icon.displayName = 'Icon'
