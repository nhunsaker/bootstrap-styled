import{R as r,j as e,g as l}from"./index-DiIymZMJ.js";const n={"1x1":"100%","4x3":"75%","16x9":"56.25%","21x9":"42.8571428571%"},c=l.div`
  --bs-aspect-ratio: ${s=>s.$ratio};
  position: relative;
  width: 100%;

  &::before {
    display: block;
    padding-top: var(--bs-aspect-ratio);
    content: '';
  }

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`,t=r.forwardRef(({ratio:s="1x1",...i},a)=>{const d=n[s]??s;return e.jsx(c,{ref:a,$ratio:d,...i})});t.displayName="Ratio";const m={title:"Layout/Ratio"},o=({label:s})=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",background:"#e9ecef",color:"#495057",font:"600 0.875rem system-ui, sans-serif"},children:s}),p=()=>e.jsxs("div",{style:{display:"grid",gap:"1.5rem",gridTemplateColumns:"repeat(2, 240px)"},children:[e.jsx(t,{ratio:"1x1",children:e.jsx(o,{label:"1x1"})}),e.jsx(t,{ratio:"4x3",children:e.jsx(o,{label:"4x3"})}),e.jsx(t,{ratio:"16x9",children:e.jsx(o,{label:"16x9"})}),e.jsx(t,{ratio:"21x9",children:e.jsx(o,{label:"21x9"})})]}),j=()=>e.jsx("div",{style:{width:480},children:e.jsx(t,{ratio:"16x9",children:e.jsx("iframe",{title:"placeholder embed",src:"about:blank",style:{border:0,background:"#dee2e6"}})})}),u=()=>e.jsx("div",{style:{width:480},children:e.jsx(t,{ratio:"50%",children:e.jsx(o,{label:"Custom 2x1 (50%)"})})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{u as CustomRatio,j as Embed,p as Named,m as default};
