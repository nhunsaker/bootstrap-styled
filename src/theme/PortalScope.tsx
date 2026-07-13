import React from 'react'
import { useColorMode } from './Provider'

/**
 * Re-establishes the bootstrap-styled Reboot + token scope for portaled content.
 *
 * FloatingPortal renders overlays into <body>, OUTSIDE the Provider's
 * `data-bs-theme` wrapper — so the `:where([data-bs-theme])`-scoped Reboot
 * (font-family, box-sizing, line-height, color) never reaches them and they
 * fall back to the UA serif/content-box defaults. Wrapping the portal payload in
 * a `data-bs-theme` element (display:contents, so layout/positioning is
 * untouched) puts it back inside that scope and carries the active color mode.
 */
export function PortalScope({ children }: { children: React.ReactNode }) {
  const colorMode = useColorMode()
  return (
    <div data-bs-theme={colorMode} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
