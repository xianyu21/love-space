"use strict";
const common_vendor = require("../../common/vendor.js");
const tmui_tool_lib_language = require("../../tmui/tool/lib/language.js");
const tmui_tool_lib_tmpinia = require("../../tmui/tool/lib/tmpinia.js");
const common_assets = require("../../common/assets.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Math) {
  (tmText + tmIcon + tmCell + tmSheet + tmImage + tmInput + tmButton + tmCol + tmRow + tmCheckbox + tmDivider + tmSticky + tmFloatButton + tmMessage + tmDrawer + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmButton = () => "../../tmui/components/tm-button/tm-button.js";
const tmFloatButton = () => "../../tmui/components/tm-float-button/tm-float-button.js";
const tmMessage = () => "../../tmui/components/tm-message/tm-message.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmDivider = () => "../../tmui/components/tm-divider/tm-divider.js";
const tmIcon = () => "../../tmui/components/tm-icon/tm-icon.js";
const tmDrawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const tmCheckbox = () => "../../tmui/components/tm-checkbox/tm-checkbox.js";
const tmSticky = () => "../../tmui/components/tm-sticky/tm-sticky.js";
const tmRow = () => "../../tmui/components/tm-row/tm-row.js";
const tmCol = () => "../../tmui/components/tm-col/tm-col.js";
const tmImage = () => "../../tmui/components/tm-image/tm-image.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmCell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    var _a;
    ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const app = common_vendor.ref(null);
    const msg = common_vendor.ref(null);
    const showf = common_vendor.ref(false);
    const sysinfo = common_vendor.index.$tm.u.getWindow();
    const str = common_vendor.ref("");
    const showCustomColor = common_vendor.ref("#60ab41");
    const showCustomName = common_vendor.ref("darkGreen");
    const showCustom = common_vendor.ref(false);
    const autoDark = common_vendor.ref(store.tmuiConfig.autoDark);
    const headerBgColor = common_vendor.computed(() => {
      if (store.tmStore.dark) {
        return [];
      }
      return store.tmStore.color ? [] : ["#f5f5f5", "#f5f5f5"];
    });
    const tmuiVer = "TMUI 3.1.05";
    const category = [
      {
        url: "../changyong/index",
        color: "primary",
        icon: "tmicon-layergroup-fill",
        title: "index.com.tongyong",
        label: "index.com.tongyongSub"
      },
      {
        url: "../layout/index",
        color: "yellow",
        icon: "tmicon-map-fill",
        title: "index.com.row",
        label: "index.com.rowSub"
      },
      {
        url: "../showdata/index",
        color: "pink",
        icon: "tmicon-paperplane-fill",
        title: "index.com.show",
        label: "index.com.showSub"
      },
      {
        url: "../form/index",
        color: "cyan",
        icon: "tmicon-commentdots-fill",
        title: "index.com.form",
        label: "index.com.formSub"
      },
      {
        url: "../fankui/index",
        color: "red",
        icon: "tmicon-lightbulb-fill",
        title: "index.com.fd",
        label: "index.com.fdSub"
      },
      {
        url: "../daohang/index",
        color: "orange",
        icon: "tmicon-flag-fill",
        title: "index.com.nav",
        label: "index.com.navSub"
      },
      {
        url: "../yewu/index",
        color: "purple",
        icon: "tmicon-box-fill",
        title: "index.com.yewu",
        label: "index.com.yewuSub"
      },
      {
        url: "../other/index",
        color: "blue-grey",
        icon: "tmicon-smile-fill",
        title: "index.com.other",
        label: "index.com.otherSub"
      },
      {
        url: "../pag/index",
        color: "indigo",
        icon: "tmicon-ios-ice-cream",
        title: "index.com.pag",
        label: "index.com.pagSub"
      },
      {
        url: "../render/index",
        color: "lime",
        icon: "tmicon-ios-rose",
        title: "index.com.render",
        label: "index.com.renderSub"
      },
      {
        url: "../chart/index",
        color: "brown",
        icon: "tmicon-borderbottom-fill",
        title: "index.com.tubiao",
        label: "index.com.tubiaoSub"
      }
    ];
    function toLinks(url) {
      common_vendor.index.navigateTo({ url });
    }
    function onChangeDark() {
      var _a2;
      (_a2 = app.value) == null ? void 0 : _a2.setDark();
    }
    function search() {
      var _a2;
      if (str.value.trim() === "") {
        (_a2 = msg.value) == null ? void 0 : _a2.show({
          model: "error",
          text: "不能为空",
          mask: true
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "search?key=" + str.value
      });
    }
    function seLocal() {
      if (tmui_tool_lib_language.language("language") == "English-US") {
        common_vendor.index.setLocale("zh-Hans");
      } else {
        common_vendor.index.setLocale("en");
      }
    }
    function setTheme(colorname) {
      var _a2;
      (_a2 = app.value) == null ? void 0 : _a2.setTheme(colorname);
    }
    function changeCustomColor() {
      var _a2;
      if (!showCustomColor.value || !showCustomName.value) {
        (_a2 = msg.value) == null ? void 0 : _a2.show({
          model: "error",
          text: "必填内容",
          mask: true
        });
        return;
      }
      showCustom.value = false;
      store.setTmVuetifyAddTheme(showCustomName.value, showCustomColor.value);
    }
    common_vendor.onLoad(() => {
    });
    function autoDarkChange(e) {
      store.setTmAutoDark(e);
      autoDark.value = e;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          sys
        }, s0, i0) => {
          return {
            a: `${sys.width}px`,
            b: `${sys.height}px`,
            c: `https://picsum.photos/${sys.width}/${sys.height}?id=${Math.random()}`,
            d: "4ebf1ec3-2-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            e: "4ebf1ec3-3-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            f: "4ebf1ec3-4-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            g: "4ebf1ec3-5-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            h: "4ebf1ec3-6-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            i: "4ebf1ec3-7-" + i0 + "," + ("4ebf1ec3-1-" + i0),
            j: `${sys.width}px`,
            k: `${sys.height}px`,
            l: "4ebf1ec3-1-" + i0 + ",4ebf1ec3-0",
            m: i0,
            n: s0
          };
        }, {
          name: "menu",
          path: "a",
          vueId: "4ebf1ec3-0"
        }),
        b: common_vendor.unref(sysinfo).sysinfo.statusBarHeight + "px",
        c: common_vendor.p({
          label: "TMUI 3.1.0"
        }),
        d: common_vendor.o(($event) => showf.value = false),
        e: common_vendor.p({
          color: "white",
          ["font-size"]: 32,
          name: "tmicon-times"
        }),
        f: common_vendor.p({
          url: "/pages/changyong/index",
          color: "primary",
          transprent: true,
          margin: [10, 0],
          title: "通用组件"
        }),
        g: common_vendor.p({
          url: "/pages/layout/index",
          color: "primary",
          transprent: true,
          margin: [10, 0],
          title: "布局组件"
        }),
        h: common_vendor.p({
          url: "/pages/showdata/index",
          color: "primary",
          transprent: true,
          margin: [10, 0],
          title: "展示组件"
        }),
        i: common_vendor.p({
          url: "/pages/form/index",
          color: "primary",
          transprent: true,
          margin: [10, 0],
          title: "表单录入"
        }),
        j: common_vendor.p({
          margin: [0, 0],
          padding: [0, 0],
          color: "indigo",
          linearDeep: "accent",
          linear: "bottom"
        }),
        k: common_vendor.unref(sysinfo).statusBarHeight + "px",
        l: common_vendor.p({
          width: 108,
          height: 67.5,
          src: common_vendor.unref(common_assets.logoimg)
        }),
        m: common_vendor.p({
          ["folow-theme"]: false,
          _class: "text-weight-b",
          ["font-size"]: 36,
          label: tmuiVer
        }),
        n: common_vendor.p({
          ["folow-theme"]: false,
          _class: "opacity-6",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.search.subtext")
        }),
        o: common_vendor.o(search),
        p: common_vendor.o(($event) => str.value = $event),
        q: common_vendor.p({
          ["focus-color"]: "white",
          text: false,
          color: "white",
          round: 16,
          transprent: common_vendor.unref(store).tmStore.dark,
          placeholder: common_vendor.unref(tmui_tool_lib_language.language)("index.search.tips"),
          showClear: true,
          prefix: "tmicon-search",
          modelValue: str.value
        }),
        r: common_vendor.p({
          text: false,
          linear: common_vendor.unref(store).tmStore.dark ? "" : "bottom",
          ["linear-color"]: common_vendor.unref(headerBgColor),
          margin: [0, 0],
          followTheme: true
        }),
        s: common_vendor.o(($event) => setTheme("yellow")),
        t: common_vendor.p({
          round: 8,
          width: 100,
          color: "yellow",
          size: "small",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.themeGreen")
        }),
        v: common_vendor.o(($event) => setTheme("blue")),
        w: common_vendor.p({
          round: 8,
          width: 100,
          color: "blue",
          size: "small",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.themeBlue")
        }),
        x: common_vendor.o(($event) => setTheme("red")),
        y: common_vendor.p({
          round: 8,
          width: 100,
          color: "red",
          size: "small",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.themeRed")
        }),
        z: common_vendor.o(($event) => showCustom.value = true),
        A: common_vendor.p({
          round: 8,
          color: "brown",
          width: 100,
          size: "small",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.themeCustText")
        }),
        B: common_vendor.o(($event) => setTheme("")),
        C: common_vendor.p({
          round: 8,
          width: 160,
          size: "small",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.themeDefault")
        }),
        D: common_vendor.p({
          shadow: 6,
          margin: [24],
          padding: [24],
          round: 6
        }),
        E: common_vendor.f(category, (item, index, i0) => {
          return {
            a: "4ebf1ec3-23-" + i0 + "," + ("4ebf1ec3-22-" + i0),
            b: common_vendor.p({
              color: item.color,
              _class: "pb-10",
              ["font-size"]: 52,
              name: item.icon
            }),
            c: "4ebf1ec3-24-" + i0 + "," + ("4ebf1ec3-22-" + i0),
            d: common_vendor.p({
              ["font-size"]: 28,
              _class: "font-weight-b",
              label: common_vendor.unref(tmui_tool_lib_language.language)(item.title)
            }),
            e: "4ebf1ec3-25-" + i0 + "," + ("4ebf1ec3-22-" + i0),
            f: common_vendor.p({
              color: "grey",
              ["font-size"]: 22,
              _class: "font-weight-b",
              label: common_vendor.unref(tmui_tool_lib_language.language)(item.label)
            }),
            g: common_vendor.o(($event) => toLinks(item.url), index),
            h: index,
            i: "4ebf1ec3-22-" + i0 + ",4ebf1ec3-21"
          };
        }),
        F: common_vendor.p({
          height: 190
        }),
        G: common_vendor.p({
          width: 702,
          column: 3,
          round: 6
        }),
        H: common_vendor.p({
          ["paren-class"]: "overflow",
          shadow: 6,
          round: 6,
          margin: [24, 0],
          padding: [0, 0]
        }),
        I: common_vendor.p({
          color: "orange",
          ["font-size"]: 38,
          name: "tmicon-heart-fill"
        }),
        J: common_vendor.p({
          url: "../wxaccount/user",
          margin: [24, 0, 24, 16],
          showAvatar: true,
          round: 4,
          titleFontSize: 30,
          title: common_vendor.unref(tmui_tool_lib_language.language)("index.com.love"),
          label: "可登录模板市场",
          rightText: common_vendor.unref(tmui_tool_lib_language.language)("index.com.loveSub")
        }),
        K: common_vendor.p({
          color: "primary",
          ["font-size"]: 38,
          name: "tmicon-resource"
        }),
        L: common_vendor.o(seLocal),
        M: common_vendor.p({
          margin: [24, 0, 24, 16],
          showAvatar: true,
          round: 4,
          titleFontSize: 30,
          title: common_vendor.unref(tmui_tool_lib_language.language)("index.com.setLocal"),
          rightText: common_vendor.unref(tmui_tool_lib_language.language)("language")
        }),
        N: common_vendor.p({
          color: "pink",
          ["font-size"]: 38,
          name: "tmicon-ios-color-palette"
        }),
        O: common_vendor.o(autoDarkChange),
        P: common_vendor.o(($event) => autoDark.value = $event),
        Q: common_vendor.p({
          round: 24,
          modelValue: autoDark.value
        }),
        R: common_vendor.p({
          margin: [24, 0],
          showAvatar: true,
          round: 4,
          titleFontSize: 30,
          title: common_vendor.unref(tmui_tool_lib_language.language)("index.com.autoDark")
        }),
        S: common_vendor.p({
          color: "grey-2",
          label: common_vendor.unref(tmui_tool_lib_language.language)("index.com.bottom")
        }),
        T: common_vendor.o(onChangeDark),
        U: common_vendor.p({
          btn: {
            icon: "tmicon-ios-sunny",
            color: "pink",
            linear: "right"
          }
        }),
        V: common_vendor.sr(msg, "4ebf1ec3-35,4ebf1ec3-0", {
          "k": "msg"
        }),
        W: common_vendor.p({
          _class: "text-weight-b",
          ["font-size"]: 32,
          label: "自定义主题"
        }),
        X: common_vendor.o(($event) => showCustomColor.value = $event),
        Y: common_vendor.p({
          round: 16,
          prefixLabel: "颜色值",
          placeholder: "请输入颜色值,比如:#FF00FF",
          border: 1,
          showClear: true,
          modelValue: showCustomColor.value
        }),
        Z: common_vendor.o(($event) => showCustomName.value = $event),
        aa: common_vendor.p({
          round: 16,
          prefixLabel: "颜色名称",
          margin: [0, 24],
          placeholder: "字母,如:darkGreen",
          border: 1,
          showClear: true,
          modelValue: showCustomName.value
        }),
        ab: common_vendor.o(changeCustomColor),
        ac: common_vendor.p({
          round: 16,
          block: true,
          label: "确认切换"
        }),
        ad: common_vendor.o(($event) => showCustom.value = $event),
        ae: common_vendor.p({
          placement: "center",
          hideHeader: true,
          height: 450,
          width: 600,
          show: showCustom.value
        }),
        af: common_vendor.sr(app, "4ebf1ec3-0", {
          "k": "app"
        }),
        ag: common_vendor.o(($event) => showf.value = $event),
        ah: common_vendor.p({
          ["show-menu"]: showf.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/github/love-space/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
