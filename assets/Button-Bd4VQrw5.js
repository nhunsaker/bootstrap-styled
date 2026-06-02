import{R as a,j as n,g as i}from"./index-li0gu6VY.js";const b=r=>r.startsWith("outline-"),o=r=>b(r)?r.slice(8):r,l=r=>`
  --bs-btn-color: var(--bs-${r}-contrast);
  --bs-btn-bg: var(--bs-${r});
  --bs-btn-border-color: var(--bs-${r});
  --bs-btn-hover-color: var(--bs-${r}-contrast);
  --bs-btn-hover-bg: color-mix(in srgb, var(--bs-${r}) 85%, #000);
  --bs-btn-hover-border-color: color-mix(in srgb, var(--bs-${r}) 80%, #000);
  --bs-btn-active-bg: color-mix(in srgb, var(--bs-${r}) 80%, #000);
  --bs-btn-active-border-color: color-mix(in srgb, var(--bs-${r}) 75%, #000);
  --bs-btn-disabled-color: var(--bs-${r}-contrast);
  --bs-btn-disabled-bg: var(--bs-${r});
  --bs-btn-disabled-border-color: var(--bs-${r});
`,c=r=>`
  --bs-btn-color: var(--bs-${r});
  --bs-btn-bg: transparent;
  --bs-btn-border-color: var(--bs-${r});
  --bs-btn-hover-color: var(--bs-${r}-contrast);
  --bs-btn-hover-bg: var(--bs-${r});
  --bs-btn-hover-border-color: var(--bs-${r});
  --bs-btn-active-bg: var(--bs-${r});
  --bs-btn-active-border-color: var(--bs-${r});
  --bs-btn-disabled-color: var(--bs-${r});
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: var(--bs-${r});
`,d=r=>r==="sm"?"0.25rem":r==="lg"?"0.5rem":"0.375rem",v=r=>r==="sm"?"0.5rem":r==="lg"?"1rem":"0.75rem",g=r=>r==="sm"?"0.875rem":r==="lg"?"1.25rem":"1rem",$=r=>r==="sm"?"var(--bs-border-radius-sm)":r==="lg"?"var(--bs-border-radius-lg)":"var(--bs-border-radius)",m=i.button`
  ${r=>b(r.$variant)?c(o(r.$variant)):l(o(r.$variant))}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: var(--bs-font-weight-normal, 400);
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: ${r=>d(r.$size)} ${r=>v(r.$size)};
  font-size: ${r=>g(r.$size)};
  border: 1px solid var(--bs-btn-border-color);
  border-radius: ${r=>$(r.$size)};
  color: var(--bs-btn-color);
  background-color: var(--bs-btn-bg);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover:not(:disabled) {
    color: var(--bs-btn-hover-color);
    background-color: var(--bs-btn-hover-bg);
    border-color: var(--bs-btn-hover-border-color);
  }
  &:active:not(:disabled) {
    background-color: var(--bs-btn-active-bg);
    border-color: var(--bs-btn-active-border-color);
  }
  &:disabled {
    color: var(--bs-btn-disabled-color);
    background-color: var(--bs-btn-disabled-bg);
    border-color: var(--bs-btn-disabled-border-color);
    opacity: 0.65;
    cursor: not-allowed;
  }
`,u=a.forwardRef(({variant:r="primary",size:s,...t},e)=>n.jsx(m,{ref:e,$variant:r,$size:s,...t}));u.displayName="Button";export{u as B};
