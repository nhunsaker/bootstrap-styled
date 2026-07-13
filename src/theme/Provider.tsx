import React from 'react'
import { ThemeProvider } from 'styled-components'
import type { Theme } from './types'
import { defaultTheme } from './defaultTheme'
import { GlobalStyles } from './GlobalStyles'
import { ThemeVars } from './tokens'

export interface BootstrapStyledProviderProps {
  theme?: Theme
  /** 'light' | 'dark' — applied via data-bs-theme on the wrapper. */
  colorMode?: 'light' | 'dark'
  /** Skip injecting GlobalStyles (e.g. if the host already did). */
  noGlobalStyles?: boolean
  children?: React.ReactNode
}

// Establish Bootstrap's inherited body typography on the styled root so
// components render at Bootstrap metrics (line-height 1.5 etc.) even when the
// host <body> is not Bootstrap-normalized. Bootstrap sets these on `body`;
// mirroring them here scopes them to the provider subtree.
const rootStyle: React.CSSProperties = {
  fontFamily: 'var(--bs-body-font-family, var(--bs-font-sans-serif))',
  fontSize: 'var(--bs-body-font-size, 1rem)',
  fontWeight: 'var(--bs-body-font-weight, 400)' as React.CSSProperties['fontWeight'],
  lineHeight: 'var(--bs-body-line-height, 1.5)',
  color: 'var(--bs-body-color)',
}

export function BootstrapStyledProvider({
  theme = defaultTheme,
  colorMode = 'light',
  noGlobalStyles = false,
  children,
}: BootstrapStyledProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {!noGlobalStyles && (
        <>
          <GlobalStyles />
          <ThemeVars />
        </>
      )}
      <div data-bs-theme={colorMode} style={rootStyle}>
        {children}
      </div>
    </ThemeProvider>
  )
}
