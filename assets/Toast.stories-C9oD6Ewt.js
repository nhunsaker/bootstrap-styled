import{R as s,j as t,g as l,r as T}from"./index-C-CN3z2J.js";import{C}from"./CloseButton-D5QcvaCf.js";import{B as S}from"./Button-BvagqOfZ.js";const u=s.createContext({}),R=l.div`
  --bs-toast-zindex: 1090;
  --bs-toast-padding-x: 0.75rem;
  --bs-toast-padding-y: 0.5rem;
  --bs-toast-spacing: 1.5rem;
  --bs-toast-max-width: 350px;
  --bs-toast-font-size: 0.875rem;
  --bs-toast-color: ;
  --bs-toast-bg: rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85);
  --bs-toast-border-width: var(--bs-border-width, 1px);
  --bs-toast-border-color: var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));
  --bs-toast-border-radius: var(--bs-border-radius, 0.375rem);
  --bs-toast-box-shadow: var(--bs-box-shadow, 0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  --bs-toast-header-color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
  --bs-toast-header-bg: rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85);
  --bs-toast-header-border-color: var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175));

  width: var(--bs-toast-max-width);
  max-width: 100%;
  font-size: var(--bs-toast-font-size);
  color: var(--bs-toast-color);
  pointer-events: auto;
  background-color: var(--bs-toast-bg);
  background-clip: padding-box;
  border: var(--bs-toast-border-width) solid var(--bs-toast-border-color);
  box-shadow: var(--bs-toast-box-shadow);
  border-radius: var(--bs-toast-border-radius);
  ${o=>o.$show?"":"display: none;"}
`,a=s.forwardRef(({show:o,defaultShow:r=!0,onClose:e,autohide:i=!1,delay:d=5e3,role:x="alert",...g},f)=>{const m=o!==void 0,[v,w]=s.useState(r),h=m?o:v,n=s.useCallback(()=>{m||w(!1),e==null||e()},[m,e]);s.useEffect(()=>{if(!h||!i)return;const y=window.setTimeout(n,d);return()=>window.clearTimeout(y)},[h,i,d,n]);const j=s.useMemo(()=>({onClose:n}),[n]);return t.jsx(u.Provider,{value:j,children:t.jsx(R,{ref:f,$show:!!h,role:x,"aria-live":"assertive","aria-atomic":"true",...g})})});a.displayName="Toast";const k=l.div`
  display: flex;
  align-items: center;
  padding: var(--bs-toast-padding-y, 0.5rem) var(--bs-toast-padding-x, 0.75rem);
  color: var(--bs-toast-header-color, var(--bs-secondary-color));
  background-color: var(--bs-toast-header-bg, rgba(var(--bs-body-bg-rgb, 255, 255, 255), 0.85));
  background-clip: padding-box;
  border-bottom: var(--bs-toast-border-width, var(--bs-border-width, 1px)) solid
    var(--bs-toast-header-border-color, var(--bs-border-color-translucent, rgba(0, 0, 0, 0.175)));
  border-top-left-radius: calc(
    var(--bs-toast-border-radius, 0.375rem) - var(--bs-toast-border-width, 1px)
  );
  border-top-right-radius: calc(
    var(--bs-toast-border-radius, 0.375rem) - var(--bs-toast-border-width, 1px)
  );

  /* .toast-header .btn-close spacing. */
  & > button[aria-label='Close'] {
    margin-right: calc(-0.5 * var(--bs-toast-padding-x, 0.75rem));
    margin-left: var(--bs-toast-padding-x, 0.75rem);
  }
`,b=s.forwardRef(({closeButton:o=!0,children:r,...e},i)=>{const{onClose:d}=s.useContext(u);return t.jsxs(k,{ref:i,...e,children:[r,o&&t.jsx(C,{onClick:d})]})});b.displayName="ToastHeader";const c=l.div`
  padding: var(--bs-toast-padding-x, 0.75rem);
  word-wrap: break-word;
`,B=o=>{switch(o){case"top-start":return"position: fixed; top: 0; left: 0;";case"top-center":return"position: fixed; top: 0; left: 50%; transform: translateX(-50%);";case"top-end":return"position: fixed; top: 0; right: 0;";case"middle-start":return"position: fixed; top: 50%; left: 0; transform: translateY(-50%);";case"middle-center":return"position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";case"middle-end":return"position: fixed; top: 50%; right: 0; transform: translateY(-50%);";case"bottom-start":return"position: fixed; bottom: 0; left: 0;";case"bottom-center":return"position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);";case"bottom-end":return"position: fixed; bottom: 0; right: 0;";default:return"position: absolute;"}},z=l.div`
  --bs-toast-zindex: 1090;
  ${o=>B(o.$position)}
  z-index: var(--bs-toast-zindex);
  width: max-content;
  max-width: 100%;
  pointer-events: none;

  & > :not(:last-child) {
    margin-bottom: var(--bs-toast-spacing, 1.5rem);
  }
`,p=s.forwardRef(({position:o,...r},e)=>t.jsx(z,{ref:e,$position:o,...r}));p.displayName="ToastContainer";const N={title:"Components/Toast"},A=()=>t.jsxs(a,{defaultShow:!0,children:[t.jsxs(b,{children:[t.jsx("strong",{style:{marginRight:"auto"},children:"Bootstrap"}),t.jsx("small",{style:{color:"var(--bs-secondary-color)"},children:"11 mins ago"})]}),t.jsx(c,{children:"Hello, world! This is a toast message."})]}),P=()=>t.jsx(a,{defaultShow:!0,style:{"--bs-toast-bg":"#0d6efd","--bs-toast-color":"#fff"},children:t.jsx("div",{style:{display:"flex"},children:t.jsx(c,{children:"Hello, world! This is a toast message."})})}),X=()=>{const[o,r]=T.useState(!1);return t.jsxs("div",{children:[t.jsx(S,{variant:"primary",onClick:()=>r(!0),children:"Show toast"}),t.jsx("div",{style:{marginTop:"1rem"},children:t.jsxs(a,{show:o,onClose:()=>r(!1),autohide:!0,delay:3e3,children:[t.jsxs(b,{children:[t.jsx("strong",{style:{marginRight:"auto"},children:"Bootstrap"}),t.jsx("small",{children:"just now"})]}),t.jsx(c,{children:"Auto-hides after 3s, or close it yourself."})]})})]})},Y=()=>t.jsx("div",{style:{position:"relative",minHeight:220,background:"#dee2e6",borderRadius:"0.375rem"},children:t.jsx(p,{position:"top-end",style:{padding:"1rem",position:"absolute"},children:t.jsxs(a,{defaultShow:!0,children:[t.jsxs(b,{children:[t.jsx("strong",{style:{marginRight:"auto"},children:"Bootstrap"}),t.jsx("small",{children:"just now"})]}),t.jsx(c,{children:"Positioned toast in a container."})]})})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{A as Basic,Y as Container,X as Dismissible,P as HeaderlessWithColor,N as default};
