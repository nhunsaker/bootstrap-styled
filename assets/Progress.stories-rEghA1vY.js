import{g as n,R as l,j as e}from"./index-DiIymZMJ.js";import{S as o}from"./Stack-C5lI4cs1.js";const s=n.div`
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: var(--bs-secondary-bg, #e9ecef);
  border-radius: var(--bs-border-radius);
  box-shadow: var(--bs-box-shadow-inset, inset 0 1px 2px rgba(0, 0, 0, 0.075));
`,x=n.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  color: #fff;
  background-color: var(--bs-${a=>a.$variant});
  width: ${a=>Math.max(0,Math.min(100,a.$now))}%;
  transition: width 0.6s ease;
`,r=l.forwardRef(({now:a=0,variant:t="primary",children:i,...d},c)=>e.jsx(x,{ref:c,$now:a,$variant:t,role:"progressbar","aria-valuenow":a,"aria-valuemin":0,"aria-valuemax":100,...d,children:i}));r.displayName="ProgressBar";const g={title:"Core/Progress"},j=()=>e.jsxs(o,{gap:2,children:[e.jsx(s,{children:e.jsx(r,{now:25})}),e.jsx(s,{children:e.jsx(r,{now:50,variant:"success"})}),e.jsx(s,{children:e.jsx(r,{now:75,variant:"warning"})}),e.jsx(s,{children:e.jsx(r,{now:100,variant:"danger"})})]}),m=()=>e.jsxs(o,{gap:2,children:[e.jsx(s,{children:e.jsx(r,{now:33})}),e.jsx(s,{style:{height:4},children:e.jsx(r,{now:66,variant:"info"})}),e.jsx(s,{style:{height:20},children:e.jsx(r,{now:80,variant:"success"})})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{j as Basic,m as Sizes,g as default};
