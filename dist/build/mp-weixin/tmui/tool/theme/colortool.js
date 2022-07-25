"use strict";var a={rgbaToHsla(a){let{r:r,g:e,b:t,a:s}=a;r/=255,e/=255,t/=255;var n=Math.min(r,e,t),b=Math.max(r,e,t),o=(n+b)/2,c=b-n,h=0,l=0;if(b==n)h=0,l=0;else{switch(l=o>.5?c/(2-b-n):c/(b+n),b){case r:h=(e-t)/c+(e<t?6:0);break;case e:h=2+(t-r)/c;break;case t:h=4+(r-e)/c}h=Math.round(60*h)}return{h:h,s:l=Math.round(100*l),l:o=Math.round(100*o),a:s}},hslaToRgba(a){let{h:r,s:e,l:t,a:s}=a;r/=360,e/=100,t/=100;var n=[];if(0==e)n=[Math.round(255*t),Math.round(255*t),Math.round(255*t)];else{var b=t>=.5?t+e-t*e:t*(1+e),o=2*t-b;n[0]=r+1/3,n[1]=r,n[2]=r-1/3;for(var c=0;c<n.length;c++){var h=n[c];switch(h<0?h+=1:h>1&&(h-=1),!0){case h<1/6:h=o+6*(b-o)*h;break;case 1/6<=h&&h<.5:h=b;break;case.5<=h&&h<2/3:h=o+(b-o)*(4-6*h);break;default:h=o}n[c]=Math.round(255*h)}}return{r:n[0],g:n[1],b:n[2],a:s}},cssToRgba:function(a){if(!a)return{r:0,g:0,b:0,a:0};if((a=a.toLowerCase())&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(a)){if(4===a.length){let r="#";for(let e=1;e<4;e+=1)r+=a.slice(e,e+1).concat(a.slice(e,e+1));a=r}let r=[];for(let e=1;e<7;e+=2)r.push(parseInt("0x"+a.slice(e,e+2)));return{r:r[0],g:r[1],b:r[2],a:1}}if(/^(rgb|RGB|rgba|RGBA)/.test(a)){let r=a.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g,"").split(",").map((a=>Number(a)));return r.length<3?{r:0,g:0,b:0,a:1}:(3==r.length&&r.push(1),{r:r[0],g:r[1],b:r[2],a:r[3]})}return{r:0,g:0,b:0,a:1}},rgbaToHsva:function(a){if(!a)return{h:0,s:1,v:1,a:1};const r=a.r/255,e=a.g/255,t=a.b/255,s=Math.max(r,e,t),n=Math.min(r,e,t);let b=0;s!==n&&(s===r?b=60*(0+(e-t)/(s-n)):s===e?b=60*(2+(t-r)/(s-n)):s===t&&(b=60*(4+(r-e)/(s-n)))),b<0&&(b+=360);const o=[b,0===s?0:(s-n)/s,s];return{h:o[0],s:o[1],v:o[2],a:a.a}},hsvaToRgba:function(a){var r,e,t,s,n,{h:b,s:o,v:c,a:h}=a,l=0,g=0,u=0;switch(t=c*(1-o),s=c*(1-(e=6*b-(r=Math.floor(6*b)))*o),n=c*(1-(1-e)*o),r%6){case 0:l=c,g=n,u=t;break;case 1:l=s,g=c,u=t;break;case 2:l=t,g=c,u=n;break;case 3:l=t,g=s,u=c;break;case 4:l=n,g=t,u=c;break;case 5:l=c,g=t,u=s}return{r:l,g:g,b:u,a:h}},rgbaToCss:function(a){return`rgba(${a.r},${a.g},${a.b},${a.a})`}};exports.colortool=a;