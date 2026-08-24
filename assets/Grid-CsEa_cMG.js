import{R as k,j as O,g as T}from"./index-C-CN3z2J.js";const r=[["sm",576],["md",768],["lg",992],["xl",1200],["xxl",1400]],W={1:"8.33333333%",2:"16.66666667%",3:"25%",4:"33.33333333%",5:"41.66666667%",6:"50%",7:"58.33333333%",8:"66.66666667%",9:"75%",10:"83.33333333%",11:"91.66666667%",12:"100%"},X={1:"100%",2:"50%",3:"33.33333333%",4:"25%",5:"20%",6:"16.66666667%"},q={0:"0",1:"0.25rem",2:"0.5rem",3:"1rem",4:"1.5rem",5:"3rem"},B=t=>r.find(([s])=>s===t)[1],a=(t,s)=>s?`@media (min-width: ${B(t)}px) { ${s} }`:"",D=[["sm",576,540],["md",768,720],["lg",992,960],["xl",1200,1140],["xxl",1400,1320]],F=(t,s)=>{if(t)return"";const n=B(s??"sm");return D.filter(([,o])=>o>=n).map(([,o,e])=>`@media (min-width: ${o}px) { max-width: ${e}px; }`).join(`
`)},H=T.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
  ${t=>F(t.$fluid,t.$breakpoint)}
`,J=k.forwardRef(({fluid:t,breakpoint:s,...n},o)=>O.jsx(H,{ref:o,$fluid:t,$breakpoint:s,...n}));J.displayName="Container";const A=t=>t===void 0?"":t==="auto"?"&& > * { flex: 0 0 auto; width: auto; }":`&& > * { flex: 0 0 auto; width: ${X[t]}; }`,v=t=>t===void 0?"":`--bs-gutter-x: ${q[t]};`,N=t=>t===void 0?"":`--bs-gutter-y: ${q[t]};`,S=t=>t===void 0?"":v(t)+N(t),Q=T.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));

  /* --- gutters (custom props inherit to child cols) --- */
  ${t=>S(t.$g.xs)}
  ${t=>v(t.$gx.xs)}
  ${t=>N(t.$gy.xs)}
  ${t=>r.map(([s])=>a(s,S(t.$g[s]))).join(`
`)}
  ${t=>r.map(([s])=>a(s,v(t.$gx[s]))).join(`
`)}
  ${t=>r.map(([s])=>a(s,N(t.$gy[s]))).join(`
`)}

  /* --- row-cols --- */
  ${t=>A(t.$cols.xs)}
  ${t=>r.map(([s])=>a(s,A(t.$cols[s]))).join(`
`)}
`,V=k.forwardRef(({cols:t,colsSm:s,colsMd:n,colsLg:o,colsXl:e,colsXxl:i,g:l,gSm:x,gMd:d,gLg:c,gXl:m,gXxl:g,gx:$,gxSm:f,gxMd:u,gxLg:p,gxXl:h,gxXxl:w,gy:C,gySm:y,gyMd:b,gyLg:R,gyXl:j,gyXxl:I,...L},M)=>{const z={xs:t,sm:s,md:n,lg:o,xl:e,xxl:i},G={xs:l,sm:x,md:d,lg:c,xl:m,xxl:g},K={xs:$,sm:f,md:u,lg:p,xl:h,xxl:w},U={xs:C,sm:y,md:b,lg:R,xl:j,xxl:I};return O.jsx(Q,{ref:M,$cols:z,$g:G,$gx:K,$gy:U,...L})});V.displayName="Row";const E=t=>t===void 0||t===!1?"":t===!0?"flex: 1 0 0%;":t==="auto"?"flex: 0 0 auto; width: auto;":`flex: 0 0 auto; width: ${W[t]};`,_=t=>t===void 0?"":`margin-left: ${t===0?"0":W[t]};`,P=t=>t===void 0?"":`order: ${t==="first"?-1:t==="last"?6:t} !important;`,Y=T.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);

  /* Base flex. A bare Col (no span at any breakpoint) is an equal-width
     col (flex: 1 0 0). A responsive-only col (e.g. md=6) has NO base col
     rule -- it stacks full-width (width:100% above) until its breakpoint. */
  ${t=>t.$span.xs!==void 0?E(t.$span.xs):r.some(([s])=>t.$span[s]!==void 0)?"":"flex: 1 0 0%;"}
  ${t=>_(t.$offset.xs)}
  ${t=>P(t.$order.xs)}

  ${t=>r.map(([s])=>a(s,E(t.$span[s]))).join(`
`)}
  ${t=>r.map(([s])=>a(s,_(t.$offset[s]))).join(`
`)}
  ${t=>r.map(([s])=>a(s,P(t.$order[s]))).join(`
`)}
`,Z=k.forwardRef(({span:t,sm:s,md:n,lg:o,xl:e,xxl:i,offset:l,offsetSm:x,offsetMd:d,offsetLg:c,offsetXl:m,offsetXxl:g,order:$,orderSm:f,orderMd:u,orderLg:p,orderXl:h,orderXxl:w,...C},y)=>{const b={xs:t,sm:s,md:n,lg:o,xl:e,xxl:i},R={xs:l,sm:x,md:d,lg:c,xl:m,xxl:g},j={xs:$,sm:f,md:u,lg:p,xl:h,xxl:w};return O.jsx(Y,{ref:y,$span:b,$offset:R,$order:j,...C})});Z.displayName="Col";export{J as C,V as R,Z as a};
