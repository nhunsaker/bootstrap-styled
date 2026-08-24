import{R as s,j as a,g as r}from"./index-C-CN3z2J.js";const n=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414'/%3e%3c/svg%3e")`,l=r.button`
  /* Bootstrap 5.3.8 .btn-close tokens (runtime-overridable). */
  --bs-btn-close-color: #000;
  --bs-btn-close-bg: ${n};
  --bs-btn-close-opacity: 0.5;
  --bs-btn-close-hover-opacity: 0.75;
  --bs-btn-close-disabled-opacity: 0.25;
  --bs-btn-close-filter: ${e=>e.$white?"invert(1) grayscale(100%) brightness(200%)":" "};
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: var(--bs-btn-close-color);
  background: transparent var(--bs-btn-close-bg) center/1em auto no-repeat;
  filter: var(--bs-btn-close-filter);
  border: 0;
  border-radius: 0.375rem;
  opacity: var(--bs-btn-close-opacity);
  cursor: pointer;

  &:hover {
    color: var(--bs-btn-close-color);
    text-decoration: none;
    opacity: var(--bs-btn-close-hover-opacity);
  }

  &:disabled {
    pointer-events: none;
    user-select: none;
    opacity: var(--bs-btn-close-disabled-opacity);
  }
`,b=s.forwardRef(({white:e,...o},t)=>a.jsx(l,{ref:t,type:"button","aria-label":"Close",$white:e,...o}));b.displayName="CloseButton";export{b as C};
