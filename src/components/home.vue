<template>
  <div class="home">
    <header class="header_box">嘉美经理端</header>
    <div class="head_img">
      <img class="head_bg" src="../../static/images/def_background.png" />
      <div class="head_info">
        <!-- userInfo.headImg -->
        <img @click="toText" class="user_head" :src="''" :onerror="userDefaultPic" />
        <h3 class="user_name">{{userInfo.employee.truename}}</h3>
        <p class="user_area">{{userInfo.shopName}}</p>
      </div>
    </div>
    <div class="bar_list">
      <div
        @click="barClick(item,index)"
        class="list_item_box"
        v-for="(item,index) in listInfo"
        :key="index"
      >
        <div class="list_item">
          <img :src="item.img" />
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getUserInfo } from "../service/login";
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      userDefaultPic:
        'this.src="' + require("../assets/def_head_portrait.png") + '"',
      msg: "主页",
      listInfo: [
        { title: "预约汇总", img: require("../assets/icon_order.png") },
        {
          title: "订单管理",
          img: require("../assets/icon_order_for_goods.png")
        },
        { title: "员工管理", img: require("../assets/icon_management.png") },
        { title: "工作安排", img: require("../assets/icon_arrange.png") },
        { title: "用户管理", img: require("../assets/icon_user_head.png") }
      ],
      userInfo: {
        shopName: "",
        nickname: "",
        headImg: "",
        employee: {
          truename: ""
        }
      }
    };
  },
  mounted() {
    let a = {
      110100: "08",
      110200: "09",
      110300: "10",
      110400: "11",
      120100: "12",
      120200: "13",
      120300: "14",
      120400: "15",
      120500: "16",
      120600: "17",
      120700: "18",
      120800: "19",
      120900: "20",
      121000: "21",
      121100: "22"
    };
    let [timeList, keyList, valList] = [new Object(), [], []];
    let size = 15 - 4;
    for (let b in a) {
      if (size == 0) break;
      size--;
      keyList.push(b);
      valList.push(a[b]);
    }
    keyList.forEach((key, index) => {
      timeList[key] = valList[index];
    });
    // console.log(timeList);
    this.init();
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    init() {
      let _this = this;
      _getUserInfo().then(res => {
        if (res.data.success) {
          let resData = res.data.data;
          this.userInfo = resData;
          let params = {
            shopName: resData.shopName,
            headImg: resData.headImg,
            nickname: resData.nickname,
            truename: resData.employee.truename
          };
          _this.setUserInfo(params);
        } else {
          _this.$toast(res.data.message);
        }
      });
    },
    barClick(item, index) {
      switch (index) {
        case 0:
          this.pushTo("AppointmentSummary");
          break;
        case 1:
          this.pushTo("OrderManagement");
          break;
        case 2:
          this.pushTo("StaffManagement");
          break;
        case 3:
          this.pushTo("WorkArrangement");
          break;
        case 4:
          this.pushTo("UserArrangement");
          break;
        default:
          break;
      }
    },
    toText() {
      // this.pushTo("Text1");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  background: #fff;
  .bar_list {
    margin: 6rem 6rem 4rem 6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list_item_box {
      width: 20%;
      margin-bottom: 3rem;
      .list_item {
        // border: 1px solid red;
        box-shadow: 0 0.2rem 0.5rem 0.25rem rgba(203, 203, 203, 0.15);
        // width: 310px;
        width: 88%;
        height: 12rem;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 1rem 0;
        img {
          display: block;
          width: 7rem;
          margin: 0 auto;
          height: 7rem;
        }
        p {
          text-align: center;
          font-size: 1.6rem;
          line-height: 2;
        }
      }
    }
  }
}
</style>
