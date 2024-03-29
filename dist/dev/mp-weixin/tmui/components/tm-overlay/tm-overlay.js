"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-overlay",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    // 内容的对齐方式的类
    align: {
      type: String,
      default: "flex-col-center-center"
    },
    //当前组件的主题。可以是颜色值，也可以是主题名称。
    bgColor: {
      type: String,
      default: "rgba(0,0,0,0.24)"
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 300
    },
    contentAnimation: {
      type: Boolean,
      default: false
    },
    /** 是否嵌入弹层，开启后将在它的父组件内执行弹层。 */
    inContent: {
      type: Boolean,
      default: false
    },
    /** 是否使用teleport */
    teleport: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "open", "close", "update:show"],
  setup(__props, { expose, emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const defaultBgColor = "rgba(0,0,0,0.24)";
    ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    const customCSSStyle = tmui_tool_lib_minxs.computedStyle(props);
    const customClass = tmui_tool_lib_minxs.computedClass(props);
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    common_vendor.ref(false);
    common_vendor.index.$tm.u.getUid(1);
    let timerId = NaN;
    common_vendor.ref(null);
    const showMask = common_vendor.ref(false);
    const ani = common_vendor.ref(false);
    common_vendor.onUnmounted(() => clearTimeout(timerId));
    const align_rpx = common_vendor.computed(() => props.align);
    const bgColor_rp = common_vendor.computed(() => {
      if (!props.bgColor || props.transprent)
        return "rgba(0,0,0,0)";
      return props.bgColor || defaultBgColor;
    });
    const _inContent = common_vendor.ref(props.inContent);
    const isNvue = common_vendor.ref(false);
    let timerIdth_flas = false;
    common_vendor.onMounted(() => {
      if (!props.show)
        return;
      open(props.show);
    });
    function throttle(func, wait = 500, immediate = true) {
      if (immediate) {
        if (!timerIdth_flas) {
          timerIdth_flas = true;
          typeof func === "function" && func();
          setTimeout(() => {
            timerIdth_flas = false;
          }, wait);
        }
      } else {
        if (!timerIdth_flas) {
          timerIdth_flas = true;
          setTimeout(() => {
            timerIdth_flas = false;
            typeof func === "function" && func();
          }, wait);
        }
      }
    }
    function close() {
      if (timerId) {
        clearTimeout(timerId);
        timerId = NaN;
      }
      open(false);
    }
    function closeByclick(e) {
      try {
        e.stopPropagation();
        e.stopImmediatePropagation();
      } catch (e2) {
      }
      if (timerId) {
        clearTimeout(timerId);
        timerId = NaN;
      }
      emits("click", e);
      if (!props.overlayClick)
        return;
      open(false);
    }
    function open(off) {
      if (off == true) {
        common_vendor.index.hideKeyboard();
      }
      fadeInVue(off);
    }
    function fadeInVue(off = false) {
      if (showMask.value == off)
        return;
      throttle(
        function() {
          if (off == false) {
            ani.value = false;
            setTimeout(function() {
              showMask.value = off;
              emits("close");
              emits("update:show", false);
            }, props.duration + 10);
          } else {
            showMask.value = true;
            setTimeout(function() {
              ani.value = true;
            }, 10);
            emits("open");
            setTimeout(function() {
              emits("update:show", true);
            }, props.duration);
          }
        },
        props.duration + 10,
        true
      );
    }
    common_vendor.watch(
      () => props.show,
      (newval) => {
        open(newval);
      }
    );
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      var _a2, _b;
      return common_vendor.e$1({
        a: showMask.value
      }, showMask.value ? {
        b: common_vendor.n(common_vendor.unref(bgColor_rp) && !props.transprent && ani.value ? "blurOnOpacity" : "blurOffOpacity"),
        c: common_vendor.n(((_a2 = common_vendor.unref(store).tmuiConfig) == null ? void 0 : _a2.themeConfig.overflowBlur) && common_vendor.unref(bgColor_rp) && !props.transprent && ani.value ? "blurOn" : ""),
        d: common_vendor.n(((_b = common_vendor.unref(store).tmuiConfig) == null ? void 0 : _b.themeConfig.overflowBlur) && common_vendor.unref(bgColor_rp) && !props.transprent && !ani.value ? "blurOff" : ""),
        e: common_vendor.s(common_vendor.unref(bgColor_rp) && !props.transprent ? {
          backgroundColor: showMask.value ? common_vendor.unref(bgColor_rp) : ""
        } : ""),
        f: common_vendor.s(_inContent.value && !isNvue.value ? {
          width: "100%",
          height: "100%"
        } : {
          width: common_vendor.unref(sysinfo).width + "px",
          height: common_vendor.unref(sysinfo).height + "px"
        }),
        g: common_vendor.s({
          transitionDuration: props.duration + "ms"
        }),
        h: common_vendor.o(closeByclick),
        i: common_vendor.n(common_vendor.unref(align_rpx)),
        j: common_vendor.n(common_vendor.unref(customClass)),
        k: common_vendor.n(props.contentAnimation ? "overlay" : ""),
        l: common_vendor.n(props.contentAnimation && ani.value ? "blurOnOpacity " : ""),
        m: common_vendor.n(props.contentAnimation && !ani.value ? "blurOffOpacity overlay" : ""),
        n: common_vendor.s(_inContent.value && !isNvue.value ? {
          width: "100%",
          height: "100%",
          top: "0px"
        } : {
          width: common_vendor.unref(sysinfo).width + "px",
          height: common_vendor.unref(sysinfo).height + "px"
        }),
        o: common_vendor.s(common_vendor.unref(customCSSStyle)),
        p: common_vendor.s(_inContent.value && !isNvue.value ? {
          width: "100%",
          height: "100%",
          top: "0px",
          position: "absolute"
        } : {
          width: common_vendor.unref(sysinfo).width + "px",
          height: common_vendor.unref(sysinfo).height + "px",
          top: 0 + "px",
          position: "fixed"
        }),
        q: common_vendor.s(__props.zIndex ? {
          zIndex: __props.zIndex
        } : "")
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-009fda2d"], ["__file", "C:/Users/admin/Desktop/github/love-space/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
wx.createComponent(Component);
