"use strict";var e=Object.defineProperty,r=Object.defineProperties,o=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,n=(r,o,t)=>o in r?e(r,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[o]=t,a=require("../common/vendor.js"),s=require("./tool/lib/fetch.js"),u=require("./tool/theme/theme.js"),p=require("./tool/function/util.js"),c=require("./tool/lib/language.js"),b=require("./tool/lib/share.js"),g=require("./tool/function/preview.js");const m={isColor:u.theme.isCssColor,u:(f=((e,r)=>{for(var o in r||(r={}))i.call(r,o)&&n(e,o,r[o]);if(t)for(var o of t(r))l.call(r,o)&&n(e,o,r[o]);return e})({},p.util),h={preview:g.preview},r(f,o(h))),language:c.language,fetch:s.fetchNet};var f,h;a.index.$tm=m;var j={install:(e,r)=>{e.use(c.languageByGlobal());const{onShareAppMessage:o,onShareTimeline:t}=b.share();e.mixin({onShareAppMessage:o,onShareTimeline:t}),e.config.globalProperties.tm=m}};exports.tmui=j;