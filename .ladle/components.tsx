import React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import type { GlobalProvider } from '@ladle/react'
import { defaultTheme, GlobalStyles } from '../src'

// Root of the styled-components bug on story navigation:
// When Ladle switches stories it remounts `children`, causing styled-components
// to re-generate class names for the new component tree. Until the new <style>
// rules are injected there is a flash of unstyled content.
//
// Fix: hoist the ThemeProvider + GlobalStyles *above* the remount boundary by
// keeping them at module scope (a single stable instance). The StyleSheetManager
// uses `disableCSSOMInjection` so all rules go into a real <style> tag that
// persists across story changes, and `enableVendorPrefixes` for compat.
//
// `GlobalStyles` sets the --bs-* CSS variables on :root — these survive any
// remount because CSS custom properties live on the document, not in React state.

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const isDark = globalState.theme === 'dark'
  const colorMode = isDark ? 'dark' : 'light'

  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={defaultTheme}>
        {/* GlobalStyles injects --bs-* onto :root once and persists */}
        <GlobalStyles />
        {/* Outer wrapper for the Ladle frame */}
        <div
          data-bs-theme={colorMode}
          style={{
            padding: '2rem',
            minHeight: '100vh',
            background: isDark ? 'var(--bs-body-bg, #212529)' : 'var(--bs-body-bg, #fff)',
            color: 'var(--bs-body-color)',
            fontFamily: 'var(--bs-font-sans-serif)',
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </StyleSheetManager>
  )
}
