import{R as r,j as t,f as n,g as l}from"./index-C-CN3z2J.js";import{c}from"./cx-2dOUpm6k.js";const e=n`
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`,p=l.span`
  ${o=>o.$focusable?n`
          &:not(:focus):not(:focus-within) {
            ${e}
          }
          &:not(:focus):not(:focus-within):not(caption) {
            position: absolute !important;
          }
          &:not(:focus):not(:focus-within) * {
            overflow: hidden !important;
          }
        `:n`
          ${e}
          &:not(caption) {
            position: absolute !important;
          }
          & * {
            overflow: hidden !important;
          }
        `}
`,i=r.forwardRef(({focusable:o=!1,className:a,...s},d)=>t.jsx(p,{ref:d,$focusable:o,className:c(o?"visually-hidden-focusable":"visually-hidden",a),...s}));i.displayName="VisuallyHidden";const f={title:"Helpers/VisuallyHidden"},h=()=>t.jsxs("button",{type:"button",children:[t.jsx("span",{"aria-hidden":"true",children:"★"}),t.jsx(i,{children:"Add to favorites"})]}),w=()=>t.jsx(i,{as:"a",href:"#main",focusable:!0,children:"Skip to main content (Tab to reveal)"});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{h as Basic,w as Focusable,f as default};
