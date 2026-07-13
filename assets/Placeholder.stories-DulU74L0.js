import{g as o,R as r,j as e,f as x,E as l}from"./index-DiIymZMJ.js";const m=i=>i==="xs"?"0.6em":i==="sm"?"0.8em":i==="lg"?"1.2em":"1em",t=o.span`
  display: inline-block;
  min-height: ${i=>m(i.$size)};
  vertical-align: middle;
  cursor: wait;
  background-color: currentcolor;
  opacity: 0.5;
  ${i=>i.$col!=null?`width: ${i.$col/12*100}%;`:""}
`,s=r.forwardRef(({size:i,col:n,...a},d)=>e.jsx(t,{ref:d,$size:i,$col:n,...a}));s.displayName="Placeholder";const j=l`
  50% { opacity: 0.2; }
`,h=l`
  100% {
    -webkit-mask-position: -200% 0%;
    mask-position: -200% 0%;
  }
`,g=o.div`
  & ${t} {
    animation: ${j} 2s ease-in-out infinite;
  }
`,p=o.div`
  ${x`
    -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
    mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    animation: ${h} 2s linear infinite;
  `}
`,w={title:"Components/Placeholder"},c=({children:i})=>e.jsxs("div",{style:{maxWidth:320,border:"1px solid #dee2e6",borderRadius:"0.375rem",overflow:"hidden"},children:[e.jsx("div",{style:{height:180,background:"#e9ecef"}}),e.jsx("div",{style:{padding:"1rem"},children:i})]}),f=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",maxWidth:400},children:[e.jsx(s,{size:"xs",col:12}),e.jsx(s,{size:"sm",col:12}),e.jsx(s,{col:12}),e.jsx(s,{size:"lg",col:12})]}),y=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem",maxWidth:400},children:[e.jsx(s,{col:6}),e.jsx(s,{col:4}),e.jsx(s,{col:4}),e.jsx(s,{col:8})]}),k=()=>e.jsx(c,{children:e.jsxs(g,{children:[e.jsx(s,{col:7})," ",e.jsx(s,{col:4})," ",e.jsx(s,{col:4})," ",e.jsx(s,{col:6})," ",e.jsx(s,{col:8})]})}),v=()=>e.jsx(c,{children:e.jsxs(p,{children:[e.jsx(s,{col:12})," ",e.jsx(s,{col:6})," ",e.jsx(s,{col:5})," ",e.jsx(s,{col:8})]})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{k as Glow,f as Sizes,v as Wave,y as Widths,w as default};
