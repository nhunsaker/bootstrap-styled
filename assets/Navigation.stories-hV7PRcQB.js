import{g as a,R as c,j as r,r as A}from"./index-BgozbNnj.js";import{a as E}from"./Grid-pl475A2k.js";import{S as I}from"./Stack-ZuLfbdgE.js";const B=a.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 0;
  margin: 0; /* zero the default <ul> margin (incl. margin-top) so nav items
                align with siblings like the navbar brand */
  list-style: none;
`,b=a.li``,P=a.a`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${e=>e.$active?"var(--bs-body-color)":"var(--bs-link-color)"};
  ${e=>e.$active?"font-weight: 600;":""}
  transition: color 0.15s ease-in-out;
  &:hover {
    color: var(--bs-link-hover-color);
  }
  ${e=>e.$disabled?"color: var(--bs-secondary); pointer-events: none; cursor: default;":""}
`,l=c.forwardRef(({active:e,disabled:s,...i},d)=>r.jsx(P,{ref:d,$active:e,$disabled:s,"aria-current":e?"page":void 0,"aria-disabled":s||void 0,...i}));l.displayName="NavLink";const T=a.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 1rem;
  ${e=>e.$variant?`
    background-color: var(--bs-${e.$variant});
    color: var(--bs-${e.$variant}-contrast);
    a { color: var(--bs-${e.$variant}-contrast); }
  `:""}
`,K=c.forwardRef(({variant:e,...s},i)=>r.jsx(T,{ref:i,$variant:e,...s}));K.displayName="Navbar";const C=a.a`
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
`,L=a.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;

  & > li + li::before {
    content: '/';
    padding: 0 0.5rem;
    color: var(--bs-secondary);
  }
`,R=a.li`
  display: flex;
  align-items: center;
  color: ${e=>e.$active?"var(--bs-secondary)":"inherit"};

  a {
    color: var(--bs-link-color);
    text-decoration: none;
  }
  a:hover {
    color: var(--bs-link-hover-color);
  }
`,x=c.forwardRef(({active:e,...s},i)=>r.jsx(R,{ref:i,$active:e,"aria-current":e?"page":void 0,...s}));x.displayName="BreadcrumbItem";const S=a.ul`
  display: flex;
  padding-left: 0;
  margin: 0;
  list-style: none;

  & > li:first-child a {
    border-top-left-radius: var(--bs-border-radius);
    border-bottom-left-radius: var(--bs-border-radius);
  }
  & > li:last-child a {
    border-top-right-radius: var(--bs-border-radius);
    border-bottom-right-radius: var(--bs-border-radius);
  }
`,m=a.li``,H=a.a`
  display: block;
  padding: 0.375rem 0.75rem;
  margin-left: -1px;
  text-decoration: none;
  color: ${e=>e.$active?"var(--bs-primary-contrast)":"var(--bs-link-color)"};
  background-color: ${e=>e.$active?"var(--bs-primary)":"var(--bs-body-bg)"};
  border: 1px solid ${e=>e.$active?"var(--bs-primary)":"var(--bs-border-color)"};
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

  &:hover {
    ${e=>e.$active?"":"background-color: color-mix(in srgb, var(--bs-body-color) 6%, var(--bs-body-bg)); color: var(--bs-link-hover-color);"}
  }
  ${e=>e.$disabled?"color: var(--bs-secondary); pointer-events: none; background-color: var(--bs-body-bg);":""}
`,h=c.forwardRef(({active:e,disabled:s,...i},d)=>r.jsx(H,{ref:d,$active:e,$disabled:s,"aria-current":e?"page":void 0,"aria-disabled":s||void 0,...i}));h.displayName="PageLink";function $(e){return null}const D=a.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--bs-border-color);
`,F=a.button`
  margin-bottom: -1px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius);
  color: ${e=>e.$active?"var(--bs-body-color)":"var(--bs-link-color)"};

  &:hover {
    ${e=>e.$active?"":"border-color: color-mix(in srgb, var(--bs-body-color) 12%, var(--bs-body-bg));"}
  }
  ${e=>e.$active?`background-color: var(--bs-body-bg);
         border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);`:""}
  ${e=>e.$disabled?"color: var(--bs-secondary); pointer-events: none;":""}
`,_=a.div`
  padding: 1rem 0;
`;function z({activeKey:e,defaultActiveKey:s,onSelect:i,children:d}){var n;const p=c.Children.toArray(d).filter(t=>c.isValidElement(t)),u=(n=p[0])==null?void 0:n.props.eventKey,[f,y]=A.useState(s??u),v=e??f,g=t=>{e===void 0&&y(t),i==null||i(t)},o=p.find(t=>t.props.eventKey===v)??p[0];return r.jsxs("div",{children:[r.jsx(D,{role:"tablist",children:p.map(t=>{const j=t.props.eventKey,N=j===(o==null?void 0:o.props.eventKey);return r.jsx("li",{role:"presentation",children:r.jsx(F,{role:"tab",type:"button","aria-selected":N,$active:N,$disabled:t.props.disabled,disabled:t.props.disabled,onClick:()=>g(j),children:t.props.title})},j)})}),r.jsx(_,{role:"tabpanel",children:o==null?void 0:o.props.children})]})}function w(e){return null}const M=a.div`
  border: 1px solid var(--bs-border-color);
  &:not(:first-child) {
    border-top: 0;
  }
  &:first-child {
    border-top-left-radius: var(--bs-border-radius);
    border-top-right-radius: var(--bs-border-radius);
  }
  &:last-child {
    border-bottom-left-radius: var(--bs-border-radius);
    border-bottom-right-radius: var(--bs-border-radius);
  }
`,V=a.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border: 0;
  background-color: ${e=>e.$open?"color-mix(in srgb, var(--bs-primary) 10%, var(--bs-body-bg))":"var(--bs-body-bg)"};
  color: ${e=>e.$open?"var(--bs-primary)":"var(--bs-body-color)"};

  &::after {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(${e=>e.$open?"-135deg":"45deg"});
    transition: transform 0.2s ease;
  }
`,W=a.div`
  display: grid;
  grid-template-rows: ${e=>e.$open?"1fr":"0fr"};
  transition: grid-template-rows 0.2s ease;
  & > div {
    overflow: hidden;
  }
`,Y=a.div`
  padding: 1rem 1.25rem;
`,k=e=>e==null?[]:Array.isArray(e)?e:[e];function q({activeKey:e,defaultActiveKey:s,alwaysOpen:i=!1,onSelect:d,children:p}){const u=c.Children.toArray(p).filter(o=>c.isValidElement(o)),[f,y]=A.useState(k(s)),v=e!==void 0?k(e):f,g=o=>{let n;v.includes(o)?n=v.filter(t=>t!==o):n=i?[...v,o]:[o],e===void 0&&y(n),d==null||d(i?n:n[0]??"")};return r.jsx("div",{children:u.map(o=>{const n=o.props.eventKey,t=v.includes(n);return r.jsxs(M,{children:[r.jsx(V,{type:"button",$open:t,"aria-expanded":t,onClick:()=>g(n),children:o.props.header}),r.jsx(W,{$open:t,role:"region",children:r.jsx("div",{children:r.jsx(Y,{children:o.props.children})})})]},n)})})}const or={title:"Navigation"},G=()=>r.jsxs(B,{children:[r.jsx(b,{children:r.jsx(l,{href:"#",active:!0,children:"Home"})}),r.jsx(b,{children:r.jsx(l,{href:"#",children:"Features"})}),r.jsx(b,{children:r.jsx(l,{href:"#",children:"Pricing"})}),r.jsx(b,{children:r.jsx(l,{href:"#",disabled:!0,children:"Disabled"})})]});G.storyName="Nav";const J=()=>r.jsx(K,{style:{borderRadius:6},children:r.jsxs(E,{children:[r.jsx(C,{href:"#",children:"MyApp"}),r.jsxs(B,{children:[r.jsx(b,{children:r.jsx(l,{href:"#",active:!0,style:{color:"rgba(255,255,255,0.85)"},children:"Home"})}),r.jsx(b,{children:r.jsx(l,{href:"#",style:{color:"rgba(255,255,255,0.65)"},children:"About"})}),r.jsx(b,{children:r.jsx(l,{href:"#",style:{color:"rgba(255,255,255,0.65)"},children:"Contact"})})]})]})});J.storyName="Navbar";const O=()=>r.jsxs(L,{children:[r.jsx(x,{children:r.jsx("a",{href:"#",children:"Home"})}),r.jsx(x,{children:r.jsx("a",{href:"#",children:"Library"})}),r.jsx(x,{active:!0,children:"Data"})]});O.storyName="Breadcrumb";const Q=()=>r.jsx(I,{gap:2,children:r.jsxs(S,{children:[r.jsx(m,{children:r.jsx(h,{href:"#",disabled:!0,children:"«"})}),r.jsx(m,{children:r.jsx(h,{href:"#",children:"1"})}),r.jsx(m,{children:r.jsx(h,{href:"#",active:!0,children:"2"})}),r.jsx(m,{children:r.jsx(h,{href:"#",children:"3"})}),r.jsx(m,{children:r.jsx(h,{href:"#",children:"»"})})]})});Q.storyName="Pagination";const U=()=>r.jsxs(z,{defaultActiveKey:"first",children:[r.jsx($,{eventKey:"first",title:"First",children:r.jsx("p",{style:{marginTop:16},children:"First tab content."})}),r.jsx($,{eventKey:"second",title:"Second",children:r.jsx("p",{style:{marginTop:16},children:"Second tab content."})}),r.jsx($,{eventKey:"third",title:"Disabled",disabled:!0,children:"Hidden"})]});U.storyName="Tabs";const X=()=>r.jsxs(q,{defaultActiveKey:"0",children:[r.jsx(w,{eventKey:"0",header:"What is @metatoy/bootstrap-styled?",children:"Bootstrap 5 components in styled-components, theme-driven via runtime CSS variables."}),r.jsxs(w,{eventKey:"1",header:"Does it support dark mode?",children:["Yes — pass ",r.jsx("code",{children:'colorMode="dark"'})," to ",r.jsx("code",{children:"BootstrapStyledProvider"}),"."]}),r.jsx(w,{eventKey:"2",header:"Is it TypeScript?",children:"Fully typed. Props are inferred from interfaces; no hand-written prop tables needed."})]});X.storyName="Accordion";typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{X as AccordionExample,O as BreadcrumbExample,G as NavBasic,J as NavbarExample,Q as PaginationExample,U as TabsExample,or as default};
