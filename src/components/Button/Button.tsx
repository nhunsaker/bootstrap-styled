import React from 'react'
import styled from 'styled-components'
import type { ColorName } from '../../theme/types'

export type ButtonVariant = ColorName | `outline-${ColorName}`
export type ButtonSize = 'sm' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Bootstrap variant, e.g. "primary", "danger", "outline-primary". */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Render as a different element/component (e.g. an anchor or router Link). */
  as?: React.ElementType
}

const isOutline = (v: ButtonVariant): boolean => v.startsWith('outline-')
const baseColor = (v: ButtonVariant): ColorName =>
  (isOutline(v) ? v.slice('outline-'.length) : v) as ColorName

// Set Bootstrap-style per-component vars (--bs-btn-*) from the global color
// vars. Hover/active use color-mix() so they track runtime overrides of the
// base color; on-color text uses the computed --bs-<color>-contrast var.
const solidVars = (n: ColorName): string => `
  --bs-btn-color: var(--bs-${n}-contrast);
  --bs-btn-bg: var(--bs-${n});
  --bs-btn-border-color: var(--bs-${n});
  --bs-btn-hover-color: var(--bs-${n}-contrast);
  --bs-btn-hover-bg: color-mix(in srgb, var(--bs-${n}) 85%, #000);
  --bs-btn-hover-border-color: color-mix(in srgb, var(--bs-${n}) 80%, #000);
  --bs-btn-active-bg: color-mix(in srgb, var(--bs-${n}) 80%, #000);
  --bs-btn-active-border-color: color-mix(in srgb, var(--bs-${n}) 75%, #000);
  --bs-btn-disabled-color: var(--bs-${n}-contrast);
  --bs-btn-disabled-bg: var(--bs-${n});
  --bs-btn-disabled-border-color: var(--bs-${n});
`

const outlineVars = (n: ColorName): string => `
  --bs-btn-color: var(--bs-${n});
  --bs-btn-bg: transparent;
  --bs-btn-border-color: var(--bs-${n});
  --bs-btn-hover-color: var(--bs-${n}-contrast);
  --bs-btn-hover-bg: var(--bs-${n});
  --bs-btn-hover-border-color: var(--bs-${n});
  --bs-btn-active-bg: var(--bs-${n});
  --bs-btn-active-border-color: var(--bs-${n});
  --bs-btn-disabled-color: var(--bs-${n});
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: var(--bs-${n});
`

const padY = (s?: ButtonSize) => (s === 'sm' ? '0.25rem' : s === 'lg' ? '0.5rem' : '0.375rem')
const padX = (s?: ButtonSize) => (s === 'sm' ? '0.5rem' : s === 'lg' ? '1rem' : '0.75rem')
const fontSize = (s?: ButtonSize) => (s === 'sm' ? '0.875rem' : s === 'lg' ? '1.25rem' : '1rem')
const radius = (s?: ButtonSize) =>
  s === 'sm' ? 'var(--bs-border-radius-sm)' : s === 'lg' ? 'var(--bs-border-radius-lg)' : 'var(--bs-border-radius)'

const StyledButton = styled.button<{ $variant: ButtonVariant; $size?: ButtonSize }>`
  ${(p) => (isOutline(p.$variant) ? outlineVars(baseColor(p.$variant)) : solidVars(baseColor(p.$variant)))}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: var(--bs-font-weight-normal, 400);
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: ${(p) => padY(p.$size)} ${(p) => padX(p.$size)};
  font-size: ${(p) => fontSize(p.$size)};
  border: 1px solid var(--bs-btn-border-color);
  border-radius: ${(p) => radius(p.$size)};
  color: var(--bs-btn-color);
  background-color: var(--bs-btn-bg);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover:not(:disabled) {
    color: var(--bs-btn-hover-color);
    background-color: var(--bs-btn-hover-bg);
    border-color: var(--bs-btn-hover-border-color);
  }
  &:active:not(:disabled) {
    background-color: var(--bs-btn-active-bg);
    border-color: var(--bs-btn-active-border-color);
  }
  &:disabled {
    color: var(--bs-btn-disabled-color);
    background-color: var(--bs-btn-disabled-bg);
    border-color: var(--bs-btn-disabled-border-color);
    opacity: 0.65;
    cursor: not-allowed;
  }
`

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size, ...rest }, ref) => (
    <StyledButton ref={ref} $variant={variant} $size={size} {...rest} />
  ),
)
Button.displayName = 'Button'
