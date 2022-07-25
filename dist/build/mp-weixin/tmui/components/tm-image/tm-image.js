"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,i=require("../../../common/vendor.js"),u=require("../../tool/lib/minxs.js");require("../../tool/theme/theme.js"),require("../../tool/theme/colortool.js"),require("../../tool/lib/interface.js"),require("../../../theme/index.js"),Math||(p+s+d+c)();const d=()=>"../tm-sheet/tm-sheet.js",s=()=>"../tm-text/tm-text.js",p=()=>"../tm-icon/tm-icon.js",c=()=>"../tm-translate/tm-translate.js",f=i.defineComponent({props:(m=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&a(e,r,t[r]);if(n)for(var r of n(t))l.call(t,r)&&a(e,r,t[r]);return e})({},u.custom_props),v={margin:{type:Array,default:()=>[0,0]},padding:{type:Array,default:()=>[0,0]},color:{type:String,default:"white"},transprent:{type:[Boolean,String],default:!0},border:{type:Number,default:0},width:{type:[Number,String],default:200,required:!0},height:{type:[Number,String],default:200,required:!0},src:{type:String,default:"",required:!0},errorIcon:{type:String,default:""},errorLabel:{type:String,default:"加载错误"},loadIcon:{type:String,default:""},preview:{type:[Boolean],default:!1},extra:{type:[Boolean],default:!1},extraPosition:{type:String,default:"in"},delete:{type:[Boolean],default:!1},allowDelete:{type:[Boolean],default:!0},model:{type:String,default:"scaleToFill"},unit:{type:String,default:"rpx"}},t(m,r(v))),emits:["load","error","click","delete","close"],setup(e,{emit:t}){var r;const n=e,{proxy:o}=i.getCurrentInstance();n.height||n.width||console.error("错误：图片宽度和高度必须设置一个");const l=i.computed$1((()=>n.width)),a=i.computed$1((()=>n.height-n.padding[1])),u=i.computed$1((()=>n.src)),d=i.ref(!0),s=i.ref(!1),p=i.ref(!1);let c=o.$parent;for(;c&&"tmImageGroup"!=(null==c?void 0:c.tmImageGroup)&&c;)c=null!=(r=null==c?void 0:c.$parent)?r:void 0;const f=i.inject("ImagGrupList",i.computed$1((()=>[])));function m(e){d.value=!1,t("load",e)}function v(e){console.error("图片加载错:"+n.src),s.value=!0,d.value=!1,t("error",e)}function h(e){if(t("click",e),n.preview){let e=f.value.length>0?f.value:[n.src];i.index.previewImage({urls:e,current:n.src})}}async function y(){var e;p.value=!1,n.allowDelete?(null==(e=o.$refs)?void 0:e.aniplay)?o.$refs.aniplay.play():(p.value=!0,t("close",n.src)):t("delete",n.src)}function g(){p.value=!0,t("close",n.src)}return(null==c?void 0:c.pushKey)&&c.pushKey({width:l.value,height:l.value,src:n.src}),i.watch(u,(()=>{d.value=!0,s.value=!1,(null==c?void 0:c.pushKey)&&c.pushKey({width:l.value,height:l.value,src:n.src})})),(e,t)=>i.e({a:!p.value},p.value?{}:i.e({b:d.value},d.value?{c:i.unref(u),d:i.o(m),e:i.o(v)}:{},{f:!d.value&&!s.value},d.value||s.value?{}:{g:i.o(h),h:i.n("round-"+n.round),i:i.unref(u),j:i.s({width:i.unref(l)+n.unit,height:i.unref(a)+n.unit}),k:n.model},{l:d.value&&!s.value},d.value&&!s.value?{m:i.p({spin:!0,name:"tmicon-loading"}),n:i.s({width:i.unref(l)+n.unit,height:i.unref(a)+n.unit})}:{},{o:!d.value&&s.value},!d.value&&s.value?{p:i.p({name:"tmicon-exclamation-circle"}),q:i.p({_class:"pt-10","font-size":26,label:n.errorLabel}),r:i.s({width:i.unref(l)+n.unit,height:i.unref(a)+n.unit})}:{},{s:n.extra},n.extra?{t:i.o(h),v:i.n("in"==n.extraPosition?"absolute l-0 b-0 zIndex-5":""),w:i.s(n.extra&&"in"==n.extraPosition?{height:i.unref(a)+n.unit,width:i.unref(l)+n.unit}:""),x:i.s(n.extra&&"out"==n.extraPosition?{width:i.unref(l)+n.unit}:"")}:{},{y:n.delete},n.delete?{z:i.o(y),A:i.p({color:"red",name:"tmicon-times-circle-fill"}),B:i.s(n.delete?{width:i.unref(l)+n.unit}:"")}:{},{C:i.n(`pb-${n.padding[1]}`),D:i.n("round-"+n.round),E:i.p({color:n.color,transprent:n.transprent,margin:n.margin,round:n.round,border:n.border,padding:[n.padding[0],0],width:i.unref(l),unit:n.unit}),F:i.sr("aniplay","7cba4290-0"),G:i.o(g),H:i.p({width:i.unref(l)+n.unit,autoPlay:!1,name:"zoom",reverse:!0})}))}});var m,v;wx.createComponent(f);