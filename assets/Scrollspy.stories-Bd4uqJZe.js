import{r as b,j as e,g as p}from"./index-DiIymZMJ.js";function T({ids:r,root:s=null,rootMargin:c="0px 0px -25%",threshold:l=[.1,.5,1]}){const[d,n]=b.useState(r[0]),u=r.join("|"),g=Array.isArray(l)?l.join(","):String(l);return b.useEffect(()=>{if(typeof IntersectionObserver>"u")return;const i=r.map(t=>document.getElementById(t)).filter(t=>t!=null);if(i.length===0)return;const v=s??document.documentElement,o={parentScrollTop:0,visibleEntryTop:0};let x=d;const k=t=>{x!==t&&(x=t,n(t))},$=new IntersectionObserver(t=>{const f=v.scrollTop,j=f>=o.parentScrollTop;o.parentScrollTop=f;for(const w of t){if(!w.isIntersecting)continue;const a=w.target,S=a.offsetTop>=o.visibleEntryTop;if(j&&S){if(o.visibleEntryTop=a.offsetTop,k(a.id),!f)return}else!j&&!S&&(o.visibleEntryTop=a.offsetTop,k(a.id))}},{root:s,rootMargin:c,threshold:l});return i.forEach(t=>$.observe(t)),()=>$.disconnect()},[u,s,c,g]),d}const E=p.ul`
  --bs-nav-link-padding-x: 1rem;
  --bs-nav-link-padding-y: 0.5rem;
  --bs-nav-link-color: var(--bs-link-color);
  --bs-nav-link-hover-color: var(--bs-link-hover-color);
  --bs-nav-link-disabled-color: var(--bs-secondary-color);
  --bs-nav-pills-border-radius: var(--bs-border-radius);
  --bs-nav-pills-link-active-color: #fff;
  --bs-nav-pills-link-active-bg: var(--bs-primary, #0d6efd);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`,I=p.a`
  display: block;
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  text-decoration: none;
  background: 0 0;
  border: 0;
  border-radius: var(--bs-nav-pills-border-radius);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  color: ${r=>r.$active?"var(--bs-nav-pills-link-active-color)":"var(--bs-nav-link-color)"};
  background-color: ${r=>r.$active?"var(--bs-nav-pills-link-active-bg)":"transparent"};

  &:hover,
  &:focus {
    color: ${r=>r.$active?"var(--bs-nav-pills-link-active-color)":"var(--bs-nav-link-hover-color)"};
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,N=p.div`
  --bs-list-group-color: var(--bs-body-color);
  --bs-list-group-bg: var(--bs-body-bg);
  --bs-list-group-border-color: var(--bs-border-color);
  --bs-list-group-border-width: var(--bs-border-width);
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: var(--bs-primary, #0d6efd);
  --bs-list-group-active-border-color: var(--bs-primary, #0d6efd);
  /* .list-group-item-action tokens (oracle) — scrollspy items are links, so
     inactive ones take the greyed action color, not the body color. */
  --bs-list-group-action-color: var(--bs-secondary-color);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-tertiary-bg);
  display: flex;
  flex-direction: column;
  border-radius: var(--bs-border-radius);
`,L=p.a`
  position: relative;
  display: block;
  width: 100%;
  padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);
  text-align: inherit;
  text-decoration: none;
  color: ${r=>r.$active?"var(--bs-list-group-active-color)":"var(--bs-list-group-action-color)"};
  background-color: ${r=>r.$active?"var(--bs-list-group-active-bg)":"var(--bs-list-group-bg)"};
  border: var(--bs-list-group-border-width) solid
    ${r=>r.$active?"var(--bs-list-group-active-border-color)":"var(--bs-list-group-border-color)"};
  &:hover,
  &:focus {
    z-index: 1;
    text-decoration: none;
    color: ${r=>r.$active?"var(--bs-list-group-active-color)":"var(--bs-list-group-action-hover-color)"};
    background-color: ${r=>r.$active?"var(--bs-list-group-active-bg)":"var(--bs-list-group-action-hover-bg)"};
  }
  &:not(:first-child) {
    border-top-width: 0;
  }
  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
`;function h({items:r,activeId:s,variant:c="nav",root:l=null,rootMargin:d,onActiveChange:n}){const u=r.map(o=>o.id),g=T({ids:u,root:l,rootMargin:d}),i=s??g,v=b.useRef(void 0);return b.useEffect(()=>{i&&i!==v.current&&(v.current=i,n==null||n(i))},[i,n]),c==="list-group"?e.jsx(N,{children:r.map(o=>e.jsx(L,{href:`#${o.id}`,className:`list-group-item list-group-item-action${o.id===i?" active":""}`,$active:o.id===i,"aria-current":o.id===i?"true":void 0,children:o.label},o.id))}):e.jsx(E,{className:"nav nav-pills",children:r.map(o=>e.jsx("li",{className:"nav-item",children:e.jsx(I,{className:`nav-link${o.id===i?" active":""}`,href:`#${o.id}`,$active:o.id===i,"aria-current":o.id===i?"true":void 0,children:o.label})},o.id))})}const A={title:"Components/Scrollspy"},y=[{id:"ss-first",label:"First"},{id:"ss-second",label:"Second"},{id:"ss-third",label:"Third"}],m=({id:r,title:s})=>e.jsxs("div",{id:r,style:{minHeight:"60vh",paddingTop:"1rem"},children:[e.jsx("h4",{children:s}),e.jsx("p",{children:"Scroll this panel — the nav on the left highlights the section anchored near the top of the scroll region via IntersectionObserver."})]}),B=()=>e.jsxs("div",{style:{display:"flex",gap:"1rem"},children:[e.jsx("div",{style:{position:"sticky",top:0,alignSelf:"flex-start"},children:e.jsx(h,{items:y})}),e.jsxs("div",{style:{height:"300px",overflowY:"auto",flex:1,border:"1px solid var(--bs-border-color)",padding:"0 1rem"},children:[e.jsx(m,{id:"ss-first",title:"First section"}),e.jsx(m,{id:"ss-second",title:"Second section"}),e.jsx(m,{id:"ss-third",title:"Third section"})]})]}),D=()=>e.jsx(h,{items:y,activeId:"ss-second"}),F=()=>e.jsx(h,{items:y,activeId:"ss-third",variant:"list-group"});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{D as ActiveStatic,F as ListGroupStatic,B as Live,A as default};
