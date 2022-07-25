"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,i=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,l=require("../../../common/vendor.js"),u=require("../../tool/lib/interface.js"),f=require("../../tool/lib/minxs.js");require("../../tool/theme/theme.js"),require("../../tool/theme/colortool.js"),require("../../../theme/index.js"),Math||(s+p+c+d+m)();const d=()=>"../tm-sheet/tm-sheet.js",p=()=>"../tm-text/tm-text.js",c=()=>"../tm-icon/tm-icon.js",s=()=>"../tm-image/tm-image.js",m=()=>"../tm-divider/tm-divider.js",g=l.defineComponent({props:(h=((e,t)=>{for(var r in t||(t={}))a.call(t,r)&&i(e,r,t[r]);if(o)for(var r of o(t))n.call(t,r)&&i(e,r,t[r]);return e})({},f.custom_props),b={shadow:{type:[Number],default:0},round:{type:[Number],default:0},margin:{type:Array,default:()=>[32,0]},padding:{type:Array,default:()=>[24,24]},height:{type:[Number],default:0},transprent:{type:[Boolean],default:!1},color:{type:String,default:"white"},title:{type:String,default:""},titleFontSize:{type:[Number,String],default:28},label:{type:String,default:""},labelColor:{type:String,default:"grey"},rightText:{type:String,default:""},rightIcon:{type:String,default:"tmicon-angle-right"},rightColor:{type:String,default:"grey"},showAvatar:{type:Boolean,default:!1},avatar:{type:String,default:""},avatarSize:{type:Number,default:60},avatarRound:{type:Number,default:10},border:{type:[Number],default:0},borderDirection:{type:[String],default:u.cssDirection.bottom},bottomBorder:{type:[Boolean],default:!1},url:{type:String,default:""}},t(h,r(b))),emits:["click"],setup(e,{emit:t}){const r=e;function o(e){if(t("click",e),""!==r.url)try{l.index.navigateTo({url:r.url,fail(e){console.error("打开连接错误：",e)}})}catch(o){}}const a=l.computed$1((()=>r));return(e,t)=>l.e({a:l.unref(a).showAvatar},l.unref(a).showAvatar?{b:l.p({round:l.unref(a).avatarRound,width:l.unref(a).avatarSize,height:l.unref(a).avatarSize,src:l.unref(a).avatar}),c:`${l.unref(a).avatarSize}rpx`,d:`${l.unref(a).avatarSize}rpx`}:{},{e:l.p({fontSize:l.unref(a).titleFontSize,label:l.unref(a).title}),f:l.unref(a).label},l.unref(a).label?{g:l.p({color:l.unref(a).labelColor,fontSize:22,label:l.unref(a).label})}:{},{h:l.n(l.unref(a).showAvatar?"pl-24":""),i:l.unref(a).rightText},l.unref(a).rightText?{j:l.p({color:l.unref(a).rightColor,fontSize:24,label:l.unref(a).rightText})}:{},{k:l.unref(a).rightIcon},l.unref(a).rightIcon?{l:l.p({_class:"opacity-3",name:l.unref(a).rightIcon,fontSize:22})}:{},{m:l.n(l.unref(a).url?"url":""),n:l.o(o),o:l.p({color:r.color,followTheme:r.followTheme,dark:r.dark,followDark:r.followDark,round:r.round,shadow:r.shadow,outlined:r.outlined,border:r.border,borderStyle:r.borderStyle,borderDirection:r.borderDirection,text:r.text,transprent:r.transprent,linear:r.linear,linearDeep:r.linearDeep,width:r.width,height:r.height,margin:r.margin,padding:r.padding,_class:r._class,_style:r._style,"hover-class":"opacity-6"}),p:l.unref(a).bottomBorder},l.unref(a).bottomBorder?{q:`${""!==l.unref(a).avatar?l.unref(a).avatarSize+l.unref(a).margin[0]:0}rpx`,r:l.p({margin:[0,0]})}:{})}});var h,b,y=l._export_sfc(g,[["__scopeId","data-v-f6a4c890"]]);wx.createComponent(y);
