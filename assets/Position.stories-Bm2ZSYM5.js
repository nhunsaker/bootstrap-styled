import{R as l,j as o,f as i,g as r}from"./index-DiIymZMJ.js";import{c as n}from"./cx-2dOUpm6k.js";const g={sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},h=r.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
`,k=r.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
`,w=l.forwardRef(({className:t,...e},s)=>o.jsx(h,{ref:s,className:n("fixed-top",t),...e}));w.displayName="FixedTop";const j=l.forwardRef(({className:t,...e},s)=>o.jsx(k,{ref:s,className:n("fixed-bottom",t),...e}));j.displayName="FixedBottom";const p=t=>i`
  position: -webkit-sticky;
  position: sticky;
  ${t}: 0;
  z-index: 1020;
`,x=r.div`
  ${t=>t.$bp?i`
          @media (min-width: ${g[t.$bp]}) {
            ${p(t.$edge)}
          }
        `:p(t.$edge)}
`,f=l.forwardRef(({breakpoint:t,className:e,...s},d)=>o.jsx(x,{ref:d,$edge:"top",$bp:t??null,className:n(t?`sticky-${t}-top`:"sticky-top",e),...s}));f.displayName="StickyTop";const S=l.forwardRef(({breakpoint:t,className:e,...s},d)=>o.jsx(x,{ref:d,$edge:"bottom",$bp:t??null,className:n(t?`sticky-${t}-bottom`:"sticky-bottom",e),...s}));S.displayName="StickyBottom";const a={0:"0",50:"50%",100:"100%"},N=r.div`
  ${t=>t.$absolute&&i`
    position: absolute !important;
  `}
  ${t=>t.$top!=null&&i`top: ${a[t.$top]} !important;`}
  ${t=>t.$start!=null&&i`left: ${a[t.$start]} !important;`}
  ${t=>t.$bottom!=null&&i`bottom: ${a[t.$bottom]} !important;`}
  ${t=>t.$end!=null&&i`right: ${a[t.$end]} !important;`}
  transform: ${t=>t.$axis==="x"?"translateX(-50%)":t.$axis==="y"?"translateY(-50%)":"translate(-50%, -50%)"} !important;
`,$=l.forwardRef(({axis:t="both",absolute:e=!1,top:s,start:d,bottom:c,end:m,className:u,...y},b)=>o.jsx(N,{ref:b,$axis:t,$absolute:e,$top:s??null,$start:d??null,$bottom:c??null,$end:m??null,className:n(t==="x"?"translate-middle-x":t==="y"?"translate-middle-y":"translate-middle",e&&"position-absolute",s!=null&&`top-${s}`,d!=null&&`start-${d}`,c!=null&&`bottom-${c}`,m!=null&&`end-${m}`,u),...y}));$.displayName="TranslateMiddle";const T={title:"Helpers/Position"},B=()=>o.jsxs("div",{style:{height:200,overflow:"auto",border:"1px solid #dee2e6"},children:[o.jsx(f,{style:{background:"#0d6efd",color:"#fff",padding:"0.5rem"},children:".sticky-top header"}),o.jsx("div",{style:{padding:"0.5rem"},children:Array.from({length:20},(t,e)=>o.jsxs("p",{children:["Scroll content line ",e+1]},e))})]}),E=()=>o.jsxs("div",{style:{position:"relative",width:200,height:120,background:"#e9ecef",borderRadius:"0.375rem"},children:[o.jsx($,{absolute:!0,top:0,start:100,style:{background:"#dc3545",color:"#fff",borderRadius:"999px",padding:"0.25rem 0.5rem",fontSize:"0.75rem"},children:"99+"}),o.jsx($,{absolute:!0,top:50,start:50,style:{background:"#0d6efd",color:"#fff",borderRadius:"0.375rem",padding:"0.5rem"},children:"centered"})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{E as AbsoluteCentering,B as Sticky,T as default};
