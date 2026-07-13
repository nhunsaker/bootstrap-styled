import{j as e,g as s,r as b,R as A}from"./index-DiIymZMJ.js";import{u as D,e as S,f as M,g as R,F as T,P as z,h as J,i as N,j as L,k as Q,l as H,o as I,m as q,s as K,n as U,p as V,D as W,a as X,q as Y,r as E,t as Z,v as ee,M as oe,b as re,c as te,d as se}from"./Dropdown-BHvMc_-B.js";import{B as n}from"./Button-5Efp2OTA.js";import{C as _}from"./CloseButton-8X_PkD27.js";import{S as G}from"./Stack-C5lI4cs1.js";import"./Provider-D4t2PSGs.js";const ne=o=>{switch(o){case"end":return"top: 0; right: 0; height: 100%; width: 400px; max-width: 100%; border-left: 1px solid var(--bs-border-color-translucent);";case"top":return"top: 0; right: 0; left: 0; height: 30vh; max-height: 100%; border-bottom: 1px solid var(--bs-border-color-translucent);";case"bottom":return"right: 0; bottom: 0; left: 0; height: 30vh; max-height: 100%; border-top: 1px solid var(--bs-border-color-translucent);";case"start":default:return"top: 0; left: 0; height: 100%; width: 400px; max-width: 100%; border-right: 1px solid var(--bs-border-color-translucent);"}},le=s.div`
  position: fixed;
  z-index: 1045;
  display: flex;
  flex-direction: column;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  color: var(--bs-body-color);
  outline: 0;
  ${o=>ne(o.$placement)}
`;function ae({show:o,onHide:r,placement:m="start",children:h}){const{refs:i,context:l}=D({open:o,onOpenChange:t=>{t||r()}}),d=S(l,{outsidePress:!1,escapeKey:!0}),a=M(l),{getFloatingProps:c}=R([d,a]);return o?e.jsx(T,{children:e.jsx(z,{children:e.jsx(J,{lockScroll:!0,style:{background:"rgba(0, 0, 0, 0.5)",zIndex:1044},onMouseDown:t=>{t.target===t.currentTarget&&r()},children:e.jsx(N,{context:l,modal:!0,children:e.jsx(le,{ref:i.setFloating,$placement:m,"aria-modal":"true",...c(),children:h})})})})}):null}const ie=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--bs-border-color);
`,de=s.h5`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
`,ce=s.div`
  flex: 1 1 auto;
  padding: 1rem;
  overflow-y: auto;
`,pe=s.div`
  z-index: 1080;
  opacity: 0.9;
`,be=s.div`
  max-width: 200px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--bs-body-bg);
  text-align: center;
  background-color: var(--bs-emphasis-color);
  border-radius: var(--bs-border-radius);
`,me=s.div`
  position: absolute;
  display: block;
  width: ${o=>o.$side==="left"||o.$side==="right"?"0.4rem":"0.8rem"};
  height: ${o=>o.$side==="left"||o.$side==="right"?"0.8rem":"0.4rem"};
  &::before {
    position: absolute;
    content: '';
    border-color: transparent;
    border-style: solid;
  }
  ${o=>o.$side==="top"&&`bottom: -0.4rem;
     &::before { top: -1px; border-width: 0.4rem 0.4rem 0; border-top-color: var(--bs-emphasis-color); }`}
  ${o=>o.$side==="bottom"&&`top: -0.4rem;
     &::before { bottom: -1px; border-width: 0 0.4rem 0.4rem; border-bottom-color: var(--bs-emphasis-color); }`}
  ${o=>o.$side==="left"&&`right: -0.4rem;
     &::before { left: -1px; border-width: 0.4rem 0 0.4rem 0.4rem; border-left-color: var(--bs-emphasis-color); }`}
  ${o=>o.$side==="right"&&`left: -0.4rem;
     &::before { right: -1px; border-width: 0.4rem 0.4rem 0.4rem 0; border-right-color: var(--bs-emphasis-color); }`}
`;function O({content:o,placement:r="top",defaultOpen:m=!1,children:h}){const[i,l]=b.useState(m),d=b.useRef(null),{refs:a,floatingStyles:c,context:t,middlewareData:p,placement:g}=D({open:i,onOpenChange:l,placement:r,whileElementsMounted:H,middleware:[I(6),q(),K({padding:8}),U({element:d})]}),v=L(t,{move:!1}),j=Q(t),y=S(t),w=M(t,{role:"tooltip"}),{getReferenceProps:$,getFloatingProps:k}=R([v,j,y,w]),f=h,C=f.props??{},F=g.split("-")[0],{x,y:u}=p.arrow??{},P={left:x!=null?`${x}px`:void 0,top:u!=null?`${u}px`:void 0};return e.jsxs(e.Fragment,{children:[A.cloneElement(f,{ref:a.setReference,...$(C)}),i&&e.jsx(T,{children:e.jsx(z,{children:e.jsxs(pe,{ref:a.setFloating,style:c,...k(),children:[e.jsx(me,{ref:d,$side:F,style:P}),e.jsx(be,{children:o})]})})})]})}const he=s.div`
  z-index: 1070;
  max-width: 276px;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  background-clip: padding-box;
  border: 1px solid var(--bs-border-color-translucent);
  border-radius: var(--bs-border-radius-lg);
  /* Bootstrap's default .popover applies no box-shadow (var defined, not used). */
`,fe=s.div`
  padding: 0.5rem 1rem;
  margin: 0;
  font-size: 1rem;
  color: inherit;
  background-color: var(--bs-secondary-bg);
  border-bottom: 1px solid var(--bs-border-color-translucent);
  border-top-left-radius: calc(var(--bs-border-radius-lg) - 1px);
  border-top-right-radius: calc(var(--bs-border-radius-lg) - 1px);
`,xe=s.div`
  padding: 1rem;
  color: var(--bs-body-color);
`,ue=s.div`
  position: absolute;
  display: block;
  width: ${o=>o.$side==="left"||o.$side==="right"?"0.5rem":"1rem"};
  height: ${o=>o.$side==="left"||o.$side==="right"?"1rem":"0.5rem"};
  &::before,
  &::after {
    position: absolute;
    display: block;
    content: '';
    border-color: transparent;
    border-style: solid;
    border-width: 0;
  }
  ${o=>o.$side==="top"&&`bottom: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0.5rem 0; }
     &::before { bottom: 0; border-top-color: var(--bs-border-color-translucent); }
     &::after { bottom: 1px; border-top-color: var(--bs-body-bg); }`}
  ${o=>o.$side==="bottom"&&`top: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0 0.5rem 0.5rem; }
     &::before { top: 0; border-bottom-color: var(--bs-border-color-translucent); }
     &::after { top: 1px; border-bottom-color: var(--bs-body-bg); }`}
  ${o=>o.$side==="left"&&`right: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0 0.5rem 0.5rem; }
     &::before { right: 0; border-left-color: var(--bs-border-color-translucent); }
     &::after { right: 1px; border-left-color: var(--bs-body-bg); }`}
  ${o=>o.$side==="right"&&`left: calc(-0.5rem - 1px);
     &::before, &::after { border-width: 0.5rem 0.5rem 0.5rem 0; }
     &::before { left: 0; border-right-color: var(--bs-border-color-translucent); }
     &::after { left: 1px; border-right-color: var(--bs-body-bg); }`}
`;function B({title:o,content:r,placement:m="top",defaultOpen:h=!1,children:i}){const[l,d]=b.useState(h),a=b.useRef(null),{refs:c,floatingStyles:t,context:p,middlewareData:g,placement:v}=D({open:l,onOpenChange:d,placement:m,whileElementsMounted:H,middleware:[I(8),q(),K({padding:8}),U({element:a})]}),j=V(p),y=S(p),w=M(p,{role:"dialog"}),{getReferenceProps:$,getFloatingProps:k}=R([j,y,w]),f=i,C=f.props??{},F=v.split("-")[0],{x,y:u}=g.arrow??{},P={left:x!=null?`${x}px`:void 0,top:u!=null?`${u}px`:void 0};return e.jsxs(e.Fragment,{children:[A.cloneElement(f,{ref:c.setReference,...$(C)}),l&&e.jsx(T,{children:e.jsx(z,{children:e.jsx(N,{context:p,modal:!1,children:e.jsxs(he,{ref:c.setFloating,style:t,...k(),children:[e.jsx(ue,{ref:a,$side:F,style:P}),o!=null&&e.jsx(fe,{children:o}),e.jsx(xe,{children:r})]})})})})]})}const Oe={title:"Overlays"},ge=()=>{const[o,r]=b.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>r(!0),children:"Open modal"}),e.jsxs(ee,{show:o,onHide:()=>r(!1),centered:!0,children:[e.jsxs(oe,{children:[e.jsx(re,{children:"Modal title"}),e.jsx(_,{onClick:()=>r(!1)})]}),e.jsx(te,{children:"Escape, backdrop click, and the × all close this modal."}),e.jsxs(se,{children:[e.jsx(n,{variant:"secondary",onClick:()=>r(!1),children:"Close"}),e.jsx(n,{onClick:()=>r(!1),children:"Save changes"})]})]})]})};ge.storyName="Modal";const ve=()=>{const[o,r]=b.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"secondary",onClick:()=>r(!0),children:"Open offcanvas"}),e.jsxs(ae,{show:o,onHide:()=>r(!1),placement:"end",children:[e.jsxs(ie,{children:[e.jsx(de,{children:"Offcanvas"}),e.jsx(_,{onClick:()=>r(!1)})]}),e.jsx(ce,{children:"Slides in from the end. Escape or backdrop click closes."})]})]})};ve.storyName="Offcanvas";const je=()=>e.jsxs(W,{children:[e.jsx(X,{children:"Actions"}),e.jsxs(Y,{children:[e.jsx(E,{onClick:()=>alert("Edit clicked"),children:"Edit"}),e.jsx(E,{onClick:()=>alert("Duplicate clicked"),children:"Duplicate"}),e.jsx(Z,{}),e.jsx(E,{disabled:!0,children:"Delete"})]})]});je.storyName="Dropdown";const ye=()=>e.jsxs(G,{direction:"horizontal",gap:3,children:[e.jsx(O,{content:"Tooltip on top",placement:"top",children:e.jsx(n,{variant:"outline-secondary",children:"Top"})}),e.jsx(O,{content:"Tooltip on right",placement:"right",children:e.jsx(n,{variant:"outline-secondary",children:"Right"})}),e.jsx(O,{content:"Tooltip on bottom",placement:"bottom",children:e.jsx(n,{variant:"outline-secondary",children:"Bottom"})})]});ye.storyName="Tooltip";const we=()=>e.jsxs(G,{direction:"horizontal",gap:3,children:[e.jsx(B,{title:"Popover title",content:"And here's the popover body content.",placement:"right",children:e.jsx(n,{variant:"outline-primary",children:"Click me"})}),e.jsx(B,{content:"A popover without a title.",placement:"top",children:e.jsx(n,{variant:"outline-secondary",children:"No title"})})]});we.storyName="Popover";typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{je as DropdownExample,ge as ModalExample,ve as OffcanvasExample,we as PopoverExample,ye as TooltipExample,Oe as default};
