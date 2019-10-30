<template>
  <div class="weekScreen has-header">
    <Header :title="'日期筛选'"></Header>
    <div class="tab_container">
      <!-- <div @click="toSelectTimes">去时间列表页</div> -->
      <div class="data_header">
        <div class="item_group">
          <img class="date_img" src="../../static/images/sel_time.png" />
          <div class="input_box" @click="showStartDatePop">{{sCurrentDate||'请选择开始日期'}}</div>
          <div class="date_line"></div>
          <div class="input_box" @click="showEndDatePop">{{eCurrentDate||'请选择结束日期'}}</div>
          <img style="margin-left:20px;" class="date_img" src="../../static/images/icon_time_one.png" />
          <div class="input_box" @click="showStartTimePop">{{sCurrentTime||'请选择开始时间'}}</div>
          <div class="date_line"></div>
          <div class="input_box" @click="showEndTimePop">{{eCurrentTime||'请选择结束时间'}}</div>
        </div>
        <div class="item_group group_btm">
          <div
            @click="selWeek(item,index)"
            :class="{'week_list':true,'active':item.checked}"
            v-for="(item,index) in weeks"
            :key="index"
          >{{item.title}}</div>
          <div @click="toScreenDay" class="screen_btn">筛选</div>
        </div>
        <div class="item_group2">
          <div class="mess_info1"></div>
          <p>当日工期排满</p>
          <div class="mess_info2"></div>
          <p>当日工期未安排</p>
          <div class="mess_info3"></div>
          <p>当日工期未排满</p>
        </div>
      </div>
      <div class="time_container">
        <div class="employ_times">
          <p>已被占用</p>
          <ul class="time_list">
            <li
              :class="{'can_change':item.status==1}"
              v-for="(item,index) in workDays"
              :key="index"
              @click="toChangeTimes(item,index)"
            >{{item.workDayStr}}</li>
          </ul>
        </div>
        <div class="free_times">
          <p>空闲</p>
          <ul class="time_list">
            <div class="has_time" v-for="(item,index) in freeTime" :key="index">
              <li
                @click="toChangeTimes2(item,index)"
                :class="{'can_change':item.status==1}"
              >{{item.workDayStr}}</li>
              <p>{{item.changeTime.startTime}} {{item.changeTime.endTime}}</p>
            </div>
            <!-- <div class="has_time">
              <li>5.27</li>
              <p>09:00-10:00</p>
            </div>-->
          </ul>
        </div>
      </div>
      <div class="footer_summit">
        <van-button @click="submitTimes" class="submit_btn">确定</van-button>
      </div>
    </div>

    <SelDate
      :title="'请选择起始日期'"
      :showPop.sync="datePopShow1"
      :currentDate="sCurrentDate"
      :minDate="sMinDate"
      :maxDate="sMaxDate"
      @getParams="getStartDate"
    ></SelDate>

    <SelDate
      :title="'请选择结束日期'"
      :showPop.sync="datePopShow2"
      :currentDate="eCurrentDate"
      :minDate="eMinDate"
      :maxDate="eMaxDate"
      @getParams="getEndDate"
    ></SelDate>

    <SelTime
      :title="'请选择起始时间'"
      :showPop.sync="timePopShow1"
      :currentTime="sCurrentTime"
      :startNumber="sSNumber"
      :endNumber="sENumber"
      @getParams="getStartTime"
    ></SelTime>

    <SelTime
      :title="'请选择结束时间'"
      :showPop.sync="timePopShow2"
      :currentTime="eCurrentTime"
      :startNumber="eSNumber"
      :endNumber="eENumber"
      @getParams="getEndTime"
    ></SelTime>
  </div>
</template>

<script>
import Header from "./component/header";
import SelTime from "./component/selTime";
import SelDate from "./component/selDate";
import { _getScreenWeekDays } from "../service/appointment";
import { mapState, mapMutations } from "vuex";
export default {
  name: "WeekScreen",
  data() {
    return {
      // 开始日期
      datePopShow1: false,
      sCurrentDate: "",
      sMinDate: "",
      sMaxDate: "",

      // 结束日期
      datePopShow2: false,
      eCurrentDate: "",
      eMinDate: "",
      eMaxDate: "",

      // 开始时间
      timePopShow1: false,
      sSNumber: 8,
      sENumber: 20,
      sCurrentTime: "",
      // 结束时间
      timePopShow2: false,
      eSNumber: 10,
      eENumber: 22,
      eCurrentTime: "",

      weeks: [
        { title: "周一", val: "2", checked: false },
        { title: "周二", val: "3", checked: false },
        { title: "周三", val: "4", checked: false },
        { title: "周四", val: "5", checked: false },
        { title: "周五", val: "6", checked: false },
        { title: "周六", val: "7", checked: false },
        { title: "周日", val: "1", checked: false }
      ],
      employeeId: ""
    };
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      console.log("init");
      this.isScreen = false;
      this.init();
    }
  },
  computed: {
    ...mapState({
      workDays: state => state.appoint.workDays,
      freeTime: state => state.appoint.freeTime
    })
  },
  mounted() {
    this.initTime();
  },
  components: {
    Header,
    SelTime,
    SelDate
  },
  methods: {
    ...mapMutations([
      "setAppointTime",
      "setAppointDays",
      "clearAppointDays",
      "changeDayIndex"
    ]),
    // 初始化缓存数据
    init() {
      this.employeeId = this.$route.params.id;
      this.timePopShow1 = false;
      this.timePopShow2 = false;
      this.datePopShow1 = false;
      this.datePopShow2 = false;
      this.sCurrentDate = "";
      this.eCurrentDate = "";
      this.sCurrentTime = "";
      this.eCurrentTime = "";
      this.clearAppointDays();
      this.weeks.forEach(val => {
        val.checked = false;
      });
      //  清空占用 空闲列表
    },
    getStartDate(val) {
      this.sCurrentDate = val;
      this.eMinDate = new Date(val);
    },
    getEndDate(val) {
      this.eCurrentDate = val;
      this.sMaxDate = new Date(val);
    },
    getStartTime(val) {
      this.eSNumber = Number(val.split(":")[0]) + 2;
      this.sCurrentTime = val;
    },
    getEndTime(val) {
      this.sENumber = Number(val.split(":")[0]) - 2;
      this.eCurrentTime = val;
    },

    initTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let h = date.getHours();
      let mm = date.getMinutes();
      let d2 = d + 2;
      let lastDay = new Date(y, m + 1, 0).getDate();
      if (d2 > lastDay) {
        d2 = d2 % lastDay;
        m++;
        if (m == 12) {
          m = 0;
          y++;
        }
      }
      this.sMinDate = this.eMinDate = new Date(y, m, d2);
      this.sMaxDate = this.eMaxDate = new Date(y + 10, 1, 1);
    },
    toSelectTimes() {
      this.pushTo("SelectTime");
    },
    showStartDatePop() {
      this.datePopShow1 = true;
    },
    showEndDatePop() {
      this.datePopShow2 = true;
    },
    showStartTimePop() {
      this.timePopShow1 = true;
    },
    showEndTimePop() {
      this.timePopShow2 = true;
    },
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0);
      }
      return options;
    },
    selWeek(item, index) {
      this.weeks[index].checked = !this.weeks[index].checked;
    },
    toScreenDay() {
      let _this = this;
      if (!this.sCurrentDate) {
        this.$toast("请选择开始日期");
      } else if (!this.eCurrentDate) {
        this.$toast("请选择结束日期");
      } else if (!this.sCurrentTime) {
        this.$toast("请选择开始时间");
      } else if (!this.eCurrentTime) {
        this.$toast("请选择开始时间");
      } else {
        let start = +new Date(`2019/9/9 ${this.sCurrentTime}`);
        let end = +new Date(`2019/9/9 ${this.eCurrentTime}`);
        // 时间差
        let timeDifference = end - start;
        let validTime = timeDifference >= 2 * 1000 * 60 * 60;
        // 是否整点
        let wholePoint = (timeDifference / 1000 / 60) % 60 === 0 ? true : false;
        if (!validTime) {
          this.$toast("结束时间必须大于起始时间2小时");
        } else if (!wholePoint) {
          this.$toast("时间跨度一小时为单位 请重新选择");
        } else {
          let weeks = [];
          this.weeks.forEach(val => {
            if (val.checked) {
              weeks.push(val.val);
            }
          });
          weeks = weeks.join(",");
          let params = {
            startDay: this.sCurrentDate,
            endDay: this.eCurrentDate,
            startTime: this.sCurrentTime,
            endTime: this.eCurrentTime,
            employeeId: this.employeeId,
            week: weeks
          };
          _getScreenWeekDays(params).then(res => {
            if (res.data.success) {
              _this.isScreen = true;
              let freeData = res.data.data.freeTime;
              freeData.forEach(val => {
                val.changeTime = { startTime: "", endTime: "" };
              });
              let params = {
                workDays: res.data.data.workDays,
                freeTime: freeData
              };
              _this.setAppointDays(params);
            }
          });
        }
      }
    },
    toChangeTimes(item, index) {
      if (item.status == 1) {
        let params = {
          data: item.workTimeVos
        };
        let dataState = {
          name: "workDays",
          index: index
        };
        this.changeDayIndex(dataState);
        this.pushTo("SelectTime", params);
      }
    },
    toChangeTimes2(item, index) {
      if (item.status == 1) {
        let params = {
          data: item.workTimeVos
        };
        let dataState = {
          name: "freeTime",
          index: index
        };
        this.changeDayIndex(dataState);
        this.pushTo("SelectTime", params);
      }
    },
    submitTimes() {
      //2019-06-15  2019-06-16
      if (!this.sCurrentDate) {
        this.$toast("请选择开始日期");
      } else if (!this.eCurrentDate) {
        this.$toast("请选择结束日期");
      } else if (!this.sCurrentTime) {
        this.$toast("请选择开始时间");
      } else if (!this.eCurrentTime) {
        this.$toast("请选择开始时间");
      } else {
        let start = +new Date(`2019/9/9 ${this.sCurrentTime}`);
        let end = +new Date(`2019/9/9 ${this.eCurrentTime}`);
        // 时间差
        let timeDifference = end - start;
        let validTime = timeDifference >= 2 * 1000 * 60 * 60;
        // 是否整点
        let wholePoint = (timeDifference / 1000 / 60) % 60 === 0 ? true : false;
        if (!validTime) {
          this.$toast("结束时间必须大于起始时间2小时");
        } else if (!wholePoint) {
          this.$toast("时间跨度一小时为单位 请重新选择");
        } else if (!this.isScreen) {
          this.$toast("请进行筛选");
        } else {
          let screenTime = {
            startDay: this.sCurrentDate,
            endDay: this.eCurrentDate,
            startTime: this.sCurrentTime,
            endTime: this.eCurrentTime
          };
          let params = {
            selTime: `${this.sCurrentDate} 至 ${this.eCurrentDate}`,
            screenTime: screenTime
          };
          this.setAppointTime(params);
          this.$router.go(-1);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.weekScreen {
  .tab_container {
    background: #fff;
    padding: 0 0 7rem 0;
    width: 96%;
    margin: 2rem auto;
    height: 54rem;
    overflow: hidden;
    // overflow-y: scroll;
    .data_header {
      position: fixed;
      background: #fff;
      width: 96%;
      padding: 2rem 4rem 0 4rem;
      .item_group {
        padding: 0 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .date_img {
          width: 24px;
        }
        .date_line {
          height: 0.1rem; 
          width: 1rem;
          background: #666;
        }
        .input_box {
          display: block;
          margin: 0 1rem;
          border-radius: 2rem;
          width: 25%;
          box-sizing: border-box;
          padding: 0 3vw;
          line-height: 4vw;
          height: 4vw;
          background: #f4f4f4;
          border: none;
          color: #666;
          font-size: 1.4rem;
          text-align: center;
        }
        .week_list {
          width: 60px;
          text-align: center;
          border: 0.1vw solid #bababa;
          color: #bababa;
          font-size: 1.4rem;
          line-height: 24px;
          border-radius: 12px;
          margin: 8px 8px 1px 8px;
        }
        .active {
          background: #eb5d2a;
          color: #eb5d2a;
          border: 0.1vw solid #eb5d2a;
          color: #fff;
        }
        .screen_btn {
          font-size: 1.5rem;
          margin: 8px 10px 0 10px;
        }
      }
      .item_group2 {
        display: flex;
        align-items: center;
        padding: 2vw 0;
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
      .group_btm {
        border-bottom: 1px solid #f5f5f5;
      }
    }
    .time_container {
      padding: 18vw 4rem 0 4rem;
      .employ_times,
      .free_times {
        display: flex;
        padding: 1vw 0;
        p {
          width: 10vw;
          font-size: 1.6rem;
        }
        .time_list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          flex: 1;
          // padding: 1vw 0 0 0;
          max-height: 140px;
          overflow: hidden;
          overflow-y: scroll;
          li {
            margin: 0 0 10px 20px;
            border: 1px solid #eb5d2a;
            background: #eb5d2a;
            border-radius: 15px;
            font-size: 15px;
            width: 70px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            height: 26px;
          }
          .can_change {
            background: #fff;
            border: 1px solid #eb5d2a;
            color: #333;
          }
          .has_time {
            p {
              text-align: center;
              font-size: 1.4rem;
              color: #666;
            }
          }
        }
      }
      .free_times {
        .time_list {
          li {
            background: #bababa;
            border: 1px solid #bababa;
          }
        }
      }
      .employ_times {
        border-bottom: 0.1rem dashed #dcdcdc;
      }
    }
  }
  .footer_summit {
    position: fixed;
    width: 96%;
    top: 54.3rem;
    left: 50%;
    padding: 2rem 0;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    background: rgba(255, 255, 255, 0.2);
    border-top: 0.1rem solid #dcdcdc;
    .submit_btn {
      display: block;
      margin: 0 auto;
      line-height: 44px;
      height: 44px;
      background: #eb5d2a;
      color: #fff;
      width: 25vw;
      border-radius: 20px;
    }
  }
}
</style>
