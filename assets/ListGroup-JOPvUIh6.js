import{R as l,j as d,f as t,g as c,d as g}from"./index-DiIymZMJ.js";const v={sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},h=t`
  --bs-list-group-color: var(--bs-body-color);
  --bs-list-group-bg: var(--bs-body-bg);
  --bs-list-group-border-color: var(--bs-border-color);
  --bs-list-group-border-width: var(--bs-border-width);
  --bs-list-group-border-radius: var(--bs-border-radius);
  --bs-list-group-item-padding-x: 1rem;
  --bs-list-group-item-padding-y: 0.5rem;
  --bs-list-group-action-color: var(--bs-secondary-color);
  --bs-list-group-action-hover-color: var(--bs-emphasis-color);
  --bs-list-group-action-hover-bg: var(--bs-tertiary-bg);
  --bs-list-group-action-active-color: var(--bs-body-color);
  --bs-list-group-action-active-bg: var(--bs-secondary-bg);
  --bs-list-group-disabled-color: var(--bs-secondary-color);
  --bs-list-group-disabled-bg: var(--bs-body-bg);
  --bs-list-group-active-color: #fff;
  --bs-list-group-active-bg: #0d6efd;
  --bs-list-group-active-border-color: #0d6efd;
`,b=t`
  flex-direction: row;
  &&& > *:first-child:not(:last-child) {
    border-bottom-left-radius: var(--bs-list-group-border-radius);
    border-top-right-radius: 0;
  }
  &&& > *:last-child:not(:first-child) {
    border-top-right-radius: var(--bs-list-group-border-radius);
    border-bottom-left-radius: 0;
  }
  &&& > *.active {
    margin-top: 0;
  }
  &&& > * + * {
    border-top-width: var(--bs-list-group-border-width);
    border-left-width: 0;
  }
`,m=c.ul`
  ${h}
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: var(--bs-list-group-border-radius);
  list-style: none;

  ${r=>r.$numbered?t`
          list-style-type: none;
          counter-reset: section;
          & > *::before {
            content: counters(section, '.') '. ';
            counter-increment: section;
          }
        `:""}

  ${r=>r.$horizontal===!0?b:typeof r.$horizontal=="string"?t`
            @media (min-width: ${v[r.$horizontal]}) {
              ${b}
            }
          `:""}

  ${r=>r.$flush?t`
          border-radius: 0;
          /* &&& wins the specificity tie against the item's own \`border\`. */
          &&& > * {
            border-width: 0 0 var(--bs-list-group-border-width);
          }
          &&& > *:last-child {
            border-bottom-width: 0;
          }
        `:""}
`,$=l.forwardRef(({flush:r,numbered:o,horizontal:s,as:i,...e},a)=>d.jsx(m,{as:i??(o?"ol":"ul"),ref:a,$flush:r,$numbered:o,$horizontal:s,...e}));$.displayName="ListGroup";const f=r=>{const o=g.colorTokens[r];return`
    --bs-list-group-color: var(--bs-${r}-text-emphasis, ${o.emphasis});
    --bs-list-group-bg: var(--bs-${r}-bg-subtle, ${o.bgSubtle});
    --bs-list-group-border-color: var(--bs-${r}-border-subtle, ${o.borderSubtle});
    --bs-list-group-action-hover-color: var(--bs-emphasis-color, #000);
    --bs-list-group-action-hover-bg: var(--bs-${r}-border-subtle, ${o.borderSubtle});
    --bs-list-group-action-active-color: var(--bs-emphasis-color, #000);
    --bs-list-group-action-active-bg: var(--bs-${r}-border-subtle, ${o.borderSubtle});
    --bs-list-group-active-color: var(--bs-${r}-bg-subtle, ${o.bgSubtle});
    --bs-list-group-active-bg: var(--bs-${r}-text-emphasis, ${o.emphasis});
    --bs-list-group-active-border-color: var(--bs-${r}-text-emphasis, ${o.emphasis});
  `},x=c.li`
  ${r=>r.$variant?f(r.$variant):""}
  position: relative;
  display: block;
  padding: var(--bs-list-group-item-padding-y, 0.5rem) var(--bs-list-group-item-padding-x, 1rem);
  color: var(--bs-list-group-color, var(--bs-body-color));
  text-decoration: none;
  background-color: var(--bs-list-group-bg, var(--bs-body-bg));
  border: var(--bs-list-group-border-width, var(--bs-border-width, 1px)) solid
    var(--bs-list-group-border-color, var(--bs-border-color));

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  /* Bootstrap collapses the shared border between adjacent items
     (.list-group-item + .list-group-item { border-top-width: 0 }). */
  &:not(:first-child) {
    border-top-width: 0;
  }

  ${r=>r.$action?t`
          width: 100%;
          color: var(--bs-list-group-action-color, var(--bs-secondary-color));
          text-align: inherit;
          cursor: pointer;
          &:not(.active):hover,
          &:not(.active):focus {
            z-index: 1;
            color: var(--bs-list-group-action-hover-color, var(--bs-emphasis-color));
            text-decoration: none;
            background-color: var(--bs-list-group-action-hover-bg, var(--bs-tertiary-bg));
          }
          &:not(.active):active {
            color: var(--bs-list-group-action-active-color, var(--bs-body-color));
            background-color: var(--bs-list-group-action-active-bg, var(--bs-secondary-bg));
          }
        `:""}

  ${r=>r.$disabled?t`
          color: var(--bs-list-group-disabled-color, var(--bs-secondary-color));
          pointer-events: none;
          background-color: var(--bs-list-group-disabled-bg, var(--bs-body-bg));
        `:""}

  ${r=>r.$active?t`
          z-index: 2;
          color: var(--bs-list-group-active-color, #fff);
          background-color: var(--bs-list-group-active-bg, #0d6efd);
          border-color: var(--bs-list-group-active-border-color, #0d6efd);
          /* .list-group-item + .list-group-item.active restores the top border
             (an active item that follows another item, i.e. not the first). */
          &:not(:first-child) {
            margin-top: calc(-1 * var(--bs-list-group-border-width, var(--bs-border-width, 1px)));
            border-top-width: var(--bs-list-group-border-width, var(--bs-border-width, 1px));
          }
        `:""}
`,y=l.forwardRef(({active:r,disabled:o,action:s,variant:i,as:e,className:a,...n},u)=>{const p=[a,r&&"active",o&&"disabled"].filter(Boolean).join(" ");return d.jsx(x,{as:e??(s?"button":"li"),ref:u,className:p||void 0,$active:r,$disabled:o,$action:s,$variant:i,"aria-current":r?"true":void 0,"aria-disabled":o||void 0,...n})});y.displayName="ListGroupItem";export{$ as L,y as a};
