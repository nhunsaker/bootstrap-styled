import{R as n,j as r,g as d}from"./index-C-CN3z2J.js";import{B as e}from"./Button-BvagqOfZ.js";const b=i=>i==="sm"?"--bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.875rem; --bs-btn-border-radius: var(--bs-border-radius-sm);":i==="lg"?"--bs-btn-padding-y: 0.5rem; --bs-btn-padding-x: 1rem; --bs-btn-font-size: 1.25rem; --bs-btn-border-radius: var(--bs-border-radius-lg);":"",u=i=>i==="sm"?"padding: 0.25rem 0.5rem; font-size: 0.875rem;":i==="lg"?"padding: 0.5rem 1rem; font-size: 1.25rem;":"",m=i=>i==="sm"?"var(--bs-border-radius-sm)":i==="lg"?"var(--bs-border-radius-lg)":"var(--bs-border-radius)",h=d.div`
  ${i=>b(i.$size)}
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  ${i=>i.$vertical?"flex-direction: column; align-items: flex-start; justify-content: center;":"border-radius: var(--bs-border-radius);"}

  & > * {
    position: relative;
    flex: 1 1 auto;
    ${i=>i.$vertical?"width: 100%;":""}
  }

  /* Interacted button borders sit above their neighbors. */
  & > *:hover,
  & > *:focus,
  & > *:active {
    z-index: 1;
  }

  /* Group sizing + shared corner radius on every child (&& out-specifies the
     single-class <Button> rule). */
  && > * {
    ${i=>u(i.$size)}
    border-radius: ${i=>m(i.$size)};
  }

  ${i=>i.$vertical?`
    && > *:not(:first-child) {
      margin-top: calc(-1 * var(--bs-border-width, 1px));
    }
    && > *:not(:last-child) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    && > *:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `:`
    && > *:not(:first-child) {
      margin-left: calc(-1 * var(--bs-border-width, 1px));
    }
    && > *:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    && > *:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}
`,t=n.forwardRef(({size:i,vertical:a,role:s="group",...l},c)=>r.jsx(h,{ref:c,$size:i,$vertical:a,role:s,...l}));t.displayName="ButtonGroup";const p=d.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`,o=n.forwardRef(({role:i="toolbar",...a},s)=>r.jsx(p,{ref:s,role:i,...a}));o.displayName="ButtonToolbar";const f={title:"Components/ButtonGroup"},j=()=>r.jsxs(t,{"aria-label":"Basic example",children:[r.jsx(e,{variant:"primary",children:"Left"}),r.jsx(e,{variant:"primary",children:"Middle"}),r.jsx(e,{variant:"primary",children:"Right"})]}),y=()=>r.jsxs(t,{"aria-label":"Outlined example",children:[r.jsx(e,{variant:"outline-primary",children:"Left"}),r.jsx(e,{variant:"outline-primary",children:"Middle"}),r.jsx(e,{variant:"outline-primary",children:"Right"})]}),g=()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",alignItems:"flex-start"},children:[r.jsxs(t,{size:"lg","aria-label":"Large",children:[r.jsx(e,{variant:"secondary",children:"Left"}),r.jsx(e,{variant:"secondary",children:"Middle"}),r.jsx(e,{variant:"secondary",children:"Right"})]}),r.jsxs(t,{"aria-label":"Default",children:[r.jsx(e,{variant:"secondary",children:"Left"}),r.jsx(e,{variant:"secondary",children:"Middle"}),r.jsx(e,{variant:"secondary",children:"Right"})]}),r.jsxs(t,{size:"sm","aria-label":"Small",children:[r.jsx(e,{variant:"secondary",children:"Left"}),r.jsx(e,{variant:"secondary",children:"Middle"}),r.jsx(e,{variant:"secondary",children:"Right"})]})]}),w=()=>r.jsxs(t,{vertical:!0,"aria-label":"Vertical example",children:[r.jsx(e,{variant:"primary",children:"Top"}),r.jsx(e,{variant:"primary",children:"Middle"}),r.jsx(e,{variant:"primary",children:"Bottom"})]}),B=()=>r.jsxs(o,{"aria-label":"Toolbar with button groups",style:{gap:"0.5rem"},children:[r.jsxs(t,{"aria-label":"First group",children:[r.jsx(e,{variant:"primary",children:"1"}),r.jsx(e,{variant:"primary",children:"2"}),r.jsx(e,{variant:"primary",children:"3"})]}),r.jsxs(t,{"aria-label":"Second group",children:[r.jsx(e,{variant:"secondary",children:"4"}),r.jsx(e,{variant:"secondary",children:"5"})]})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{j as Basic,y as Outlined,g as Sizes,B as Toolbar,w as Vertical,f as default};
