"use strict";
const common_vendor = require("../../../common/vendor.js");
const useWindowInfo = () => {
  let winSize = common_vendor.reactive({
    top: 0,
    topSafe: 0,
    width: common_vendor.index.upx2px(750),
    height: common_vendor.index.upx2px(750),
    statusBar: 24,
    navigatorBar: 44,
    bottomSafe: 0,
    nvue: false,
    // 是否存在系统自带的状态栏，针对h5优化。
    h5IsSystemBar: true
  });
  function init() {
    var _a;
    let sysinfo = common_vendor.index.getSystemInfoSync();
    winSize.topSafe = ((sysinfo == null ? void 0 : sysinfo.statusBarHeight) ?? 24) + ((sysinfo == null ? void 0 : sysinfo.navigationBarHeight) ?? 44);
    winSize.width = (sysinfo == null ? void 0 : sysinfo.windowWidth) ?? common_vendor.index.upx2px(750);
    winSize.height = (sysinfo == null ? void 0 : sysinfo.windowHeight) ?? common_vendor.index.upx2px(750);
    winSize.statusBar = (sysinfo == null ? void 0 : sysinfo.statusBarHeight) ?? 24;
    winSize.navigatorBar = (sysinfo == null ? void 0 : sysinfo.navigationBarHeight) ?? 44;
    winSize.bottomSafe = ((_a = sysinfo.safeAreaInsets) == null ? void 0 : _a.bottom) ?? 0;
  }
  init();
  common_vendor.onMounted(() => {
    setTimeout(() => {
      init();
    }, 0);
  });
  return winSize;
};
exports.useWindowInfo = useWindowInfo;
