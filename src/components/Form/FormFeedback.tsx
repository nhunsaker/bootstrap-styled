import React from 'react'
import styled from 'styled-components'

export type FeedbackType = 'valid' | 'invalid'

export interface FormFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valid (green) or invalid (red) feedback. Default `invalid`. */
  type?: FeedbackType
  /** Render the tooltip variant (absolutely positioned overlay) instead of the
   * inline block message. */
  tooltip?: boolean
}

// Feedback text is hidden until a preceding sibling control is marked
// `.is-valid` / `.is-invalid` (engineer A owns emitting that class on the
// control) or, inside a `.was-validated` form, matches `:valid` / `:invalid`.
// Exact from the 5.3.8 oracle:
//   .valid-feedback   { display:none;width:100%;margin-top:.25rem;font-size:.875em;color:var(--bs-form-valid-color) }
//   .invalid-feedback { … color:var(--bs-form-invalid-color) }
//   .is-valid~.valid-feedback,.was-validated :valid~.valid-feedback { display:block }
//   .valid-tooltip    { position:absolute;top:100%;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;color:#fff;background-color:var(--bs-success);border-radius:var(--bs-border-radius) }
// `--bs-form-valid-color` / `--bs-form-invalid-color` fall back to the exact
// 5.3.8 light values (#198754 / #dc3545) when the token isn't emitted.
const VALID_COLOR = 'var(--bs-form-valid-color, #198754)'
const INVALID_COLOR = 'var(--bs-form-invalid-color, #dc3545)'

const ValidFeedback = styled.div.attrs({ className: 'valid-feedback' })`
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: ${VALID_COLOR};

  .is-valid ~ &,
  .was-validated :valid ~ & {
    display: block;
  }
`

const InvalidFeedback = styled.div.attrs({ className: 'invalid-feedback' })`
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: ${INVALID_COLOR};

  .is-invalid ~ &,
  .was-validated :invalid ~ & {
    display: block;
  }
`

const ValidTooltip = styled.div.attrs({ className: 'valid-tooltip' })`
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: var(--bs-success);
  border-radius: var(--bs-border-radius);

  .is-valid ~ &,
  .was-validated :valid ~ & {
    display: block;
  }
`

const InvalidTooltip = styled.div.attrs({ className: 'invalid-tooltip' })`
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: var(--bs-danger);
  border-radius: var(--bs-border-radius);

  .is-invalid ~ &,
  .was-validated :invalid ~ & {
    display: block;
  }
`

export const FormFeedback = React.forwardRef<HTMLDivElement, FormFeedbackProps>(
  ({ type = 'invalid', tooltip = false, ...rest }, ref) => {
    const Comp =
      type === 'valid'
        ? tooltip
          ? ValidTooltip
          : ValidFeedback
        : tooltip
          ? InvalidTooltip
          : InvalidFeedback
    return <Comp ref={ref} {...rest} />
  },
)
FormFeedback.displayName = 'FormFeedback'
