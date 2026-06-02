import React, { useState } from 'react'
import type { GlobalProvider } from '@ladle/react'
import { BootstrapStyledProvider, createTheme } from '../src'

// Ladle's GlobalProvider wraps every story. We wire up BootstrapStyledProvider
// here so each story renders in a themed context automatically.
export const Provider: GlobalProvider = ({ children, globalState }) => {
  const colorMode = (globalState.theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark'
  return (
    <BootstrapStyledProvider colorMode={colorMode}>
      <div style={{ padding: '2rem', minHeight: '100vh', background: colorMode === 'dark' ? '#212529' : '#fff' }}>
        {children}
      </div>
    </BootstrapStyledProvider>
  )
}
