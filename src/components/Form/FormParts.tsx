import styled from 'styled-components'

// Label, help text, and a spacing group — the small form scaffolding pieces.
export const FormLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--bs-body-color);
`

export const FormText = styled.small`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary);
`

/** Vertical spacing wrapper (≈ Bootstrap's mb-3 grouping). */
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`
