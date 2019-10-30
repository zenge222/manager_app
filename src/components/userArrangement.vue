<template>
  <div class="userArrangement has-header">
    <Header :title="'用户管理'"></Header>

    <div class="tab_container">
      <div style="display: flex;justify-content: space-between;">
        <div class="search_header">
          <div class="search_item">
            <input type="text" placeholder="搜索姓名/电话" v-model="userParams.keyWords">
            <img class="search_icon" src="../../static/icon/icon_search.png" alt>
            <img
              @click="userParams.keyWords=''"
              class="clear_icon"
              src="../../static/icon/icon_cancel.png"
              alt
            >
          </div>
          <p @click="searchUser">查询</p>
        </div>
        <div class="add_archives">
          <!-- <van-icon class-prefix="add_icon" name="add-o" size="30px"/> -->
          <!-- <span>添加档案</span> -->
        </div>
      </div>

      <div class="staff_no_container" v-if="userList.length==0">
        <div class="none_list">
          <img src="../../static/images/no_list.png" alt>
          <p>暂无订单</p>
        </div>
      </div>
      <div v-if="userList.length>0">
        <div class="staff_container">
          <div class="list_box" v-for="(item,index) in userList" :key="index">
            <div class="staff_list">
              <div class="item_header">
                <h3>{{item.nickname ||'未命名'}}</h3>
                <!-- <img src="../../static/images/icon_member1.png" alt=""> -->
              </div>
              <div class="staff_info">
                <div class="info_item">
                  <img src="../../static/icon/icon_sexuality.png">
                  <span>{{item.sex==0?'男':'女'}}</span>
                </div>
                <div class="info_item">
                  <img src="../../static/icon/icon_iphone.png">
                  <span>{{item.phone}}</span>
                </div>
              </div>
              <div class="staff_info">
                <div class="info_item">
                  <img src="../../static/icon/icon_map.png">
                  <span class="addr_text">{{item.userArchivesAddress||'暂无档案地址'}}</span>
                </div>
              </div>
              <div class="staff_info">
                <div class="info_item">
                  <img src="../../static/icon/icon_time.png">
                  <span>{{item.createTimeStr}}</span>
                </div>
              </div>
              <div class="to_edit_archives" @click="toUserFiles(item.id)">
                <p>编辑档案>></p>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:50px 0;text-align: center;">
          <infinite-loading
            @infinite="infiniteHandler"
            ref="infiniteLoading"
            spinner="bubbles"
            :distance="searchNumber"
          >
            <span style="font-size:1.4rem;color:#999;" slot="no-results">--- 暂无更多列表 ---</span>
            <span style="font-size:1.4rem;;color:#999;" slot="no-more">--- 暂无更多列表 ---</span>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getUserList } from "../service/user";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "UserArrangement",
  data() {
    return {
      userParams: {
        pageNumber: 1,
        pageSize: 6,
        keyWords: ""
      },
      loadState: null,
      userList: [],
      searchNumber: 0
    };
  },
  mounted() {
    this.userParams.keyWords = "";
    this.init();
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    init() {
      this.userParams.pageNumber = 1;
      // this.userList = [];
      this.getData();
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    searchUser() {
      this.init();
    },
    getData() {
      let _this = this;
      _getUserList(this.userParams).then(res => {
        if (res.data.success) {
          _this.userList = res.data.data.list;
        }
      });
    },
    toUserFiles(id) {
      let params = {
        id: id
      };
      this.pushTo("UserFiles", params);
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.userParams.pageNumber++;
      _getUserList(this.userParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (_this.userParams.pageNumber <= page.totalPage) {
            _this.userList.push(...res.data.data.list);
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
.userArrangement {
  .tabs_box {
    background: #f5f5f5;
  }
  .tab_container {
    background: #fff;
    margin: 2rem auto;
    padding: 0 0px 60px 0px;
    height: 50rem;
    width: 96%;
    margin: 2rem auto;
    overflow: hidden;
    overflow-y: scroll;
    .add_archives {
      position: relative;
      // .add_icon{
      //  display: block;
      // }
      span {
        font-size: 1.4rem;
        line-height: 4rem;
      }
    }
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
          position: absolute;
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
    .staff_no_container {
      padding: 6rem 4rem 0 4rem;
    }
    .staff_container {
      display: flex;
      flex-direction: row;
      padding: 6rem 4rem 0 4rem;
      flex-wrap: wrap;
      .list_box {
        margin-top: 2.5rem;
        width: 50%;
        .staff_list {
          box-sizing: border-box;
          padding: 2.1rem 3.1rem;
          box-shadow: 0 0.2rem 0.5rem 0.25rem rgba(203, 203, 203, 0.15);
          .item_header {
            display: flex;
            justify-content: space-between;
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
                padding-left: 0.3rem;
              }
              .addr_text {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 34.5rem;
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
          .to_edit_archives {
            display: flex;
            flex-direction: row-reverse;
            p {
              color: #eb5d2a;
              font-size: 1.2rem;
            }
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
}
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
</style>
