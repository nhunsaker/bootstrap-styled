// Icon component surface.
//   - `<Icon name="…"/>`          — dynamic convenience (registry-backed).
//   - `<BsIconAlarm/>` etc.       — tree-shakeable per-icon exports.
//   - `<IconBase/>`               — the shared low-level renderer.
export { Icon } from './Icon'
export type { IconProps } from './Icon'
export { IconBase } from './IconBase'
export type { IconBaseProps, IconRenderProps } from './IconBase'

// Tree-shakeable per-icon exports (committed representative subset;
// `npm run gen:icons` emits the full set to ./generated/).
export * from './icons'
