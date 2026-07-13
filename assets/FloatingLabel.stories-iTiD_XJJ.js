import{R as r,j as e,g as h}from"./index-DiIymZMJ.js";import{F as a}from"./FormControl-BtMLY3u5.js";import{F as m}from"./FormSelect-FaOW7mMe.js";const b=h.div`
  position: relative;

  & > input,
  & > select,
  & > textarea {
    height: calc(3.5rem + calc(var(--bs-border-width, 1px) * 2));
    min-height: calc(3.5rem + calc(var(--bs-border-width, 1px) * 2));
    line-height: 1.25;
  }

  & > input,
  & > textarea {
    padding: 1rem 0.75rem;
  }
  & > input::placeholder,
  & > textarea::placeholder {
    color: transparent;
  }
  & > input:focus,
  & > input:not(:placeholder-shown),
  & > textarea:focus,
  & > textarea:not(:placeholder-shown) {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
  }
  & > select {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
    padding-left: 0.75rem;
  }

  & > label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    max-width: 100%;
    height: 100%;
    padding: 1rem 0.75rem;
    overflow: hidden;
    color: rgba(var(--bs-body-color-rgb, 33, 37, 41), 0.65);
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    border: var(--bs-border-width, 1px) solid transparent;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    & > label {
      transition: none;
    }
  }

  & > input:focus ~ label,
  & > input:not(:placeholder-shown) ~ label,
  & > textarea:focus ~ label,
  & > textarea:not(:placeholder-shown) ~ label,
  & > select ~ label {
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
  }

  /* Masks the textarea's border line where the floated label crosses it. */
  & > textarea:focus ~ label::after,
  & > textarea:not(:placeholder-shown) ~ label::after {
    position: absolute;
    inset: 1rem 0.375rem;
    z-index: -1;
    height: 1.5em;
    content: '';
    background-color: var(--bs-body-bg);
    border-radius: var(--bs-border-radius);
  }

  & > input:disabled ~ label,
  & > :disabled ~ label {
    color: #6c757d;
  }
`,t=r.forwardRef(({label:s,controlId:n,children:l,...i},d)=>{const c=r.useId(),o=n??l.props.id??c,p=r.cloneElement(l,{id:o,placeholder:l.props.placeholder??" "});return e.jsxs(b,{ref:d,...i,children:[p,e.jsx("label",{htmlFor:o,children:s})]})});t.displayName="FloatingLabel";const f={title:"Forms/FloatingLabel"},w=()=>e.jsxs("div",{style:{maxWidth:480,display:"grid",gap:"1rem"},children:[e.jsx(t,{label:"Email address",children:e.jsx(a,{type:"email"})}),e.jsx(t,{label:"Password",children:e.jsx(a,{type:"password"})}),e.jsx(t,{label:"Pre-filled value",children:e.jsx(a,{type:"text",defaultValue:"hello@example.com"})})]}),j=()=>e.jsx("div",{style:{maxWidth:480},children:e.jsx(t,{label:"Works with selects",children:e.jsxs(m,{defaultValue:"1",children:[e.jsx("option",{value:"1",children:"One"}),e.jsx("option",{value:"2",children:"Two"}),e.jsx("option",{value:"3",children:"Three"})]})})}),v=()=>e.jsx("div",{style:{maxWidth:480},children:e.jsx(t,{label:"Comments",children:e.jsx(a,{as:"textarea",style:{height:100}})})}),y=()=>e.jsx("div",{style:{maxWidth:480},children:e.jsx(t,{label:"Disabled input",children:e.jsx(a,{type:"text",disabled:!0})})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{y as Disabled,w as Input,j as Select,v as Textarea,f as default};
