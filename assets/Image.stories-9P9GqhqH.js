import{R as m,j as t,f as r,g as u}from"./index-DiIymZMJ.js";const l=u.img`
  ${e=>e.$fluid&&r`
      max-width: 100%;
      height: auto;
    `}
  ${e=>e.$thumbnail&&r`
      padding: 0.25rem;
      background-color: var(--bs-body-bg, #fff);
      border: var(--bs-border-width, 1px) solid var(--bs-border-color, #dee2e6);
      border-radius: var(--bs-border-radius, 0.375rem);
      max-width: 100%;
      height: auto;
    `}
  ${e=>e.$rounded&&r`
      border-radius: var(--bs-border-radius, 0.375rem);
    `}
`,d=m.forwardRef(({fluid:e,thumbnail:a,rounded:s,...i},n)=>t.jsx(l,{ref:n,$fluid:e,$thumbnail:a,$rounded:s,...i}));d.displayName="Image";const f={title:"Content/Image"},o="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#6c757d"/><text x="120" y="85" font-size="20" fill="#fff" text-anchor="middle">240x160</text></svg>'),b=()=>t.jsx(d,{fluid:!0,src:o,alt:"fluid example"}),g=()=>t.jsx(d,{thumbnail:!0,src:o,alt:"thumbnail example"}),h=()=>t.jsx(d,{rounded:!0,src:o,alt:"rounded example"});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{b as Fluid,h as Rounded,g as Thumbnail,f as default};
