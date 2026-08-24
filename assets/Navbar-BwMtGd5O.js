import{R as s,r as v,j as t,g as u}from"./index-C-CN3z2J.js";import{C as $}from"./Collapse-xhP9YesR.js";const j={sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},C=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,R=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`;function B(a){return a?`
  @media (min-width: ${a===!0?"0":j[a]}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    .navbar-nav {
      flex-direction: row;
    }
    .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
      height: auto !important;
      overflow: visible !important;
    }
    .navbar-toggler {
      display: none;
    }
  }
  `:""}const f=v.createContext(null);function h(a){const n=v.useContext(f);if(!n)throw new Error(`${a} must be rendered inside a <Navbar>.`);return n}const I=u.nav`
  /* Bootstrap 5.3.8 .navbar box-model tokens (runtime-overridable). */
  --bs-navbar-padding-y: 0.5rem;
  --bs-navbar-padding-x: 0;
  --bs-navbar-brand-padding-y: 0.3125rem;
  --bs-navbar-brand-margin-end: 1rem;
  --bs-navbar-brand-font-size: 1.25rem;
  /* Link theming — cascades to .navbar-nav .nav-link (oracle .navbar block). */
  --bs-navbar-color: rgba(var(--bs-emphasis-color-rgb), 0.65);
  --bs-navbar-hover-color: rgba(var(--bs-emphasis-color-rgb), 0.8);
  --bs-navbar-disabled-color: rgba(var(--bs-emphasis-color-rgb), 0.3);
  --bs-navbar-active-color: rgba(var(--bs-emphasis-color-rgb), 1);
  --bs-navbar-nav-link-padding-x: 0.5rem;
  --bs-navbar-toggler-padding-y: 0.25rem;
  --bs-navbar-toggler-padding-x: 0.75rem;
  --bs-navbar-toggler-font-size: 1.25rem;
  --bs-navbar-toggler-border-color: rgba(0, 0, 0, 0.15);
  --bs-navbar-toggler-border-radius: var(--bs-border-radius, 0.375rem);
  --bs-navbar-toggler-focus-width: 0.25rem;
  --bs-navbar-toggler-icon-bg: ${C};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);

  /* A direct .container(-*) child lays out horizontally so brand + collapse
     don't wrap onto separate rows (oracle .navbar>.container{display:flex;...}). */
  & > .container,
  & > .container-fluid,
  & > .container-sm,
  & > .container-md,
  & > .container-lg,
  & > .container-xl,
  & > .container-xxl {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
  }

  /* Sub-part base styles (only bite when NavbarNav/Collapse/Toggler are used). */
  .navbar-nav {
    /* Cascade the navbar link theming into nav-links via the shared
       --bs-nav-link-* custom props (they inherit down to each <NavLink>). */
    --bs-nav-link-padding-x: var(--bs-navbar-nav-link-padding-x);
    --bs-nav-link-padding-y: 0.5rem;
    --bs-nav-link-color: var(--bs-navbar-color);
    --bs-nav-link-hover-color: var(--bs-navbar-hover-color);
    --bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .navbar-nav .nav-link.active,
  .navbar-nav .nav-link.show,
  .navbar-nav a[aria-current='page'] {
    color: var(--bs-navbar-active-color);
  }
  .navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
  }
  .navbar-text {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .navbar-toggler {
    padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
    font-size: var(--bs-navbar-toggler-font-size);
    line-height: 1;
    color: var(--bs-navbar-color, rgba(0, 0, 0, 0.55));
    background-color: transparent;
    border: var(--bs-border-width, 1px) solid var(--bs-navbar-toggler-border-color);
    border-radius: var(--bs-navbar-toggler-border-radius);
    transition: box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
  .navbar-toggler:focus {
    text-decoration: none;
    outline: 0;
    box-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width) rgba(0, 0, 0, 0.25);
  }
  .navbar-toggler-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    background-image: var(--bs-navbar-toggler-icon-bg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }

  &[data-bs-theme='dark'],
  [data-bs-theme='dark'] & {
    --bs-navbar-toggler-icon-bg: ${R};
    --bs-navbar-toggler-border-color: rgba(255, 255, 255, 0.15);
  }

  ${a=>a.$variant?`
    background-color: var(--bs-${a.$variant});
    color: var(--bs-${a.$variant}-contrast);
    a { color: var(--bs-${a.$variant}-contrast); }
    .navbar-toggler { color: var(--bs-${a.$variant}-contrast); }
  `:""}

  ${a=>B(a.$expand)}
`,z=s.forwardRef(function({variant:n,expand:r,expanded:e,defaultExpanded:i=!1,onToggle:o,className:b,...c},g){const d=v.useId(),l=e!=null,[w,N]=v.useState(i),p=l?e:w,m=s.useCallback(x=>{l||N(x),o==null||o(x)},[l,o]),k=v.useMemo(()=>({expanded:p,setExpanded:m,toggle:()=>m(!p),collapseId:d,expand:r}),[p,m,d,r]),y=r===!0?"navbar-expand":r?`navbar-expand-${r}`:"";return t.jsx(f.Provider,{value:k,children:t.jsx(I,{ref:g,$variant:n,$expand:r,className:["navbar",y,b].filter(Boolean).join(" "),...c})})});z.displayName="Navbar";const _=u.a`
  /* Bootstrap 5.3.8 .navbar-brand: py 0.3125rem, mr 1rem, fs 1.25rem, weight 400. */
  padding-top: var(--bs-navbar-brand-padding-y, 0.3125rem);
  padding-bottom: var(--bs-navbar-brand-padding-y, 0.3125rem);
  margin-right: var(--bs-navbar-brand-margin-end, 1rem);
  font-size: var(--bs-navbar-brand-font-size, 1.25rem);
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
`,M=s.forwardRef(function({className:n,children:r,onClick:e,"aria-label":i,...o},b){const{expanded:c,toggle:g,collapseId:d}=h("NavbarToggler");return t.jsx("button",{ref:b,type:"button",className:["navbar-toggler",n].filter(Boolean).join(" "),"aria-controls":d,"aria-expanded":c,"aria-label":i??"Toggle navigation",onClick:l=>{g(),e==null||e(l)},...o,children:r??t.jsx("span",{className:"navbar-toggler-icon"})})});M.displayName="NavbarToggler";const T=s.forwardRef(function({className:n,children:r,...e},i){const{expanded:o,collapseId:b}=h("NavbarCollapse");return t.jsx($,{ref:i,id:b,show:o,className:["navbar-collapse",n].filter(Boolean).join(" "),...e,children:r})});T.displayName="NavbarCollapse";const E=s.forwardRef(function({className:n,...r},e){return t.jsx("ul",{ref:e,className:["navbar-nav",n].filter(Boolean).join(" "),...r})});E.displayName="NavbarNav";const G=s.forwardRef(function({className:n,...r},e){return t.jsx("span",{ref:e,className:["navbar-text",n].filter(Boolean).join(" "),...r})});G.displayName="NavbarText";export{z as N,M as a,T as b,E as c,_ as d};
