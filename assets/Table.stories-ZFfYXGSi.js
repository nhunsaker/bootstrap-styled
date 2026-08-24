import{R as $,j as e,f as o,g as l}from"./index-C-CN3z2J.js";const a="var(--bs-emphasis-color-rgb, 0, 0, 0)",u=o`
  --bs-table-color-type: initial;
  --bs-table-bg-type: initial;
  --bs-table-color-state: initial;
  --bs-table-bg-state: initial;
  --bs-table-color: var(--bs-emphasis-color, #000);
  --bs-table-bg: var(--bs-body-bg, #fff);
  --bs-table-border-color: var(--bs-border-color, #dee2e6);
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: var(--bs-emphasis-color, #000);
  --bs-table-striped-bg: rgba(${a}, 0.05);
  --bs-table-active-color: var(--bs-emphasis-color, #000);
  --bs-table-active-bg: rgba(${a}, 0.1);
  --bs-table-hover-color: var(--bs-emphasis-color, #000);
  --bs-table-hover-bg: rgba(${a}, 0.075);
`,d={primary:{color:"#000",bg:"#cfe2ff",border:"#a6b5cc",striped:"#c5d7f2",active:"#bacbe6",hover:"#bfd1ec"},secondary:{color:"#000",bg:"#e2e3e5",border:"#b5b6b7",striped:"#d7d8da",active:"#cbccce",hover:"#d1d2d4"},success:{color:"#000",bg:"#d1e7dd",border:"#a7b9b1",striped:"#c7dbd2",active:"#bcd0c7",hover:"#c1d6cc"},danger:{color:"#000",bg:"#f8d7da",border:"#c6acae",striped:"#eccccf",active:"#dfc2c4",hover:"#e5c7ca"},warning:{color:"#000",bg:"#fff3cd",border:"#ccc2a4",striped:"#f2e7c3",active:"#e6dbb9",hover:"#ece1be"},info:{color:"#000",bg:"#cff4fc",border:"#a6c3ca",striped:"#c5e8ef",active:"#badce3",hover:"#bfe2e9"},light:{color:"#000",bg:"#f8f9fa",border:"#c6c7c8",striped:"#ecedee",active:"#dfe0e1",hover:"#e5e6e7"},dark:{color:"#fff",bg:"#212529",border:"#4d5154",striped:"#2c3034",active:"#373b3e",hover:"#323539"}},i=r=>`
  --bs-table-color: ${r.color};
  --bs-table-bg: ${r.bg};
  --bs-table-border-color: ${r.border};
  --bs-table-striped-bg: ${r.striped};
  --bs-table-striped-color: ${r.color};
  --bs-table-active-bg: ${r.active};
  --bs-table-active-color: ${r.color};
  --bs-table-hover-bg: ${r.hover};
  --bs-table-hover-color: ${r.color};
  color: var(--bs-table-color);
  border-color: var(--bs-table-border-color);
`,w=o`
  ${Object.keys(d).map(r=>o`
      & .table-${r} {
        ${i(d[r])}
      }
    `)}
  & .table-active {
    --bs-table-color-state: var(--bs-table-active-color);
    --bs-table-bg-state: var(--bs-table-active-bg);
  }
`,y={sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},C=l.table`
  ${u}
  ${r=>r.$variant?i(d[r.$variant]):""}
  width: 100%;
  margin-bottom: 1rem;
  vertical-align: top;
  border-color: var(--bs-table-border-color);
  caption-side: bottom;
  border-collapse: collapse;

  /* Cell baseline (mirrors Reboot so borders render Provider-less too). */
  & > :not(caption) > * > * {
    padding: ${r=>r.$sm?"0.25rem 0.25rem":"0.5rem 0.5rem"};
    color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
    background-color: var(--bs-table-bg);
    border-color: inherit;
    border-style: solid;
    border-width: 0;
    border-bottom-width: var(--bs-border-width, 1px);
    box-shadow: inset 0 0 0 9999px
      var(--bs-table-bg-state, var(--bs-table-bg-type, var(--bs-table-accent-bg)));
  }

  & > tbody, & > tfoot, & > thead, & > tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  & caption {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));
    text-align: left;
  }
  & .caption-top {
    caption-side: top;
  }

  & .table-group-divider {
    border-top: calc(var(--bs-border-width, 1px) * 2) solid currentColor;
  }

  ${r=>r.$striped&&o`
      & > tbody > tr:nth-of-type(odd) > * {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
      }
    `}

  ${r=>r.$stripedColumns&&o`
      & > :not(caption) > tr > :nth-child(2n) {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
      }
    `}

  ${r=>r.$hover&&o`
      & > tbody > tr:hover > * {
        --bs-table-color-state: var(--bs-table-hover-color);
        --bs-table-bg-state: var(--bs-table-hover-bg);
      }
    `}

  ${r=>r.$bordered&&o`
      & > :not(caption) > * {
        border-width: var(--bs-border-width, 1px) 0;
      }
      & > :not(caption) > * > * {
        border-width: 0 var(--bs-border-width, 1px);
      }
    `}

  ${r=>r.$borderless&&o`
      & > :not(caption) > * > * {
        border-bottom-width: 0;
      }
      & > :not(caption):not(:first-child) {
        border-top-width: 0;
      }
    `}

  ${w}
`,R=l.div`
  ${r=>r.$bp?o`
          @media (max-width: ${y[r.$bp]}) {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        `:o`
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        `}
`,t=$.forwardRef(({striped:r,stripedColumns:n,hover:h,bordered:p,borderless:v,size:x,variant:j,responsive:b,as:g,...f},m)=>{const c=e.jsx(C,{as:g,ref:m,$striped:r,$stripedColumns:n,$hover:h,$bordered:p,$borderless:v,$sm:x==="sm",$variant:j,...f});return b?e.jsx(R,{$bp:typeof b=="string"?b:void 0,children:c}):c});t.displayName="Table";const B={title:"Content/Table"},T=["primary","secondary","success","danger","warning","info","light","dark"],s=()=>e.jsxs(e.Fragment,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"#"}),e.jsx("th",{scope:"col",children:"First"}),e.jsx("th",{scope:"col",children:"Last"}),e.jsx("th",{scope:"col",children:"Handle"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("th",{scope:"row",children:"1"}),e.jsx("td",{children:"Mark"}),e.jsx("td",{children:"Otto"}),e.jsx("td",{children:"@mdo"})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",children:"2"}),e.jsx("td",{children:"Jacob"}),e.jsx("td",{children:"Thornton"}),e.jsx("td",{children:"@fat"})]}),e.jsxs("tr",{children:[e.jsx("th",{scope:"row",children:"3"}),e.jsx("td",{children:"Larry"}),e.jsx("td",{children:"the Bird"}),e.jsx("td",{children:"@twitter"})]})]})]}),E=()=>e.jsx(t,{children:e.jsx(s,{})}),S=()=>e.jsx(t,{striped:!0,children:e.jsx(s,{})}),N=()=>e.jsx(t,{stripedColumns:!0,children:e.jsx(s,{})}),O=()=>e.jsx(t,{hover:!0,children:e.jsx(s,{})}),L=()=>e.jsx(t,{bordered:!0,children:e.jsx(s,{})}),P=()=>e.jsx(t,{borderless:!0,children:e.jsx(s,{})}),V=()=>e.jsx(t,{size:"sm",children:e.jsx(s,{})}),A=()=>e.jsx(t,{children:e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsx("td",{children:"Default"})}),T.map(r=>e.jsx("tr",{className:`table-${r}`,children:e.jsxs("td",{children:["Table ",r]})},r)),e.jsx("tr",{className:"table-active",children:e.jsx("td",{children:"Active"})})]})}),D=()=>e.jsx(t,{variant:"dark",striped:!0,hover:!0,children:e.jsx(s,{})}),H=()=>e.jsxs(t,{children:[e.jsx("thead",{children:e.jsx("tr",{children:e.jsx("th",{scope:"col",children:"Col"})})}),e.jsx("tbody",{className:"table-group-divider",children:e.jsx("tr",{children:e.jsx("td",{children:"Divided body"})})})]}),_=()=>e.jsxs(t,{children:[e.jsx("caption",{children:"List of users"}),e.jsx(s,{})]}),F=()=>e.jsx(t,{responsive:!0,children:e.jsx(s,{})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{E as Basic,L as Bordered,P as Borderless,A as Contextual,H as GroupDivider,O as Hover,F as Responsive,V as Small,S as Striped,N as StripedColumns,D as VariantTable,_ as WithCaption,B as default};
