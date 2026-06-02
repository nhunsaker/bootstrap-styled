import{g as o,R as l,j as r}from"./index-BgozbNnj.js";import{S as n}from"./Stack-ZuLfbdgE.js";const a=o.div`
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: color-mix(in srgb, var(--bs-body-color) 10%, var(--bs-body-bg));
  border-radius: var(--bs-border-radius);
`,x=o.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  color: var(--bs-${e=>e.$variant}-contrast);
  background-color: var(--bs-${e=>e.$variant});
  width: ${e=>Math.max(0,Math.min(100,e.$now))}%;
  transition: width 0.6s ease;
`,s=l.forwardRef(({now:e=0,variant:t="primary",children:i,...d},c)=>r.jsx(x,{ref:c,$now:e,$variant:t,role:"progressbar","aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":100,...d,children:i}));s.displayName="ProgressBar";const m={title:"Core/Progress"},g=()=>r.jsxs(n,{gap:2,children:[r.jsx(a,{children:r.jsx(s,{now:25})}),r.jsx(a,{children:r.jsx(s,{now:50,variant:"success"})}),r.jsx(a,{children:r.jsx(s,{now:75,variant:"warning"})}),r.jsx(a,{children:r.jsx(s,{now:100,variant:"danger"})})]}),j=()=>r.jsxs(n,{gap:2,children:[r.jsx(a,{children:r.jsx(s,{now:33})}),r.jsx(a,{style:{height:4},children:r.jsx(s,{now:66,variant:"info"})}),r.jsx(a,{style:{height:20},children:r.jsx(s,{now:80,variant:"success"})})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{g as Basic,j as Sizes,m as default};
