"use strict";
const common_vendor = require("../common/vendor.js");
const useStore = common_vendor.defineStore("main", {
  state() {
    return {
      someState: "hello pinia",
      num: 0
    };
  },
  actions: {
    inc() {
      this.num++;
    }
  }
});
exports.useStore = useStore;
