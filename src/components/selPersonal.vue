<template>
  <div class="sel_personal has-header">
    <Header :title="'选择服务人员'"></Header>
    <div class="tab_container">
      <div class="time_and_search">
        <div class="time_list">
          <img src="../../static/images/sel_time.png" alt />
          <div class="start_time"></div>
          <div class="time_date" @click="timePopShow=true">{{personParams.endDay||'起始日期'}}</div>
          <img style="margin-left: 1rem;" src="../../static/images/sel_time.png" alt />
          <div @click="showStartTimePop" class="time_date">{{personParams.startTime||'开始时间'}}</div>
          <div class="line_between"></div>
        </div>
        <div class="search_header">
          <div class="time_list">
            <div @click="showEndTimePop" class="time_date">{{personParams.endTime||'结束时间'}}</div>
          </div>
          <div class="search_item">
            <input type="text" placeholder="搜索姓名/工号" v-model="personParams.keyWords" />
            <img class="search_icon" src="../../static/icon/icon_search.png" alt />
            <img
              @click="personParams.keyWords=''"
              class="clear_icon"
              src="../../static/icon/icon_cancel.png"
              alt
            />
          </div>
          <p @click="searchPerson">查询</p>
        </div>
      </div>
      <div class="staff_container">
        <div class="list_box" v-for="(item,index) in personList" :key="index">
          <div class="staff_list">
            <div class="staff_padding">
              <div class="see_info">
                <h3>{{item.truename}}</h3>
                <!-- <p>查看时间表>></p> -->
              </div>
              <div class="staff_info">
                <div class="info_item">
                  <img src="../../static/icon/icon_ID.png" />
                  <span>{{item.workNum}}</span>
                </div>
                <div class="info_item">
                  <img src="../../static/icon/icon_grade.png" />
                  <span>{{item.levelName}}技工</span>
                </div>
                <div class="info_item">
                  <img src="../../static/icon/icon_type_of_work.png" />
                  <span>{{item.workName}}</span>
                </div>
              </div>
              <div class="staff_info">
                <div class="info_item">
                  <img src="../../static/icon/icon_Identity card.png" />
                  <span>{{item.idcard}}</span>
                </div>
                <div class="info_item">
                  <img src="../../static/icon/icon_iphone.png" />
                  <span>{{item.phone}}</span>
                </div>
              </div>
            </div>
            <van-button class="submit_person" @click="submitPerson(item)">确定</van-button>
          </div>
        </div>
      </div>
      <div style="padding:50px 0;">
        <infinite-loading
          @infinite="infiniteHandler"
          ref="infiniteLoading"
          spinner="bubbles"
          :distance="searchNumber"
        >
          <span style="font-size:1.4rem;color:#999;" slot="no-results">--- 暂无数据 ---</span>
          <span style="font-size:1.4rem;;color:#999;" slot="no-more">--- 暂无更多数据 ---</span>
        </infinite-loading>
      </div>
    </div>
    <van-popup v-model="timePopShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="请选择开始时间"
        @confirm="submitTime"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <van-popup v-model="timePopShow2" position="bottom">
      <van-datetime-picker
        title="请选择时间"
        v-model="currentTime"
        @cancel="timePopShow2=false"
        :min-hour="startNumber"
        :max-hour="endNumber"
        @confirm="submitTime2"
        :filter="filter"
        type="time"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getPersonList } from "../service/work";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapMutations } from "vuex";
export default {
  name: "SelPersonal",
  data() {
    return {
      startNumber: 8,
      endNumber: 22,
      // 是否点击开始时间
      isStartTime: true,
      currentDate: new Date(),

      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(),
      // 时间选择弹窗
      timePopShow: false,
      timePopShow2: false,
      currentTime: "08:00",
      selTimeIndex: 0,
      personParams: {
        pageSize: 8,
        pageNumber: 1,
        keyWords: "",
        serviceId: "",
        endDay: "",
        startTime: "",
        endTime: ""
      },
      personList: [],
      searchNumber: 0,
      loadState: null
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      addTime: state => state.work.addTime
    })
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.personParams.endDay = this.addTime.dateTime;
      this.personParams.startTime = this.addTime.startTime;
      this.personParams.endTime = this.addTime.endTime;
      // keep-alive组件已缓存 需要手动初始化数据
      this.personParams.pageNumber = 1;
      this.init();
    }
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    ...mapMutations(["setEmployeeIdName", "setAddTime"]),
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0);
      }
      return options;
    },
    init() {
      let _this = this;
      let getParams = this.$route.params;
      let maxSelDate = new Date();
      maxSelDate.setFullYear(maxSelDate.getFullYear() + 1);
      maxSelDate.setDate(maxSelDate.getDate() - 1);
      this.maxDate = maxSelDate;

      this.personParams.serviceId = getParams.id;
      this.personParams.endDay = getParams.dateTime;
      this.personParams.endTime = getParams.endTime;
      this.personParams.startTime = getParams.startTime;
      _getPersonList(this.personParams).then(res => {
        // console.log(res);
        // _this.personParams.endTime = res.data.data.endTime;
        // _this.personParams.startTime = res.data.data.startTime;
        let level = res.data.data.level;
        let workType = res.data.data.workType;
        _this.personList = res.data.data.list;
        _this.personList.forEach(val => {
          val.levelName = level[val.level];
          val.workName = workType[val.workType];
        });
      });
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    searchPerson() {
      let _this = this;
      this.personParams.pageNumber = 1;
      _getPersonList(this.personParams).then(res => {
        // console.log(res);
        // _this.personParams.endTime = res.data.data.endTime;
        // _this.personParams.startTime = res.data.data.startTime;
        let level = res.data.data.level;
        let workType = res.data.data.workType;
        _this.personList = res.data.data.list;
        _this.personList.forEach(val => {
          val.levelName = level[val.level];
          val.workName = workType[val.workType];
        });
      });
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    submitTime(val) {
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      // const resTime = this.p(d.getHours()) + ":" + this.p(d.getMinutes());
      console.log(resDate);
      this.personParams.endDay = resDate;
      this.timePopShow = false;
      // 储存状态 待处理
    },
    showStartTimePop() {
      this.timePopShow2 = true;
      this.selTimeIndex = 0;
    },
    showEndTimePop() {
      this.timePopShow2 = true;
      this.selTimeIndex = 1;
    },
    submitTime2(val) {
      //   console.log(val);
      let timesArr = val.split(":");
      let hour = timesArr[0];
      let minute = Number(timesArr[1]) ? "30" : "00";
      if (this.selTimeIndex == 0) {
        this.personParams.startTime = `${hour}:${minute}`;
      } else {
        this.personParams.endTime = `${hour}:${minute}`;
      }
      this.timePopShow2 = false;
    },
    submitPerson(item) {
      // 存状态 名字id
      let params = {
        id: item.id,
        nickname: item.nickname,
        truename: item.truename
      };
      this.$store.commit("setEmployeeIdName", params);
      let timeStr = `${this.personParams.endDay} ${this.personParams.startTime}至${this.personParams.endTime}`;
      // 储存 时间段  待处理
      let submitParams = {
        dateTime: this.personParams.endDay,
        startTime: this.personParams.startTime,
        endTime: this.personParams.endTime,
        timeString: timeStr,
        name: "selPersonal"
      };
      this.$store.commit("setAddTime", submitParams);
      this.replaceTo("AddWork");
    },
    selStartTime() {
      this.timePopShow = true;
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.personParams.pageNumber++;
      _getPersonList(this.personParams).then(res => {
        if (res.data.success) {
          let level = res.data.data.level;
          let workType = res.data.data.workType;
          let page = res.data.data.page;
          let resData = res.data.data.list;
          if (_this.personParams.pageNumber < page.totalPage) {
            resData.forEach(val => {
              val.levelName = level[val.level];
              val.workName = workType[val.workType];
            });
            _this.personList.push(...resData);
            $state.loaded(); // 加载
          } else {
            $state.complete(); // 无数据 完成
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sel_personal {
  .tabs_box {
    background: #f5f5f5;
  }
  .tab_container {
    background: #fff;
    padding: 0 0 3rem 0;
    width: 96%;
    margin: 2rem auto;
    height: 50rem;
    overflow: hidden;
    overflow-y: scroll;
    .time_and_search {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      width: 96%;
      padding: 1rem 3rem;
      background: #fff;
      flex-wrap: nowrap;
      z-index: 1;
      border-bottom: 0.1rem solid #ddd;
      .time_list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        img {
          width: 2rem;
        }
        .time_date {
          display: block;
          margin-left: 1rem;
          line-height: 4rem;
          width: 14rem;
          height: 4rem;
          border-radius: 40px;
          background: #f4f4f4;
          border: none;
          padding: 0 1rem;
          font-size: 1.4rem;
          text-align: center;
        }
        .line_between {
          width: 1rem;
          height: 0.1rem;
          background: #666;
          margin: 0 0.8rem;
        }
      }
    }
    .search_header {
      display: flex;
      flex: 1;
      align-items: center;
      .search_item {
        position: relative;
        img {
          width: 2rem;
        }
        .search_icon {
          position: absolute; // 9
          left: 2.5rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        .clear_icon {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        input {
          line-height: 4rem;
          height: 4rem;
          width: 17rem;
          border-radius: 2rem;
          border: none;
          margin-left: 1rem;
          background: #f4f4f4;
          font-size: 1.4rem;
          box-sizing: border-box;
          padding: 0 4rem 0 4.5rem;
        }
      }
      p {
        line-height: 4rem;
        padding-left: 1.5rem;
        font-size: 1.4rem;
      }
    }
  }
  .staff_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6rem 4rem 0 4rem;
    .list_box {
      margin-top: 2.5rem;
      width: 50%;
      .staff_list {
        box-sizing: border-box;
        padding: 2.1rem 0 0 0;
        box-shadow: 0 0.2rem 0.5rem 0.25rem rgba(203, 203, 203, 0.15);
        .staff_padding {
          padding: 0 3.1rem;
        }
        h3 {
          font-size: 1.5rem;
          padding-bottom: 1.3rem;
        }
        .staff_info {
          display: flex;
          .info_item {
            margin-right: 2.9rem;
            padding-left: 1.6rem;
            position: relative;
            span {
              line-height: 2.5;
              font-size: 1.2rem;
            }

            img {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translate(0, -50%);
              width: 1.2rem;
            }
          }
        }
        .see_info {
          display: flex;
          justify-content: space-between;
          p {
            font-size: 1.2rem;
            color: #eb5d2a;
          }
        }
        .submit_person {
          width: 100%;
          margin-top: 1.6rem;
          color: #fff;
          background: #eb5d2a;
          font-size: 1.4rem;
          height: 3rem;
          line-height: 3rem;
        }
      }
    }
    .list_box:nth-child(2n) {
      padding-right: 2.5rem;
    }
    .list_box:nth-child(2n + 1) {
      padding-right: 2.5rem;
    }
  }
}
</style>
