"use strict";
var _a, _b, _c, _d, _e, _f;
const common_vendor = require("../common/vendor.js");
const tmui_tool_lib_fetch = require("./tool/lib/fetch.js");
const tmui_tool_function_util = require("./tool/function/util.js");
const tmui_tool_lib_language = require("./tool/lib/language.js");
const tmui_tool_lib_share = require("./tool/lib/share.js");
const tmui_tool_router_index = require("./tool/router/index.js");
const tmui_tool_lib_tmuiconfigDefault = require("./tool/lib/tmuiconfigDefault.js");
const tmui_tool_function_preview = require("./tool/function/preview.js");
let pages = [];
if (typeof ((_a = common_vendor.t) == null ? void 0 : _a.pages) == "undefined") {
  common_vendor.t.pages = [];
}
common_vendor.t.pages.forEach((el) => {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g;
  let customType = ((_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) ?? "default";
  let bg = (((_b2 = el.style) == null ? void 0 : _b2.navigationBarBackgroundColor) ?? ((_d2 = (_c2 = common_vendor.t) == null ? void 0 : _c2.globalStyle) == null ? void 0 : _d2.navigationBarBackgroundColor) ?? "#FFFFFF") || "#FFFFFF";
  let txtColor = (((_e2 = el.style) == null ? void 0 : _e2.navigationBarTextStyle) ?? ((_g = (_f2 = common_vendor.t) == null ? void 0 : _f2.globalStyle) == null ? void 0 : _g.navigationBarTextStyle) ?? "black") || "black";
  pages.push({
    path: el.path,
    custom: customType,
    navigationBarBackgroundColor: bg,
    navigationBarTextStyle: txtColor
  });
});
if (Array.isArray(((_b = common_vendor.t) == null ? void 0 : _b.subPackages) ?? null)) {
  (_c = common_vendor.t) == null ? void 0 : _c.subPackages.forEach((el) => {
    let rootPath = el.root;
    el.pages.forEach((el2) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g;
      let elany = el2;
      let bg = (((_a2 = el2.style) == null ? void 0 : _a2.navigationBarBackgroundColor) ?? ((_c2 = (_b2 = common_vendor.t) == null ? void 0 : _b2.globalStyle) == null ? void 0 : _c2.navigationBarBackgroundColor) ?? "#FFFFFF") || "#FFFFFF";
      let txtColor = (((_d2 = el2.style) == null ? void 0 : _d2.navigationBarTextStyle) ?? ((_f2 = (_e2 = common_vendor.t) == null ? void 0 : _e2.globalStyle) == null ? void 0 : _f2.navigationBarTextStyle) ?? "black") || "black";
      pages.push({
        path: rootPath + "/" + elany.path,
        custom: ((_g = elany == null ? void 0 : elany.style) == null ? void 0 : _g.navigationStyle) ?? "default",
        navigationBarBackgroundColor: bg,
        navigationBarTextStyle: txtColor
      });
    });
  });
}
let pagers = common_vendor.t;
let tabBar = (pagers == null ? void 0 : pagers.tabBar) ?? {
  color: "",
  selectedColor: "",
  borderStyle: "",
  backgroundColor: "",
  list: []
};
let cusutomIconList = [];
let $tm = {
  tabBar,
  pages,
  globalNavStyle: ((_d = common_vendor.t) == null ? void 0 : _d.globalStyle.navigationStyle) ?? "",
  isOpenDarkModel: (((_f = (_e = common_vendor.t) == null ? void 0 : _e.globalStyle) == null ? void 0 : _f.navigationBarBackgroundColor) ?? "").indexOf("@") > -1,
  isColor: (color) => {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  },
  /**tmui3.0工具函数 */
  u: { ...tmui_tool_function_util.util, preview: tmui_tool_function_preview.preview },
  /**tmui3.0国际化语言辅助函数 */
  language: tmui_tool_lib_language.language,
  fetch: tmui_tool_lib_fetch.fetchNet,
  tmicon: [
    {
      font: "tmicon",
      prefix: "tmicon-",
      fontJson: cusutomIconList
    }
  ],
  config: tmui_tool_lib_tmuiconfigDefault.tmuiconfigdefault
};
const tmui = {
  /**
   * tmui3.0
   * @param app Vue
   * @param options tmui3.0配置
   */
  install: (app, options = {}) => {
    common_vendor.index.addInterceptor("navigateTo", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          linsInko({
            path: result.url,
            context: null,
            openType: "navigateTo"
          });
        });
      },
      success(result) {
      }
    });
    common_vendor.index.addInterceptor("redirectTo", {
      success(result) {
        let pages2 = getCurrentPages().pop();
        let path = (pages2 == null ? void 0 : pages2.route) ?? "";
        let msg = result.errMsg ?? "";
        let opentype = msg.split(":")[0] ?? "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("reLaunch", {
      success(result) {
        let pages2 = getCurrentPages().pop();
        let path = (pages2 == null ? void 0 : pages2.route) ?? "";
        let msg = result.errMsg ?? "";
        let opentype = msg.split(":")[0] ?? "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("navigateBack", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          let pages2 = getCurrentPages().pop();
          let path = (pages2 == null ? void 0 : pages2.route) ?? "";
          let msg = result.errMsg ?? "";
          msg.split(":")[0] ?? "";
          linsInko({
            path,
            context: null,
            openType: "navigateBack"
          });
        });
      },
      success(result) {
      }
    });
    function linsInko(obj) {
      var _a2, _b2;
      obj.path = obj.path[0] == "/" ? obj.path.substr(1) : obj.path;
      ((_a2 = options.router) == null ? void 0 : _a2.useTmRouterBefore) ? (_b2 = options.router) == null ? void 0 : _b2.useTmRouterBefore(obj) : tmui_tool_router_index.useTmRouterBefore();
    }
    options = tmui_tool_function_util.deepObjectMerge($tm.config, options);
    const pinia = app.config.globalProperties.$pinia || null;
    const tmPiniaPlugin = (context) => {
      if (context.store.$id === "tmpinia") {
        context.store.tmuiConfig = options;
        context.store.$state.tmuiConfig = options;
      }
    };
    if (pinia) {
      pinia.use(tmPiniaPlugin);
    } else {
      const pinia2 = common_vendor.createPinia();
      pinia2.use(tmPiniaPlugin);
      app.use(pinia2);
    }
    app.use(tmui_tool_lib_language.languageByGlobal());
    let appconfig = {};
    if (!$tm.config.shareDisable) {
      const { onShareAppMessage, onShareTimeline } = tmui_tool_lib_share.share();
      appconfig = { ...appconfig, onShareAppMessage, onShareTimeline };
    }
    app.mixin({
      ...appconfig
    });
    $tm = {
      ...$tm,
      config: options
    };
    common_vendor.index.$tm = $tm;
    app.config.globalProperties.tm = $tm;
  }
};
exports.tmui = tmui;
