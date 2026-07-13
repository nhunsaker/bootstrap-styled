# bootstrap-styled → Bootstrap 5.3.x parity gap analysis

**P0 deliverable, GFP RC1 Part 1.** Enumerates the full Bootstrap 5.3.x documented surface
(Layout · Content · Forms · 24 Components · Helpers · Utilities API · Icons · Examples) and audits
`@metatoy/bootstrap-styled` v0.1.0 against it. Every BUILT/PARTIAL judgment below is grounded in a
read of the actual component source under `src/components/` and `src/theme/`, not the stories or
docs. Status legend: **BUILT** (present, only look/behavior-parity gaps remain) · **PARTIAL**
(exists but missing named sub-parts or variants) · **MISSING** (no implementation at all).

---

## Summary counts

| Surface area | Items | Built | Partial | Missing |
|---|---|---|---|---|
| Layout | 4 | 0 | 3 | 1 |
| Content | 5 | 0 | 1 | 4 |
| Forms | 9 | 0 | 5 | 4 |
| Components (24) | 24 | 0 | 17 | 7 |
| Helpers | 12 | 1 | 0 | 11 |
| Utilities API | 1 model + ~18 categories | 0 | 0 | 19 |
| Icons | 1 | 0 | 0 | 1 |
| Examples | 1 (≈20 templates) | 0 | 0 | 1 |

**Headline correction to the spec's named gap list:** the spec (§0) lists **Navbar** as one of the
8 missing components. It is not — `src/components/Nav/Navbar.tsx` exists, exports `Navbar` +
`NavbarBrand`, and both are re-exported from `src/components/Nav/index.ts` and thus from
`src/index.ts` (via `export * from './components/Nav'`). It should be reclassified **PARTIAL**
(bare shell only — no toggler/collapse/expand-breakpoint, no `NavbarNav`/`NavbarText`/`NavbarCollapse`
sub-parts, no `fixed-top`/`sticky-top`). The other 7 named gaps are confirmed genuinely **MISSING**
with zero source presence: **Carousel · Button group · Collapse (standalone) · List group ·
Placeholders · Scrollspy · Toasts.**

**A second correction, taxonomic not just factual:** the spec's "Built (exactly 20)" list includes
**Stack** as if it maps 1:1 onto a Bootstrap *component*. In Bootstrap 5.3's own docs nav, **"Stacks"
lives under Helpers**, not the 24-component list — so the true count of *components* built is **19**
(Stack is credited instead under Helpers, where it is in fact the only Helper built). This doesn't
change the total build tally, just which table a row belongs in — reflected below.

---

## Layout

| Item | Status | Coverage note |
|---|---|---|
| **Grid system** (Row/Col, gutters, offset, order, row-cols) | PARTIAL | `Grid.tsx`: `Row`/`Col` flex-grid ✓, breakpoints `sm/md/lg/xl` ✓ but **no `xxl` (1400px)** ✗; span-per-breakpoint ✓ but **no `offset-*`** ✗, **no `order-*`** ✗, **no `row-cols-*`** ✗, **no `col-auto`/auto-width** ✗; gutters are a hardcoded `1.5rem`/`0` on `Row` — **no `g-*`/`gx-*`/`gy-*` per-breakpoint gutter API** ✗; nesting works structurally (untested against oracle).
| **Containers** | PARTIAL | `Container` supports default (all-breakpoint max-width ladder) ✓ and `fluid` ✓. **No responsive container variants** (`container-sm`/`-md`/`-lg`/`-xl`/`-xxl`, each capping at a *different* single breakpoint) ✗.
| **Breakpoints** | PARTIAL | The 4 grid breakpoints (`sm/md/lg/xl`) are hardcoded pixel literals inline in `Grid.tsx`, not sourced from a theme token — no `xxl`, and no single source of truth an app could override. P1 foundations work item.
| **Z-index** | MISSING | No z-index ladder/token at all. Overlay components each hardcode their own literal (`Dropdown` menu `1000`, `Offcanvas` `1044/1045`, `Modal` `1050`, `Popover` `1070`, `Tooltip` `1080`) — this happens to roughly track Bootstrap's real ladder (dropdown 1000, sticky 1020, fixed 1030, offcanvas-backdrop 1040, offcanvas 1045, modal-backdrop 1050, modal 1055, popover 1070, tooltip 1080 — some values drift, e.g. modal should be 1055 not 1050) but there's no `--bs-*-zindex` var/token, so it can't be themed or audited as a set.

## Content

| Item | Status | Coverage note |
|---|---|---|
| **Reboot** | PARTIAL | `GlobalStyles.tsx` sets `box-sizing: border-box`, body margin/font/color/bg, and a *minimal* heading/paragraph/list margin reset. Real Reboot normalizes far more (tables, forms, images, code, abbr, fieldset/legend, hr, small, sub/sup, address, blockquote, etc.) — most of that is simply absent, meaning un-normalized elements (esp. `<table>`, `<img>`, `<hr>`) will look like raw user-agent styles, not Bootstrap. Correctly `:where()`-scoping (the risk-register item) is **not yet done** — it's a bare `createGlobalStyle` touching `:root`/`*`/`body`/headings unscoped, i.e. it *will* leak into a host app today.
| **Typography** | MISSING | No `display-1..6`, `lead`, `.small`/`<small>` styled variant, `mark`, `blockquote`/`blockquote-footer`, list-unstyled/list-inline, or the type-scale utility classes. Only bare `h1–h6`/`p` margin resets exist (via Reboot, above) — no actual Typography component/exports.
| **Images** | MISSING | No `Image`/`img-fluid`/`img-thumbnail`/rounded-image helpers. No src/component at all.
| **Tables** | MISSING | No `Table` component. Zero source presence — no striped/bordered/borderless/hover/variant-color rows, no `table-responsive`, no small tables, no caption/foot styling, no `table-group-divider`.
| **Figures** | MISSING | No `Figure`/`FigureImage`/`FigureCaption`.

## Forms

| Item | Status | Coverage note |
|---|---|---|
| **Overview / general control** | PARTIAL | `FormLabel`, `FormText`, `FormGroup` scaffolding exist (`FormParts.tsx`) but there's no `.form-control-plaintext` (readonly display) variant, no disabled-fieldset propagation pattern documented/tested.
| **Form control** (text/textarea/file/color/date, etc.) | PARTIAL | `FormControl` (`FormControl.tsx`): sizes `sm`/`lg` ✓, `isInvalid`/`isValid` styling ✓, `as="textarea"` composable via the `as` prop ✓ (uses native HTML input styling as a generic base). **No dedicated file-input styling** (Bootstrap re-skins the native file picker button — this repo would render an unstyled OS file button) ✗, **no color-input, range-as-text, or plaintext variant** ✗.
| **Select** | BUILT-ish/PARTIAL | `FormSelect.tsx`: sizes ✓, invalid/valid styling ✓, custom caret ✓. **No multiple-select styling pass, no size-attribute (native multi-row) styling checked.**
| **Checks & radios (+ switches)** | PARTIAL | `FormCheck.tsx`: checkbox/radio (via native `accent-color`) ✓, switch (custom-styled) ✓. **No inline layout variant** (`form-check-inline`) ✗, **no reverse layout** (label-before-input, `form-check-reverse`) ✗, no disabled-label dimming tied to the input's disabled state beyond native behavior.
| **Range** | MISSING | No `<input type="range">` styling at all — Bootstrap's `.form-range` (custom thumb/track, incl. Firefox/WebKit vendor-prefixed pseudo-elements) is unimplemented; would render as a bare unstyled OS slider.
| **Input group** | PARTIAL | `InputGroup.tsx`: addon text (`InputGroupText`) + border-radius collapsing between adjacent children ✓. **No size variants** (`input-group-sm`/`-lg`) ✗, **no dropdown-in-input-group, no checkbox/radio addon, no validation-state interplay with the group border** ✗.
| **Floating labels** | MISSING | No `FormFloating`/floating-label wrapper at all.
| **Layout** | N/A (rides Grid) | Bootstrap's Forms→Layout page is mostly "use the grid system for form rows" — inherits the Grid gaps above (no `row-cols`, no gutters API) rather than being its own separate gap.
| **Validation** | MISSING | `isInvalid`/`isValid` border/focus-ring styling exists on `FormControl`/`FormSelect` (above), but there is **no `valid-feedback`/`invalid-feedback` text component**, no `was-validated` container pattern, and no tooltip-style validation feedback variant. Native-vs-custom validation split (Bootstrap documents both) is entirely unaddressed.

## Components (the 24)

Bootstrap 5.3's 24 documented components, mapped onto what's in `src/components/`:

| # | Bootstrap component | Maps to | Status | Coverage note |
|---|---|---|---|---|
| 1 | Accordion | `Accordion.tsx` | PARTIAL | Single/`alwaysOpen` multi-expand ✓, controlled/uncontrolled `activeKey` ✓, `aria-expanded` ✓. **No `flush` variant** ✗, chevron icon is a CSS border-rotate, not Bootstrap's SVG-mask icon (visual-parity risk, not just missing-feature) ⚠, no keyboard-arrow nav between headers (Bootstrap accordion doesn't require it either — fine).
| 2 | Alert | `Alert.tsx` | PARTIAL | 8 color variants via `color-mix()` ✓, `role="alert"` ✓. **No dismissible alert** (`CloseButton` + fade-out; Bootstrap's `.alert-dismissible`) ✗, **no `.alert-link`** contrast-safe link styling ✗, no icon-with-alert composition helper.
| 3 | Badge | `Badge.tsx` | PARTIAL | 8 color variants ✓, `pill` ✓. **No "positioned badge" composition primitive** (Bootstrap's badge-on-button/avatar overlay recipe relies on utility classes not yet built) ✗.
| 4 | Breadcrumb | `Breadcrumb.tsx` | BUILT | Separator via `::before` on siblings ✓, active item + `aria-current` ✓. No sub-parts named beyond this in Bootstrap docs — effectively complete modulo look-parity verification.
| 5 | Buttons | `Button.tsx` | PARTIAL | Solid variants (8 colors) ✓, **outline variants** (`outline-${color}`) ✓, sizes `sm`/`lg` ✓, disabled state ✓ (native `:disabled`, correct opacity/cursor), button-as-link (`href`/`as` polymorphism) ✓ partial — accepts anchor attrs but always renders a `<button>` unless `as` is passed explicitly (untested that `as="a"` + `href` produces a real link with button styling). **No `active` (pressed/toggled) state prop** ✗ (Bootstrap's `.active`/`aria-pressed` toggle-button pattern absent), **no block-button** (`d-grid`/`w-100` recipe — utility-gated anyway).
| 6 | **Button group** | — | **MISSING** | No `ButtonGroup`/`ButtonToolbar` component. Zero source. No grouped-border-collapsing, no vertical group, no radio/checkbox button groups, no sizing-on-group, no nested dropdown-in-group.
| 7 | Card | `Card.tsx` | PARTIAL | `Card`/`CardBody`/`CardTitle`/`CardSubtitle`/`CardText`/`CardHeader`/`CardFooter` ✓ (plain styled exports, freely composable). **No `CardImg`/`CardImgOverlay`** ✗ (blocked partly on Images being MISSING), **no `CardGroup`/`CardDeck`-equivalent layout ✗, no horizontal card variant, no `CardLink`.**
| 8 | **Carousel** | — | **MISSING** | No implementation. Confirmed named gap.
| 9 | Close button | `CloseButton.tsx` | BUILT | `×` glyph, `aria-label="Close"` ✓, hover-opacity ✓. **No white/dark-background variant** (`.btn-close-white`) ✗ — minor, but a real Bootstrap sub-part.
| 10 | **Collapse** (standalone) | — | **MISSING** | Confirmed. Note: Accordion internally reimplements its own grid-row collapse transition rather than sharing a standalone `Collapse` primitive — so building standalone Collapse is also a refactor opportunity to de-duplicate Accordion's transition logic.
| 11 | Dropdowns | `Dropdown.tsx` | PARTIAL | Floating-ui positioned menu ✓, click-to-open + dismiss (outside-click/Escape) ✓, `DropdownItem` (with disabled) ✓, `DropdownDivider` ✓, focus management via `FloatingFocusManager` ✓. **No dropup/dropend/dropstart directions** (placement is hardcoded `'bottom-start'`, not exposed as a prop) ✗, **no dark dropdown variant** ✗, **no dropdown header** (`DropdownHeader`) ✗, **no split-button dropdown** ✗, **no `data-bs-auto-close` variants** (always closes on outside-click; no "inside" / "outside" / "manual" modes) ✗, **no responsive/menu-end alignment prop** ✗.
| 12 | **List group** | — | **MISSING** | Confirmed named gap. No implementation.
| 13 | Modal | `Modal.tsx` | PARTIAL | Sizes `sm`/`lg`/`xl` ✓, `centered` ✓, `staticBackdrop` ✓, focus-trap + scroll-lock via `FloatingFocusManager`/`FloatingOverlay` ✓, `ModalHeader`/`ModalTitle`/`ModalBody`/`ModalFooter` ✓. **No `fullscreen` size** ✗, **no scrollable-body variant** (`modal-dialog-scrollable`) ✗, no fade-vs-no-animation toggle, no vertically-centered + scrollable combination tested.
| 14 | Navbar | `Nav/Navbar.tsx` | **PARTIAL (spec correction — was listed MISSING)** | `Navbar` (flex container + color `variant`) ✓, `NavbarBrand` ✓. **No toggler/hamburger button, no responsive `expand` breakpoint + collapse-to-offcanvas-or-dropdown behavior, no `NavbarNav`/`NavbarText`/`NavbarCollapse` sub-parts, no `fixed-top`/`fixed-bottom`/`sticky-top` positioning, no dark-navbar convenience beyond the generic `variant` color prop.** This is the single biggest "the spec undercounted the gap" finding — Navbar exists but is closer to 15% built than 0%.
| 15 | Navs & tabs | `Nav/Nav.tsx` + `Tabs.tsx` | PARTIAL | Base `Nav`/`NavItem`/`NavLink` (active/disabled) ✓; `Tabs`/`Tab` fully own the tab-panel switching behavior (controlled/uncontrolled, `aria-selected`, `role="tab"/"tablist"/"tabpanel"`) ✓. **`Nav` itself has no `pills`/`tabs`/`fill`/`justified`/`vertical` style variants** ✗ — `Tabs.tsx` hardcodes its own tab-look rather than composing `Nav`'s variants, so "Navs" and "Tabs" are really two separate un-unified implementations. **No keyboard arrow-key roving-tabindex between tabs** (ARIA tabs pattern expects Left/Right/Home/End to move focus) ✗ — an accessibility-parity gap, not just a variants one. **No dropdown-in-nav.**
| 16 | Offcanvas | `Offcanvas.tsx` | PARTIAL | 4 placements (`start`/`end`/`top`/`bottom`) ✓, focus-trap + scroll-lock ✓, `OffcanvasHeader`/`OffcanvasTitle`/`OffcanvasBody` ✓. **No responsive breakpoint variants** (`offcanvas-lg` etc., which make the offcanvas revert to a plain static sidebar above a breakpoint) ✗, **no `backdrop={false}`/`scroll={true}` options** (always modal + scroll-locked; Bootstrap's non-modal, scroll-permitted offcanvas modes are unreachable) ✗.
| 17 | Pagination | `Pagination.tsx` | PARTIAL | Active/disabled `PageLink` states ✓, `aria-current`/`aria-disabled` ✓, edge border-radius ✓. **No size variants** (`pagination-lg`/`-sm`) ✗, no built-in ellipsis/"disabled + arrow" convenience components.
| 18 | Placeholders | — | **MISSING** | Confirmed named gap.
| 19 | Popovers | `Popover.tsx` | PARTIAL | Click-triggered, floating-ui positioned, optional `title` header ✓, dismiss/focus-trap ✓. **No hover/focus/manual trigger modes** (Bootstrap defaults popovers to click but documents all 4 trigger modes) ✗, no HTML-content flag, no custom offset prop exposed.
| 20 | Progress | `Progress.tsx` | PARTIAL | Multi-color bars via `variant`, `role="progressbar"` + `aria-value*` ✓, width transition ✓, and (since `Progress` is a plain flex container) **stacked multi-bar composition already works** ✓. **No striped variant, no animated-stripes variant, no built-in label/percentage text convenience** ✗.
| 21 | Scrollspy | — | **MISSING** | Confirmed named gap.
| 22 | Spinners | `Spinner.tsx` | PARTIAL | Border spinner ✓, `sm` size ✓, color `variant` ✓, `role="status"` ✓. **No "grow" spinner variant** (`.spinner-grow` — Bootstrap ships two distinct spinner types; only one is built) ✗.
| 23 | Toasts | — | **MISSING** | Confirmed named gap.
| 24 | Tooltips | `Tooltip.tsx` | PARTIAL | Hover+focus triggered, floating-ui positioned (all Popper-equivalent placements via `Placement` type) ✓, dismiss on blur/mouseleave ✓, `role="tooltip"` ✓. **No manual-trigger mode, no show/hide delay props, no HTML-content flag**, tooltip background/color hardcoded to `#000`/`#fff` rather than themed via `--bs-tooltip-*` vars (a token-completeness gap, P1-adjacent).

**Components tally:** 0 BUILT clean · 17 PARTIAL · 7 MISSING (Carousel, Button group, Collapse,
List group, Placeholders, Scrollspy, Toasts). Note every "PARTIAL" component is functionally usable
today — none are stubs — the gaps are named sub-features/variants, not broken foundations.

## Helpers

Bootstrap 5.3's 12 Helpers (a category distinct from Components — see the taxonomic correction
above; **Stacks is the one Helper actually built**, mis-filed by the spec as a "component"):

| Helper | Status | Coverage note |
|---|---|---|
| **Stacks** (`vstack`/`hstack`) | BUILT | `Stack.tsx`: `direction="vertical"/"horizontal"`, `gap` 0–5 mapped to the theme spacing scale ✓. No responsive-gap prop (`gap={{md: 3}}`-style — that pattern is reserved for the future Utilities/Box model per §3).
| Clearfix | MISSING | No export.
| Color & background | MISSING | Depends on the Utilities model (P4) — no standalone helper either.
| Colored links | MISSING | No `.link-*` styled anchor variants.
| Focus ring | MISSING | No standalone focus-ring helper/token (individual components hand-roll their own focus box-shadow inline instead of sharing one).
| Icon link | MISSING | No implementation (also blocked on Icons being entirely absent).
| Position | MISSING | No `.fixed-top`/`.sticky-top`-equivalent helper components (each overlay component hand-rolls its own `position`/`z-index` instead).
| Ratio | MISSING | No `Ratio`/aspect-ratio-box helper — needed for e.g. responsive embeds; also referenced implicitly by Card's future `CardImg` work.
| Stretched link | MISSING | No `.stretched-link` helper (common Card-header-link pattern).
| Text truncation | MISSING | No `.text-truncate` helper.
| Vertical rule | MISSING | No `.vr` helper.
| Visually hidden | MISSING | No `.visually-hidden`/`.visually-hidden-focusable` helper — an a11y-relevant gap (skip-links, screen-reader-only labels).

**Helpers tally:** 1 built / 11 missing.

## Utilities API

**Status: MISSING as a system**, though the underlying substrate it will sit on (theme → `--bs-*`
CSS custom properties) already exists and is the right foundation (per spec §0's "half-exists"
observation) — this row is about the *prop-level utility surface* (`m`/`p`/`d`/`flex`/`bg`/`text`/
`border`/`rounded`/`shadow`/`w`/`h`/`position`/`overflow`/`opacity`/`zIndex` on `<Box>`), which has
zero implementation today. `className` passthrough is present on every component (props spread onto
the underlying styled element), so raw Bootstrap utility classes *can* be hand-written by a consumer
today — but there is no generated, typed, responsive-value prop API. Representative categories, all
MISSING pending the P4 build (per the ratified §3 model):

Background · Borders · Colors · Columns (`col-*` width utility, distinct from Grid) · Display ·
Flex · Float · Interactions (`pe-none`/`user-select-*`) · Link · Object fit · Opacity · Overflow ·
Position · Shadows · Sizing (`w-*`/`h-*`/`mw-*`/`mh-*`) · Spacing (`m-*`/`p-*`/`gap-*`) · Text
(alignment/wrap/transform) · Vertical align · Visibility · Z-index.

**Utilities tally:** 0 built / 19 items missing (the API model itself + 18 categories).

## Icons

| Item | Status | Coverage note |
|---|---|---|
| `<Icon/>` (Bootstrap Icons, tree-shakeable per-icon + dynamic `name` form) | MISSING | No icon package vendored, no `Icon`/`BsIcon*` exports anywhere in `src/`. This blocks the Icon-link helper and any icon-in-button/alert/nav composition the example pages will want. Full P5 (§5) build, currently at zero.

## Examples

| Item | Status | Coverage note |
|---|---|---|
| Bootstrap-parity example pages (album · badges · blog · carousel · checkout · cover · dashboard · features · footers · headers · heroes · jumbotron · masonry · navbars · offcanvas-navbar · pricing · product · sidebars · sign-in · starter-template · sticky-footer, ≈20 templates) | MISSING | Zero example pages exist. `src/stories/*.stories.tsx` are per-component Ladle demos (12 files, listed below), not composed Bootstrap-style pages — they don't substitute for P5's "human proof" pages, which additionally require Navbar-complete, Carousel, List group, and the Icon set, none of which exist yet. Correctly sequenced last (P5) in the spec's phase order.

---

## Ranked worklist — missing/worst-first (feeds P1–P7 ordering)

Ordered by severity × blast radius (a gap that blocks many downstream items ranks above a narrow
one), not strictly by spec phase number — use this to sequence work *inside* each phase:

1. **Reboot un-scoped leak risk** (Content/Reboot, PARTIAL→risk) — `GlobalStyles` is not
   `:where()`-scoped yet; this is flagged as a named risk in spec §6 and should be the very first
   P1 fix since every other visual-parity comparison is invalid until host-app bleed is closed.
2. **Tables** (Content, MISSING) — zero presence; blocks Reboot table-normalization parity too.
3. **List group** (Component, MISSING) — extremely high-traffic Bootstrap component (used inside
   Cards, Dropdowns-as-menus alternative, sidebars); several P5 example pages need it.
4. **Navbar completion** (Component, PARTIAL — was mis-scored MISSING by the spec) — toggler +
   responsive `expand` + collapse/offcanvas behavior is the single largest true behavioral gap
   hiding in a component the spec already counted as "built enough to skip."
5. **Button group** (Component, MISSING) — pairs directly with the already-built Button; cheap
   to build given Button's variant system, high reuse in toolbars/pagination-adjacent UI.
6. **Collapse, standalone** (Component, MISSING) — also de-duplicates Accordion's bespoke
   collapse-transition code once extracted; do this before/alongside Accordion polish.
7. **Toasts** (Component, MISSING) — needed for any real app shell (notifications), reuses
   Modal/Offcanvas's `FloatingPortal` + dismiss patterns almost directly.
8. **Carousel** (Component, MISSING) — highest *effort* of the 7 missing components (own
   keyboard/touch/autoplay/indicator behavior oracle vs. `bootstrap.bundle.js`); several Examples
   pages depend on it, so it should not be deferred past P2.
9. **Placeholders** (Component, MISSING) — low effort, unblocks loading-state stories on every
   other component's example usage.
10. **Scrollspy** (Component, MISSING) — behavioral-only (no visual component), needed for the
    docs/example nav shell; naturally slots after Navbar completion (#4).
11. **Typography, Images, Figures** (Content, MISSING) — needed before Examples (P5) can look
    right; Images/Figures also unblock Card's missing `CardImg`.
12. **Forms: Validation feedback + Floating labels + Range** (Forms, MISSING) — the three
    Forms sub-parts with zero presence; `isInvalid`/`isValid` styling exists but has no feedback
    text component to pair with, so validation is currently only half-wired.
13. **Helpers, 11 of 12** (MISSING) — cheap, mostly-CSS-only wins (`Ratio`, `Stretched link`,
    `Text truncation`, `Vertical rule`, `Visually hidden` are near-zero-effort); do these as a
    batch early in P4, they're not worth their own wave.
14. **Grid gaps**: `xxl` breakpoint, `offset-*`, `order-*`, `row-cols-*`, per-breakpoint gutters,
    responsive container variants, Z-index ladder (Layout, PARTIAL/MISSING) — foundational,
    correctly scheduled in P1, but rank below the Content/Component gaps above because the
    *existing* Grid already covers the 80% case (basic responsive spans) that every other
    component's stories currently rely on.
15. **Utilities API model** (MISSING, 19 items) — biggest single line-item by scope, but
    correctly sequenced late (P4) per spec — every component already has a `className` escape
    hatch, so this is a completeness/ergonomics gap, not a functional blocker.
16. **Icons** (MISSING) — blocks Icon-link helper + several Examples pages; correctly P4/P5.
17. **Examples** (MISSING, ~20 templates) — correctly last; depends on nearly everything above
    (Navbar completion, Carousel, List group, Icons, Typography/Images/Tables all feed directly
    into example pages).

---

*Method note: every BUILT/PARTIAL/MISSING call above was made by reading the actual `.tsx` source
in `src/components/<Name>/` and `src/theme/`, not the stories, tests, or README — per the P0
instruction. For the record: all 19 built components do have story coverage, but consolidated into
12 grouped files rather than one-per-component — `Overlays.stories.tsx` covers Modal/Offcanvas/
Dropdown/Tooltip/Popover/CloseButton, `Navigation.stories.tsx` covers Nav/Navbar/Breadcrumb/
Pagination/Tabs/Accordion, `Layout.stories.tsx` covers Container/Row/Col/Stack, and
`Alert`/`Badge`/`Button`/`Card`/`Forms`/`Progress`/`Spinner`/`ColorMode`/`0-GettingStarted` each
have their own file. Only 5 of the 19 (Button, Dropdown, Modal, Tabs, Accordion) have a paired
`.test.tsx` — behavior-test coverage is a P6 item, not scored here since this P0 is about surface
existence + variant/sub-part completeness, not test coverage.*
