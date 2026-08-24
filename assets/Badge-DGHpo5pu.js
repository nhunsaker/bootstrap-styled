import{R as i,j as o,g as t}from"./index-C-CN3z2J.js";const b=t.span`
  ${a=>`
    --bs-badge-bg: var(--bs-${a.$variant});
    --bs-badge-color: var(--bs-${a.$variant}-contrast);
  `}
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: var(--bs-font-weight-bold, 700);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  color: var(--bs-badge-color);
  background-color: var(--bs-badge-bg);
  border-radius: ${a=>a.$pill?"var(--bs-border-radius-pill)":"var(--bs-border-radius)"};
`,d=i.forwardRef(({variant:a="primary",pill:r,...e},s)=>o.jsx(b,{ref:s,$variant:a,$pill:r,...e}));d.displayName="Badge";export{d as B};
