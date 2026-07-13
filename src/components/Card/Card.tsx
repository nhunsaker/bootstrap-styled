import styled from 'styled-components'

// Bootstrap 5.3 card + common sub-parts. Plain styled exports (compose freely).
// Colors/metrics track Bootstrap's --bs-card-* model: the border uses the
// translucent border token (rgba(0,0,0,.175)), caps use rgba(body-color-rgb,.03),
// and the subtitle uses the body-secondary color — all via `--bs-*` vars with
// exact 5.3.8 fallbacks (verified against parity/oracle/bootstrap.min.css).
export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  line-height: var(--bs-body-line-height, 1.5);
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-clip: border-box;
  border: var(--bs-border-width, 1px) solid
    var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));
  border-radius: var(--bs-border-radius);
`

const innerRadius = 'calc(var(--bs-border-radius) - var(--bs-border-width, 1px))'

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
`

export const CardTitle = styled.h5`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

export const CardSubtitle = styled.h6`
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
  color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
`

export const CardText = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`

export const CardHeader = styled.div`
  padding: 0.5rem 1rem;
  color: inherit;
  background-color: var(--bs-card-cap-bg, rgba(var(--bs-body-color-rgb, 33, 37, 41), 0.03));
  border-bottom: var(--bs-border-width, 1px) solid
    var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));
  &:first-child {
    border-radius: ${innerRadius} ${innerRadius} 0 0;
  }
`

export const CardFooter = styled.div`
  padding: 0.5rem 1rem;
  color: inherit;
  background-color: var(--bs-card-cap-bg, rgba(var(--bs-body-color-rgb, 33, 37, 41), 0.03));
  border-top: var(--bs-border-width, 1px) solid
    var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));
  &:last-child {
    border-radius: 0 0 ${innerRadius} ${innerRadius};
  }
`
