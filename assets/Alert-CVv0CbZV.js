import{R as t,j as s,g as l,d as b}from"./index-C-CN3z2J.js";const i=r=>{const e=b.colorTokens[r];return`
    --bs-alert-color: var(--bs-${r}-text-emphasis, ${e.emphasis});
    --bs-alert-bg: var(--bs-${r}-bg-subtle, ${e.bgSubtle});
    --bs-alert-border-color: var(--bs-${r}-border-subtle, ${e.borderSubtle});
    --bs-alert-link-color: var(--bs-${r}-text-emphasis, ${e.emphasis});
  `},d=l.div`
  ${r=>i(r.$variant)}
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  line-height: var(--bs-body-line-height, 1.5);
  color: var(--bs-alert-color);
  background-color: var(--bs-alert-bg);
  border: var(--bs-border-width, 1px) solid var(--bs-alert-border-color);
  border-radius: var(--bs-border-radius);

  .alert-link {
    font-weight: 700;
    color: var(--bs-alert-link-color);
  }
`,n=t.forwardRef(({variant:r="primary",role:e="alert",...a},o)=>s.jsx(d,{ref:o,$variant:r,role:e,...a}));n.displayName="Alert";export{n as A};
