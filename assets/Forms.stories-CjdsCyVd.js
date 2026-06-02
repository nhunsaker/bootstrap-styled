import{R as p,j as r,g as a}from"./index-li0gu6VY.js";import{S as l}from"./Stack-CQwNN2C-.js";import{B as u}from"./Button-Bd4VQrw5.js";const g=e=>e==="sm"?"0.25rem 0.5rem":e==="lg"?"0.5rem 1rem":"0.375rem 0.75rem",v=e=>e==="sm"?"0.875rem":e==="lg"?"1.25rem":"1rem",f=(e,i)=>{const o=e?"var(--bs-danger)":i?"var(--bs-success)":null;return o?`
    border-color: ${o};
    &:focus {
      border-color: ${o};
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, ${o} 25%, transparent);
    }
  `:""},w=a.input`
  display: block;
  width: 100%;
  padding: ${e=>g(e.$size)};
  font-size: ${e=>v(e.$size)};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: 1px solid var(--bs-border-color);
  border-radius: ${e=>e.$size==="sm"?"var(--bs-border-radius-sm)":e.$size==="lg"?"var(--bs-border-radius-lg)":"var(--bs-border-radius)"};
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

  ${e=>f(e.$invalid,e.$valid)}
`,s=p.forwardRef(({size:e,isInvalid:i,isValid:o,...n},d)=>r.jsx(w,{ref:d,$size:e,$invalid:i,$valid:o,...n}));s.displayName="FormControl";const y=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,j=a.select`
  display: block;
  width: 100%;
  padding: ${e=>e.$size==="sm"?"0.25rem 2rem 0.25rem 0.5rem":e.$size==="lg"?"0.5rem 2.25rem 0.5rem 1rem":"0.375rem 2.25rem 0.375rem 0.75rem"};
  font-size: ${e=>e.$size==="sm"?"0.875rem":e.$size==="lg"?"1.25rem":"1rem"};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-image: ${y};
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: color-mix(in srgb, var(--bs-primary) 50%, var(--bs-border-color));
    outline: 0;
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent);
  }
  &:disabled {
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
    cursor: not-allowed;
  }
  ${e=>e.$invalid?"border-color: var(--bs-danger);":e.$valid?"border-color: var(--bs-success);":""}
`,x=p.forwardRef(({size:e,isInvalid:i,isValid:o,...n},d)=>r.jsx(j,{ref:d,$size:e,$invalid:i,$valid:o,...n}));x.displayName="FormSelect";const k=a.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  min-height: 1.5rem;
`,$=a.input`
  margin: 0;
  cursor: pointer;
  ${e=>e.$switch?`
    appearance: none;
    width: 2em;
    height: 1em;
    border-radius: 1em;
    background-color: var(--bs-border-color);
    position: relative;
    transition: background-color 0.15s ease-in-out;
    &::before {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      width: calc(1em - 2px);
      height: calc(1em - 2px);
      border-radius: 50%;
      background: #fff;
      transition: transform 0.15s ease-in-out;
    }
    &:checked { background-color: var(--bs-primary); }
    &:checked::before { transform: translateX(1em); }
    &:focus-visible { outline: 0; box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent); }
  `:`
    width: 1em;
    height: 1em;
    accent-color: var(--bs-primary);
  `}
`,z=a.label`
  cursor: pointer;
  user-select: none;
`,t=p.forwardRef(({type:e="checkbox",label:i,id:o,...n},d)=>{const m=e==="switch";return r.jsxs(k,{children:[r.jsx($,{ref:d,id:o,type:m?"checkbox":e,role:m?"switch":void 0,$switch:m,...n}),i!=null&&r.jsx(z,{htmlFor:o,children:i})]})});t.displayName="FormCheck";const c=a.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--bs-body-color);
`,C=a.small`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-secondary);
`,b=a.div`
  margin-bottom: 1rem;
`,h=a.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  & > input,
  & > select,
  & > textarea {
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }

  & > :not(:first-child) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`,S=a.span`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
`,W={title:"Forms/FormControl"},E=()=>r.jsxs(l,{gap:3,style:{maxWidth:480},children:[r.jsxs(b,{children:[r.jsx(c,{children:"Email address"}),r.jsx(s,{type:"email",placeholder:"name@example.com"}),r.jsx(C,{children:"We'll never share your email with anyone else."})]}),r.jsxs(b,{children:[r.jsx(c,{children:"Password"}),r.jsx(s,{type:"password",placeholder:"Password"})]}),r.jsxs(b,{children:[r.jsx(c,{children:"Textarea"}),r.jsx(s,{as:"textarea",rows:3,placeholder:"Message..."})]})]}),G=()=>r.jsxs(l,{gap:2,style:{maxWidth:480},children:[r.jsx(s,{placeholder:"Valid input",isValid:!0}),r.jsx(s,{placeholder:"Invalid input",isInvalid:!0})]}),T=()=>r.jsxs(l,{gap:2,style:{maxWidth:480},children:[r.jsx(s,{size:"sm",placeholder:"Small"}),r.jsx(s,{placeholder:"Default"}),r.jsx(s,{size:"lg",placeholder:"Large"})]}),B=()=>r.jsx(l,{gap:2,style:{maxWidth:480},children:r.jsxs(b,{children:[r.jsx(c,{children:"Select plan"}),r.jsxs(x,{children:[r.jsx("option",{value:"",disabled:!0,children:"Choose..."}),r.jsx("option",{children:"Free"}),r.jsx("option",{children:"Team"}),r.jsx("option",{children:"Enterprise"})]})]})}),A=()=>r.jsxs(l,{gap:2,children:[r.jsx(t,{id:"cb1",label:"Checkbox (checked)",defaultChecked:!0}),r.jsx(t,{id:"cb2",label:"Checkbox"}),r.jsx(t,{id:"r1",type:"radio",name:"group",label:"Radio option A",defaultChecked:!0}),r.jsx(t,{id:"r2",type:"radio",name:"group",label:"Radio option B"}),r.jsx(t,{id:"sw1",type:"switch",label:"Switch (on)",defaultChecked:!0}),r.jsx(t,{id:"sw2",type:"switch",label:"Switch (off)"})]}),L=()=>r.jsxs(l,{gap:2,style:{maxWidth:480},children:[r.jsxs(h,{children:[r.jsx(S,{children:"@"}),r.jsx(s,{placeholder:"Username"})]}),r.jsxs(h,{children:[r.jsx(s,{placeholder:"Search..."}),r.jsx(u,{variant:"primary",children:"Go"})]})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{A as Checks,L as InputGroups,E as Inputs,B as Select,T as Sizes,G as Validation,W as default};
