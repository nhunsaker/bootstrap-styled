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

[twbs/bootstrap V5 UI Components](https://github.com/twbs/bootstrap/releases/tag/v5.3.8) made with bootstrap-styled. Work with css-in-js, react, styled-components, and Bootstrap Styled utilities based off of [bootstrap-styled/v4](https://github.com/bootstrap-styled/v4).

---

## Table of Contents

1. [Quickstart](#1-quickstart)
2. [Documentation](#2-documentation)
3. [License MIT](#3-license-mit)

---

## 1. Quickstart

### Install

```bash
npm i @metatoy/bootstrap-styled styled-components react react-dom
```

| Package | Version |
|---|---|
| `react` | ≥ 18 |
| `react-dom` | ≥ 18 |
| `styled-components` | ≥ 6 |
| `@floating-ui/react` | ≥ 0.26 *(auto-installed)* |

### Usage

Wrap your app in `BootstrapStyledProvider` — it injects the theme as `--bs-*` CSS variables and provides the styled-components theme context.

```tsx
import { BootstrapStyledProvider, Button } from '@metatoy/bootstrap-styled'

export default function App() {
  return (
    <BootstrapStyledProvider>
      <Button variant="primary">Hello!</Button>
    </BootstrapStyledProvider>
  )
}
```

### Theming

`createTheme()` deep-merges overrides onto Bootstrap 5 defaults. The provider projects the theme onto `--bs-*` CSS variables at runtime — changing the theme re-skins every component instantly, no re-bundling needed.

```tsx
import { BootstrapStyledProvider, createTheme, Button } from '@metatoy/bootstrap-styled'

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

---

## 2. Documentation

Read the [v5 documentation](https://nhunsaker.github.io/bootstrap-styled/) for interactive component demos, theming guides, props reference, and color mode examples.

---

## 3. License MIT

MIT. Derived in part from [bootstrap-styled/v4](https://github.com/bootstrap-styled/v4) (© 2017–18 Yeutech, MIT) — see [NOTICE](./NOTICE).
