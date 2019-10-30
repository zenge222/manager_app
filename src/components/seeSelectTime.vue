<template>
  <div class="selectTime has-header">
    <Header :title="'查看时间'"></Header>
    <div class="tab_container time_select_box">
      <ul>
        <li v-for="(time,x) in allTimeList">
          <!--  @click="check(x,y)" -->
          <p
            v-for="(item,y) in time"
            :class="{check:item.type==1,not_get:item.type==2,select:item.type==3,first_one:item.position==1,last_one:item.position==2}"
          >
            <span v-text="item.time"></span>
          </p>
        </li>
      </ul>
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
      <!-- 
      <span @click="reGet">重选</span>-->
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import { mapState, mapMutations } from "vuex";
import { _getEmployeeTime } from "../service/appointment";
export default {
  name: "SelectTime",
  data() {
    return {
      clickNum: 0,
      submitX: -1,
      submitY: -1,
      tempX1: -1,
      tempY1: -1,
      tempX2: -1,
      tempY2: -1,

      dataTime: [
        // {
        //   startTime: "7:00",
        //   endTime: "9:00"
        // },
        // {
        //   startTime: "15:00",
        //   endTime: "18:00"
        // }
      ],
      tempAllTimeList: [
        "6:00",
        "6:30",
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "",
        "",
        ""
      ],
      tempAllTimeArray: [],
      allTimeList: []
    };
  },
  mounted() {
    if (this.$route.params && this.$route.params.data) {
      this.dataTime = this.$route.params.data;
    }
    // _getEmployeeTime(this.$route.params).then(res => {
    //   console.log(res);
    // });
    this.initTime(this.dataTime);
  },
  components: {
    Header
  },
  computed: {
    // ...mapState({
    //   workDays: state => state.appoint.workDays,
    //   checkWork: state => state.appoint.checkWork
    // })
  },
  methods: {
    // ...mapMutations(["changeWorkDaysData", "changeFreeTimeData"]),
    backPage() {
      this.$router.go(-1);
    },
    // reGet() {
    //   this.clickNum = 0;
    //   this.initTime(this.dataTime);
    // },
    // postData() {
    //   if (this.submitX == -1 || this.submitY == -1) {
    //     this.$toast("请选择日期");
    //   } else {
    //     let startTime = this.allTimeList[this.submitX][this.submitY].time;
    //     let endTime = this.allTimeList[this.tempX2][this.tempY2].time;
    //     // 选择时间段
    //     let changeTimes = { startTime: startTime, endTime: endTime };
    //     console.log(this.checkWork);
    //     if (this.checkWork) {
    //       // 已排日期进入
    //       this.changeWorkDaysData(changeTimes);
    //       this.$router.go(-1);
    //     } else {
    //       // 空闲时间进入
    //       this.changeFreeTimeData(changeTimes);
    //       this.$router.go(-1);
    //     }
    //   }
    // },
    initTime(networkData) {
      const that = this;
      that.allTimeList = new Array();
      that.tempAllTimeArray = new Array();
      for (let i = 0; i < that.tempAllTimeList.length; i++) {
        let tempObj = new Object();
        tempObj.time = that.tempAllTimeList[i];
        tempObj.type = 0;
        tempObj.position = 0;
        for (let k = 0; k < networkData.length; k++) {
          if (
            that.backTime(that.tempAllTimeList[i]) >=
              that.backTime(networkData[k].startTime) &&
            that.backTime(that.tempAllTimeList[i]) <=
              that.backTime(networkData[k].endTime)
          ) {
            tempObj.type = 1;
          }

          if (
            that.backTime(that.tempAllTimeList[i]) <
              that.backTime(networkData[0].startTime) &&
            that.backTime(that.tempAllTimeList[i]) >=
              that.backTime(networkData[0].startTime) - 3600000
          ) {
            tempObj.type = 2;
          }

          if (
            that.backTime(that.tempAllTimeList[i]) >
              that.backTime(networkData[k].endTime) &&
            that.backTime(that.tempAllTimeList[i]) <=
              that.backTime(networkData[k].endTime) + 3600000
          ) {
            tempObj.type = 2;
          }
        }
        that.tempAllTimeArray.push(tempObj);
      }
      let tempArr = new Array();
      for (let m = 0; m < that.tempAllTimeArray.length; m++) {
        if (m % 6 == 0) {
          if (tempArr.length != 0) that.allTimeList.push(tempArr);
          tempArr = new Array();
        }
        tempArr.push(that.tempAllTimeArray[m]);
      }
    },
    backTime(time) {
      let todayTime = new Date();
      let tempDay =
        todayTime.getFullYear() +
        "-" +
        (todayTime.getMonth() + 1) +
        "-" +
        todayTime.getDate() +
        " " +
        time +
        ":00";
      return new Date(tempDay).getTime();
    },
    check(x, y) {
      const that = this;
      if (that.clickNum > 1) {
        this.$toast("时间已选择，请取消后重新选择");
        return;
      }
      if (
        that.allTimeList[x][y].type == 1 ||
        that.allTimeList[x][y].type == 2 ||
        that.allTimeList[x][y].type == 3
      )
        return;
      if (that.clickNum == 0) {
        that.tempX1 = x;
        that.tempY1 = y;
        that.submitX = x;
        that.submitY = y;
        let tempX = x;
        let tempY = y;
        if (y + 4 > 6) {
          x = x + 1;
          y = y % 6;
        }
        if (
          that.allTimeList[x][y].type == 1 ||
          that.allTimeList[x][y].type == 2
        ) {
          //有冲突时间
          this.$toast("可服务时间不到两小时");
          return;
        }
        for (let i = 0; i < 4; i++) {
          if (tempY > 5) {
            tempX = tempX + 1;
            tempY = tempY % 6;
          }
          if (i == 0) {
            that.allTimeList[tempX][tempY].position = 1;
          }
          if (i == 3) {
            that.tempX2 = tempX;
            that.tempY2 = tempY;
            that.allTimeList[tempX][tempY].position = 2;
          }
          that.allTimeList[tempX][tempY].type = 3;
          tempY = tempY + 1;
        }
      }
      if (that.clickNum == 1) {
        that.initTime(that.dataTime);
        that.tempX2 = x;
        that.tempY2 = y;
        let intervalNum =
          that.tempX2 * 6 + that.tempY2 - that.tempX1 * 6 - that.tempY1;
        if (intervalNum < 0) {
          this.$toast("不可逆向选择时间");
          return;
        }
        for (let i = 0; i < intervalNum + 1; i++) {
          if (that.tempY1 > 5) {
            that.tempX1 = that.tempX1 + 1;
            that.tempY1 = that.tempY1 % 6;
          }
          if (i == 0) {
            that.allTimeList[that.tempX1][that.tempY1].position = 1;
          }
          that.allTimeList[that.tempX1][that.tempY1].type = 3;
          that.tempY1 = that.tempY1 + 1;
        }

        that.allTimeList[that.tempX2][that.tempY2].position = 2;
      }

      that.clickNum++;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.selectTime {
  .tab_container {
    background: #fff;
    margin: 2rem auto;
    padding: 3rem 4rem;
    width: 80rem;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
  }
}

.time_select_box {
  font-size: 1.6rem;
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
      border: 0.1vw solid #bababa;
      margin-right: 0.6vw;
    }
    p {
      font-size: 1.2rem;
      margin-right: 1.5vw;
    }
  }
  li {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 0 5vw;

    &:nth-child(1) {
      border-top: 1px solid #ddd;
    }

    p {
      flex: 1;
      text-align: center;
      height: 7vw;

      border-right: 1px solid #ddd;
      display: flex;
      align-items: center;

      span {
        flex: 1;
        height: 4vw;
        line-height: 4vw;
      }

      &:nth-child(1) {
        border-left: 1px solid #ddd;
      }

      &.check {
        background-color: #eb5d2a;
        color: #fff;
      }

      &.not_get {
        background-color: #bababa;
        color: #fff;
      }

      &.select {
        span {
          background-color: #eb5d2a;
          color: #fff;
        }
      }

      &.first_one {
        span {
          border-bottom-left-radius: 2vw;
          border-top-left-radius: 2vw;
        }
      }

      &.last_one {
        span {
          border-bottom-right-radius: 2vw;
          border-top-right-radius: 2vw;
        }
      }
    }
  }
}
</style>
