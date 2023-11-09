"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
if (!Math) {
  (tmIcon + tmText + tmButton)();
}
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const tmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-float-button",
  props: {
    followTheme: {
      type: [Boolean],
      default: true
    },
    //主按钮的位置
    position: {
      type: String,
      default: "br"
    },
    //子菜单弹出的位置
    actionsPos: {
      type: String,
      default: "top"
    },
    width: {
      type: Number,
      default: 124
    },
    height: {
      type: Number,
      default: 124
    },
    offset: {
      type: Array,
      default: () => [32, 32]
    },
    //子按钮组数据
    actions: {
      type: Array,
      default: () => []
    },
    // 主按钮对象数据
    btn: {
      type: Object,
      default: () => {
      },
      required: true
    },
    //是否默认显示子菜单
    showActions: {
      type: Boolean,
      default: false
    },
    //点击子菜单后，是否需要隐藏，如果为false,点击子按钮后不会隐藏按钮。始终保持展开子按钮。
    clickHidnActions: {
      type: Boolean,
      default: true
    },
    disabledScrollTo: {
      type: Boolean,
      default: true
    },
    scrollTo: {
      type: Object,
      default: () => {
        return {
          scrollTop: 0,
          selector: "",
          duration: 300
        };
      }
    }
  },
  emits: ["click", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    const windowWidth = common_vendor.computed(() => sysinfo.width);
    common_vendor.computed(() => sysinfo.top);
    ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    common_vendor.ref(false);
    const showActions = common_vendor.ref(props.showActions ?? false);
    const BtnPos = common_vendor.computed(() => props.position);
    const AcionPos = common_vendor.computed(() => props.actionsPos);
    const _offset = common_vendor.computed(() => {
      let ost = props.offset ?? [0, 0];
      ost = [common_vendor.index.upx2px(props.offset[0]), common_vendor.index.upx2px(props.offset[1])];
      return ost;
    });
    const centerPosLeft = common_vendor.computed(() => {
      let ps = (windowWidth.value - common_vendor.index.upx2px(props.width * 2)) / 2 + _offset.value[0] * 2;
      return ps;
    });
    const _btn = common_vendor.computed(() => {
      return {
        icon: "tmicon-plus",
        fontSize: 20,
        color: "primary",
        linear: "",
        linearDeep: "accent",
        label: "",
        iconSize: 42,
        fontColor: "",
        ...props.btn ?? {}
      };
    });
    const _actionsItem = common_vendor.computed(() => {
      let asbtn = props.actions.map((el) => {
        let default_btn = {
          icon: "tmicon-plus",
          fontSize: 20,
          color: "primary",
          linear: "",
          linearDeep: "accent",
          label: "",
          fontColor: "",
          iconSize: 36
        };
        return { ...default_btn, ...el };
      });
      return asbtn;
    });
    const _pos = common_vendor.computed(() => {
      common_vendor.index.upx2px(24);
      let actionwidth_total = _actionsItem.value.length * common_vendor.index.upx2px(props.width);
      let actionwidth = common_vendor.index.upx2px(props.width);
      if (AcionPos.value == "left" && BtnPos.value == "bc") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "bc") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "bc") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            bottom: _offset.value[1] - actionwidth_total + "px",
            left: centerPosLeft.value + "px"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "bc") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            bottom: _offset.value[1] + actionwidth + "px",
            left: centerPosLeft.value + "px"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "bl") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "left" && BtnPos.value == "bl") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "bl") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + actionwidth + "px",
            left: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "bl") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] - actionwidth_total + "px",
            left: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "br") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "left" && BtnPos.value == "br") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "br") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] + actionwidth + "px",
            right: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "br") {
        return {
          parent: {
            bottom: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            bottom: _offset.value[1] - actionwidth_total + "px",
            right: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "left" && BtnPos.value == "tc") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "tc") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "tc") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            top: _offset.value[1] + actionwidth + "px",
            left: centerPosLeft.value + "px"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "tc") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: centerPosLeft.value + "px"
          },
          children: {
            top: _offset.value[1] - actionwidth_total + "px",
            left: centerPosLeft.value + "px"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "tl") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "left" && BtnPos.value == "tl") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "tl") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] - actionwidth_total + "px",
            left: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "tl") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            left: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + actionwidth + "px",
            left: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "right" && BtnPos.value == "tr") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] - actionwidth_total + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "left" && BtnPos.value == "tr") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] + actionwidth + "px",
            display: "flex",
            "flex-direction": "row"
          }
        };
      }
      if (AcionPos.value == "top" && BtnPos.value == "tr") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] - actionwidth_total + "px",
            right: _offset.value[0] + "px"
          }
        };
      }
      if (AcionPos.value == "bottom" && BtnPos.value == "tr") {
        return {
          parent: {
            top: _offset.value[1] + "px",
            right: _offset.value[0] + "px"
          },
          children: {
            top: _offset.value[1] + actionwidth + "px",
            right: _offset.value[0] + "px"
          }
        };
      }
    });
    function onclick(e) {
      if (props.clickHidnActions) {
        showActions.value = !showActions.value;
      } else {
        showActions.value = true;
      }
      emits("click", e);
      if (!props.disabledScrollTo) {
        common_vendor.index.pageScrollTo({
          scrollTop: props.scrollTo.scrollTop,
          duration: props.scrollTo.duration,
          selector: props.scrollTo.selector
        });
      }
    }
    common_vendor.onMounted(() => {
      if (showActions.value)
        ;
    });
    function change(index, item) {
      if (props.clickHidnActions) {
        showActions.value = false;
      }
      emits("change", index, item);
    }
    function btnCall(event, item) {
      if (typeof (item == null ? void 0 : item.callback) === "function") {
        item.callback(event, item);
      }
    }
    return (_ctx, _cache) => {
      var _a2, _b;
      return common_vendor.e({
        a: common_vendor.p({
          userInteractionEnabled: false,
          ["follow-dark"]: false,
          color: common_vendor.unref(_btn).fontColor,
          name: common_vendor.unref(_btn).icon,
          ["font-size"]: common_vendor.unref(_btn).iconSize
        }),
        b: common_vendor.unref(_btn).label
      }, common_vendor.unref(_btn).label ? {
        c: common_vendor.p({
          userInteractionEnabled: false,
          ["follow-dark"]: false,
          color: common_vendor.unref(_btn).fontColor,
          label: common_vendor.unref(_btn).label,
          ["font-size"]: common_vendor.unref(_btn).fontSize
        })
      } : {}, {
        d: common_vendor.o(onclick),
        e: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        f: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        g: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        h: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        i: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        j: common_vendor.o(($event) => btnCall($event, common_vendor.unref(_btn))),
        k: common_vendor.p({
          followTheme: props.followTheme,
          _class: "flex flex-col flex-col-center-center",
          shadow: 3,
          linear: common_vendor.unref(_btn).linear,
          ["linear-deep"]: common_vendor.unref(_btn).linearDeep,
          color: common_vendor.unref(_btn).color,
          margin: [0, 0],
          round: 16,
          padding: [0, 0],
          width: props.width - 24,
          height: props.height - 24,
          openType: common_vendor.unref(_btn).openType
        }),
        l: props.width + "rpx",
        m: props.height + "rpx",
        n: showActions.value && common_vendor.unref(_actionsItem).length > 0
      }, showActions.value && common_vendor.unref(_actionsItem).length > 0 ? {
        o: common_vendor.f(common_vendor.unref(_actionsItem), (item, index, i0) => {
          return common_vendor.e({
            a: "77075966-4-" + i0 + "," + ("77075966-3-" + i0),
            b: common_vendor.p({
              userInteractionEnabled: false,
              ["follow-dark"]: false,
              color: item.fontColor,
              name: item.icon,
              ["font-size"]: item.iconSize
            }),
            c: item.label
          }, item.label ? {
            d: "77075966-5-" + i0 + "," + ("77075966-3-" + i0),
            e: common_vendor.p({
              userInteractionEnabled: false,
              ["follow-dark"]: false,
              color: item.fontColor,
              label: item.label,
              ["font-size"]: item.fontSize
            })
          } : {}, {
            f: common_vendor.o(($event) => change(index, item), index),
            g: common_vendor.o(($event) => btnCall($event, item), index),
            h: common_vendor.o(($event) => btnCall($event, item), index),
            i: common_vendor.o(($event) => btnCall($event, item), index),
            j: common_vendor.o(($event) => btnCall($event, item), index),
            k: common_vendor.o(($event) => btnCall($event, item), index),
            l: common_vendor.o(($event) => btnCall($event, item), index),
            m: "77075966-3-" + i0,
            n: common_vendor.p({
              followTheme: props.followTheme,
              _class: "flex flex-col flex-col-center-center",
              shadow: 3,
              linear: item.linear,
              ["linear-deep"]: item.linearDeep,
              color: item.color,
              margin: [0, 0],
              round: 16,
              padding: [0, 0],
              width: props.width - 24,
              height: props.height - 24,
              openType: item.openType
            }),
            o: index
          });
        }),
        p: props.width + "rpx",
        q: props.height + "rpx",
        r: common_vendor.n(showActions.value && common_vendor.unref(_actionsItem).length > 0 ? "scaleNvue" : ""),
        s: common_vendor.s((_a2 = common_vendor.unref(_pos)) == null ? void 0 : _a2.children),
        t: showActions.value
      } : {}, {
        v: common_vendor.s((_b = common_vendor.unref(_pos)) == null ? void 0 : _b.parent),
        w: common_vendor.s({
          zIndex: 402
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77075966"], ["__file", "C:/Users/Pc/Desktop/github/loveSpace/src/tmui/components/tm-float-button/tm-float-button.vue"]]);
wx.createComponent(Component);
