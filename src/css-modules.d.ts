// Ambient module declarations for CSS side-effect / inline imports.
//
// The parity harness imports the vendored oracle stylesheet as a raw string via
// Vite's `?inline` suffix (to scope it under `@scope` for the example-page
// cells), and example stories import plain `.css` for their side effect. Neither
// is a TS module, so declare them here to keep `tsc --noEmit` clean without
// adding any runtime dependency.
declare module '*.css?inline' {
  const css: string
  export default css
}

declare module '*.css' {
  const css: string
  export default css
}
