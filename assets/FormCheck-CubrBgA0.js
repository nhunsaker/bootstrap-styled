import{R as x,j as c,g as n,f as o}from"./index-DiIymZMJ.js";const y=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")`,C=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")`,B=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")`,j=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e")`,E=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e")`,_=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")`,S=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e")`,F=n.div`
  display: ${r=>r.$inline?"inline-block":"block"};
  min-height: 1.5rem;
  margin-bottom: 0.125rem;
  ${r=>r.$inline&&"margin-right: 1rem;"}
  ${r=>r.$reverse?o`
          padding-right: ${r.$switch?"2.5em":"1.5em"};
          padding-left: 0;
          text-align: right;
        `:o`
          padding-left: ${r.$switch?"2.5em":"1.5em"};
        `}
`,g=n.input`
  --bs-form-check-bg: var(--bs-body-bg);
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  appearance: none;
  background-color: var(--bs-form-check-bg);
  background-image: var(--bs-form-check-bg-image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: var(--bs-border-width) solid var(--bs-border-color);
  print-color-adjust: exact;
  cursor: pointer;
  ${r=>r.$reverse?o`
          float: right;
          margin-right: ${r.$switch?"-2.5em":"-1.5em"};
          margin-left: 0;
        `:o`
          float: left;
          margin-left: ${r.$switch?"-2.5em":"-1.5em"};
        `}

  &[type='checkbox'] {
    border-radius: 0.25em;
  }
  &[type='radio'] {
    border-radius: 50%;
  }

  &:active {
    filter: brightness(90%);
  }
  &:focus {
    border-color: color-mix(in srgb, var(--bs-primary) 50%, #fff);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
  }
  &:checked {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
  }
  &:checked[type='checkbox'] {
    --bs-form-check-bg-image: ${y};
  }
  &:checked[type='radio'] {
    --bs-form-check-bg-image: ${C};
  }
  &[type='checkbox']:indeterminate {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    --bs-form-check-bg-image: ${B};
  }
  &:disabled {
    pointer-events: none;
    filter: none;
    opacity: 0.5;
  }

  ${r=>r.$switch&&o`
      --bs-form-switch-bg: ${j};
      width: 2em;
      background-image: var(--bs-form-switch-bg);
      background-position: left center;
      border-radius: 2em;
      transition: background-position 0.15s ease-in-out;

      &:not(:checked):not(:focus) {
        --bs-form-switch-bg: ${S};
      }
      &:focus {
        --bs-form-switch-bg: ${E};
      }
      &:checked {
        background-position: ${r.$reverse?"left center":"right center"};
        --bs-form-switch-bg: ${_};
      }
    `}

  ${r=>(r.$invalid||r.$valid)&&o`
      border-color: ${r.$invalid?"var(--bs-form-invalid-border-color, var(--bs-danger))":"var(--bs-form-valid-border-color, var(--bs-success))"};
      &:checked {
        background-color: ${r.$invalid?"var(--bs-form-invalid-color, var(--bs-danger))":"var(--bs-form-valid-color, var(--bs-success))"};
      }
      &:focus {
        box-shadow: 0 0 0 0.25rem
          rgba(${r.$invalid?"var(--bs-danger-rgb)":"var(--bs-success-rgb)"}, 0.25);
      }
    `}
`,T=n.label`
  cursor: pointer;
  user-select: none;
  ${r=>(r.$invalid||r.$valid)&&o`
      color: ${r.$invalid?"var(--bs-form-invalid-color, var(--bs-danger))":"var(--bs-form-valid-color, var(--bs-success))"};
    `}
  ${g}:disabled ~ &,
  ${g}[disabled] ~ & {
    cursor: default;
    opacity: 0.5;
  }
`,e=n.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`,G=n.label`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: var(--bs-border-width) solid transparent;
  border-radius: var(--bs-border-radius);
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  ${r=>{const t=r.$variant.startsWith("outline-"),s=t?r.$variant.slice(8):r.$variant,i=`var(--bs-${s})`,a=`var(--bs-${s}-rgb)`;return t?o`
          color: ${i};
          border-color: ${i};
          background-color: transparent;
          ${e}:checked + & {
            color: #fff;
            background-color: ${i};
            border-color: ${i};
          }
          ${e}:focus-visible + & {
            box-shadow: 0 0 0 0.25rem rgba(${a}, 0.5);
          }
          ${e}:disabled + &,
          ${e}[disabled] + & {
            pointer-events: none;
            opacity: 0.65;
          }
        `:o`
          color: #fff;
          background-color: ${i};
          border-color: ${i};
          ${e}:checked + & {
            filter: brightness(90%);
          }
          ${e}:focus-visible + & {
            box-shadow: 0 0 0 0.25rem rgba(${a}, 0.5);
          }
          ${e}:disabled + &,
          ${e}[disabled] + & {
            pointer-events: none;
            opacity: 0.65;
          }
        `}}
`,H=x.forwardRef(({type:r="checkbox",label:t,id:s,inline:i,reverse:a,button:f,buttonVariant:u="outline-primary",isInvalid:d,isValid:b,className:v,...m},h)=>{const l=r==="switch",$=l?"checkbox":r,w=[d&&"is-invalid",b&&"is-valid"].filter(Boolean).join(" ")||void 0;if(f)return c.jsxs(c.Fragment,{children:[c.jsx(e,{ref:h,id:s,type:$,className:v,...m}),c.jsx(G,{htmlFor:s,$variant:u,children:t})]});const p=c.jsx(g,{ref:h,id:s,type:$,role:l?"switch":void 0,className:w,$switch:l,$reverse:a,$invalid:d,$valid:b,...m}),k=t!=null&&c.jsx(T,{htmlFor:s,$invalid:d,$valid:b,children:t});return c.jsxs(F,{className:v,$inline:i,$reverse:a,$switch:l,children:[p,k]})});H.displayName="FormCheck";export{H as F};
