<template>
  <div class="unfixedDate has-header">
    <Header :title="'日期筛选'"></Header>
    <div class="tab_container">
      <!-- <div @click="toSelectTimes">去时间列表页</div> -->
      <!-- :markDate="timesArr" -->
      <Calendar
        ref="dateCalender"
        @choseDay="clickDay"
        @changeMonth="changeDate"
        :employeeId="employeeId"
        :markDate="timesData"
      ></Calendar>
      <!-- https://blog.csdn.net/suolong914/article/details/82851121 -->
      <div class="item_group2">
        <div class="g_item">
          <div class="mess_info1"></div>
          <p>已工作安排时间</p>
        </div>
        <div class="g_item">
          <div class="mess_info2"></div>
          <p>不可安排时间</p>
        </div>
        <div class="g_item">
          <div class="mess_info3"></div>
          <p>可选择时间</p>
        </div>
      </div>
      <van-button class="back_btn" @click="backPage">返回</van-button>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import Calendar from "./component/vue-calendar";
import { _getEmployeeTime } from "../service/appointment";
export default {
  name: "NnfixedDate",
  data() {
    return {
      timesData: [],
      employeeId: this.$route.params.employeeId
    };
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.init();
    }
  },
  computed: {},
  mounted() {},
  components: {
    Header,
    Calendar
  },
  methods: {
    // 初始化缓存数据
    init() {
      this.employeeId = this.$route.params.employeeId;
      // console.log(this.employeeId);
      let date = new Date();
      let [year, month, day] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ];
      this.$refs.dateCalender.initDate();
      let params = {
        employeeId: this.employeeId,
        startDay: `${year}-${month}-${day}`
      };
      this.getData(params);
    },
    getData(params) {
      _getEmployeeTime(params).then(res => {
        let arr = [];
        this.timesData = [];
        if (res.data.success) {
          arr.push(...res.data.data.freeTime);
          arr.push(...res.data.data.workDays);
        }
        this.timesData = arr;
      });
    },
    clickDay(data) {
      // console.log(data); //选中某天
      this.timesData.find((val, index) => {
        if (val.status != 0) {
          if (val.date == data) {
            console.log(this.timesData[index]);
            let params = {
              data: this.timesData[index].workTimeVos
            };
            this.pushTo("SeeSelectTime", params);
          }
        }
      });
    },
    changeDate(data) {
      // console.log(data); //左右点击切换月份
      let date = data.split("/");
      date[date.length - 1] = "1";
      date = date.join("-");
      let params = {
        employeeId: this.employeeId,
        startDay: date
      };
      this.getData(params);
    },
    clickToday(data) {
      // console.log(data); //跳到了本月
      // date = date.join("-");
    },
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.unfixedDate {
  .tab_container {
    background: #fff;
    margin: 2rem auto;
    padding: 3rem;
    width: 96%;
    margin: 2rem auto;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
    .back_btn {
      width: 25vw;
      display: block;
      margin: 2vh auto;
      border-radius: 2vw;
      background: #eb5d2a;
      color: #fff;
    }
    .item_group2 {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding: 3vw 0;
      .g_item {
        display: flex;
        align-items: center;
      }
      .mess_info1 {
        width: 0.8vw;
        height: 0.8vw;
        border-radius: 100%;
        background: #eb5d2a;
        margin-right: 0.6vw;
      }
      .mess_info2 {
        width: 0.8vw;
        height: 0.8vw;
        border-radius: 100%;
        background: #bababa;
        margin-right: 0.6vw;
      }
      .mess_info3 {
        width: 0.8vw;
        height: 0.8vw;
        border-radius: 100%;
        border: 0.1vw solid #eb5d2a;
        margin-right: 0.6vw;
      }
      p {
        font-size: 1.2rem;
        margin-right: 1.5vw;
      }
    }
  }
}
</style>
