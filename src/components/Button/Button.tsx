import React from 'react'
import styled, { css } from 'styled-components'
import type { ColorName } from '../../theme/types'

export type ButtonVariant = ColorName | `outline-${ColorName}`
export type ButtonSize = 'sm' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Bootstrap variant, e.g. "primary", "danger", "outline-primary". */
  variant?: ButtonVariant
  size?: ButtonSize
}

// Solid variants whose contrasting text should be dark, not white.
const DARK_TEXT: ReadonlySet<string> = new Set(['light', 'warning', 'info'])

const isOutline = (v: ButtonVariant): boolean => v.startsWith('outline-')
const baseColor = (v: ButtonVariant): ColorName =>
  (isOutline(v) ? v.slice('outline-'.length) : v) as ColorName

const sizePad = (s?: ButtonSize) =>
  s === 'sm' ? '0.25rem 0.5rem' : s === 'lg' ? '0.5rem 1rem' : '0.375rem 0.75rem'
const sizeFont = (s?: ButtonSize) =>
  s === 'sm' ? '0.875rem' : s === 'lg' ? '1.25rem' : '1rem'

const StyledButton = styled.button<{ $variant: ButtonVariant; $size?: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: var(--bs-border-radius);
  padding: ${(p) => sizePad(p.$size)};
  font-size: ${(p) => sizeFont(p.$size)};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${(p) => {
    const c = `var(--bs-${baseColor(p.$variant)})`
    const onColor = DARK_TEXT.has(baseColor(p.$variant)) ? 'var(--bs-dark)' : '#fff'
    return isOutline(p.$variant)
      ? css`
          color: ${c};
          border-color: ${c};
          background-color: transparent;
          &:hover:not(:disabled) {
            color: ${onColor};
            background-color: ${c};
            border-color: ${c};
          }
        `
      : css`
          color: ${onColor};
          background-color: ${c};
          border-color: ${c};
          &:hover:not(:disabled) {
            filter: brightness(0.92);
          }
        `
  }}

  &:disabled {
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
