import{R as b,j as l,g as a}from"./index-B90HX0O5.js";const n=o=>o==="sm"?"0.25rem 0.5rem":o==="lg"?"0.5rem 1rem":"0.375rem 0.75rem",d=o=>o==="sm"?"0.875rem":o==="lg"?"1.25rem":"1rem",c=(o,s)=>{const r=o?"var(--bs-danger)":s?"var(--bs-success)":null;return r?`
    border-color: ${r};
    &:focus {
      border-color: ${r};
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, ${r} 25%, transparent);
    }
  `:""},t=a.input`
  display: block;
  width: 100%;
  padding: ${o=>n(o.$size)};
  font-size: ${o=>d(o.$size)};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: 1px solid var(--bs-border-color);
  border-radius: ${o=>o.$size==="sm"?"var(--bs-border-radius-sm)":o.$size==="lg"?"var(--bs-border-radius-lg)":"var(--bs-border-radius)"};
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: var(--bs-secondary);
    opacity: 1;
  }
  &:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: color-mix(in srgb, var(--bs-primary) 50%, var(--bs-border-color));
    outline: 0;
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent);
  }
  &:disabled {
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
    opacity: 1;
    cursor: not-allowed;
  }

  ${o=>c(o.$invalid,o.$valid)}
`,m=b.forwardRef(({size:o,isInvalid:s,isValid:r,...e},i)=>l.jsx(t,{ref:i,$size:o,$invalid:s,$valid:r,...e}));m.displayName="FormControl";const v=a.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--bs-body-color);
`,p=a.small`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary);
`,u=a.div`
  margin-bottom: 1rem;
`;export{u as F,v as a,m as b,p as c};
