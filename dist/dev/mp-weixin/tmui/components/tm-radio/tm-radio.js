"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
if (!Math) {
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-radio",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    size: {
      type: Number,
      default: 42
    },
    outlined: {
      type: Boolean,
      default: false
    },
    transprent: {
      type: Boolean,
      default: false
    },
    //为false时将隐藏所有内容，只显示插槽内容，但点击插槽还是会触发选选择状态。
    custom: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    round: {
      type: Number,
      default: 24
    },
    border: {
      type: Number,
      default: 2
    },
    //选项值，选中后返回的值。
    value: {
      type: [String, Number, Boolean, null],
      default: ""
    },
    /**
     * v-model双向绑定，如果选中后以数组形式给出value值。
     */
    modelValue: {
      type: [String, Number, Boolean, null],
      default: ""
    },
    label: {
      type: [String, Number],
      default: ""
    },
    //默认是否选中状态。不受上方的modelValue控制，直接选中。
    defaultChecked: {
      type: [Boolean],
      default: false
    },
    //选中前的勾子。返回false将阻止选中。也可以返回 Promise异步
    beforeChecked: {
      type: [Function, String, Boolean],
      default: () => {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 26
    },
    /**
     * 自定义选中的图标名称
     */
    icon: {
      type: String,
      default: "tmicon-check"
    },
    disabledClass: {
      type: String,
      default: "opacity-5"
    },
    margin: {
      type: Array,
      default: () => [16, 8]
    }
  },
  emits: ["update:modelValue", "change", "click"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const proxy = ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    common_vendor.ref(false);
    const _checked = common_vendor.ref(props.defaultChecked ?? false);
    const _groupCheckedVal = common_vendor.inject(
      "tmRadioBoxVal",
      common_vendor.computed(() => "")
    );
    const tmCheckedBoxDisabled = common_vendor.inject(
      "tmRadioBoxDisabled",
      common_vendor.computed(() => false)
    );
    const _is_radio = common_vendor.inject(
      "tmRadioBoxModel",
      common_vendor.computed(() => false)
    );
    const tmCheckedBoxDir = common_vendor.inject(
      "tmCheckedBoxDir",
      common_vendor.computed(() => "row")
    );
    const _disabled = common_vendor.computed(() => props.disabled || tmCheckedBoxDisabled.value);
    function vailChecked(val) {
      let checked_val = false;
      let val_self = typeof val === "undefined" ? _groupCheckedVal.value : val;
      if (props.modelValue === props.value && typeof props.value !== "undefined" && props.value !== "" && props.modelValue !== "") {
        checked_val = true;
      }
      if (props.value === val_self && val_self !== "" && props.value !== "") {
        checked_val = true;
      }
      return checked_val;
    }
    if (vailChecked()) {
      _checked.value = true;
      emits("update:modelValue", props.value);
    }
    async function hanlerClick() {
      emits("click");
      if (_disabled.value || _checked.value) {
        return;
      }
      if (typeof props.beforeChecked === "function") {
        common_vendor.index.showLoading({
          title: "...",
          mask: true
        });
        let p = await props.beforeChecked(props.modelValue, props.value);
        if (typeof p === "function") {
          p = await p(props.modelValue, props.value);
        }
        common_vendor.index.hideLoading();
        if (!p)
          return;
      }
      _checked.value = true;
      if (parent) {
        parent.addKey(props.value);
      }
      emits("update:modelValue", props.value);
      common_vendor.nextTick$1(() => {
        emits("change", _checked.value);
      });
    }
    common_vendor.watch(
      [() => props.modelValue, () => props.value, () => _groupCheckedVal.value],
      () => {
        _checked.value = vailChecked();
      },
      { deep: true }
    );
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.checkBoxkeyId) == "tmRadioBoxGroup" || !parent) {
        break;
      } else {
        parent = (parent == null ? void 0 : parent.$parent) ?? void 0;
      }
    }
    if (parent) {
      parent.pushKey(props.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e$1({
        a: props.custom
      }, props.custom ? common_vendor.e$1({
        b: _checked.value && common_vendor.unref(_is_radio)
      }, _checked.value && common_vendor.unref(_is_radio) ? {
        c: common_vendor.p({
          ["font-size"]: props.size * 0.6,
          ["line-height"]: -1,
          name: props.icon
        }),
        d: props.size - props.border * 2 + "rpx",
        e: props.size - props.border * 2 + "rpx"
      } : {}, {
        f: !common_vendor.unref(_is_radio)
      }, !common_vendor.unref(_is_radio) ? {
        g: common_vendor.p({
          ["font-size"]: props.fontSize,
          label: props.label
        })
      } : {}, {
        h: common_vendor.p({
          parenClass: "flex-shrink",
          eventPenetrationEnabled: true,
          linear: props.linear,
          linearDeep: props.linearDeep,
          followTheme: props.followTheme,
          followDark: props.followDark,
          dark: props.dark,
          shadow: props.shadow,
          userInteractionEnabled: false,
          width: common_vendor.unref(_is_radio) ? props.size : 0,
          height: common_vendor.unref(_is_radio) ? props.size : 0,
          text: !_checked.value && !props.outlined,
          border: props.border,
          ["border-style"]: props.borderStyle,
          transprent: props.transprent,
          outlined: props.outlined,
          padding: common_vendor.unref(_is_radio) ? [0, 0] : [16, 10],
          margin: common_vendor.unref(_is_radio) ? props.margin : [8, 8],
          color: common_vendor.unref(_disabled) ? "grey-2" : props.color,
          round: props.round,
          _class: "flex-row flex-row-center-center",
          _style: "transition:background-color 0.24s"
        })
      }) : {}, {
        i: common_vendor.unref(_is_radio)
      }, common_vendor.unref(_is_radio) ? {
        j: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: props.fontSize,
          label: props.label
        })
      } : {}, {
        k: common_vendor.r("d", {
          checked: {
            checked: _checked.value
          }
        }),
        l: common_vendor.o(hanlerClick),
        m: common_vendor.n(common_vendor.unref(tmCheckedBoxDir) == "customCol" && props.custom || common_vendor.unref(tmCheckedBoxDir) == "row" ? "flex flex-1 flex-row flex-row-center-start" : ""),
        n: common_vendor.n(common_vendor.unref(_disabled) ? props.disabledClass : ""),
        o: common_vendor.n(common_vendor.unref(tmCheckedBoxDir) == "row" ? "flex-row" : ""),
        p: common_vendor.n(common_vendor.unref(tmCheckedBoxDir) == "customCol" ? "flex-1 flex-col" : "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/github/love-space/src/tmui/components/tm-radio/tm-radio.vue"]]);
wx.createComponent(Component);
