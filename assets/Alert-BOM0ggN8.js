import{R as e,j as s,g as b}from"./index-B90HX0O5.js";const i=b.div`
  ${r=>`
    --bs-alert-bg: color-mix(in srgb, var(--bs-${r.$variant}) 12%, var(--bs-body-bg));
    --bs-alert-border-color: color-mix(in srgb, var(--bs-${r.$variant}) 30%, var(--bs-body-bg));
    /* Mix the emphasis text toward the body text color (not always black) so it
       darkens in light mode and lightens in dark mode — readable on both. */
    --bs-alert-color: color-mix(in srgb, var(--bs-${r.$variant}) 60%, var(--bs-body-color));
  `}
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: 1px solid var(--bs-alert-border-color);
  border-radius: var(--bs-border-radius);
`,l=e.forwardRef(({variant:r="primary",role:o="alert",...a},t)=>s.jsx(i,{ref:t,$variant:r,role:o,...a}));l.displayName="Alert";export{l as A};
