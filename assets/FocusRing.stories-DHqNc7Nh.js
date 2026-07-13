import{R as i,j as e,f as c,g as d}from"./index-DiIymZMJ.js";import{c as l}from"./cx-2dOUpm6k.js";import{T as u,a as f}from"./colors-BdFxzKWK.js";const g=d.div`
  ${s=>s.$rgb&&c`
      --bs-focus-ring-color: rgba(${s.$rgb}, var(--bs-focus-ring-opacity, 0.25));
    `}

  &:focus {
    outline: 0;
    box-shadow: var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0)
      var(--bs-focus-ring-blur, 0) var(--bs-focus-ring-width, 0.25rem)
      var(--bs-focus-ring-color, rgba(13, 110, 253, 0.25));
  }
`,o=i.forwardRef(({color:s,className:a,...t},n)=>e.jsx(g,{ref:n,$rgb:s?u[s]:null,className:l("focus-ring",s&&`focus-ring-${s}`,a),...t}));o.displayName="FocusRing";const x={title:"Helpers/FocusRing"},r={display:"inline-block",padding:"0.5rem 0.75rem",borderRadius:"0.375rem",border:"1px solid #dee2e6",textDecoration:"none",color:"#212529"},R=()=>e.jsx(o,{as:"a",href:"#",style:r,children:"Focus me (Tab)"}),y=()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.75rem"},children:f.map(s=>e.jsx(o,{as:"a",href:"#",color:s,style:r,children:s},s))});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{y as Colored,R as Default,x as default};
