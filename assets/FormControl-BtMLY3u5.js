import{R as u,j as h,f as o,g as v}from"./index-DiIymZMJ.js";const $=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e")`,w=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,d=r=>r==="sm"?"0.25rem 0.5rem":r==="lg"?"0.5rem 1rem":"0.375rem 0.75rem",p=r=>r==="sm"?"0.875rem":r==="lg"?"1.25rem":"1rem",f=r=>r==="sm"?"var(--bs-border-radius-sm)":r==="lg"?"var(--bs-border-radius-lg)":"var(--bs-border-radius)",l=r=>r==="sm"?"calc(1.5em + 0.5rem + calc(var(--bs-border-width) * 2))":r==="lg"?"calc(1.5em + 1rem + calc(var(--bs-border-width) * 2))":"calc(1.5em + 0.75rem + calc(var(--bs-border-width) * 2))",y=o`
  border-color: color-mix(in srgb, var(--bs-primary) 50%, #fff);
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
`,x=(r,e,s)=>{if(!r&&!e)return"";const a=r?"var(--bs-form-invalid-border-color, var(--bs-danger))":"var(--bs-form-valid-border-color, var(--bs-success))";return o`
    border-color: ${a};
    padding-right: calc(1.5em + 0.75rem);
    background-image: ${r?w:$};
    background-repeat: no-repeat;
    background-position: ${s?"top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem)":"right calc(0.375em + 0.1875rem) center"};
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    &:focus {
      border-color: ${a};
      box-shadow: 0 0 0 0.25rem rgba(${r?"var(--bs-danger-rgb)":"var(--bs-success-rgb)"}, 0.25);
    }
  `},z=v.input`
  ${r=>r.$plaintext?o`
          display: block;
          width: 100%;
          padding: ${r.$size==="sm"||r.$size==="lg","0.375rem 0"};
          margin-bottom: 0;
          line-height: 1.5;
          color: var(--bs-body-color);
          background-color: transparent;
          border: solid transparent;
          border-width: var(--bs-border-width) 0;
          &:focus {
            outline: 0;
          }
        `:o`
          display: block;
          width: 100%;
          /* Bootstrap only sets min-height on textareas + the -sm/-lg size
             variants; a plain input is content-driven (min-height:auto). Forcing
             the md formula on an unsized input overshoots when an ancestor (e.g.
             .input-group-sm) shrinks its padding. */
          min-height: ${r.$textarea||r.$size?l(r.$size):"auto"};
          padding: ${d(r.$size)};
          font-size: ${p(r.$size)};
          font-family: inherit;
          font-weight: 400;
          line-height: 1.5;
          color: var(--bs-body-color);
          background-color: var(--bs-body-bg);
          background-clip: padding-box;
          border: var(--bs-border-width) solid var(--bs-border-color);
          border-radius: ${f(r.$size)};
          appearance: none;
          transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;

          &::placeholder {
            color: var(--bs-secondary-color);
            opacity: 1;
          }
          &:focus {
            color: var(--bs-body-color);
            background-color: var(--bs-body-bg);
            ${y}
          }
          &:disabled {
            background-color: var(--bs-secondary-bg);
            opacity: 1;
            cursor: not-allowed;
          }

          /* file input — Bootstrap re-skins the native picker button */
          &[type='file'] {
            overflow: hidden;
          }
          &[type='file']:not(:disabled):not([readonly]) {
            cursor: pointer;
          }
          &::file-selector-button {
            padding: ${d(r.$size)};
            margin: ${r.$size==="sm"?"-0.25rem -0.5rem":r.$size==="lg"?"-0.5rem -1rem":"-0.375rem -0.75rem"};
            margin-inline-end: ${r.$size==="sm"?"0.5rem":r.$size==="lg"?"1rem":"0.75rem"};
            color: var(--bs-body-color);
            background-color: var(--bs-tertiary-bg);
            pointer-events: none;
            border-color: inherit;
            border-style: solid;
            border-width: 0;
            border-inline-end-width: var(--bs-border-width);
            border-radius: 0;
            transition:
              color 0.15s ease-in-out,
              background-color 0.15s ease-in-out,
              border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }
          &:hover:not(:disabled):not([readonly])::file-selector-button {
            background-color: var(--bs-secondary-bg);
          }

          /* color input */
          ${r.$type==="color"&&o`
            width: 3rem;
            height: ${l(r.$size)};
            padding: ${r.$size==="sm"?"0.25rem":r.$size==="lg"?"0.5rem":"0.375rem"};
            &:not(:disabled):not([readonly]) {
              cursor: pointer;
            }
            &::-moz-color-swatch {
              border: 0 !important;
              border-radius: var(--bs-border-radius);
            }
            &::-webkit-color-swatch {
              border: 0 !important;
              border-radius: var(--bs-border-radius);
            }
          `}

          ${x(r.$invalid,r.$valid,r.$textarea)}
        `}
`,k=u.forwardRef(({size:r,isInvalid:e,isValid:s,plaintext:a,as:i,type:t,className:n,...b},m)=>{const c=i==="textarea",g=[n,e&&"is-invalid",s&&"is-valid"].filter(Boolean).join(" ");return h.jsx(z,{ref:m,as:i,type:c?void 0:t,className:g||void 0,$size:r,$invalid:e,$valid:s,$plaintext:a,$textarea:c,$type:t,...b})});k.displayName="FormControl";export{k as F};
