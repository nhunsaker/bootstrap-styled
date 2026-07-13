import React from 'react'
import styled from 'styled-components'

// Bootstrap 5.3.8 `.ratio` helper.
//   .ratio            { position: relative; width: 100% }
//   .ratio::before    { display: block; padding-top: var(--bs-aspect-ratio); content: "" }
//   .ratio > *        { position: absolute; top:0; left:0; width:100%; height:100% }
// The named ratios only set the `--bs-aspect-ratio` custom property.
const NAMED_RATIO: Record<string, string> = {
  '1x1': '100%',
  '4x3': '75%',
  '16x9': '56.25%',
  '21x9': '42.8571428571%',
}

export type RatioName = '1x1' | '4x3' | '16x9' | '21x9'

export interface RatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A preset aspect ratio (`'1x1' | '4x3' | '16x9' | '21x9'`) or a custom
   * `padding-top` percentage string (e.g. `'50%'` for 2x1). Defaults to
   * `'1x1'`. A custom value maps straight onto `--bs-aspect-ratio`.
   */
  ratio?: RatioName | string
  as?: React.ElementType
}

const StyledRatio = styled.div<{ $ratio: string }>`
  --bs-aspect-ratio: ${(p) => p.$ratio};
  position: relative;
  width: 100%;

  &::before {
    display: block;
    padding-top: var(--bs-aspect-ratio);
    content: '';
  }

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  ({ ratio = '1x1', ...rest }, ref) => {
    const aspect = NAMED_RATIO[ratio] ?? ratio
    return <StyledRatio ref={ref} $ratio={aspect} {...rest} />
  },
)
Ratio.displayName = 'Ratio'
