import{r as s,j as m,g as v}from"./index-DiIymZMJ.js";const x=v.div`
  &[data-collapse='hide'] {
    display: none;
  }
  &[data-collapse='collapsing'] {
    height: 0;
    overflow: hidden;
    transition: height 0.35s ease;
  }
  &.collapse-horizontal[data-collapse='collapsing'] {
    width: 0;
    height: auto;
    transition: width 0.35s ease;
  }
  @media (prefers-reduced-motion: reduce) {
    &[data-collapse='collapsing'] {
      transition: none;
    }
  }
`,R=s.forwardRef(function({show:a=!1,horizontal:n=!1,className:p,children:f,...u},l){const r=s.useRef(null),c=s.useRef(!1),t=n?"width":"height",d=n?"scrollWidth":"scrollHeight",h=s.useCallback(e=>{r.current=e,e&&!e.dataset.collapse&&(e.dataset.collapse=a?"show":"hide"),typeof l=="function"?l(e):l&&(l.current=e)},[]);return s.useEffect(()=>{const e=r.current;if(!e)return;if(!c.current){c.current=!0;return}let o=0;const i=g=>{g.target===e&&(e.dataset.collapse=a?"show":"hide",e.style[t]="",e.removeEventListener("transitionend",i))};return a?(e.dataset.collapse="collapsing",e.style[t]="0px",e.offsetHeight,o=requestAnimationFrame(()=>{e.style[t]=`${e[d]}px`})):(e.style[t]=`${e.getBoundingClientRect()[t]}px`,e.offsetHeight,e.dataset.collapse="collapsing",o=requestAnimationFrame(()=>{e.style[t]="0px"})),e.addEventListener("transitionend",i),()=>{cancelAnimationFrame(o),e.removeEventListener("transitionend",i)}},[a,t,d]),m.jsx(x,{ref:h,className:["collapse",n?"collapse-horizontal":"",p].filter(Boolean).join(" "),...u,children:f})});export{R as C};
