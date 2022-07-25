"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (tmText + tmDivider + tmInput + tmSheet + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmDivider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref("day");
    common_vendor.ref("");
    common_vendor.ref(false);
    const testtext = common_vendor.ref("\u54C8\u54C8");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u57FA\u7840\u793A\u4F8B,\u66F4\u591A\u89C1\u6587\u6863"
        }),
        b: common_vendor.p({
          margin: [0, 24],
          password: true,
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801,\u663E\u793A\u9690\u85CF\u5185\u5BB9",
          prefix: "tmicon-lock-fill"
        }),
        c: common_vendor.o(($event) => testtext.value = $event),
        d: common_vendor.p({
          ["confirm-hold"]: true,
          ["confirm-type"]: "\u6362\u884C",
          showCharNumber: true,
          maxlength: 100,
          border: 1,
          color: "grey-5",
          height: 80,
          type: "textarea",
          modelValue: testtext.value
        }),
        e: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u4E00\u4E9B\u5176\u5B83\u5E38\u89C1\u793A\u4F8B"
        }),
        f: common_vendor.p({
          prefix: "tmicon-user-fill",
          showClear: true
        }),
        g: common_vendor.p({
          prefixLabel: "\u5B57\u7B26\u7EDF\u8BA1",
          margin: [0, 24],
          showCharNumber: true,
          maxlength: 10
        }),
        h: common_vendor.p({
          suffix: "tmicon-clock-fill",
          showClear: true
        }),
        i: common_vendor.p({
          prefix: "tmicon-dollar",
          suffixLabel: "\u5143",
          margin: [0, 24]
        }),
        j: common_vendor.p({
          prefix: "tmicon-search",
          searchLabel: "\u641C\u7D22"
        }),
        k: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u6837\u5F0F\u914D\u7F6E"
        }),
        l: common_vendor.p({
          color: "primary",
          prefix: "tmicon-user-fill"
        }),
        m: common_vendor.p({
          prefixLabel: "\u805A\u7126\u6837\u5F0F",
          color: "white",
          focusColor: "red",
          margin: [0, 24],
          prefix: "tmicon-user-fill"
        }),
        n: common_vendor.p({
          ["font-size"]: 24,
          _class: "font-weight-b",
          label: "\u5176\u5B83"
        }),
        o: common_vendor.p({
          color: "primary",
          focusColor: "green",
          prefix: "tmicon-user-fill"
        }),
        p: common_vendor.p({
          color: "primary",
          focusColor: "green",
          margin: [0, 24],
          prefix: "tmicon-lock-fill"
        }),
        q: common_vendor.p({
          color: "primary"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/cli/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
