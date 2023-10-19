"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-sticky",
  props: {
    //可能的值为:left,top
    //默认为：top
    model: {
      type: String,
      default: "top"
    },
    offset: {
      type: [String, Number],
      default: "0px"
    },
    //层级对于nvue是无效的。
    zIndex: {
      type: Number,
      default: 50
    }
  },
  setup(__props) {
    const props = __props;
    const _offset = common_vendor.computed(() => {
      if (typeof props.offset === "number")
        return props.offset + "rpx";
      return props.offset;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(props.model == "top" ? {
          top: `${common_vendor.unref(_offset)}`
        } : ""),
        b: common_vendor.s(props.model == "left" ? {
          left: `${common_vendor.unref(_offset)}`
        } : ""),
        c: common_vendor.s({
          "z-index": props.zIndex
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0062a1d2"], ["__file", "C:/Users/Pc/Desktop/github/loveSpace/src/tmui/components/tm-sticky/tm-sticky.vue"]]);
wx.createComponent(Component);
