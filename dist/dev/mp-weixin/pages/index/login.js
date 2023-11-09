"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (tmButton + tmInput + tmFormItem + tmRadio + tmRadioGroup + tmForm + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmButton = () => "../../tmui/components/tm-button/tm-button.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmRadioGroup = () => "../../tmui/components/tm-radio-group/tm-radio-group.js";
const tmRadio = () => "../../tmui/components/tm-radio/tm-radio.js";
const tmFormItem = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const tmForm = () => "../../tmui/components/tm-form/tm-form.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const showUserInfo = common_vendor.ref(true);
    const show = common_vendor.ref({
      nikeName: null,
      avatarUrl: null,
      gender: 1,
      nameuser: {
        a: "测试"
      }
    });
    const login = () => {
      console.log("触发");
      common_vendor.index.showLoading({
        title: "登陆中...",
        mask: true
      });
      common_vendor.index.login({
        provider: "weixin",
        success: async (res) => {
          console.log(res);
          if (res.code) {
            let result = await common_vendor.Ds.callFunction({
              name: "user",
              data: {
                action: "code2Session",
                js_code: res.code,
                user_info: {}
              }
            });
            let data = result.result.result.result;
            if (data.register) {
              showUserInfo.value = true;
              common_vendor.index.hideLoading();
              return;
            }
            if (data._id) {
              const datax = {
                _id: data._id,
                mp_wx_openid: data.mp_wx_openid,
                register_date: data.register_date
              };
              loginSuccess(datax);
            }
            console.log(result);
          }
        }
      });
    };
    const getAvatar = (res) => {
      console.log(res);
    };
    function loginSuccess(data) {
      updateTokenStorage(data);
      updateIsLoginStorage(true);
      common_vendor.index.showToast({
        title: "登陆成功！",
        icon: "none"
      });
      common_vendor.index.navigateBack();
    }
    function updateTokenStorage(data = {}) {
      if (data) {
        const expiresTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1e3;
        data = { ...data, expiresTime };
      }
      common_vendor.index.setStorageSync("user", data);
    }
    function updateIsLoginStorage(data = null) {
      common_vendor.index.setStorageSync("isLogin", data);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(login),
        b: common_vendor.p({
          label: "登录"
        }),
        c: showUserInfo.value
      }, showUserInfo.value ? {
        d: common_vendor.o(common_vendor.m(($event) => show.value.nameuser.a = $event, {
          lazy: true
        }, true)),
        e: common_vendor.p({
          type: "nickname",
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: show.value.nameuser.a
        }),
        f: common_vendor.p({
          required: true,
          label: "昵称",
          field: "nameuser.a"
        }),
        g: common_vendor.o(getAvatar),
        h: common_vendor.p({
          label: "头像",
          openType: "chooseAvatar"
        }),
        i: common_vendor.p({
          required: true,
          label: "头像",
          field: "nameuser.a"
        }),
        j: common_vendor.p({
          label: "男",
          value: 1
        }),
        k: common_vendor.p({
          label: "女",
          value: 2
        }),
        l: common_vendor.o(($event) => show.value.gender = $event),
        m: common_vendor.p({
          modelValue: show.value.gender
        }),
        n: common_vendor.p({
          required: true,
          label: "性别",
          field: "radio"
        }),
        o: common_vendor.p({
          type: "textarea"
        }),
        p: common_vendor.p({
          required: true,
          label: "个性签名",
          field: "nameuser.a"
        }),
        q: common_vendor.sr("form", "4169b666-2,4169b666-0"),
        r: common_vendor.o(($event) => show.value = $event),
        s: common_vendor.p({
          ["label-width"]: 190,
          modelValue: show.value
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Pc/Desktop/github/loveSpace/src/pages/index/login.vue"]]);
wx.createPage(MiniProgramPage);
