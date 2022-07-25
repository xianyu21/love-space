"use strict";var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,i=(t,o,n)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,u=require("../../../common/vendor.js"),l=require("../../tool/lib/minxs.js");require("../../tool/theme/theme.js"),require("../../tool/theme/colortool.js"),require("../../tool/lib/interface.js"),require("../../../theme/index.js");const s=u.defineComponent({props:(c=((e,t)=>{for(var o in t||(t={}))r.call(t,o)&&i(e,o,t[o]);if(n)for(var o of n(t))a.call(t,o)&&i(e,o,t[o]);return e})({},l.custom_props),p={align:{type:String,default:"flex-center"},bgColor:{type:String,default:"rgba(0,0,0,0.35)"},zIndex:{type:[Number,String],default:120},show:{type:Boolean,default:!1},overlayClick:{type:Boolean,default:!0},transprent:{type:[Boolean,String],default:!1},duration:{type:Number,default:300}},t(c,o(p))),emits:["click","open","close","update:show"],setup(e,{expose:t,emit:o}){const n=e,r=l.computedStyle(n),a=l.computedClass(n),i=u.ref(0),s=u.ref(0);u.ref(0),u.ref(!1),u.index.$tm.u.getUid(1);const{windowTop:c,windowWidth:p,windowHeight:d,safeArea:f,statusBarHeight:m}=u.index.getSystemInfoSync();u.index.getSystemInfoSync(),i.value=p,s.value=d+(c||0),s.value=d;const g=u.ref(u.index.$tm.u.getUid(3)),b=u.ref(null),y=u.ref(!1);u.onUnmounted((()=>clearTimeout(g.value)));const v=u.computed$1((()=>n.align)),x=u.computed$1((()=>!n.bgColor||n.transprent?"rgba(0,0,0,0)":n.bgColor||"rgba(0,0,0,0.2)"));function h(e){e.stopPropagation(),o("click",e),n.overlayClick&&w(!1)}function w(e){!function(e=!1){let t=u.index.createAnimation({duration:n.duration,timingFunction:"ease",delay:0});if(t.opacity(e?1:0).step(),b.value=t.export(),0==e){if(y.value==e)return;u.index.$tm.u.debounce((function(){y.value=e,o("close"),o("update:show",!1)}),n.duration,!1)}else y.value=e,o("open")}(e)}return u.onMounted((()=>{n.show&&w(n.show)})),u.watch((()=>n.show),(e=>{w(e)})),t({close:h,open:w}),(t,o)=>u.e({a:y.value},y.value?{b:u.o(h),c:u.n(u.unref(x)&&!n.transprent?"blurbg":""),d:u.n(u.unref(v)),e:u.n(u.unref(a)),f:u.s(u.unref(x)&&!n.transprent?{backgroundColor:y.value?u.unref(x):""}:""),g:u.s({position:"fixed"}),h:u.s(e.zIndex?{zIndex:e.zIndex}:""),i:u.s({width:i.value+"px",height:s.value+"px"}),j:u.s(u.unref(r)),k:b.value}:{})}});var c,p,d=u._export_sfc(s,[["__scopeId","data-v-5de372f2"]]);wx.createComponent(d);
