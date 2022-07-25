"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a;
var common_vendor = require("../common/vendor.js");
var tmui_tool_lib_fetch = require("./tool/lib/fetch.js");
var tmui_tool_theme_theme = require("./tool/theme/theme.js");
var tmui_tool_function_util = require("./tool/function/util.js");
var tmui_tool_lib_language = require("./tool/lib/language.js");
var tmui_tool_lib_share = require("./tool/lib/share.js");
var tmui_tool_function_preview = require("./tool/function/preview.js");
const easycom = {
  autoscan: true,
  custom: {
    "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue"
  }
};
const pages$1 = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "TMUI"
    }
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#FFFFFF",
  backgroundColor: "#FFFFFF"
};
const condition = {
  current: 0,
  list: [
    {
      name: "",
      path: "",
      query: ""
    }
  ]
};
var PageJsonInit = {
  easycom,
  pages: pages$1,
  globalStyle,
  condition
};
let pages = [];
PageJsonInit.pages.forEach((el) => {
  var _a2, _b;
  pages.push({
    path: el.path,
    custom: (_b = (_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) != null ? _b : "default"
  });
});
if (Array.isArray(PageJsonInit == null ? void 0 : PageJsonInit.subPackages)) {
  PageJsonInit.subPackages.forEach((el) => {
    let rootPath = el.root;
    el.pages.forEach((el2) => {
      var _a2, _b;
      pages.push({
        path: rootPath + "/" + el2.path,
        custom: (_b = (_a2 = el2 == null ? void 0 : el2.style) == null ? void 0 : _a2.navigationStyle) != null ? _b : "default"
      });
    });
  });
}
const $tm = {
  tabBar: (_a = PageJsonInit == null ? void 0 : PageJsonInit.tabBar) != null ? _a : {
    color: "",
    selectedColor: "",
    borderStyle: "",
    backgroundColor: ""
  },
  pages,
  isColor: tmui_tool_theme_theme.theme.isCssColor,
  u: __spreadProps(__spreadValues({}, tmui_tool_function_util.util), { preview: tmui_tool_function_preview.preview }),
  language: tmui_tool_lib_language.language,
  fetch: tmui_tool_lib_fetch.fetchNet
};
common_vendor.index.$tm = $tm;
var tmui = {
  install: (app, options) => {
    app.use(tmui_tool_lib_language.languageByGlobal());
    let appconfig = {};
    const { onShareAppMessage, onShareTimeline } = tmui_tool_lib_share.share();
    appconfig = __spreadProps(__spreadValues({}, appconfig), { onShareAppMessage, onShareTimeline });
    app.mixin(__spreadValues({}, appconfig));
    app.config.globalProperties.tm = $tm;
  }
};
exports.tmui = tmui;
