<template>
  <div class="header_box">
    <div class="left_item" @click="goback">
      <van-icon class="left_icon" name="arrow-left" color="#282828" size="2.2rem" />
    </div>
    <div class="middle_item">{{title}}</div>
    <div class="right_item">
      <div class="user_pic">
        <!-- loginUserInfo.headImg -->
        <img @click="toText" :src="''" :onerror="userDefaultPic" />
        <div class="pic_info">
          <h3>{{loginUserInfo.truename}}</h3>
          <p>{{loginUserInfo.shopName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userDefaultPic:
        'this.src="' + require("../../assets/def_head_portrait.png") + '"'
    };
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      loginUserInfo: state => state.login.loginUserInfo
    })
  },
  mounted() {
    // console.log(this.loginUserInfo);
  },
  methods: {
    goback() {
      // console.log(this.$router.history.current.name)
      // if (this.$router.history.current.name == "AddWork") {
      //   this.replaceTo("workArrangement");
      //   return;
      // }
      this.$router.go(-1);
    },
    toText() {}
  }
};
</script>

<style lang="less" scoped>
.header_box {
  padding: 1.5rem 3.2rem;
  height: 6rem;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid #dddddd;
  .left_item {
    flex: 0 0 15rem;
    text-align: left;
    .left_icon {
      display: block;
    }
  }
  .middle_item {
    font-size: 1.8rem;
    flex: 1;
  }
  .right_item {
    flex: 0 0 15rem;
    text-align: right;
    .user_pic {
      display: flex;
      flex-direction: row-reverse;
      .pic_info {
        line-height: 1.5;
        padding-right: 1.5rem;
        h3 {
          font-size: 1.6rem;
        }
        p {
          font-size: 1.4rem;
        }
      }
      img {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 100%;
      }
    }
  }
}
</style>
