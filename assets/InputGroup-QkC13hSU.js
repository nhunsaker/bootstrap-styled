import{R as i,j as a,g as o}from"./index-C-CN3z2J.js";const s=t=>`
    & > input,
    & > select,
    & > textarea,
    & > button,
    & > .input-group-text {
      padding: ${t==="sm"?"0.25rem 0.5rem":"0.5rem 1rem"};
      font-size: ${t==="sm"?"0.875rem":"1.25rem"};
      border-radius: ${t==="sm"?"var(--bs-border-radius-sm)":"var(--bs-border-radius-lg)"};
    }
    & > select {
      padding-right: 3rem;
    }
  `,d=o.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  & > input,
  & > select,
  & > textarea {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }
  & > input:focus,
  & > select:focus,
  & > textarea:focus {
    z-index: 5;
  }
  & > button {
    position: relative;
    z-index: 2;
  }
  & > button:focus {
    z-index: 5;
  }

  ${t=>t.$size?s(t.$size):""}

  /* Overlap borders + drop the left radius on every member after the first
     (feedback/tooltip siblings are excluded so validation text can live in the
     group without being pulled under the previous control). */
  & > :not(:first-child):not(.dropdown-menu):not(.valid-feedback):not(.valid-tooltip):not(.invalid-feedback):not(.invalid-tooltip) {
    margin-left: calc(-1 * var(--bs-border-width, 1px));
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  /* Drop the right radius on every member before the last. */
  & > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`,n=i.forwardRef(({size:t,...e},r)=>a.jsx(d,{ref:r,$size:t,...e}));n.displayName="InputGroup";const u=o.span.attrs({className:"input-group-text"})`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-tertiary-bg, #f8f9fa);
  border: var(--bs-border-width, 1px) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
`;export{n as I,u as a};
