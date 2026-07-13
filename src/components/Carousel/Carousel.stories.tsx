import type { Story } from '@ladle/react'
import { useState } from 'react'
import { Carousel, CarouselItem, CarouselCaption } from './Carousel'

export default { title: 'Components/Carousel' }

const Slide = ({ n, color }: { n: number; color: string }) => (
  <div
    style={{
      height: '320px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: color,
      color: '#fff',
      fontSize: '2rem',
    }}
  >
    Slide {n}
  </div>
)

const COLORS = ['#6f42c1', '#0d6efd', '#198754']

// Uncontrolled with indicators + controls + captions.
export const Basic: Story = () => (
  <div style={{ maxWidth: 640 }}>
    <Carousel>
      {COLORS.map((c, i) => (
        <CarouselItem key={i}>
          <Slide n={i + 1} color={c} />
          <CarouselCaption>
            <h5>Slide {i + 1} label</h5>
            <p>Some representative placeholder content.</p>
          </CarouselCaption>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

// Autoplaying, crossfade, pauses on hover.
export const AutoplayFade: Story = () => (
  <div style={{ maxWidth: 640 }}>
    <Carousel ride="carousel" interval={2000} fade>
      {COLORS.map((c, i) => (
        <CarouselItem key={i}>
          <Slide n={i + 1} color={c} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

// Controlled active index.
export const Controlled: Story = () => {
  const [index, setIndex] = useState(0)
  return (
    <div style={{ maxWidth: 640 }}>
      <Carousel activeIndex={index} onSelect={(i) => setIndex(i)}>
        {COLORS.map((c, i) => (
          <CarouselItem key={i}>
            <Slide n={i + 1} color={c} />
          </CarouselItem>
        ))}
      </Carousel>
      <div style={{ marginTop: '0.5rem' }}>
        {COLORS.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{ marginRight: 4 }}>
            Go to {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

// Static: force a specific slide + dark theming for a harness parity shot.
export const StaticSlideDark: Story = () => (
  <div style={{ maxWidth: 640 }}>
    <Carousel activeIndex={1} dark>
      {COLORS.map((c, i) => (
        <CarouselItem key={i}>
          <Slide n={i + 1} color={c} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)
