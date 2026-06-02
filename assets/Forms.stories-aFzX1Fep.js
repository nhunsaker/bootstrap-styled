import{R as b,j as e,g as t}from"./index-BgozbNnj.js";import{S as a}from"./Stack-ZuLfbdgE.js";import{b as o,F as n,a as d,c as u}from"./FormParts-Cxf7I8gu.js";import{B as g}from"./Button-BTfMZ3H7.js";const j=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,w=t.select`
  display: block;
  width: 100%;
  padding: ${r=>r.$size==="sm"?"0.25rem 2rem 0.25rem 0.5rem":r.$size==="lg"?"0.5rem 2.25rem 0.5rem 1rem":"0.375rem 2.25rem 0.375rem 0.75rem"};
  font-size: ${r=>r.$size==="sm"?"0.875rem":r.$size==="lg"?"1.25rem":"1rem"};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-image: ${j};
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
  ${r=>r.$invalid?"border-color: var(--bs-danger);":r.$valid?"border-color: var(--bs-success);":""}
`,x=b.forwardRef(({size:r,isInvalid:i,isValid:l,...c},m)=>e.jsx(w,{ref:m,$size:r,$invalid:i,$valid:l,...c}));x.displayName="FormSelect";const f=t.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  min-height: 1.5rem;
`,v=t.input`
  margin: 0;
  cursor: pointer;
  ${r=>r.$switch?`
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
`,y=t.label`
  cursor: pointer;
  user-select: none;
`,s=b.forwardRef(({type:r="checkbox",label:i,id:l,...c},m)=>{const h=r==="switch";return e.jsxs(f,{children:[e.jsx(v,{ref:m,id:l,type:h?"checkbox":r,role:h?"switch":void 0,$switch:h,...c}),i!=null&&e.jsx(y,{htmlFor:l,children:i})]})});s.displayName="FormCheck";const p=t.div`
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
`,k=t.span`
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
`,z={title:"Forms/FormControl"},R=()=>e.jsxs(a,{gap:3,style:{maxWidth:480},children:[e.jsxs(n,{children:[e.jsx(d,{children:"Email address"}),e.jsx(o,{type:"email",placeholder:"name@example.com"}),e.jsx(u,{children:"We'll never share your email with anyone else."})]}),e.jsxs(n,{children:[e.jsx(d,{children:"Password"}),e.jsx(o,{type:"password",placeholder:"Password"})]}),e.jsxs(n,{children:[e.jsx(d,{children:"Textarea"}),e.jsx(o,{as:"textarea",rows:3,placeholder:"Message..."})]})]}),I=()=>e.jsxs(a,{gap:2,style:{maxWidth:480},children:[e.jsx(o,{placeholder:"Valid input",isValid:!0}),e.jsx(o,{placeholder:"Invalid input",isInvalid:!0})]}),W=()=>e.jsxs(a,{gap:2,style:{maxWidth:480},children:[e.jsx(o,{size:"sm",placeholder:"Small"}),e.jsx(o,{placeholder:"Default"}),e.jsx(o,{size:"lg",placeholder:"Large"})]}),E=()=>e.jsx(a,{gap:2,style:{maxWidth:480},children:e.jsxs(n,{children:[e.jsx(d,{children:"Select plan"}),e.jsxs(x,{children:[e.jsx("option",{value:"",disabled:!0,children:"Choose..."}),e.jsx("option",{children:"Free"}),e.jsx("option",{children:"Team"}),e.jsx("option",{children:"Enterprise"})]})]})}),G=()=>e.jsxs(a,{gap:2,children:[e.jsx(s,{id:"cb1",label:"Checkbox (checked)",defaultChecked:!0}),e.jsx(s,{id:"cb2",label:"Checkbox"}),e.jsx(s,{id:"r1",type:"radio",name:"group",label:"Radio option A",defaultChecked:!0}),e.jsx(s,{id:"r2",type:"radio",name:"group",label:"Radio option B"}),e.jsx(s,{id:"sw1",type:"switch",label:"Switch (on)",defaultChecked:!0}),e.jsx(s,{id:"sw2",type:"switch",label:"Switch (off)"})]}),T=()=>e.jsxs(a,{gap:2,style:{maxWidth:480},children:[e.jsxs(p,{children:[e.jsx(k,{children:"@"}),e.jsx(o,{placeholder:"Username"})]}),e.jsxs(p,{children:[e.jsx(o,{placeholder:"Search..."}),e.jsx(g,{variant:"primary",children:"Go"})]})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{G as Checks,T as InputGroups,R as Inputs,E as Select,W as Sizes,I as Validation,z as default};
