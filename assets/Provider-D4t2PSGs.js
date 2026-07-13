import{S as c,j as s,c as n,d as t,G as g,R as a}from"./index-DiIymZMJ.js";const h=["primary","secondary","success","danger","warning","info","light","dark"];function d(o,b,e){return h.map(r=>{const l=b[r];return`${e?`--bs-${r}-rgb: ${o.colorRgb[r]};`:""}
    --bs-${r}-text-emphasis: ${l.emphasis};
    --bs-${r}-bg-subtle: ${l.bgSubtle};
    --bs-${r}-border-subtle: ${l.borderSubtle};`}).join(`
    `)}const $=o=>`
    ${d(o,o.colorTokens,!0)}
    --bs-body-color-rgb: ${o.body.colorRgb};
    --bs-body-bg-rgb: ${o.body.bgRgb};
    --bs-emphasis-color: ${o.emphasisColor};
    --bs-emphasis-color-rgb: 0, 0, 0;
    --bs-highlight-color: #212529;
    --bs-highlight-bg: #fff3cd;
    --bs-secondary-color: ${o.secondary.color};
    --bs-secondary-bg: ${o.secondary.bg};
    --bs-tertiary-color: ${o.tertiary.color};
    --bs-tertiary-bg: ${o.tertiary.bg};
    --bs-body-line-height: ${o.font.lineHeight.base};
    --bs-body-font-weight: ${o.font.weight.normal};
    --bs-font-monospace: ${o.font.monospace};
    --bs-border-width: ${o.border.width};
    --bs-border-style: ${o.border.style};
    --bs-border-color-translucent: ${o.border.translucent};
    --bs-border-radius-xl: ${o.radius.xl};
    --bs-border-radius-xxl: ${o.radius.xxl};
    --bs-box-shadow: ${o.shadow.base};
    --bs-box-shadow-sm: ${o.shadow.sm};
    --bs-box-shadow-lg: ${o.shadow.lg};
    --bs-box-shadow-inset: ${o.shadow.inset};
    --bs-focus-ring-width: ${o.focusRing.width};
    --bs-focus-ring-opacity: ${o.focusRing.opacity};
    --bs-focus-ring-color: ${o.focusRing.color};
    --bs-link-color: ${o.link.color};
    --bs-link-hover-color: ${o.link.hoverColor};
    --bs-heading-color: ${o.font.headings.color};
    --bs-form-valid-color: #198754;
    --bs-form-valid-border-color: #198754;
    --bs-form-invalid-color: #dc3545;
    --bs-form-invalid-border-color: #dc3545;
`,y=o=>`
    ${d(o,o.dark.colorTokens,!1)}
    --bs-body-color: ${o.dark.body.color};
    --bs-body-color-rgb: ${o.dark.body.colorRgb};
    --bs-body-bg: ${o.dark.body.bg};
    --bs-body-bg-rgb: ${o.dark.body.bgRgb};
    --bs-emphasis-color: ${o.dark.emphasisColor};
    --bs-emphasis-color-rgb: 255, 255, 255;
    --bs-highlight-color: #dee2e6;
    --bs-highlight-bg: #664d03;
    --bs-secondary-color: ${o.dark.secondary.color};
    --bs-secondary-bg: ${o.dark.secondary.bg};
    --bs-tertiary-color: ${o.dark.tertiary.color};
    --bs-tertiary-bg: ${o.dark.tertiary.bg};
    --bs-border-color: ${o.dark.border.color};
    --bs-border-color-translucent: ${o.dark.border.translucent};
    --bs-link-color: ${o.dark.link.color};
    --bs-link-hover-color: ${o.dark.link.hoverColor};
    --bs-form-valid-color: #75b798;
    --bs-form-valid-border-color: #75b798;
    --bs-form-invalid-color: #ea868f;
    --bs-form-invalid-border-color: #ea868f;
`,f=c`
  :root {
    ${o=>$(o.theme)}
  }

  [data-bs-theme='dark'] {
    ${o=>y(o.theme)}
  }
`,i=a.createContext("light"),x=()=>a.useContext(i),m={fontFamily:"var(--bs-body-font-family, var(--bs-font-sans-serif))",fontSize:"var(--bs-body-font-size, 1rem)",fontWeight:"var(--bs-body-font-weight, 400)",lineHeight:"var(--bs-body-line-height, 1.5)",color:"var(--bs-body-color)"};function v({theme:o=t,colorMode:b="light",noGlobalStyles:e=!1,children:r}){return s.jsx(n,{theme:o,children:s.jsxs(i.Provider,{value:b,children:[!e&&s.jsxs(s.Fragment,{children:[s.jsx(g,{}),s.jsx(f,{})]}),s.jsx("div",{"data-bs-theme":b,style:m,children:r})]})})}export{v as B,x as u};
