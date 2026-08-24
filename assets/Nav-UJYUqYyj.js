import{R as s,j as l,g as i}from"./index-C-CN3z2J.js";const n=i.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0; /* zero the default <ul> margin so nav items align with siblings */
  list-style: none;

  ${r=>r.$variant==="tabs"?`
    border-bottom: var(--bs-border-width, 1px) solid var(--bs-border-color);
    & > li > a {
      margin-bottom: calc(-1 * var(--bs-border-width, 1px));
      border: var(--bs-border-width, 1px) solid transparent;
      border-top-left-radius: var(--bs-border-radius);
      border-top-right-radius: var(--bs-border-radius);
    }
    & > li > a:hover {
      border-color: var(--bs-secondary-bg) var(--bs-secondary-bg) var(--bs-border-color);
    }
    & > li > a[aria-current='page'] {
      color: var(--bs-emphasis-color);
      background-color: var(--bs-body-bg);
      border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);
    }
  `:""}

  ${r=>r.$variant==="pills"?`
    & > li > a { border-radius: var(--bs-border-radius); }
    & > li > a[aria-current='page'] {
      color: var(--bs-primary-contrast);
      background-color: var(--bs-primary);
    }
  `:""}

  ${r=>r.$fill?`
    & > li { flex: 1 1 auto; text-align: center; }
    & > li > a { width: 100%; }
  `:""}

  ${r=>r.$justified?`
    & > li { flex-grow: 1; flex-basis: 0; text-align: center; }
    & > li > a { width: 100%; }
  `:""}
`,t=s.forwardRef(({variant:r,fill:a,justified:o,...e},d)=>l.jsx(n,{ref:d,$variant:r,$fill:a,$justified:o,...e}));t.displayName="Nav";const p=i.li``,b=i.a`
  display: block;
  padding: var(--bs-nav-link-padding-y, 0.5rem) var(--bs-nav-link-padding-x, 1rem);
  text-decoration: none;
  color: var(--bs-nav-link-color, var(--bs-link-color));
  background: none;
  border: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  &:hover {
    color: var(--bs-nav-link-hover-color, var(--bs-link-hover-color));
  }
  ${r=>r.$disabled?"color: var(--bs-nav-link-disabled-color, var(--bs-secondary-color)); pointer-events: none; cursor: default;":""}
`,v=s.forwardRef(({active:r,disabled:a,...o},e)=>l.jsx(b,{ref:e,$disabled:a,"aria-current":r?"page":void 0,"aria-disabled":a||void 0,...o}));v.displayName="NavLink";export{t as N,p as a,v as b};
