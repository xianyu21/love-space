"use strict";
const common_vendor = require("../../common/vendor.js");
const store_demo = require("../../store/demo.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const de = store_demo.useStore();
    common_vendor.onLoad(() => {
    });
    common_vendor.ref(true);
    common_vendor.reactive({
      username: "",
      password: ""
    });
    common_vendor.useRouter();
    store_demo.useStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(de).num),
        b: common_vendor.o(($event) => common_vendor.unref(de).inc())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b4ac9ad"], ["__file", "C:/Users/Pc/Desktop/github/loveSpace/src/pages/index/login.vue"]]);
wx.createPage(MiniProgramPage);
