<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #333;
  font-size: 1.8rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 1.6rem;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 1.6rem;
  width: 13.4%;
  text-align: center;
  color: #333;
  position: relative;
}
.wh_content_item {
  height: 50px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_item_date span {
  font-size: 1.6rem;
}
.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ddd;
  border-left: 2px solid #ddd;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ddd;
  border-right: 2px solid #ddd;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: #eb5d2a;
  color: #fff;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #eb5d2a;
  color: #fff;
  border-radius: 100px;
}
.wh_content_item .today_box span {
  font-size: 1.8rem;
  color: #333;
}
.wh_content_item .wh_chose_day {
  background: green;
  border-radius: 100px;
}
/* 空闲 */
.wh_content_item .aaa {
  background: #bababa;
  border: 1px solid #bababa;
  color: #fff;
}
/* 已排满 */
.wh_content_item .bbb {
  background: #eb5d2a;
  color: #fff;
}
/* 未排满 */
.wh_content_item .ccc {
  background: #fff;
  border: 1px solid #eb5d2a;
  color: #333;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div
            class="wh_item_date"
            v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_chose_day:item.chooseDay},{aaa:item.status==0},{bbb:item.status==1},{ccc:item.status==2},setClass(item)]"
          >
            <span v-if="item.isToday" class="today_box">今天</span>
            <span v-else v-text="item.id"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from "./calendar";
export default {
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ""
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    employeeId: {
      type: String,
      required: true
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created() {
    this.intStart();
    this.initDate();
  },
  methods: {
    // getData() {
    //   let date = new Date();
    //   let [year, month, day] = [
    //     date.getFullYear(),
    //     date.getMonth() + 1,
    //     date.getDate()
    //   ];
    //   console.log(year, month, day);
    // },
    initDate() {
      this.myDate = new Date();
    },
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function(item, index) {
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      // console.log(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;

      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        k.date = timeUtil.dateFormat(k.workDayTmp);
        return k;
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      // console.log(markDate);
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = false;
        for (const c of markDate) {
          if (c.date === nowTime) {
            k.isMark = true;
            k.status = c.status;
          }
        }
        // k.isMark = markDate.indexOf(nowTime) > -1;
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    // this.getData();
    this.getList(this.myDate);
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    employeeId: {
      handler(val, oldVal) {
        this.employeeId = val;
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>
