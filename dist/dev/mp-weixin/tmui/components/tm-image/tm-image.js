"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
if (!Math) {
  (tmIcon + tmText + tmSheet + tmTranslate)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-image",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    //外部间隙
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    //内部间隙
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    border: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number],
      default: 200,
      required: true
    },
    height: {
      type: [Number],
      default: 200,
      required: true
    },
    src: {
      type: String,
      default: "",
      required: true
    },
    errorIcon: {
      type: String,
      default: ""
    },
    errorLabel: {
      type: String,
      default: "重新加载"
    },
    loadIcon: {
      type: String,
      default: ""
    },
    //是否显示加载动画。
    showLoad: {
      type: Boolean,
      default: true
    },
    //是否开启预览。
    preview: {
      type: [Boolean],
      default: false
    },
    //是否开启图片额外插槽显示内容。
    extra: {
      type: [Boolean],
      default: false
    },
    extraPosition: {
      type: String,
      default: "in"
      //in:叠加图片上显示,out：图片下方显示,
    },
    //展示关闭删除按钮。
    delete: {
      type: [Boolean],
      default: false
    },
    //是否允许点击delete图标关闭自己，如果为false,将仅触发delete事件，本身图片不会被关闭。
    allowDelete: {
      type: [Boolean],
      default: true
    },
    //图片绽放模式。
    //同官方阅读：https://uniapp.dcloud.io/component/image.html
    model: {
      type: String,
      default: "scaleToFill"
    },
    unit: {
      type: String,
      default: "rpx"
    },
    //开启长按图片显示识别小程序码菜单,与preview不冲突,可点击预览也可长按,默认不开启
    showMenuByLongPress: {
      type: [Boolean],
      default: false
    }
  },
  emits: ["load", "error", "click", "delete", "close"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const aniplay = common_vendor.ref(null);
    const proxy = ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    if (!props.height && !props.width) {
      console.error("错误：图片宽度和高度必须设置一个");
    }
    const img_width = common_vendor.computed(() => {
      return props.width;
    });
    const img_height = common_vendor.computed(() => {
      return props.height - props.padding[1];
    });
    const img_src = common_vendor.computed(() => props.src);
    const loading = common_vendor.ref(true);
    const error = common_vendor.ref(false);
    const isRmove = common_vendor.ref(false);
    const _loadIcon = common_vendor.ref(props.loadIcon || "tmicon-shuaxin");
    const _errorIcon = common_vendor.ref(props.errorIcon || "tmicon-exclamation-circle");
    let parent = proxy == null ? void 0 : proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
        break;
      } else {
        parent = (parent == null ? void 0 : parent.$parent) ?? void 0;
      }
    }
    const ImagGrupList = common_vendor.inject(
      "ImagGrupList",
      common_vendor.computed(() => [])
    );
    if (parent == null ? void 0 : parent.pushKey) {
      parent.pushKey({
        width: img_width.value,
        height: img_width.value,
        src: props.src
      });
    }
    common_vendor.watch(img_src, () => {
      loading.value = true;
      error.value = false;
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
    });
    function imageLoad(event) {
      loading.value = false;
      emits("load", event);
    }
    function imageError(event) {
      console.error("图片加载错:" + props.src, event);
      error.value = true;
      loading.value = false;
      emits("error", event);
    }
    function imageClick(event) {
      emits("click", event);
      if (props.preview) {
        let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
        common_vendor.index.previewImage({
          urls: list,
          current: props.src
        });
      }
    }
    async function del() {
      var _a2, _b;
      isRmove.value = false;
      if (!props.allowDelete) {
        emits("delete", props.src);
        return;
      }
      if ((_a2 = aniplay.value) == null ? void 0 : _a2.play) {
        (_b = aniplay.value) == null ? void 0 : _b.play();
      } else {
        isRmove.value = true;
        emits("close", props.src);
      }
    }
    function aniEnd() {
      isRmove.value = true;
      emits("close", props.src);
    }
    function reloadImg() {
      loading.value = true;
      error.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e$1({
        a: !isRmove.value
      }, !isRmove.value ? common_vendor.e$1({
        b: !error.value
      }, !error.value ? {
        c: common_vendor.o(imageLoad),
        d: common_vendor.o(imageError),
        e: props.showMenuByLongPress,
        f: common_vendor.o(imageClick),
        g: common_vendor.n("round-" + props.round),
        h: common_vendor.n(loading.value ? "opacity-0" : ""),
        i: common_vendor.unref(img_src),
        j: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        }),
        k: props.model
      } : {}, {
        l: loading.value && !error.value
      }, loading.value && !error.value ? common_vendor.e$1({
        m: props.showLoad
      }, props.showLoad ? {
        n: common_vendor.p({
          ["font-size"]: 26,
          spin: true,
          name: _loadIcon.value
        })
      } : {}, {
        o: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + 10 + props.unit
        })
      }) : {}, {
        p: !loading.value && error.value
      }, !loading.value && error.value ? {
        q: common_vendor.p({
          userInteractionEnabled: false,
          name: _errorIcon.value
        }),
        r: common_vendor.p({
          userInteractionEnabled: false,
          _class: "pt-10",
          ["font-size"]: 26,
          label: props.errorLabel
        }),
        s: common_vendor.o(reloadImg),
        t: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        })
      } : {}, {
        v: props.extra
      }, props.extra ? {
        w: common_vendor.o(imageClick),
        x: common_vendor.s(props.extra && props.extraPosition == "in" ? {
          height: common_vendor.unref(img_height) + props.unit,
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        y: common_vendor.s(props.extra && props.extraPosition == "out" ? {
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        z: common_vendor.n(props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5 " : ""),
        A: common_vendor.s(props.extra && props.extraPosition == "in" ? {
          height: common_vendor.unref(img_height) + props.unit,
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        B: common_vendor.s(props.extra && props.extraPosition == "out" ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        C: props.delete
      }, props.delete ? {
        D: common_vendor.o(del),
        E: common_vendor.p({
          color: "red",
          name: "tmicon-times-circle-fill"
        }),
        F: common_vendor.s(props.delete ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        G: common_vendor.n(`pb-${props.padding[1]}`),
        H: common_vendor.n("round-" + props.round),
        I: common_vendor.p({
          margin: [0],
          color: props.color,
          transprent: props.transprent,
          round: props.round,
          border: props.border,
          padding: [props.padding[0], 0],
          width: common_vendor.unref(img_width) - props.padding[0] * 2,
          unit: props.unit,
          height: common_vendor.unref(img_height) - props.padding[0] * 2
        }),
        J: common_vendor.sr(aniplay, "2d2396de-0", {
          "k": "aniplay"
        }),
        K: common_vendor.o(aniEnd),
        L: common_vendor.p({
          width: common_vendor.unref(img_width) + props.padding[0] * 2 + props.unit,
          autoPlay: false,
          name: "zoom",
          reverse: true
        }),
        M: common_vendor.s({
          margin: props.margin[0] + props.unit + " " + (props.margin[1] || props.margin[0]) + props.unit
        })
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/admin/Desktop/github/love-space/src/tmui/components/tm-image/tm-image.vue"]]);
wx.createComponent(Component);
