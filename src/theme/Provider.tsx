import React from 'react'
import { ThemeProvider } from 'styled-components'
import type { Theme } from './types'
import { defaultTheme } from './defaultTheme'
import { GlobalStyles } from './GlobalStyles'

export interface BootstrapStyledProviderProps {
  theme?: Theme
  /** 'light' | 'dark' — applied via data-bs-theme on the wrapper. */
  colorMode?: 'light' | 'dark'
  /** Skip injecting GlobalStyles (e.g. if the host already did). */
  noGlobalStyles?: boolean
  children?: React.ReactNode
}

export function BootstrapStyledProvider({
  theme = defaultTheme,
  colorMode = 'light',
  noGlobalStyles = false,
  children,
}: BootstrapStyledProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {!noGlobalStyles && <GlobalStyles />}
      <div data-bs-theme={colorMode}>{children}</div>
    </ThemeProvider>
  )
}
