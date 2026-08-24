import{g as t,R as i,j as m}from"./index-C-CN3z2J.js";const w=t.label`
  margin-bottom: 0.5rem;
`,y=t.small`
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
`,F=t.div`
  margin-bottom: 1rem;
`,n={0:"0",1:"0.25rem",2:"0.5rem",3:"1rem",4:"1.5rem",5:"3rem"},g={1:"8.33333333%",2:"16.66666667%",3:"25%",4:"33.33333333%",5:"41.66666667%",6:"50%",7:"58.33333333%",8:"66.66666667%",9:"75%",10:"83.33333333%",11:"91.66666667%",12:"100%"},c={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline",stretch:"stretch"},b=t.div`
  --bs-gutter-x: ${r=>r.$gx!==void 0?n[r.$gx]:"1.5rem"};
  --bs-gutter-y: ${r=>r.$gy!==void 0?n[r.$gy]:"0"};
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  ${r=>r.$align?`align-items: ${c[r.$align]};`:""}
`,x=i.forwardRef(({gx:r,gy:e,align:a,...o},d)=>m.jsx(b,{ref:d,$gx:r,$gy:e,$align:a,...o}));x.displayName="FormRow";const s=r=>r===void 0?"":r===!0?"flex: 1 0 0%;":r==="auto"?"flex: 0 0 auto; width: auto;":`flex: 0 0 auto; width: ${g[r]};`,$=t.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  margin-top: var(--bs-gutter-y, 0);
  ${r=>r.$span!==void 0?s(r.$span):r.$sm!==void 0?"":"flex: 1 0 0%;"}
  ${r=>r.$sm!==void 0?`@media (min-width: 576px) { ${s(r.$sm)} }`:""}
`,f=i.forwardRef(({span:r,sm:e,...a},o)=>m.jsx($,{ref:o,$span:r,$sm:e,...a}));f.displayName="FormCol";const l=r=>r==="lg"?"0.5rem":r==="sm"?"0.25rem":"0.375rem",p=r=>r==="lg"?"1.25rem":r==="sm"?"0.875rem":"inherit",u=t.label`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-left: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  padding-top: calc(${r=>l(r.$size)} + var(--bs-border-width, 1px));
  padding-bottom: calc(${r=>l(r.$size)} + var(--bs-border-width, 1px));
  margin-top: var(--bs-gutter-y, 0);
  margin-bottom: 0;
  font-size: ${r=>p(r.$size)};
  line-height: 1.5;
  ${r=>r.$sm!==void 0?`@media (min-width: 576px) { ${s(r.$sm)} }`:""}
`,h=i.forwardRef(({size:r,sm:e,...a},o)=>m.jsx(u,{ref:o,$size:r,$sm:e,...a}));h.displayName="ColFormLabel";export{h as C,w as F,y as a,x as b,f as c,F as d};
