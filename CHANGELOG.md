# Changelog

All notable changes to `@metatoy/bootstrap-styled`. Follows
[Keep a Changelog](https://keepachangelog.com/) and [SemVer](https://semver.org/).

## [1.0.0] — 2026-07-13

The RC1 leap: from the 0.1.0 component shell to **full Bootstrap 5.3.8 parity**,
proven by a hermetic visual-regression + accessibility harness. Every surface
below is rendered pixel-for-pixel against a vendored Bootstrap 5.3.8 oracle.

> Status: this is a **release-candidate cut prepared on-branch**. It has **not**
> been republished to npm and CI has **not** yet run green (the CI workflow is
> authored but founder-gated on first push). See the parity scorecard
> (`parity/scorecard.md`) for the current per-component diff numbers.

### Added

- **Complete component roster** — the full Bootstrap 5.3.8 component set. On top
  of the 0.1.0 core, the **7 previously-missing components** are now built to
  parity: `ButtonGroup`, `ListGroup`, `Placeholder`, `Toast`, `Collapse`,
  `Scrollspy`, and `Carousel`. Full roster (all exported from the package root):
  `Button` · `ButtonGroup` · `Badge` · `Alert` · `Card` · `Spinner` ·
  `Progress` · `CloseButton` · `Accordion` · `Breadcrumb` · `Pagination` ·
  `Nav` · `Navbar` · `Tabs` · `ListGroup` · `Placeholder` · `Toast` ·
  `Collapse` · `Scrollspy` · `Carousel` · `Modal` · `Offcanvas` · `Dropdown` ·
  `Tooltip` · `Popover`.
- **Layout & content** — `Container`/`Row`/`Col` responsive grid (completed to
  parity), `Ratio`, `Stack`, `Typography` (headings/display/lead/inline),
  `Table` (variants + states), `Image`, and `Figure`.
- **Forms** — the full Forms surface to parity: `FormControl` (incl.
  `as="textarea"`, sizes, `isInvalid`/`isValid`), `FormSelect`, `FormCheck`
  (checkbox/radio/switch), `FormRange`, `FloatingLabel`, `FormFeedback`,
  `FormLabel`/`FormText`/`FormGroup`, and `InputGroup`/`InputGroupText`.
- **`<Icon/>`** — Bootstrap Icons rendered inline as SVG. `<Icon name="alarm" />`
  resolves from a bundled registry; **tree-shakeable** per-icon exports keep the
  bundle tax at zero for consumers who import only the icons they use. A full
  `npm run gen:icons` regenerates the complete registry from `bootstrap-icons`.
- **`<Box>` Utilities API** — a polymorphic layout primitive (`as`, default
  `div`) that carries Bootstrap's utility system as **typed props**. Each value
  maps 1:1 to the exact Bootstrap utility class, with responsive object syntax:
  `<Box m={3} d="flex" bg="primary" />` → `<div class="m-3 d-flex bg-primary" />`
  and `<Box m={{ base: 2, md: 4 }} />` → `<div class="m-2 m-md-4" />`.
- **The 11 Helpers** — the Bootstrap Helpers taxonomy to parity: `Clearfix`,
  `TextBg` (color & background), `FocusRing`, `IconLink`, Position
  (`FixedTop`/`FixedBottom`/`StickyTop`/`StickyBottom`/`TranslateMiddle`),
  `StretchedLink`, `TextTruncate`, `Vr` (vertical rule), and `VisuallyHidden`
  (alongside `Ratio` and `Stack`, which ship under components). Each helper emits
  its exact Bootstrap class and inlines the oracle CSS via styled-components so
  it renders standalone.
- **8 example pages** — real-world compositions used as the human proof and as
  parity fixtures: `Headers`, `Heroes`, `Features`, `Jumbotron`, `Navbars`,
  `Sidebars`, `Footers`, and `KitchenSink`. Each ships a styled version plus a
  raw-Bootstrap `*.native` twin for apples-to-apples diffing. (Example pages are
  internal — deliberately not re-exported from `src/index.ts`.)
- **Hermetic parity harness** — a self-contained visual-regression + a11y gate
  (`npm run parity`, `parity/run.mjs`). Renders every component/state cell twice
  — once as the styled component, once against a **vendored, pinned Bootstrap
  5.3.8 oracle** (no network) — captures both via Playwright/Chromium, and:
  - diffs them with **pixelmatch** (viewport 1280×1800 @2× DPR, animations
    frozen, threshold 0.1, AA excluded, padded to a common canvas), and
  - runs **axe-core** on each subtree for WCAG 2.0/2.1 A/AA violations.
  Results land in `parity/scorecard.md` / `scorecard.json` with per-component and
  per-cell diff percentages (🟢 ≤0.5% · 🟡 ≤3% · 🔴 >3%).

### Theme / token model

- Theme is projected at runtime onto Bootstrap's own **`--bs-*` CSS custom
  properties**, so overrides cascade live and re-skin every component without a
  rebuild. `createTheme()` deep-merges overrides onto the Bootstrap 5 defaults;
  `BootstrapStyledProvider` wires the `ThemeProvider` + `GlobalStyles` + Reboot.
- **Dark mode** via Bootstrap's native `data-bs-theme` attribute
  (`colorMode="light" | "dark"`), exposed through `useColorMode`.

### Tooling

- CI workflow (`.github/workflows/ci.yml`): `npm ci` → typecheck → test → build
  → **parity** as the visual-regression gate (Playwright Chromium installed
  first). Authored this release; runs once pushed (founder-gated).
- Build via **tsup** (ESM + CJS + `.d.ts`), tests via **Vitest** + Testing
  Library, interactive docs via **Ladle** (52 stories, incl. the example pages).

## [0.1.0] — 2026-06-02

First published pre-release: a Bootstrap 5 component kit in styled-components 6 /
React 18 / TypeScript, theme-driven via runtime `--bs-*` CSS variables.

### Added
- **Theme** — `createTheme`, `BootstrapStyledProvider` (ThemeProvider +
  GlobalStyles + `data-bs-theme` color mode), `colorContrast` (YIQ), a minimal
  Reboot, and runtime `--bs-*` projection so overrides cascade live.
- **Core** — `Button` (variants incl. `outline-*`, sizes, `as`), `Badge`,
  `Alert`, `Card` (+ Body/Title/Subtitle/Text/Header/Footer), `Spinner`,
  `Container`/`Row`/`Col` grid (responsive spans), `Stack`, `CloseButton`.
- **Forms** — `FormControl` (+ `as="textarea"`, sizes, `isInvalid`/`isValid`),
  `FormSelect`, `FormCheck` (checkbox/radio/switch), `FormLabel`/`FormText`/
  `FormGroup`, `InputGroup`/`InputGroupText`.
- **Navigation & feedback** — `Nav`/`NavItem`/`NavLink`, `Navbar`/`NavbarBrand`,
  `Breadcrumb`, `Pagination`, `Progress`/`ProgressBar`, `Tabs`/`Tab`,
  `Accordion`/`AccordionItem`.
- **Overlays** (on `@floating-ui/react`) — `Modal`, `Offcanvas`, `Dropdown`,
  `Tooltip`, `Popover` (positioning, dismiss, focus management, ARIA roles).
- Tooling: tsup (ESM + CJS + `.d.ts`), Vitest + Testing Library suite, a Vite
  review playground.

### Known limitations / planned
- **Dropdown keyboard arrow-key navigation** is not yet implemented (click +
  outside/Escape dismiss + Tab-focusable items work). Needs floating-ui's full
  Menu recipe (focus-follow, open-focuses-first-item, typeahead).
