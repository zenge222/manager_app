<template>
  <div class="staff_management has-header">
    <Header :title="'员工管理'"></Header>
    <div class="tab_container">
      <div class="search_header">
        <div class="search_item">
          <input type="text" v-model="staffParams.keyWords" placeholder="搜索姓名/电话/工号" />
          <img class="search_icon" src="../../static/icon/icon_search.png" alt />
          <img
            @click="staffParams.keyWords=''"
            class="clear_icon"
            src="../../static/icon/icon_cancel.png"
            alt
          />
        </div>
        <p @click="searchStaff">查询</p>
      </div>

      <div class="staff_no_container">
        <div v-if="staffData.length==0" class="none_list">
          <img src="../../static/images/no_list.png" alt />
          <p>暂无员工</p>
        </div>
      </div>
      <div v-if="staffData.length>0">
        <div class="staff_container">
          <div class="list_box" v-for="(item,index) in staffData" :key="index">
            <div class="staff_list">
              <div class="item_header">
                <h3>{{item.truename}}</h3>
                <p @click="seeTimes(item.id)">查看时间表>></p>
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
          </div>
        </div>
        <div style="padding:2.5rem 0;">
          <!--   -->
          <infinite-loading
            @infinite="infiniteHandler"
            ref="infiniteLoading"
            spinner="bubbles"
            :distance="searchNumber"
          >
            <span style="font-size:1.4rem;color:#999;" slot="no-results">--- 暂无更多员工 ---</span>
            <span style="font-size:1.4rem;;color:#999;" slot="no-more">--- 暂无更多员工 ---</span>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import InfiniteLoading from "vue-infinite-loading";
import { _getStaffList } from "../service/staff";
export default {
  name: "staff_management",
  data() {
    return {
      active: 0,
      searchNumber: 0,
      loadState: null,
      staffParams: {
        pageSize: 8,
        pageNumber: 1,
        keyWords: ""
      },
      staffData: []
    };
  },
  mounted() {
    this.staffParams.keyWords = "";
    this.init();
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    init() {
      this.staffParams.pageNumber = 1;
      // this.staffData = [];
      this.getData("change");
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    getData(flag) {
      let _this = this;
      _getStaffList(this.staffParams).then(res => {
        if (res.data.success) {
          let level = res.data.data.level;
          let workType = res.data.data.workType;
          let page = res.data.data.page;
          if (flag == "change") {
            let resData = res.data.data.list;
            // resData.forEach((val, index) => {
            //   _this.$set(_this.staffData, index, val);
            // });
            _this.staffData = resData;
          } else {
            if (_this.staffParams.pageNumber <= page.totalPage) {
              _this.staffData.push(...res.data.data.list);
            }
          }
          _this.staffData.forEach(val => {
            val.levelName = level[val.level];
            val.workName = workType[val.workType];
          });
        }
      });
    },
    searchStaff() {
      this.init();
    },

    seeTimes(id) {
      let params = {
        employeeId: id
      };
      this.pushTo("UnfixedDate", params);
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.staffParams.pageNumber++;
      _getStaffList(this.staffParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (_this.staffParams.pageNumber <= page.totalPage) {
            let level = res.data.data.level;
            let workType = res.data.data.workType;
            let resData = res.data.data.list;
            let currentData = _this.staffData;
            _this.staffData = _this.staffData.concat(...resData);
            // _this.staffData.forEach((val, index) => {
            //   _this.$set(_this.staffData, index, val);
            // });
            _this.staffData.forEach(val => {
              val.levelName = level[val.level];
              val.workName = workType[val.workType];
            });
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
.staff_management {
  .tab_container {
    background: #fff;
    margin: 2rem auto;
    padding: 0 0 3rem 0;
    width: 96%;
    margin: 2rem auto;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
    .search_header {
      display: flex;
      align-items: center;
      position: fixed;
      width: 96%;
      padding: 1rem 4rem;
      background: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 1;
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
          width: 38rem;
          border-radius: 2rem;
          border: none;
          background: #f4f4f4;
          font-size: 1.4rem;
          box-sizing: border-box;
          padding: 0 6rem 0 6.6rem;
        }
      }
      p {
        line-height: 4rem;
        padding-left: 1.5rem;
        font-size: 1.4rem;
      }
    }
  }
  .staff_no_container {
    padding: 6rem 4rem 0 4rem;
    .none_list {
      padding: 3rem 0;
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
  }
  .staff_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0rem 4rem 0 4rem;
    .list_box {
      margin-top: 2.5rem;
      width: 50%;
      .staff_list {
        box-sizing: border-box;
        padding: 2.1rem 3.1rem;
        box-shadow: 0 0.2rem 0.5rem 0.25rem rgba(203, 203, 203, 0.15);
        h3 {
          font-size: 1.5rem;
          padding-bottom: 1.4rem;
        }
        .item_header {
          display: flex;
          justify-content: space-between;
          p {
            color: #eb5d2a;
          }
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
      }
    }
    .list_box:nth-child(2n) {
      padding-left: 1.25rem;
    }
    .list_box:nth-child(2n + 1) {
      padding-right: 1.25rem;
    }
  }
}
</style>
