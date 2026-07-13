import{R as m,j as e,g as l,f as d}from"./index-DiIymZMJ.js";import{F as o}from"./FormParts-DR6rxOY7.js";const a=d`
  width: 1rem;
  height: 1rem;
  background-color: var(--bs-primary);
  border: 0;
  border-radius: 1rem;
  transition:
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
`,t=d`
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: var(--bs-secondary-bg);
  border-color: transparent;
  border-radius: 1rem;
`,n="0 0 0 1px #fff, 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25)",s="color-mix(in srgb, var(--bs-primary) 30%, #fff)",b=l.input.attrs({type:"range"})`
  width: 100%;
  height: 1.5rem;
  padding: 0;
  appearance: none;
  background-color: transparent;

  &:focus {
    outline: 0;
  }
  &:focus::-webkit-slider-thumb {
    box-shadow: ${n};
  }
  &:focus::-moz-range-thumb {
    box-shadow: ${n};
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -0.25rem;
    ${a}
  }
  &::-webkit-slider-thumb:active {
    background-color: ${s};
  }
  &::-webkit-slider-runnable-track {
    ${t}
  }

  &::-moz-range-thumb {
    appearance: none;
    ${a}
  }
  &::-moz-range-thumb:active {
    background-color: ${s};
  }
  &::-moz-range-track {
    ${t}
  }

  &:disabled {
    pointer-events: none;
  }
  &:disabled::-webkit-slider-thumb {
    background-color: var(--bs-secondary-color);
  }
  &:disabled::-moz-range-thumb {
    background-color: var(--bs-secondary-color);
  }
`,r=m.forwardRef((i,c)=>e.jsx(b,{ref:c,...i}));r.displayName="FormRange";const h={title:"Forms/FormRange"},p=()=>e.jsxs("div",{style:{maxWidth:360},children:[e.jsx(o,{htmlFor:"range1",children:"Example range"}),e.jsx(r,{id:"range1",defaultValue:50})]}),x=()=>e.jsxs("div",{style:{maxWidth:360},children:[e.jsx(o,{htmlFor:"range2",children:"Steps of 5 (0–100)"}),e.jsx(r,{id:"range2",min:0,max:100,step:5,defaultValue:25})]}),f=()=>e.jsxs("div",{style:{maxWidth:360},children:[e.jsx(o,{htmlFor:"range3",children:"Disabled range"}),e.jsx(r,{id:"range3",defaultValue:50,disabled:!0})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{p as Basic,f as Disabled,x as MinMaxStep,h as default};
