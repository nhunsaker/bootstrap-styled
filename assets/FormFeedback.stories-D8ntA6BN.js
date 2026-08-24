import{R as c,j as i,g as d}from"./index-C-CN3z2J.js";import{F as e}from"./FormControl-DB9uZz0K.js";import{F as s}from"./FormParts-DRmwkk6a.js";const m="var(--bs-form-valid-color, #198754)",v="var(--bs-form-invalid-color, #dc3545)",p=d.div.attrs({className:"valid-feedback"})`
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: ${m};

  .is-valid ~ &,
  .was-validated :valid ~ & {
    display: block;
  }
`,u=d.div.attrs({className:"invalid-feedback"})`
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: ${v};

  .is-invalid ~ &,
  .was-validated :invalid ~ & {
    display: block;
  }
`,x=d.div.attrs({className:"valid-tooltip"})`
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: var(--bs-success);
  border-radius: var(--bs-border-radius);

  .is-valid ~ &,
  .was-validated :valid ~ & {
    display: block;
  }
`,f=d.div.attrs({className:"invalid-tooltip"})`
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: var(--bs-danger);
  border-radius: var(--bs-border-radius);

  .is-invalid ~ &,
  .was-validated :invalid ~ & {
    display: block;
  }
`,a=c.forwardRef(({type:o="invalid",tooltip:l=!1,...t},r)=>{const n=o==="valid"?l?x:p:l?f:u;return i.jsx(n,{ref:r,...t})});a.displayName="FormFeedback";const j={title:"Forms/Validation Feedback"},k=()=>i.jsxs("div",{style:{maxWidth:480},children:[i.jsx(s,{children:"Username"}),i.jsx(e,{isInvalid:!0,className:"is-invalid",defaultValue:"nope"}),i.jsx(a,{type:"invalid",children:"Please choose a valid username."})]}),g=()=>i.jsxs("div",{style:{maxWidth:480},children:[i.jsx(s,{children:"Username"}),i.jsx(e,{isValid:!0,className:"is-valid",defaultValue:"taken@ok"}),i.jsx(a,{type:"valid",children:"Looks good!"})]}),w=()=>i.jsxs("div",{style:{maxWidth:480,display:"grid",gap:"2.5rem"},children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx(e,{isInvalid:!0,className:"is-invalid",defaultValue:"bad"}),i.jsx(a,{type:"invalid",tooltip:!0,children:"Looks like there is a problem."})]}),i.jsxs("div",{style:{position:"relative"},children:[i.jsx(e,{isValid:!0,className:"is-valid",defaultValue:"good"}),i.jsx(a,{type:"valid",tooltip:!0,children:"Looks good!"})]})]}),V=()=>i.jsxs("form",{className:"was-validated",style:{maxWidth:480},noValidate:!0,children:[i.jsx(s,{children:"Required field"}),i.jsx(e,{type:"text",required:!0,defaultValue:""}),i.jsx(a,{type:"invalid",children:"This field is required."})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{k as Invalid,w as Tooltip,g as Valid,V as WasValidated,j as default};
