<p align="center">
  <a href="https://www.npmjs.com/package/@metatoy/bootstrap-styled">
    <img src="./assets/banner.svg" alt="@metatoy/bootstrap-styled" width="800" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@metatoy/bootstrap-styled">
    <img src="https://img.shields.io/npm/v/@metatoy/bootstrap-styled?style=flat-square&color=6868AA&labelColor=0D0E0C" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@metatoy/bootstrap-styled">
    <img src="https://img.shields.io/npm/l/@metatoy/bootstrap-styled?style=flat-square&color=6868AA&labelColor=0D0E0C" alt="license" />
  </a>
  <a href="https://github.com/nhunsaker/bootstrap-styled/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/nhunsaker/bootstrap-styled/ci.yml?branch=main&style=flat-square&color=6868AA&labelColor=0D0E0C&label=CI" alt="CI" />
  </a>
</p>

Bootstrap 5 components implemented in **styled-components**, **theme-driven** —
a modern rewrite of the abandoned [`bootstrap-styled/v4`](https://github.com/bootstrap-styled/v4)
targeting **Bootstrap 5.3 · React 18 · styled-components 6 · TypeScript**.

> Status: **published — [`0.1.0` on npm](https://www.npmjs.com/package/@metatoy/bootstrap-styled)**.
> Full component surface, browser-verified, with a Vitest suite:
> - **Core** — Button, Badge, Alert, Card (+sub-parts), Spinner, Grid
>   (Container/Row/Col), Stack, CloseButton.
> - **Forms** — FormControl, FormSelect, FormCheck (checkbox/radio/switch),
>   FormLabel/FormText/FormGroup, InputGroup.
> - **Navigation & feedback** — Nav/Navbar, Breadcrumb, Pagination, Progress,
>   Tabs, Accordion.
> - **Overlays** — Modal, Offcanvas, Dropdown, Tooltip, Popover (on
>   `@floating-ui/react`).
>
> Known limitation: Dropdown **keyboard arrow-key navigation** is not yet
> implemented (click + outside/Escape dismiss + Tab-focusable items work). See
> `CHANGELOG.md`.

## Why

`bootstrap-styled/v4` is Bootstrap 4 / React 16 / sc 4–5 and unmaintained since
2020. There's no modern successor. This is a fresh, TypeScript implementation
that leans on Bootstrap 5.3's **runtime CSS variables** (`--bs-*`), so theming —
including color modes and live token overrides — cascades at runtime.

## Install

```bash
npm i @metatoy/bootstrap-styled styled-components react react-dom
```

## Usage

```tsx
import { BootstrapStyledProvider, Button, createTheme } from '@metatoy/bootstrap-styled'

const theme = createTheme({ colors: { primary: '#7c3aed' } })

export function App() {
  return (
    <BootstrapStyledProvider theme={theme} colorMode="light">
      <Button variant="primary">Save</Button>
      <Button variant="outline-danger">Delete</Button>
    </BootstrapStyledProvider>
  )
}
```

The provider injects `GlobalStyles`, which projects the theme onto `--bs-*` CSS
variables; components read those vars, so overriding them at runtime (color
mode, or a Figtree preview) re-skins everything.

## Develop

```bash
npm install
npm run typecheck     # tsc --noEmit
npm run build         # tsup → dist (ESM + CJS + .d.ts)
npm run dev           # tsup --watch
```

## Review the components (visual)

A dev-only Vite playground renders every component (imports straight from
`src/`) with a **live primary-color picker** and a **light/dark toggle** — so
you can confirm theming, `color-mix` hover/active, and contrast actually work:

```bash
npm install
npm run play          # → http://localhost:5174
```

What to check:
- **Buttons** — variants, `outline-*`, sizes, disabled, `as="a"`; hover/active
  shading; text stays legible on every variant (contrast).
- Change the **Primary** color picker → all primary surfaces re-skin live, and
  button/badge text recolors for contrast.
- Toggle **Mode** → dark mode via `data-bs-theme`.
- **Forms** — focus rings, `isInvalid`/`isValid`, switch toggle, input-group radii.

The playground is dev-only (not in the published `files`).

## License

MIT. Derived in part from `bootstrap-styled/v4` (© 2017–18 Yeutech, MIT) — see
`NOTICE`.
