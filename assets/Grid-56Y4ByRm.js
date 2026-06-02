import{R as e,j as d,g as x}from"./index-B90HX0O5.js";const p=x.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  ${t=>t.$fluid?"":`
    @media (min-width: 576px)  { max-width: 540px; }
    @media (min-width: 768px)  { max-width: 720px; }
    @media (min-width: 992px)  { max-width: 960px; }
    @media (min-width: 1200px) { max-width: 1140px; }
    @media (min-width: 1400px) { max-width: 1320px; }
  `}
`,g=e.forwardRef(({fluid:t,...a},r)=>d.jsx(p,{ref:r,$fluid:t,...a}));g.displayName="Container";const c=x.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
`,$=e.forwardRef((t,a)=>d.jsx(c,{ref:a,...t}));$.displayName="Row";const s=t=>`${(t/12*100).toFixed(6).replace(/\.?0+$/,"")}%`,i=(t,a)=>a?`@media (min-width: ${t}px) { flex: 0 0 auto; width: ${s(a)}; }`:"",w=x.div`
  box-sizing: border-box;
  flex-shrink: 0;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  margin-top: var(--bs-gutter-y, 0);
  flex: 1 0 0%;
  ${t=>t.$span?`flex: 0 0 auto; width: ${s(t.$span)};`:""}
  ${t=>i(576,t.$sm)}
  ${t=>i(768,t.$md)}
  ${t=>i(992,t.$lg)}
  ${t=>i(1200,t.$xl)}
`,h=e.forwardRef(({span:t,sm:a,md:r,lg:m,xl:n,...l},o)=>d.jsx(w,{ref:o,$span:t,$sm:a,$md:r,$lg:m,$xl:n,...l}));h.displayName="Col";export{h as C,$ as R,g as a};
