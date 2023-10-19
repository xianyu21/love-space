"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_language = require("../../tool/lib/language.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-message",
  props: {
    //自定义的样式属性
    _style: {
      type: [Array, String, Object],
      default: () => {
      }
    },
    round: {
      type: Number,
      default: 12
    },
    padding: {
      type: Array,
      default: () => [24, 0]
    },
    //自定义类名
    _class: {
      type: [Array, String],
      default: "flex-center"
    },
    //是否显示遮罩
    mask: {
      type: [Boolean],
      default: true
    },
    //自动关闭时,需要显示多久关闭,单位ms
    duration: {
      type: Number,
      default: 1500
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    lines: {
      type: Number,
      default: 1
    }
  },
  emits: ["click"],
  setup(__props, { expose, emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    common_vendor.ref(null);
    common_vendor.ref(null);
    ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    const sysinfo = common_vendor.inject(
      "tmuiSysInfo",
      common_vendor.computed(() => {
        return {
          bottom: 0,
          height: 750,
          width: common_vendor.index.upx2px(750),
          top: 0,
          isCustomHeader: false,
          sysinfo: null
        };
      })
    );
    const _width = common_vendor.computed(() => sysinfo.value.width);
    const _height = common_vendor.computed(() => sysinfo.value.height);
    const _lines = common_vendor.computed(() => props.lines);
    let isNvue = common_vendor.ref(false);
    const dur = common_vendor.ref(props.duration);
    let uid = NaN;
    const bgColor = common_vendor.ref("white");
    const model_ref = common_vendor.ref("info");
    const showValue = common_vendor.ref(false);
    const icon_ref = common_vendor.ref("");
    const text_ref = common_vendor.ref("");
    const color_ref = common_vendor.ref("");
    const showMask = common_vendor.ref(props.mask);
    const dark_ref = common_vendor.ref(false);
    const lines_ref = common_vendor.ref(_lines.value);
    const modelIcon = common_vendor.computed(() => {
      return {
        load: {
          icon: "tmicon-loading",
          color: "primary",
          text: tmui_tool_lib_language.language("message.load.text")
        },
        error: {
          icon: "tmicon-times-circle",
          color: "red",
          text: tmui_tool_lib_language.language("message.error.text")
        },
        info: {
          icon: "tmicon-info-circle",
          text: tmui_tool_lib_language.language("message.info.text"),
          color: "black"
        },
        warn: {
          icon: "tmicon-exclamation-circle",
          text: tmui_tool_lib_language.language("message.warn.text"),
          color: "orange"
        },
        quest: {
          icon: "tmicon-question-circle",
          text: tmui_tool_lib_language.language("message.quest.text"),
          color: "pink"
        },
        success: {
          icon: "tmicon-check-circle",
          text: tmui_tool_lib_language.language("message.success.text"),
          color: "green"
        },
        disabled: {
          icon: "tmicon-ban",
          text: tmui_tool_lib_language.language("message.disabled.text"),
          color: "red"
        },
        wait: {
          icon: "tmicon-ios-alarm",
          text: tmui_tool_lib_language.language("message.wait.text"),
          color: "black"
        }
      };
    });
    function show(argFs) {
      if (showValue.value || !isNaN(uid)) {
        showValue.value = false;
        clearTimeout(uid);
        common_vendor.nextTick$1(() => {
          showAction(argFs);
        });
      } else {
        showAction(argFs);
      }
    }
    function showAction(argFs) {
      let arg = argFs || {};
      let { duration, icon, text, color, dark, model, mask, lines } = arg;
      model_ref.value = typeof model == "undefined" ? model_ref.value : model;
      icon_ref.value = icon = icon ?? modelIcon.value[model_ref.value].icon;
      text_ref.value = text = text ?? modelIcon.value[model_ref.value].text;
      color_ref.value = color = color ?? modelIcon.value[model_ref.value].color;
      showMask.value = typeof mask === "boolean" ? mask : showMask.value;
      lines_ref.value = lines ?? _lines.value;
      if (dark === true) {
        bgColor.value = "black";
      }
      if (typeof dark !== "boolean") {
        dark = store.tmStore.dark;
      }
      if (color_ref.value == "white" || color_ref.value == "black") {
        color_ref.value = "";
      }
      dark_ref.value = dark;
      if (typeof duration === "undefined") {
        duration = props.duration;
      }
      dur.value = isNaN(parseInt(String(duration))) ? 1500 : parseInt(String(duration));
      showValue.value = true;
      if (model_ref.value != "load") {
        uid = setTimeout(function() {
          showValue.value = false;
          uid = NaN;
        }, dur.value);
      }
    }
    function hide() {
      showValue.value = false;
      uid = NaN;
      clearTimeout(uid);
    }
    expose({
      show,
      hide
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showValue.value
      }, showValue.value ? common_vendor.e({
        b: showValue.value
      }, showValue.value ? {
        c: common_vendor.p({
          _style: "line-height: normal",
          _class: "pa-10",
          spin: model_ref.value == "load",
          color: color_ref.value,
          fontSize: 72,
          name: icon_ref.value
        }),
        d: common_vendor.p({
          ["font-size"]: 30,
          _class: `pt-8 text-overflow-${lines_ref.value}`,
          label: text_ref.value
        }),
        e: common_vendor.sr("nvueElAniContent", "4c4cf99a-0"),
        f: common_vendor.unref(isNvue) ? "scale(0,0)" : "scale(1,1)",
        g: common_vendor.p({
          _style: props._style,
          _class: props._class,
          color: bgColor.value,
          border: 0,
          shadow: 10,
          width: props.width,
          height: props.height,
          margin: [40, 40],
          round: props.round,
          padding: props.padding
        })
      } : {}, {
        h: common_vendor.n(showMask.value ? "overflowMask" : "overflowMaskNo"),
        i: common_vendor.unref(_width) + "px",
        j: common_vendor.unref(_height) + "px",
        k: common_vendor.unref(sysinfo).top + "px"
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c4cf99a"], ["__file", "C:/Users/Pc/Desktop/github/loveSpace/src/tmui/components/tm-message/tm-message.vue"]]);
wx.createComponent(Component);
