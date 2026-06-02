import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { BootstrapStyledProvider } from '../theme'

// Render a component inside the provider (so styled-components has the theme).
export function renderWithTheme(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => <BootstrapStyledProvider>{children}</BootstrapStyledProvider>,
    ...options,
  })
}

export * from '@testing-library/react'
