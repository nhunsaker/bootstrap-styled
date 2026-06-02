# Changelog

All notable changes to `@metatoy/bootstrap-styled`. Follows
[Keep a Changelog](https://keepachangelog.com/) and [SemVer](https://semver.org/).

## [0.1.0] — unreleased

First usable pre-release: a Bootstrap 5 component kit in styled-components 6 /
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
- Not yet published to npm.
