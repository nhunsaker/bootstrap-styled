import{g as n,R as t,j as i,r as f}from"./index-C-CN3z2J.js";const K=n.ol`
  --bs-breadcrumb-item-padding-x: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  /* Bootstrap --bs-breadcrumb-margin-bottom: 1rem (Reboot keeps the list gap). */
  margin: 0 0 1rem;
  list-style: none;

  & > li + li {
    padding-left: var(--bs-breadcrumb-item-padding-x);
  }
  & > li + li::before {
    float: left;
    padding-right: var(--bs-breadcrumb-item-padding-x);
    color: var(--bs-secondary);
    content: '/';
  }
`,x=n.li`
  color: ${r=>r.$active?"var(--bs-secondary)":"inherit"};

  /* Bootstrap breadcrumb links keep the Reboot underline (no .btn/.nav reset),
     so match it rather than the earlier text-decoration:none override. */
  a {
    color: var(--bs-link-color);
    text-decoration: underline;
  }
  a:hover {
    color: var(--bs-link-hover-color);
  }
`,h=t.forwardRef(({active:r,...e},a)=>i.jsx(x,{ref:a,$active:r,"aria-current":r?"page":void 0,...e}));h.displayName="BreadcrumbItem";const $=n.ul`
  /* Bootstrap 5.3.8 .pagination tokens (runtime-overridable via --bs-pagination-*). */
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
  --bs-pagination-font-size: 1rem;
  --bs-pagination-border-radius: var(--bs-border-radius);
  ${r=>r.$size==="sm"?`--bs-pagination-padding-x: 0.5rem;
         --bs-pagination-padding-y: 0.25rem;
         --bs-pagination-font-size: 0.875rem;
         --bs-pagination-border-radius: var(--bs-border-radius-sm);`:""}
  ${r=>r.$size==="lg"?`--bs-pagination-padding-x: 1.5rem;
         --bs-pagination-padding-y: 0.75rem;
         --bs-pagination-font-size: 1.25rem;
         --bs-pagination-border-radius: var(--bs-border-radius-lg);`:""}

  display: flex;
  padding-left: 0;
  margin: 0;
  list-style: none;

  & > li:not(:first-child) a {
    margin-left: calc(-1 * var(--bs-border-width, 1px));
  }
  & > li:first-child a {
    border-top-left-radius: var(--bs-pagination-border-radius);
    border-bottom-left-radius: var(--bs-pagination-border-radius);
  }
  & > li:last-child a {
    border-top-right-radius: var(--bs-pagination-border-radius);
    border-bottom-right-radius: var(--bs-pagination-border-radius);
  }
`,k=t.forwardRef(({size:r,...e},a)=>i.jsx($,{ref:a,$size:r,...e}));k.displayName="Pagination";const T=n.li``,j=n.a`
  position: relative;
  display: block;
  /* size-driven via --bs-pagination-* set on the parent .pagination */
  padding: var(--bs-pagination-padding-y, 0.375rem) var(--bs-pagination-padding-x, 0.75rem);
  font-size: var(--bs-pagination-font-size, 1rem);
  text-decoration: none;
  color: ${r=>r.$active?"var(--bs-primary-contrast)":"var(--bs-link-color)"};
  background-color: ${r=>r.$active?"var(--bs-primary)":"var(--bs-body-bg)"};
  border: var(--bs-border-width, 1px) solid ${r=>r.$active?"var(--bs-primary)":"var(--bs-border-color)"};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  &:hover {
    ${r=>r.$active?"":"z-index: 2; color: var(--bs-link-hover-color); background-color: var(--bs-tertiary-bg); border-color: var(--bs-border-color);"}
  }
  ${r=>r.$disabled?"color: var(--bs-secondary-color); pointer-events: none; background-color: var(--bs-secondary-bg); border-color: var(--bs-border-color);":""}
`,z=t.forwardRef(({active:r,disabled:e,...a},b)=>i.jsx(j,{ref:b,$active:r,$disabled:e,"aria-current":r?"page":void 0,"aria-disabled":e||void 0,...a}));z.displayName="PageLink";function I(r){return null}const w=n.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--bs-border-color);
`,P=n.button`
  margin-bottom: -1px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius);
  color: ${r=>r.$active?"var(--bs-body-color)":"var(--bs-link-color)"};

  &:hover {
    ${r=>r.$active?"":"border-color: color-mix(in srgb, var(--bs-body-color) 12%, var(--bs-body-bg));"}
  }
  ${r=>r.$active?`background-color: var(--bs-body-bg);
         border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);`:""}
  ${r=>r.$disabled?"color: var(--bs-secondary); pointer-events: none;":""}
`,B=n.div``;function L({activeKey:r,defaultActiveKey:e,onSelect:a,children:b}){var c;const d=t.Children.toArray(b).filter(o=>t.isValidElement(o)),g=(c=d[0])==null?void 0:c.props.eventKey,[v,m]=f.useState(e??g),u=r??v,y=o=>{r===void 0&&m(o),a==null||a(o)},s=d.find(o=>o.props.eventKey===u)??d[0];return i.jsxs("div",{children:[i.jsx(w,{role:"tablist",children:d.map(o=>{const l=o.props.eventKey,p=l===(s==null?void 0:s.props.eventKey);return i.jsx("li",{role:"presentation",children:i.jsx(P,{role:"tab",type:"button","aria-selected":p,$active:p,$disabled:o.props.disabled,disabled:o.props.disabled,onClick:()=>y(l),children:o.props.title})},l)})}),i.jsx(B,{role:"tabpanel",children:s==null?void 0:s.props.children})]})}export{K as B,k as P,L as T,h as a,T as b,z as c,I as d};
