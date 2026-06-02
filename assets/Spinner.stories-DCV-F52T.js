import{R as d,j as r,g as c,E as l}from"./index-BYafsvA3.js";import{S as n}from"./Stack-YCy6ALR4.js";const m=l`
  to { transform: rotate(360deg); }
`,p=c.div`
  display: inline-block;
  vertical-align: -0.125em;
  width: ${e=>e.$size==="sm"?"1rem":"2rem"};
  height: ${e=>e.$size==="sm"?"1rem":"2rem"};
  color: ${e=>e.$variant?`var(--bs-${e.$variant})`:"currentColor"};
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite ${m};
`,t=d.forwardRef(({variant:e,size:i,role:o="status",...s},a)=>r.jsx(p,{ref:a,$variant:e,$size:i,role:o,...s}));t.displayName="Spinner";const $={title:"Core/Spinner"},f=()=>r.jsx(n,{direction:"horizontal",gap:3,children:["primary","secondary","success","danger","warning","info"].map(e=>r.jsx(t,{variant:e,"aria-label":e},e))}),w=()=>r.jsxs(n,{direction:"horizontal",gap:3,style:{alignItems:"center"},children:[r.jsx(t,{size:"sm"}),r.jsx(t,{})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{f as Colors,w as Sizes,$ as default};
