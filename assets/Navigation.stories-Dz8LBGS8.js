import{R as v,r as B,j as e,g as l}from"./index-C-CN3z2J.js";import{B as A,a as b,P as E,b as a,c as d,T as C,d as m}from"./Tabs-C7jwX7tf.js";import{N as g,a as n,b as i}from"./Nav-UJYUqYyj.js";import{N as I,d as P}from"./Navbar-BwMtGd5O.js";import{C as T}from"./Grid-CsEa_cMG.js";import{S as H}from"./Stack-D1UTxsOs.js";import"./Collapse-xhP9YesR.js";function p(r){return null}const K=l.div`
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
`,R=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23212529' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,_=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23052c65' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,u=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236ea8fe' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,O=l.button`
  /* Bootstrap 5.3.8 .accordion active-state tokens (runtime-overridable). */
  --bs-accordion-active-bg: var(--bs-primary-bg-subtle, #cfe2ff);
  --bs-accordion-active-color: var(--bs-primary-text-emphasis, #052c65);
  --bs-accordion-btn-icon: ${R};
  --bs-accordion-btn-active-icon: ${_};
  --bs-accordion-btn-icon-width: 1.25rem;
  [data-bs-theme='dark'] & {
    --bs-accordion-btn-icon: ${u};
    --bs-accordion-btn-active-icon: ${u};
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  /* Native .accordion-button sits in an <h2> and inherits heading line-height (1.2). */
  line-height: 1.2;
  text-align: left;
  cursor: pointer;
  border: 0;
  background-color: ${r=>r.$open?"var(--bs-accordion-active-bg)":"var(--bs-body-bg)"};
  color: ${r=>r.$open?"var(--bs-accordion-active-color)":"var(--bs-body-color)"};
  box-shadow: ${r=>r.$open?"inset 0 calc(-1 * var(--bs-border-width, 1px)) 0 var(--bs-border-color)":"none"};

  &::after {
    flex-shrink: 0;
    width: var(--bs-accordion-btn-icon-width);
    height: var(--bs-accordion-btn-icon-width);
    margin-left: auto;
    content: '';
    background-repeat: no-repeat;
    background-size: var(--bs-accordion-btn-icon-width);
    background-image: ${r=>r.$open?"var(--bs-accordion-btn-active-icon)":"var(--bs-accordion-btn-icon)"};
    transform: ${r=>r.$open?"rotate(-180deg)":"none"};
    transition: transform 0.2s ease-in-out;
  }
`,D=l.div`
  display: grid;
  grid-template-rows: ${r=>r.$open?"1fr":"0fr"};
  transition: grid-template-rows 0.2s ease;
  & > div {
    overflow: hidden;
  }
`,S=l.div`
  padding: 1rem 1.25rem;
`,f=r=>r==null?[]:Array.isArray(r)?r:[r];function V({activeKey:r,defaultActiveKey:j,alwaysOpen:x=!1,onSelect:h,children:y}){const w=v.Children.toArray(y).filter(t=>v.isValidElement(t)),[N,$]=B.useState(f(j)),c=r!==void 0?f(r):N,k=t=>{let o;c.includes(t)?o=c.filter(s=>s!==t):o=x?[...c,t]:[t],r===void 0&&$(o),h==null||h(x?o:o[0]??"")};return e.jsx("div",{children:w.map(t=>{const o=t.props.eventKey,s=c.includes(o);return e.jsxs(K,{children:[e.jsx(O,{type:"button",$open:s,"aria-expanded":s,onClick:()=>k(o),children:t.props.header}),e.jsx(D,{$open:s,role:"region",children:e.jsx("div",{children:e.jsx(S,{children:t.props.children})})})]},o)})})}const ee={title:"Navigation"},F=()=>e.jsxs(g,{children:[e.jsx(n,{children:e.jsx(i,{href:"#",active:!0,children:"Home"})}),e.jsx(n,{children:e.jsx(i,{href:"#",children:"Features"})}),e.jsx(n,{children:e.jsx(i,{href:"#",children:"Pricing"})}),e.jsx(n,{children:e.jsx(i,{href:"#",disabled:!0,children:"Disabled"})})]});F.storyName="Nav";const L=()=>e.jsx(I,{style:{borderRadius:6},children:e.jsxs(T,{children:[e.jsx(P,{href:"#",children:"MyApp"}),e.jsxs(g,{children:[e.jsx(n,{children:e.jsx(i,{href:"#",active:!0,style:{color:"rgba(255,255,255,0.85)"},children:"Home"})}),e.jsx(n,{children:e.jsx(i,{href:"#",style:{color:"rgba(255,255,255,0.65)"},children:"About"})}),e.jsx(n,{children:e.jsx(i,{href:"#",style:{color:"rgba(255,255,255,0.65)"},children:"Contact"})})]})]})});L.storyName="Navbar";const z=()=>e.jsxs(A,{children:[e.jsx(b,{children:e.jsx("a",{href:"#",children:"Home"})}),e.jsx(b,{children:e.jsx("a",{href:"#",children:"Library"})}),e.jsx(b,{active:!0,children:"Data"})]});z.storyName="Breadcrumb";const M=()=>e.jsx(H,{gap:2,children:e.jsxs(E,{children:[e.jsx(a,{children:e.jsx(d,{href:"#",disabled:!0,children:"«"})}),e.jsx(a,{children:e.jsx(d,{href:"#",children:"1"})}),e.jsx(a,{children:e.jsx(d,{href:"#",active:!0,children:"2"})}),e.jsx(a,{children:e.jsx(d,{href:"#",children:"3"})}),e.jsx(a,{children:e.jsx(d,{href:"#",children:"»"})})]})});M.storyName="Pagination";const W=()=>e.jsxs(C,{defaultActiveKey:"first",children:[e.jsx(m,{eventKey:"first",title:"First",children:e.jsx("p",{style:{marginTop:16},children:"First tab content."})}),e.jsx(m,{eventKey:"second",title:"Second",children:e.jsx("p",{style:{marginTop:16},children:"Second tab content."})}),e.jsx(m,{eventKey:"third",title:"Disabled",disabled:!0,children:"Hidden"})]});W.storyName="Tabs";const Y=()=>e.jsxs(V,{defaultActiveKey:"0",children:[e.jsx(p,{eventKey:"0",header:"What is @metatoy/bootstrap-styled?",children:"Bootstrap 5 components in styled-components, theme-driven via runtime CSS variables."}),e.jsxs(p,{eventKey:"1",header:"Does it support dark mode?",children:["Yes — pass ",e.jsx("code",{children:'colorMode="dark"'})," to ",e.jsx("code",{children:"BootstrapStyledProvider"}),"."]}),e.jsx(p,{eventKey:"2",header:"Is it TypeScript?",children:"Fully typed. Props are inferred from interfaces; no hand-written prop tables needed."})]});Y.storyName="Accordion";typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Y as AccordionExample,z as BreadcrumbExample,F as NavBasic,L as NavbarExample,M as PaginationExample,W as TabsExample,ee as default};
