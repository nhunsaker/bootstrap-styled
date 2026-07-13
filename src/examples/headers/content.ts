/**
 * Shared content for the Headers example pair (styled + native twin).
 *
 * Both sides import these constants so text is byte-identical on the pixel diff.
 * The SVG path is the vendored Bootstrap-Icons `star` glyph (same one our
 * `<BsIconStar/>` renders), inlined here so the native twin paints the exact
 * same mark without importing a React icon component.
 */

/** Bootstrap-Icons `star` inner markup (matches `<BsIconStar/>`). */
export const STAR_PATH =
  'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z'

export const BRAND = 'Acme'

export const NAV_LINKS = [
  { label: 'Home', href: '#', active: true },
  { label: 'Features', href: '#', active: false },
  { label: 'Pricing', href: '#', active: false },
  { label: 'About', href: '#', active: false },
] as const

export const LOGIN_LABEL = 'Login'
export const SIGNUP_LABEL = 'Sign-up'
