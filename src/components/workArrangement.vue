<template>
  <div class="work_arrangement has-header">
    <Header :title="'工作安排'"></Header>

    <van-tabs class="tabs_box" v-model="active" @change="tabChange">
      <van-tab title="未安排">
        <div class="tab_container">
          <!-- <div class="search_header">
            <div class="search_item">
              <input type="text" placeholder="搜索订单编号/名称">
              <img class="search_icon" src="../../static/icon/icon_search.png" alt>
              <img class="clear_icon" src="../../static/icon/icon_cancel.png" alt>
            </div>
            <p>查询</p>
          </div>-->
          <div v-if="workList.length==0" class="none_list">
            <img src="../../static/images/no_list.png" />
            <p>暂无工作安排</p>
          </div>
          <div class="search_list" v-if="workList.length>0">
            <div class="list_item_box" v-for="(item,index) in workList" :key="index">
              <div class="list_item">
                <div class="item_header">
                  <h3 v-if="item.indent.indentType==0">{{item.indent.productPackageName}}</h3>
                  <h3 v-if="item.indent.indentType!=0">{{item.indent.productName}}</h3>
                  <p @click="toAddWork(item)">安排</p>
                </div>
                <div class="item_info">
                  <div class="info_list">
                    <p>服务时间</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="info_list">
                    <p>客户姓名</p>
                    <span>{{item.user.nickname}}</span>
                  </div>
                  <div class="info_list">
                    <p>联系电话</p>
                    <span>{{item.user.phone}}</span>
                  </div>
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
        </div>
      </van-tab>
      <van-tab title="已安排">
        <div class="tab_container">
          <!-- <div class="search_header">
            <div class="search_item">
              <input type="text" placeholder="搜索订单编号/名称">
              <img class="search_icon" src="../../static/icon/icon_search.png" alt>
              <img class="clear_icon" src="../../static/icon/icon_cancel.png" alt>
            </div>
            <p>查询</p>
          </div>-->
          <div v-if="workList.length==0" class="none_list">
            <img src="../../static/images/no_list.png" alt />
            <p>暂无工作安排</p>
          </div>
          <div class="search_list" v-if="workList.length>0">
            <div class="list_item_box" v-for="(item,index) in workList" :key="index">
              <div class="list_item">
                <div class="item_header">
                  <h3 v-if="item.indent.indentType==0">{{item.indent.productPackageName}}</h3>
                  <h3 v-if="item.indent.indentType!=0">{{item.indent.productName}}</h3>
                  <p @click="toEditWork(item)">修改</p>
                </div>
                <div class="item_info">
                  <div class="info_list">
                    <p>服务时间</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="info_list">
                    <p>客户姓名</p>
                    <span>{{item.user.nickname}}</span>
                  </div>
                  <div class="info_list">
                    <p>联系电话</p>
                    <span>{{item.user.phone}}</span>
                  </div>
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
        </div>
      </van-tab>
      <van-tab title="已评价">
        <div class="tab_container">
          <div class="top_item">
            <div class="search">
              <div class="search_item">
                <input type="text" v-model="workParams.keyWords" placeholder="搜索联系电话/服务人员" />
                <img class="search_icon" src="../../static/icon/icon_search.png" alt />
                <img
                  @click="workParams.keyWords=''"
                  class="clear_icon"
                  src="../../static/icon/icon_cancel.png"
                />
              </div>
              <p @click="sendKeyWord">查询</p>
            </div>
            <div class="score_item" style="padding-left:80px;">
              <div class="type_list">
                <h3>评分</h3>
                <div class="sel_type" @click="scoreShow=true" v-text="scoreCurrent">
                  <van-icon class="right_icon" name="arrow" />
                </div>
              </div>
            </div>
            <div class="score_item" style="padding-left:20px;">
              <div class="type_list">
                <h3>订单日期</h3>
                <!-- -->
                <div class="sel_type">
                  <p
                    @click="showDate=true"
                    style="padding:0;line-height:36px;"
                    v-text="workParams.indentData||'全部'"
                  ></p>
                  <van-icon @click="clearDate" class="right_icon" name="cross" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="workList.length==0" class="none_list" style="margin-top:4rem">
            <img src="../../static/images/no_list.png" alt />
            <p>暂无工作安排</p>
          </div>
          <div class="search_list" style="margin-top:73px;" v-if="workList.length>0">
            <div class="list_item_box" v-for="(item,index) in workList" :key="index">
              <div class="list_item">
                <div class="item_header">
                  <h3 v-if="item.indent.indentType==0">{{item.indent.productPackageName}}</h3>
                  <h3 v-if="item.indent.indentType!=0">{{item.indent.productName}}</h3>
                  <p @click="toWorkDetail(item.id)">查看详情</p>
                </div>
                <div class="item_info">
                  <div class="info_list">
                    <p>服务时间</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="info_list">
                    <p>客户姓名</p>
                    <span>{{item.user.nickname}}</span>
                  </div>
                  <div class="info_list">
                    <p>联系电话</p>
                    <span>{{item.user.phone}}</span>
                  </div>
                  <div class="info_list">
                    <p>客户评价</p>
                    <span class="content">{{item.content||'暂无评价'}}</span>
                  </div>
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
        </div>
      </van-tab>
    </van-tabs>
    <van-popup class="check_bottom_pop" v-model="scoreShow" position="bottom">
      <van-picker
        show-toolbar
        title="请选择评分范围"
        :columns="scoreColumns"
        :default-index="0"
        @cancel="scoreShow = false"
        @confirm="scoreConfirm"
      />
    </van-popup>
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="请选择订单日期"
        @confirm="submitTime"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getWorkList } from "../service/work";
import InfiniteLoading from "vue-infinite-loading";
import { mapMutations } from "vuex";
export default {
  name: "WorkArrangement",
  data() {
    return {
      showDate: false,
      currentDate: new Date(),
      dateStr: "",
      minDate: new Date(),
      maxDate: new Date(),
      scoreShow: false,
      active: 0,
      scoreColumns: ["全部", "1.0-3.0分", "3.0-4.0分", "4.0-5.0分"],
      scoreList: [
        { title: "全部", type: "1-5" },
        { title: "1.0-3.0分", type: "1-3" },
        { title: "3.0-4.0分", type: "3-4" },
        { title: "4.0-5.0分", type: "4-5" }
      ],
      scoreCurrent: "全部",
      workParams: {
        pageNumber: 1,
        pageSize: 6,
        keyWords: "",
        status: 0,
        scroe: "",
        indentData: "",
        keyWords: ""
      },
      searchNumber: 0,
      loadState: null,
      workList: []
    };
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.active = 0;
      this.initParams();
      this.getData("change");
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    } else {
      this.workParams.pageNumber = 1;
      this.getData("change");
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    }
  },
  mounted() {
    this.initParams();
    this.getData("change");
    console.log(this.workParams.indentData);
    if (this.loadState) {
      this.$nextTick(() => {
        // 重置
        this.loadState.reset();
      });
    }
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    ...mapMutations(["initEmployeeIdName"]),
    initParams() {
      this.workParams.pageNumber = 1;
      this.workParams.status = 0;
      this.workParams.scroe = "";
      this.workParams.indentData = "";
      this.workParams.keyWords = "";
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    getData(flag) {
      let _this = this;
      _getWorkList(this.workParams).then(res => {
        if (res.data.success) {
          let resData = res.data.data.list;
          let firstTime = res.data.data.firstTime.split("-");
          let endTime = res.data.data.endTime.split("-");
          _this.minDate = new Date(
            Number(firstTime[0]),
            Number(firstTime[1] - 1),
            Number(firstTime[2])
          );
          _this.maxDate = new Date(
            Number(endTime[0]),
            Number(endTime[1] - 1),
            Number(endTime[2])
          );
          // console.log( _this.minDate.getMonth(), _this.maxDate.getMonth())
          // console.log(firstTime,endTime)
          if (flag == "change") {
            _this.workList = resData;
          } else {
            _this.workList.push(...resData);
          }
        }
      });
    },
    getDateStr(val) {
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      return resDate;
    },
    submitTime(val) {
      this.workParams.indentData = this.getDateStr(val);
      this.showDate = false;
      this.getData("change");
    },
    scoreConfirm(value) {
      this.scoreCurrent = value;
      this.scoreList.find(val => {
        if (value == val.title) {
          this.workParams.scroe = val.type;
        }
      });
      this.getData("change");
      this.scoreShow = false;
    },
    sendKeyWord() {
      this.getData("change");
    },
    toAddWork(item) {
      let params = {
        id: item.id
      };
      this.$store.commit("initEmployeeIdName");
      this.pushTo("AddWork", params);
    },
    clearDate() {
      this.workParams.indentData = "";
      this.getData("change");
    },
    tabChange(e) {
      switch (e) {
        case 0:
          this.workList = [];
          this.workParams.pageNumber = 1;
          this.workParams.status = 0;
          this.workParams.scroe = "";
          this.workParams.indentData = "";
          this.workParams.keyWords = "";
          this.getData("change");
          if (this.loadState) {
            this.$nextTick(() => {
              // 重置
              this.loadState.reset();
            });
          }
          break;
        case 1:
          this.workList = [];
          this.workParams.pageNumber = 1;
          this.workParams.status = 1;
          this.workParams.scroe = "";
          this.workParams.indentData = "";
          this.workParams.keyWords = "";
          this.getData("change");
          if (this.loadState) {
            this.$nextTick(() => {
              // 重置
              this.loadState.reset();
            });
          }
          break;
        case 2:
          this.workList = [];
          this.workParams.pageNumber = 1;
          this.workParams.status = 4;
          this.getData("change");
          this.workParams.indentData = this.getDateStr(new Date());
          if (this.loadState) {
            this.$nextTick(() => {
              // 重置
              this.loadState.reset();
            });
          }
          break;
        default:
          break;
      }
    },
    toWorkDetail(id) {
      let params = {
        id: id
      };
      this.pushTo("WorkDetail", params);
    },
    toEditWork(item) {
      let params = {
        id: item.id
      };
      // 存状态 名字id
      let params2 = {
        id: item.id,
        nickname: item.employee.nickname,
        truename: item.employee.truename
      };
      console.log(params2);
      this.$store.commit("setEmployeeIdName", params2);
      this.pushTo("EditWork", params);
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.workParams.pageNumber++;
      _getWorkList(this.workParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (_this.workParams.pageNumber <= page.totalPage) {
            _this.workList.push(...res.data.data.list);
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
.work_arrangement {
  .tabs_box {
    background: #f5f5f5;
  }
  .tab_container {
    background: #fff;
    margin: 2rem auto;
    padding: 0 0 3rem 0;
    width: 96%;
    margin: 2rem auto;
    height: 50rem;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
    .top_item {
      display: flex;
      align-items: center;
      position: fixed;
      width: 96%;
      padding: 1rem 4rem;
      background: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 1;
      .search_header {
        display: flex;
      }
      .search {
        display: flex;
        p {
          font-size: 1.6rem;
        }
      }
      .search_item {
        position: relative;
        .search_icon {
          width: 2rem;
          position: absolute; // 9
          left: 2.9rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        .clear_icon {
          width: 2rem;
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        input {
          line-height: 4rem;
          height: 4rem;
          width: 25rem;
          border-radius: 2rem;
          border: none;
          background: #f4f4f4;
          font-size: 1.4rem;
          box-sizing: border-box;
          padding: 0 6rem 0 6.6rem;
        }
      }
      .score_item {
        .type_list {
          display: flex;
          align-items: center;
          h3 {
            font-size: 1.6rem;
            padding-right: 1.5vw;
          }
          .sel_type {
            position: relative;
            font-size: 1.4rem;
            border: 1px solid #dcdcdc;
            line-height: 34px;
            width: 15vw;
            padding-left: 1.5vw;
            font-weight: 100;
            .right_icon {
              position: absolute;
              right: 1vw;
              top: 50%;
              font-size: 1.6rem;
              color: #9e9e9e;
              transform: translate(0, -50%);
            }
          }
        }
      }

      p {
        line-height: 4rem;
        padding-left: 1.5rem;
        font-size: 1.4rem;
      }
    }
    .search_list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 4rem 0 4rem;
      .list_item_box {
        width: 50%;
        box-sizing: border-box;
        .list_item {
          box-sizing: border-box;
          padding: 2.1rem 3.1rem;
          box-shadow: 0 0.2rem 0.5rem 0.25rem rgba(203, 203, 203, 0.15);
          margin-top: 2.5rem;
          .item_header {
            display: flex;
            justify-content: space-between;
            padding: 0 0 1.5rem 0;
            border-bottom: 1px solid #e6e6e6;
            h3 {
              font-size: 1.6rem;
            }
            p {
              font-size: 1.4rem;
              width: 8rem;
              line-height: 2.3rem;
              text-align: center;
              border: 2px solid #eb5d2a;
              color: #eb5d2a;
              border-radius: 1.1rem;
            }
          }
          .item_info {
            padding-top: 1.5rem;
            .info_list {
              display: flex;
              justify-content: space-between;
              font-size: 1.4rem;
              line-height: 2;
              color: #666666;
              .content {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
              }
              // p{

              // }
              // span{
              //   font-size: 28px;
              //   line-height: 2;
              // }
            }
          }
        }
      }
      .list_item_box:nth-child(2n + 1) {
        padding-right: 2.5rem;
      }
      .list_item_box:nth-child(2n + 1) {
        padding-right: 2.5rem;
      }
    }
  }
}
.none_list {
  padding: 3rem 0 3rem 0;
  img {
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
    font-size: 1.4rem;
    color: #999;
  }
}
</style>
