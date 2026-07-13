import { Box, Display, Lead, Button, BsIconChevronRight } from '../../index'

/**
 * Jumbotron — the classic Bootstrap "hero panel" example, rebuilt the React way
 * from bootstrap-styled primitives (Box · Typography · Button).
 *
 * Bootstrap 5 dropped the `.jumbotron` component class, so — exactly as the
 * official 5.x docs recommend — the hero is composed from utility classes on a
 * padded, rounded, tinted panel. This styled twin renders the SAME intended DOM
 * as `Jumbotron.native.tsx`:
 *   - the outer panel via `<Box>` utility props → `p-5 mb-4 bg-body-tertiary rounded-3`
 *   - the display heading + lead via `<Display>` / `<Lead>` (self-styling)
 *   - the CTA via `<Button as="a">` (self-styling)
 * so under the Bootstrap oracle CSS + Provider tokens the two are pixel-equal.
 *
 * NB: `<Box>` emits real Bootstrap utility *classes*; it renders correctly only
 * when Bootstrap's utility CSS is present (shipped by the host app / the harness
 * oracle). The `<hr className="my-4">` likewise leans on Reboot + the `.my-4`
 * spacing utility. The self-styling widgets (Display/Lead/Button) do not.
 */
export function Jumbotron() {
  return (
    <Box p={5} mb={4} bg="body-tertiary" rounded={3}>
      <Display size={4}>Build faster with Sorb</Display>
      <Lead>
        A design-token bridge between Figma and React. Preview proposed tokens in
        your running app before a single line of CSS ships.
      </Lead>
      <hr className="my-4" />
      <p>
        This hero is composed entirely from bootstrap-styled primitives — utility
        props on a Box, typography helpers, and a button — so it re-skins live the
        moment a token changes.
      </p>
      <Button as="a" href="#" variant="primary" size="lg" role="button">
        Learn more <BsIconChevronRight size={18} />
      </Button>
    </Box>
  )
}
Jumbotron.displayName = 'Jumbotron'
