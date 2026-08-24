import{R as o,j as r,g as c}from"./index-C-CN3z2J.js";const n=c.div`
  display: flex;
  flex-direction: ${t=>t.$direction==="horizontal"?"row":"column"};
  ${t=>t.$direction==="horizontal"?"align-items: center;":"justify-content: flex-start;"}
  gap: ${t=>t.theme.spacing[t.$gap]};
`,s=o.forwardRef(({direction:t="vertical",gap:a=0,...e},i)=>r.jsx(n,{ref:i,$direction:t,$gap:a,...e}));s.displayName="Stack";export{s as S};
