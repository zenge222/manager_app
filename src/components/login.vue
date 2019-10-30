<template>
  <div class="login">
    <header class="header_box">嘉美经理端</header>
    <div @click="pushTo('Text1')">123</div>
    <!-- <div @click="pushTo('Home')">123</div> -->
    <div class="head_img">
      <img class="head_bg" src="../../static/images/def_background.png" />
      <div class="head_info">
        <img class="user_head" src="../../static/images/def_head_portrait.png" alt />
        <p class="user_login">经理端登录</p>
      </div>
    </div>
    <div class="user_from">
      <div class="from_item">
        <img src="../../static/icon/icon_user.png" />
        <van-field class="from_input" v-model="userInfo.phone" placeholder="请输入用户名" />
      </div>
      <div class="from_item">
        <img src="../../static/icon/icon_password.png" />
        <van-field
          type="password"
          class="from_input"
          v-model="userInfo.password"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <van-button @click="loginSubmit" class="login_btn" type="large">登录</van-button>
  </div>
</template>

<script>
import { _toLogin } from "../service/login";
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        phone: "",
        password: ""
      }
    };
  },
  mounted() {
    // this.$toast('请输入密码');
  },
  methods: {
    loginSubmit() {
      let _this = this;
      if (!this.userInfo.phone) {
        // this.$notify({
        //   message: "请输入用户名",
        //   duration: 1000,
        //   background: "#ff9900"
        // });
        this.$toast("请输入用户名");
      } else if (!this.userInfo.password) {
        // this.$notify({
        //   message: "请输入密码",
        //   duration: 1000,
        //   background: "#ff9900"
        // });
        this.$toast("请输入密码");
      } else {
        _toLogin(this.userInfo).then(res => {
          if (res.data.success) {
            _this.pushTo("Home");
          } else {
            _this.$toast(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
