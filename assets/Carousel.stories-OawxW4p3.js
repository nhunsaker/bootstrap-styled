import{r as n,R as _,j as t,g as z}from"./index-C-CN3z2J.js";const pe=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'/%3e%3c/svg%3e")`,xe=`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e")`,ve=600,he=40,ge=z.div`
  position: relative;

  &.carousel-dark,
  [data-bs-theme='dark'] & {
    --bs-carousel-indicator-active-bg: #000;
    --bs-carousel-caption-color: #000;
    --bs-carousel-control-icon-filter: invert(1) grayscale(100);
  }

  .carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .carousel-inner::after {
    display: block;
    clear: both;
    content: '';
  }

  .carousel-item {
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
    transition: transform 0.6s ease-in-out;
  }
  .carousel-item-next,
  .carousel-item-prev,
  .carousel-item.active {
    display: block;
  }
  .carousel-item-end,
  .carousel-item-next:not(.carousel-item-start) {
    transform: translateX(100%);
  }
  .carousel-item-start,
  .carousel-item-prev:not(.carousel-item-end) {
    transform: translateX(-100%);
  }

  &.carousel-fade .carousel-item {
    opacity: 0;
    transition-property: opacity;
    transform: none;
  }
  &.carousel-fade .carousel-item.active,
  &.carousel-fade .carousel-item-next.carousel-item-start,
  &.carousel-fade .carousel-item-prev.carousel-item-end {
    z-index: 1;
    opacity: 1;
  }
  &.carousel-fade .active.carousel-item-start,
  &.carousel-fade .active.carousel-item-end {
    z-index: 0;
    opacity: 0;
    transition: opacity 0s 0.6s;
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: none;
    filter: var(--bs-carousel-control-icon-filter);
    border: 0;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }
  .carousel-control-prev:hover,
  .carousel-control-prev:focus,
  .carousel-control-next:hover,
  .carousel-control-next:focus {
    color: #fff;
    text-decoration: none;
    outline: 0;
    opacity: 0.9;
  }
  .carousel-control-prev {
    left: 0;
  }
  .carousel-control-next {
    right: 0;
  }
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
  }
  .carousel-control-prev-icon {
    background-image: ${pe};
  }
  .carousel-control-next-icon {
    background-image: ${xe};
  }

  .carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: 1rem;
    margin-left: 15%;
    list-style: none;
  }
  .carousel-indicators [data-bs-target] {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    padding: 0;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: var(--bs-carousel-indicator-active-bg, #fff);
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  }
  .carousel-indicators .active {
    opacity: 1;
  }

  .carousel-caption {
    position: absolute;
    right: 15%;
    bottom: 1.25rem;
    left: 15%;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    color: var(--bs-carousel-caption-color, #fff);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel-item,
    .carousel-control-prev,
    .carousel-control-next,
    .carousel-indicators [data-bs-target],
    &.carousel-fade .active.carousel-item-start,
    &.carousel-fade .active.carousel-item-end {
      transition: none;
    }
  }
`,J=z.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`,D=n.forwardRef(function({className:o,children:d,interval:s,...b},y){return t.jsx("div",{ref:y,className:["carousel-item",o].filter(Boolean).join(" "),...b,children:d})}),be=z.div.attrs({className:"carousel-caption"})``,Q=(l,o)=>o===0?0:Math.min(Math.max(l,0),o-1),L=n.forwardRef(function({activeIndex:o,defaultActiveIndex:d=0,onSelect:s,onSlide:b,onSlid:y,ride:P=!1,interval:j=5e3,keyboard:Y=!0,pause:w="hover",wrap:$=!0,touch:x=!0,fade:Z=!1,indicators:ee=!0,controls:te=!0,dark:re=!1,className:oe,children:ne,...k},se){const C=_.Children.toArray(ne).filter(_.isValidElement),u=C.length,v=o!=null,[ae,S]=n.useState(()=>Q(d,u)),h=Q(v?o:ae,u),[a,ie]=n.useState(h),[i,B]=n.useState(null),[ce,F]=n.useState(!1),[H,E]=n.useState(!1),[O,X]=n.useState(!1),m=n.useRef(null),W=n.useRef(null),R=n.useRef(null),N=n.useRef(b);N.current=b;const I=n.useRef(y);I.current=y;const T=n.useRef(s);T.current=s,n.useEffect(()=>{if(typeof document>"u")return;const e=()=>X(document.hidden);return X(document.hidden),document.addEventListener("visibilitychange",e),()=>document.removeEventListener("visibilitychange",e)},[]),n.useEffect(()=>{if(i||h===a)return;const e=m.current??(h>a?"next":"prev");m.current=null,B({to:h,order:e})},[h,a,i]),n.useEffect(()=>{var K;if(!i)return;const e=a;(K=N.current)==null||K.call(N,{from:e,to:i.to,direction:i.order});const r=W.current;r&&r.offsetHeight;let c=0;const p=requestAnimationFrame(()=>{c=requestAnimationFrame(()=>F(!0))}),A=setTimeout(()=>{var U,G;ie(i.to),(U=T.current)==null||U.call(T,i.to,i.order),(G=I.current)==null||G.call(I,{from:e,to:i.to,direction:i.order}),B(null),F(!1)},ve);return()=>{cancelAnimationFrame(p),cancelAnimationFrame(c),clearTimeout(A)}},[i]);const f=n.useCallback(e=>{if(i||u<2)return;const r=a+e;let c;r<0?c=$?u-1:0:r>=u?c=$?0:u-1:c=r,c!==a&&(m.current=e>0?"next":"prev",v?s==null||s(c,m.current):S(c))},[i,u,a,$,v,s]),le=n.useCallback(e=>{i||e===a||(m.current=e>a?"next":"prev",v?s==null||s(e,m.current):S(e))},[i,a,v,s]),V=n.useRef(f);V.current=f,n.useEffect(()=>{var A;if(!(P===!0||P==="carousel")||!j||j<=0||H||O||u<2)return;const r=(A=C[a])==null?void 0:A.props.interval,p=setTimeout(()=>V.current(1),typeof r=="number"?r:j);return()=>clearTimeout(p)},[P,j,H,O,a,u]);const ue=e=>{if(!i)return e===a?"active":"";const{to:r,order:c}=i,p=c==="next"?"start":"end";return ce?e===a?`active carousel-item-${p}`:e===r?`carousel-item-${c} carousel-item-${p}`:"":e===a?"active":e===r?`carousel-item-${c}`:""},q=e=>e.pointerType==="touch"||e.pointerType==="pen",de=e=>{!x||!q(e)||(R.current=e.clientX,w==="hover"&&E(!0))},fe=e=>{if(!x||R.current==null||!q(e))return;const r=e.clientX-R.current;R.current=null,Math.abs(r)>he&&(r<0?f(1):f(-1)),w==="hover"&&E(!1)},me=e=>{var r;Y&&(e.key==="ArrowLeft"?(e.preventDefault(),f(-1)):e.key==="ArrowRight"&&(e.preventDefault(),f(1)),(r=k.onKeyDown)==null||r.call(k,e))};return t.jsxs(ge,{ref:se,className:["carousel","slide",Z?"carousel-fade":"",re?"carousel-dark":"",oe].filter(Boolean).join(" "),"aria-roledescription":"carousel",onKeyDown:me,onMouseEnter:w==="hover"?()=>E(!0):void 0,onMouseLeave:w==="hover"?()=>E(!1):void 0,...k,children:[ee&&u>1&&t.jsx("div",{className:"carousel-indicators",children:C.map((e,r)=>t.jsx("button",{type:"button","data-bs-target":"",className:r===a?"active":void 0,"aria-current":r===a?"true":void 0,"aria-label":`Slide ${r+1}`,onClick:()=>le(r)},r))}),t.jsx("div",{className:"carousel-inner",ref:W,onPointerDown:x?de:void 0,onPointerUp:x?fe:void 0,style:x?{touchAction:"pan-y"}:void 0,children:C.map((e,r)=>_.cloneElement(e,{className:[ue(r),e.props.className].filter(Boolean).join(" "),role:"group","aria-roledescription":"slide","aria-label":`${r+1} of ${u}`}))}),te&&u>1&&t.jsxs(t.Fragment,{children:[t.jsxs("button",{className:"carousel-control-prev",type:"button",onClick:()=>f(-1),children:[t.jsx("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),t.jsx(J,{children:"Previous"})]}),t.jsxs("button",{className:"carousel-control-next",type:"button",onClick:()=>f(1),children:[t.jsx("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),t.jsx(J,{children:"Next"})]})]})]})}),je={title:"Components/Carousel"},M=({n:l,color:o})=>t.jsxs("div",{style:{height:"320px",display:"flex",alignItems:"center",justifyContent:"center",background:o,color:"#fff",fontSize:"2rem"},children:["Slide ",l]}),g=["#6f42c1","#0d6efd","#198754"],we=()=>t.jsx("div",{style:{maxWidth:640},children:t.jsx(L,{children:g.map((l,o)=>t.jsxs(D,{children:[t.jsx(M,{n:o+1,color:l}),t.jsxs(be,{children:[t.jsxs("h5",{children:["Slide ",o+1," label"]}),t.jsx("p",{children:"Some representative placeholder content."})]})]},o))})}),ke=()=>t.jsx("div",{style:{maxWidth:640},children:t.jsx(L,{ride:"carousel",interval:2e3,fade:!0,children:g.map((l,o)=>t.jsx(D,{children:t.jsx(M,{n:o+1,color:l})},o))})}),Ce=()=>{const[l,o]=n.useState(0);return t.jsxs("div",{style:{maxWidth:640},children:[t.jsx(L,{activeIndex:l,onSelect:d=>o(d),children:g.map((d,s)=>t.jsx(D,{children:t.jsx(M,{n:s+1,color:d})},s))}),t.jsx("div",{style:{marginTop:"0.5rem"},children:g.map((d,s)=>t.jsxs("button",{onClick:()=>o(s),style:{marginRight:4},children:["Go to ",s+1]},s))})]})},Ee=()=>t.jsx("div",{style:{maxWidth:640},children:t.jsx(L,{activeIndex:1,dark:!0,children:g.map((l,o)=>t.jsx(D,{children:t.jsx(M,{n:o+1,color:l})},o))})});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{ke as AutoplayFade,we as Basic,Ce as Controlled,Ee as StaticSlideDark,je as default};
