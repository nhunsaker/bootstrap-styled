import{R as a,j as n,g as t,f as m}from"./index-C-CN3z2J.js";const c={1:{fluid:"calc(1.625rem + 4.5vw)",fixed:"5rem"},2:{fluid:"calc(1.575rem + 3.9vw)",fixed:"4.5rem"},3:{fluid:"calc(1.525rem + 3.3vw)",fixed:"4rem"},4:{fluid:"calc(1.475rem + 2.7vw)",fixed:"3.5rem"},5:{fluid:"calc(1.425rem + 2.1vw)",fixed:"3rem"},6:{fluid:"calc(1.375rem + 1.5vw)",fixed:"2.5rem"}},d={1:{fluid:"calc(1.375rem + 1.5vw)",fixed:"2.5rem"},2:{fluid:"calc(1.325rem + 0.9vw)",fixed:"2rem"},3:{fluid:"calc(1.3rem + 0.6vw)",fixed:"1.75rem"},4:{fluid:"calc(1.275rem + 0.3vw)",fixed:"1.5rem"},5:{fluid:"1.25rem",fixed:"1.25rem"},6:{fluid:"1rem",fixed:"1rem"}},f=(e,i)=>e===i?m`
        font-size: ${i};
      `:m`
        font-size: ${e};
        @media (min-width: 1200px) {
          font-size: ${i};
        }
      `,$=t.h1`
  font-weight: 300;
  line-height: 1.2;
  ${e=>f(c[e.$size].fluid,c[e.$size].fixed)}
`,h=a.forwardRef(({size:e=1,as:i,...o},s)=>n.jsx($,{as:i??`h${e}`,ref:s,$size:e,...o}));h.displayName="Display";const S=t.p`
  font-size: 1.25rem;
  font-weight: 300;
`,u=t.h1`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--bs-heading-color, inherit);
  ${e=>f(d[e.$size].fluid,d[e.$size].fixed)}
`,x=a.forwardRef(({size:e,as:i,...o},s)=>{const l=typeof i=="string"&&/^h[1-6]$/.test(i)?Number(i[1]):1,r=e??l;return n.jsx(u,{as:i??`h${r}`,ref:s,$size:r,...o})});x.displayName="Heading";const w={light:300,normal:400,medium:500,semibold:600,bold:700},b=t.span`
  ${e=>e.$small&&"font-size: 0.875em;"}
  ${e=>e.$weight&&`font-weight: ${w[e.$weight]};`}
  ${e=>e.$italic&&"font-style: italic;"}
  ${e=>e.$muted&&"color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));"}
`,y=a.forwardRef(({small:e,weight:i,italic:o,muted:s,as:l,...r},g)=>n.jsx(b,{as:l,ref:g,$small:e,$weight:i,$italic:o,$muted:s,...r}));y.displayName="Text";const k=t.small`
  font-size: 0.875em;
`,L=t.mark`
  padding: 0.1875em;
  color: var(--bs-highlight-color, #212529);
  background-color: var(--bs-highlight-bg, #fff3cd);
`,R=t.blockquote`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  & > :last-child {
    margin-bottom: 0;
  }
`,j=t.footer`
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.875em;
  color: #6c757d;
  &::before {
    content: '\\2014\\00A0'; /* em dash + nbsp */
  }
`,p=t.ul`
  ${e=>(e.$unstyled||e.$inline)&&m`
      padding-left: 0;
      list-style: none;
    `}
`,v=a.forwardRef(({unstyled:e,inline:i,as:o,...s},l)=>n.jsx(p,{as:o,ref:l,$unstyled:e,$inline:i,...s}));v.displayName="List";const D=t.li`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;export{R as B,h as D,x as H,S as L,L as M,k as S,y as T,v as a,D as b,j as c};
