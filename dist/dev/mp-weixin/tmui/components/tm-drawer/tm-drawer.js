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
if (!Math) {
  (tmText + tmIcon + tmTranslate + tmOverlay)();
}
const tmTranslate = () => "../tm-translate/tm-translate.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmOverlay = () => "../tm-overlay/tm-overlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-drawer",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    //是否显示遮罩
    mask: {
      type: [Boolean, String],
      default: true
    },
    //抽屉放置的位置
    placement: {
      type: String,
      default: "bottom"
      //top|left|right|bottom|center
    },
    show: {
      type: [Boolean],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 600
    },
    round: {
      type: Number,
      default: 10
    },
    //弹出的动画时间单位ms.
    duration: {
      type: Number,
      default: 300
    },
    //是否允许点击遮罩关闭
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    //如果显示关闭。标题栏被替换为左标题右关闭按钮。
    closeable: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    title: [String],
    okText: {
      type: [String],
      default: "完成"
    },
    okColor: {
      type: [String],
      default: "primary"
    },
    //true时，确认按钮将出现加载状态。
    okLoading: {
      type: [Boolean, String],
      default: false
    },
    cancelText: {
      type: [String],
      default: "取消"
    },
    hideCancel: {
      type: [Boolean, String],
      default: false
    },
    //隐藏工具栏，标题，取消，确认
    hideHeader: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 401
    },
    unit: {
      type: String,
      default: "rpx"
    },
    disabbleScroll: {
      type: Boolean,
      default: false
    },
    /** 是否嵌入弹层，开启后将在它的父组件内执行弹层。 */
    inContent: {
      type: Boolean,
      default: false
    },
    footHeight: {
      type: Number,
      default: 0
    },
    /** 是否使用teleport */
    teleport: {
      type: Boolean,
      default: true
    },
    /**打开前执行 */
    beforeOpen: {
      type: Function,
      default: null
    },
    /**关点击ok前执行，如果返回是false，将阻止关闭. */
    beforeOk: {
      type: Function,
      default: null
    },
    /**点击取消前执行，如果返回fase将阻止关闭. */
    beforeCance: {
      type: Function,
      default: null
    }
  },
  emits: ["click", "open", "close", "update:show", "ok", "cancel"],
  setup(__props, { expose, emit: emits }) {
    var _a;
    const props = __props;
    const drawerANI = common_vendor.ref(null);
    const overlayAni = common_vendor.ref(null);
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    const reverse = common_vendor.ref(true);
    const timeid = common_vendor.ref(0);
    let timerId = NaN;
    let timerIdth_flas = false;
    common_vendor.index.hideKeyboard();
    let _show = common_vendor.ref(props.show);
    const isPlaying = common_vendor.ref(false);
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
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
    timeid.value = common_vendor.index.$tm.u.getUid(4);
    if (_show.value) {
      reverse.value = false;
    }
    common_vendor.watch(
      () => props.show,
      (val) => {
        var _a2;
        if (val) {
          reverse.value = true;
        } else {
          reverse.value = false;
          (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
        }
        if (_show.value !== props.show) {
          common_vendor.nextTick$1(() => {
            var _a3;
            (_a3 = drawerANI.value) == null ? void 0 : _a3.play();
            isPlaying.value = true;
          });
        }
        _show.value = props.show;
      }
    );
    common_vendor.onMounted(() => {
      if (_show.value) {
        open();
      }
    });
    const ok_loading = common_vendor.computed(() => props.okLoading);
    const loading = common_vendor.ref(false);
    const round_rp = common_vendor.computed(() => {
      if (aniname.value == "left")
        return "round-r-" + props.round;
      if (aniname.value == "right")
        return "round-l-" + props.round;
      if (aniname.value == "up")
        return "round-b-" + props.round;
      if (aniname.value == "down")
        return "round-t-" + props.round;
      if (aniname.value == "zoom")
        return "round-" + props.round;
    });
    const reverse_rp = common_vendor.computed(() => {
      if (aniname.value != "zoom")
        return reverse.value;
      return !reverse.value;
    });
    const aniname = common_vendor.computed(() => {
      if (props.placement == "center")
        return "zoom";
      if (props.placement == "top")
        return "up";
      if (props.placement == "bottom")
        return "down";
      return props.placement;
    });
    const anwidth = common_vendor.computed(() => {
      if (aniname.value == "zoom") {
        return props.width + props.unit;
      }
      if (props.placement == "left" || props.placement == "right") {
        return props.width + props.unit;
      }
      return sysinfo.width + "px";
    });
    const anheight = common_vendor.computed(() => {
      let wucha = 0;
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        return props.height + wucha + props.unit;
      }
      return sysinfo.height + "px";
    });
    const contentHeight = common_vendor.computed(() => {
      let base_height = props.hideHeader ? 0 : 44;
      let _footerHeight = common_vendor.index.$tm.u.topx(props.footHeight);
      if (props.placement == "top" || props.placement == "bottom" || aniname.value == "zoom") {
        let h = props.height;
        if (props.unit == "rpx") {
          h = common_vendor.index.upx2px(props.height);
        }
        return h - base_height - _footerHeight + "px";
      }
      return sysinfo.height - base_height - _footerHeight + "px";
    });
    const align_rp = common_vendor.computed(() => {
      if (aniname.value == "down") {
        return "flex-col-bottom-center";
      }
      if (aniname.value == "up") {
        return "flex-top-custom";
      }
      if (aniname.value == "left") {
        return "flex-row-top-start";
      }
      if (aniname.value == "right") {
        return "flex-row-bottom-start";
      }
      if (aniname.value == "zoom") {
        return "flex-center";
      }
    });
    async function _beforeOpenFun() {
      if (typeof props.beforeOpen === "function") {
        loading.value = true;
        let p = await props.beforeOpen();
        if (typeof p === "function") {
          p = await p();
        }
        loading.value = false;
      }
    }
    async function _beforeOkFun() {
      let p = true;
      if (typeof props.beforeOk === "function") {
        loading.value = true;
        p = await props.beforeOk();
        if (typeof p === "function") {
          p = await p();
        }
        loading.value = false;
        if (!p)
          return;
      }
      return p;
    }
    async function _beforeCancelFun() {
      let p = true;
      if (typeof props.beforeCance === "function") {
        loading.value = true;
        p = await props.beforeCance();
        if (typeof p === "function") {
          p = await p();
        }
        loading.value = false;
        if (!p)
          return;
      }
      return p;
    }
    function OverLayOpen() {
      _beforeOpenFun();
      _show.value = true;
      emits("open");
      emits("update:show", true);
    }
    function overclose() {
      common_vendor.nextTick$1(() => {
        _show.value = false;
        emits("close");
        emits("update:show", false);
      });
    }
    async function overlayClickFun(e) {
      if (!props.overlayClick || props.disabled || !overlayAni.value || loading.value || isPlaying.value)
        return;
      emits("click", e);
      if (!await _beforeCancelFun())
        return;
      reverse.value = false;
      throttle(
        async () => {
          var _a2, _b;
          emits("cancel");
          (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
          (_b = drawerANI.value) == null ? void 0 : _b.play();
        },
        props.duration + 80,
        true
      );
    }
    function playEndEvent() {
      isPlaying.value = false;
    }
    async function ok() {
      if (props.disabled || loading.value)
        return;
      if (!await _beforeOkFun())
        return;
      reverse.value = false;
      debounce(
        () => {
          var _a2, _b;
          emits("ok");
          (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
          (_b = drawerANI.value) == null ? void 0 : _b.play();
        },
        500,
        true
      );
    }
    async function cancel() {
      if (props.disabled || loading.value)
        return;
      if (!await _beforeCancelFun())
        return;
      reverse.value = false;
      debounce(
        () => {
          var _a2, _b;
          emits("cancel");
          (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
          (_b = drawerANI.value) == null ? void 0 : _b.play();
        },
        500,
        true
      );
    }
    function open() {
      reverse.value = true;
      _show.value = true;
      common_vendor.nextTick$1(() => {
        var _a2;
        (_a2 = drawerANI.value) == null ? void 0 : _a2.play();
      });
    }
    function close() {
      var _a2, _b;
      reverse.value = false;
      (_a2 = overlayAni.value) == null ? void 0 : _a2.close();
      (_b = drawerANI.value) == null ? void 0 : _b.play();
    }
    expose({
      close,
      open
    });
    return (_ctx, _cache) => {
      return common_vendor.e$1({
        a: common_vendor.o(open),
        b: !props.closeable && !props.hideHeader
      }, !props.closeable && !props.hideHeader ? common_vendor.e$1({
        c: !props.hideCancel && !loading.value && !common_vendor.unref(ok_loading)
      }, !props.hideCancel && !loading.value && !common_vendor.unref(ok_loading) ? {
        d: common_vendor.o(cancel),
        e: common_vendor.p({
          label: props.cancelText
        })
      } : {}, {
        f: common_vendor.p({
          _class: "text-overflow-1 opacity-7",
          label: props.title
        }),
        g: !common_vendor.unref(ok_loading) && !loading.value
      }, !common_vendor.unref(ok_loading) && !loading.value ? {
        h: common_vendor.o(ok),
        i: common_vendor.p({
          color: __props.okColor,
          dark: props.dark,
          label: props.okText
        })
      } : {}, {
        j: common_vendor.unref(ok_loading) || loading.value
      }, common_vendor.unref(ok_loading) || loading.value ? {
        k: common_vendor.p({
          color: __props.okColor,
          spin: common_vendor.unref(ok_loading) || loading.value,
          dark: common_vendor.unref(isDark),
          _class: common_vendor.unref(isDark) !== true ? "opacity-4" : "",
          fontSize: 24,
          name: common_vendor.unref(ok_loading) || loading.value ? "tmicon-shuaxin" : "tmicon-times-circle-fill"
        })
      } : {}) : {}, {
        l: props.closeable && !props.hideHeader
      }, props.closeable && !props.hideHeader ? {
        m: common_vendor.p({
          _class: "text-overflow-1 opacity-7",
          dark: props.dark,
          label: props.title
        }),
        n: common_vendor.o(cancel),
        o: common_vendor.p({
          dark: props.dark,
          _class: common_vendor.unref(isDark) !== true ? "opacity-3" : "",
          fontSize: 36,
          name: "tmicon-times-circle-fill"
        })
      } : {}, {
        p: props.disabbleScroll ? "normal" : "auto",
        q: common_vendor.unref(contentHeight),
        r: props.footHeight > 0
      }, props.footHeight > 0 ? {} : {}, {
        s: common_vendor.o(($event) => $event.stopPropagation()),
        t: common_vendor.s({
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight)
        }),
        v: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).borderCss : ""),
        w: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).backgroundColorCss : ""),
        x: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).shadowColor : ""),
        y: common_vendor.s(common_vendor.unref(customCSSStyle)),
        z: common_vendor.n(common_vendor.unref(round_rp)),
        A: common_vendor.n(common_vendor.unref(customClass)),
        B: common_vendor.sr(drawerANI, "ce9446c4-1,ce9446c4-0", {
          "k": "drawerANI"
        }),
        C: common_vendor.o(playEndEvent),
        D: common_vendor.p({
          reverse: common_vendor.unref(reverse_rp),
          width: common_vendor.unref(anwidth),
          height: common_vendor.unref(anheight),
          ["auto-play"]: false,
          name: common_vendor.unref(aniname),
          duration: props.duration + 80
        }),
        E: common_vendor.sr(overlayAni, "ce9446c4-0", {
          "k": "overlayAni"
        }),
        F: common_vendor.o(OverLayOpen),
        G: common_vendor.o(overclose),
        H: common_vendor.o(overlayClickFun),
        I: common_vendor.o(($event) => common_vendor.isRef(_show) ? _show.value = $event : _show = $event),
        J: common_vendor.p({
          inContent: props.inContent,
          duration: props.duration + 80,
          zIndex: props.zIndex,
          transprent: !props.mask,
          align: common_vendor.unref(align_rp),
          teleport: props.teleport,
          overlayClick: false,
          show: common_vendor.unref(_show)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce9446c4"], ["__file", "C:/Users/admin/Desktop/github/love-space/src/tmui/components/tm-drawer/tm-drawer.vue"]]);
wx.createComponent(Component);
