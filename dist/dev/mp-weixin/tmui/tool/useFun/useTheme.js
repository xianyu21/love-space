"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_function_util = require("../function/util.js");
const tmui_tool_theme_theme = require("../theme/theme.js");
const useTheme = (props, store) => {
  var _a;
  let dark = common_vendor.ref(false);
  let isNvue = common_vendor.ref(false);
  let customCSSStyle = common_vendor.ref({});
  let parentClass = common_vendor.ref("");
  let transparent = common_vendor.ref(false);
  let blur = common_vendor.ref(false);
  let customClass = common_vendor.ref("");
  let margin = common_vendor.ref([]);
  let padding = common_vendor.ref([]);
  let round = common_vendor.ref("");
  let theme = common_vendor.ref(computedTheme(props.value, dark.value, store.value));
  let customThemeConfig = {};
  common_vendor.watchEffect(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const followDark = props.value.followDark;
    let lsdark = props.value.dark;
    if (followDark) {
      lsdark = store.value.dark;
    }
    dark.value = lsdark;
    if (store.value.os == "android" && isNvue.value) {
      blur.value = false;
    } else {
      blur.value = ((_a2 = props.value) == null ? void 0 : _a2.blur) ?? false;
    }
    customCSSStyle.value = computedStyle((_b = props.value) == null ? void 0 : _b._style);
    parentClass.value = ((_c = props.value) == null ? void 0 : _c.parenClass) || ((_d = props.value) == null ? void 0 : _d.parentClass) || "";
    transparent.value = (((_e = props.value) == null ? void 0 : _e.transprent) ?? ((_f = props.value) == null ? void 0 : _f.transparent)) || false;
    customClass.value = computedClas(((_g = props.value) == null ? void 0 : _g._class) ?? "");
    margin.value = tmui_tool_function_util.valToMarginAr(((_h = props.value) == null ? void 0 : _h.margin) ?? null);
    padding.value = tmui_tool_function_util.valToMarginAr(((_i = props.value) == null ? void 0 : _i.padding) ?? null);
    round.value = tmui_tool_function_util.valToRoundStrClass(((_j = props.value) == null ? void 0 : _j.round) ?? "");
    theme.value = computedTheme({ ...props.value, ...customThemeConfig }, dark.value, store.value);
  });
  return {
    dark,
    isNvue,
    round,
    padding,
    margin,
    customCSSStyle,
    theme: (config = {}) => {
      for (let key in config) {
        if (config[key] !== null) {
          customThemeConfig[key] = config[key];
        }
      }
      return theme;
    },
    customClass,
    parentClass,
    transparent,
    _props: props,
    proxy: ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null,
    blur
  };
};
function computedStyle(_style) {
  if (typeof _style == "string") {
    let p = _style.split(";");
    let k = p.map((el) => {
      el = el.replace(";", "");
      let node = {};
      let idx = el.split(":");
      node[idx[0]] = idx[1];
      return node;
    });
    let kl = {};
    k.forEach((el) => {
      kl = { ...kl, ...el };
    });
    return kl;
  }
  if (typeof _style == "object" && !Array.isArray(_style)) {
    return _style;
  }
  if (typeof _style == "object" && Array.isArray(_style)) {
    let kl = {};
    _style.forEach((el) => {
      kl = { ...kl, ...el };
    });
    return kl;
  }
  return {};
}
function computedClas(_class) {
  if (typeof _class == "string") {
    return _class;
  }
  if (Array.isArray(_class)) {
    return _class.join(" ");
  }
  return "";
}
function computedTheme(props, dark, store) {
  const color = props.color;
  const border = props.border;
  const shadow = props.shadow;
  const round = props.round;
  const outlined = props.outlined;
  const text = props.text;
  const borderStyle = props.borderStyle;
  const borderDirection = props.borderDirection;
  const linear = props.linear;
  const linearDeep2 = props.linearDeep;
  const blur = props.blur;
  var borderColor = (props == null ? void 0 : props.borderColor) ?? "";
  var theme = new tmui_tool_theme_theme.theme.themeColors(store.colorList);
  if (tmui_tool_theme_theme.theme.isCssColor(color) && !theme.hasColors(color)) {
    theme = new tmui_tool_theme_theme.theme.themeColors(theme.add(color, color));
  }
  let defaultColorName = color || "primary";
  if ((props == null ? void 0 : props.followTheme) == true && store.color) {
    defaultColorName = store.color;
    borderColor = "";
  }
  let c = theme.getTheme({
    colorname: defaultColorName,
    dark,
    borderWidth: border,
    shadow: parseInt(String(shadow)),
    round: parseInt(String(round)),
    outlined,
    text,
    borderStyle,
    borderDirection,
    linearDirection: linear,
    linearDeep: linearDeep2,
    blur,
    borderColor
  });
  return c;
}
exports.useTheme = useTheme;
