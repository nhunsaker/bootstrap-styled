import{R as a,j as e,f as c,g as l}from"./index-DiIymZMJ.js";import{c as d}from"./cx-2dOUpm6k.js";const m=l.a`
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  -webkit-text-decoration-color: rgba(var(--bs-link-color-rgb, 13, 110, 253), var(--bs-link-opacity, 0.5));
  text-decoration-color: rgba(var(--bs-link-color-rgb, 13, 110, 253), var(--bs-link-opacity, 0.5));
  text-underline-offset: 0.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  & > .bi {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    fill: currentcolor;
    transition: 0.2s ease-in-out transform;
  }

  @media (prefers-reduced-motion: reduce) {
    & > .bi {
      transition: none;
    }
  }

  ${i=>i.$hover&&c`
      &:focus-visible > .bi,
      &:hover > .bi {
        transform: var(--bs-icon-link-transform, translate3d(0.25em, 0, 0));
      }
    `}
`,n=a.forwardRef(({hover:i=!1,className:t,...r},s)=>e.jsx(m,{ref:s,$hover:i,className:d("icon-link",i&&"icon-link-hover",t),...r}));n.displayName="IconLink";const h={title:"Helpers/IconLink"},o=()=>e.jsx("svg",{className:"bi",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"})}),k=()=>e.jsxs(n,{href:"#",children:["Icon link",e.jsx(o,{})]}),x=()=>e.jsxs(n,{href:"#",hover:!0,children:["Hover me",e.jsx(o,{})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{k as Basic,x as Hover,h as default};
