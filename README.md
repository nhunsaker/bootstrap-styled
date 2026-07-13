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

**[Bootstrap 5.3.8](https://github.com/twbs/bootstrap/releases/tag/v5.3.8) UI, rebuilt in
[styled-components](https://styled-components.com/).** CSS-in-JS, React 18, TypeScript, and a
runtime `--bs-*` token surface — the modern rewrite of
[bootstrap-styled/v4](https://github.com/bootstrap-styled/v4). Every component, helper, and utility
is rendered pixel-for-pixel against a vendored Bootstrap 5.3.8 oracle by a hermetic parity harness.

> **Status — RC1 (v1.0.0), branch-local.** This 1.0.0 cut reaches full Bootstrap 5.3.8 parity but has
> **not** yet been republished to npm and the CI workflow is founder-gated on first push. See
> [`CHANGELOG.md`](./CHANGELOG.md) and `parity/scorecard.md` for the specifics.

---

## Table of Contents

1. [Quickstart](#1-quickstart)
2. [Components](#2-components)
3. [Utilities — `<Box>` and `<Icon>`](#3-utilities--box-and-icon)
4. [Dark mode](#4-dark-mode)
5. [Parity harness](#5-parity-harness)
6. [Documentation](#6-documentation)
7. [License MIT](#7-license-mit)

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
| `bootstrap-icons` | *(bundled — powers `<Icon/>`)* |

### Usage

Wrap your app in `BootstrapStyledProvider` — it injects the theme as `--bs-*` CSS variables and
provides the styled-components theme context. (The package exports it as `BootstrapStyledProvider`.)

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

`createTheme()` deep-merges overrides onto Bootstrap 5 defaults. The provider projects the theme onto
`--bs-*` CSS variables at runtime — changing the theme re-skins every component instantly, no
re-bundling needed.

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

## 2. Components

The full Bootstrap 5.3.8 roster, all exported from the package root:

- **Actions & indicators** — `Button`, `ButtonGroup`, `Badge`, `Spinner`, `Progress`,
  `Placeholder`, `CloseButton`, `Toast`.
- **Content & layout** — `Container`/`Row`/`Col` grid, `Stack`, `Ratio`, `Typography`, `Table`,
  `Image`, `Figure`, `Card`, `ListGroup`, `Carousel`.
- **Navigation** — `Nav`, `Navbar`, `Tabs`, `Breadcrumb`, `Pagination`, `Scrollspy`, `Collapse`,
  `Accordion`.
- **Feedback & overlays** (on `@floating-ui/react`) — `Alert`, `Modal`, `Offcanvas`, `Dropdown`,
  `Tooltip`, `Popover`.
- **Forms** — `FormControl` (incl. `as="textarea"`, sizes, `isInvalid`/`isValid`), `FormSelect`,
  `FormCheck` (checkbox/radio/switch), `FormRange`, `FloatingLabel`, `FormFeedback`, `FormLabel`,
  `FormText`, `FormGroup`, `InputGroup`/`InputGroupText`.
- **Helpers** — `Clearfix`, `TextBg`, `FocusRing`, `IconLink`, Position
  (`FixedTop`/`FixedBottom`/`StickyTop`/`StickyBottom`/`TranslateMiddle`), `StretchedLink`,
  `TextTruncate`, `Vr`, `VisuallyHidden`.

---

## 3. Utilities — `<Box>` and `<Icon>`

### `<Box>` — the Utilities API as typed props

A polymorphic layout primitive (`as`, default `div`) that carries Bootstrap's utility system as typed
props. Each value maps 1:1 to the exact Bootstrap utility class, and responsive object syntax
expands to breakpoint classes.

```tsx
import { Box } from '@metatoy/bootstrap-styled'

<Box m={3} d="flex" bg="primary" />       // → <div class="m-3 d-flex bg-primary" />
<Box m={{ base: 2, md: 4 }} p={3} />      // → <div class="m-2 m-md-4 p-3" />
<Box as="section" rounded bg="body-tertiary" />
```

> `Box` emits utility **classes**; those classes render correctly when Bootstrap's utility CSS is
> present (shipped via your global stylesheet / theme surface).

### `<Icon/>` — Bootstrap Icons, tree-shakeable

```tsx
import { Icon } from '@metatoy/bootstrap-styled'

<Icon name="alarm" />
<Icon name="chevron-down" width={20} />
```

`<Icon name="…" />` resolves from a bundled registry and renders the SVG inline. For zero bundle tax,
prefer the **tree-shakeable per-icon exports** so only the icons you use are included. Run
`npm run gen:icons` to regenerate the full registry from `bootstrap-icons`.

---

## 4. Dark mode

Dark mode uses Bootstrap's native `data-bs-theme` attribute — no separate stylesheet. Set it on the
provider and read/toggle it via `useColorMode`.

```tsx
import { BootstrapStyledProvider, useColorMode } from '@metatoy/bootstrap-styled'

<BootstrapStyledProvider colorMode="dark">
  {/* every --bs-* token flips to its dark value */}
</BootstrapStyledProvider>
```

---

## 5. Parity harness

`npm run parity` runs a hermetic visual-regression + accessibility gate. It renders every
component/state cell twice — once as the styled component, once against a **vendored, pinned
Bootstrap 5.3.8 oracle** (no network) — captures both via Playwright/Chromium, then:

- diffs with **pixelmatch** (1280×1800 @2× DPR, animations frozen, threshold 0.1, AA excluded, padded
  to a common canvas), and
- runs **axe-core** on each subtree for WCAG 2.0/2.1 A/AA violations.

Results land in `parity/scorecard.md` / `scorecard.json` with per-component and per-cell diff
percentages (🟢 ≤0.5% · 🟡 ≤3% · 🔴 >3%). The eight example pages (`Headers`, `Heroes`, `Features`,
`Jumbotron`, `Navbars`, `Sidebars`, `Footers`, `KitchenSink`) are diffed the same way as the human
proof.

---

## 6. Documentation

Interactive component demos, theming guides, and the example pages live in the
[Ladle](https://ladle.dev/) story surface (`npm run docs`, built with `npm run docs:build` →
`docs-build/`). Published docs: [v5 documentation](https://nhunsaker.github.io/bootstrap-styled/).

---

## 7. License MIT

MIT. Derived in part from [bootstrap-styled/v4](https://github.com/bootstrap-styled/v4) (© 2017–18
Yeutech, MIT) — see [NOTICE](./NOTICE).
