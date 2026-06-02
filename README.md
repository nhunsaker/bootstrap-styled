# @nhunsaker/bootstrap-styled

Bootstrap 5 components implemented in **styled-components**, **theme-driven** —
a modern rewrite of the abandoned [`bootstrap-styled/v4`](https://github.com/bootstrap-styled/v4)
targeting **Bootstrap 5.3 · React 18 · styled-components 6 · TypeScript**.

> Status: **early (M0/M1)** — foundation + first Core component (Button). See
> the rewrite spec for the full plan and phasing.

## Why

`bootstrap-styled/v4` is Bootstrap 4 / React 16 / sc 4–5 and unmaintained since
2020. There's no modern successor. This is a fresh, TypeScript implementation
that leans on Bootstrap 5.3's **runtime CSS variables** (`--bs-*`), so theming —
including color modes and live token overrides — cascades at runtime.

## Install

```bash
npm i @nhunsaker/bootstrap-styled styled-components react react-dom
```

## Usage

```tsx
import { BootstrapStyledProvider, Button, createTheme } from '@nhunsaker/bootstrap-styled'

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

No docs harness yet (kept lean) — eyeball components via the `figtree-demo`
showcase or a throwaway Vite page. A docs tool can be added at publish time.

## License

MIT. Derived in part from `bootstrap-styled/v4` (© 2017–18 Yeutech, MIT) — see
`NOTICE`.
