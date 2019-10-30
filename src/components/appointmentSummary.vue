<template>
  <div class="appointment_summary has-header">
    <Header :title="'预约汇总'"></Header>

    <van-tabs class="tabs_box" v-model="active" @change="tabChange">
      <van-tab title="待面试">
        <div class="load_container">
          <!-- v-if -->
          <div v-if="appointmentData.length==0" class="none_list">
            <img src="../../static/images/no_list.png" alt />
            <p>暂无面试</p>
          </div>
          <!-- v-if -->
          <div v-if="appointmentData.length>0">
            <div class="tab_container">
              <div class="list_box" v-for="(item,index) in appointmentData" :key="index">
                <div class="appointment_list">
                  <div class="pin_box">
                    <img class="pin_icon" src="../../static/images/icon_paper_clip.png" alt />
                  </div>
                  <div class="app_list">
                    <p>商品名称：</p>
                    <span v-text="item.productName"></span>
                  </div>
                  <div class="app_list" @click="toAddUserFiles(item)">
                    <p>客户姓名：</p>
                    <span>{{item.linkName}}</span>
                  </div>
                  <div class="app_list">
                    <p>联系方式：</p>
                    <span>{{item.linkPhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>服务人员：</p>
                    <span>{{item.employeeName}}</span>
                  </div>
                  <div class="app_list">
                    <p>联系电话：</p>
                    <span>{{item.employeePhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>面试时间：</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="app_list">
                    <p>客户地址：</p>
                    <span class="addr_info">{{item.areaText}} {{item.address}}</span>
                  </div>
                  <div class="app_btn_box">
                    <div class="left_btn" @click="appointSuccess(item,item.id,index)">
                      <img src="../../static/images/btn_yes.png" alt />
                      <span>面试成功</span>
                    </div>
                    <div class="right_brn" @click="appointFail(item,item.id,index)">
                      <img src="../../static/images/btn_no.png" alt />
                      <span>面试失败</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding:2.5rem 0;">
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
      <van-tab title="面试成功">
        <div class="load_container">
          <div v-if="appointmentData.length==0" class="none_list">
            <img src="../../static/images/no_list.png" alt />
            <p>暂无面试</p>
          </div>
          <div v-if="appointmentData.length>0">
            <div class="tab_container">
              <div class="list_box" v-for="(item,index) in appointmentData" :key="index">
                <div class="appointment_list">
                  <div class="pin_box">
                    <img class="pin_icon" src="../../static/images/icon_paper_clip.png" alt />
                  </div>
                  <div class="app_list">
                    <p>商品名称：</p>
                    <span v-text="item.productName"></span>
                  </div>
                  <div class="app_list">
                    <p>客户姓名：</p>
                    <span>{{item.linkName}}</span>
                  </div>
                  <div class="app_list">
                    <p>联系方式：</p>
                    <span>{{item.linkPhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>服务人员：</p>
                    <span>{{item.employeeName}}</span>
                  </div>
                  <div class="app_list">
                    <p>联系电话：</p>
                    <span>{{item.employeePhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>面试时间：</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="app_list">
                    <p>客户地址：</p>
                    <span class="addr_info">{{item.areaText}} {{item.address}}</span>
                  </div>
                  <van-button @click="toOrderPage(item.id)" class="footer_order_btn" size="large">下单</van-button>
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
      <van-tab title="已结束">
        <div class="load_container">
          <div v-if="appointmentData.length==0" class="none_list">
            <img src="../../static/images/no_list.png" alt />
            <p>暂无面试</p>
          </div>
          <div v-if="appointmentData.length>0">
            <div class="tab_container">
              <div class="list_box" v-for="(item,index) in appointmentData" :key="index">
                <div class="appointment_list">
                  <div class="pin_box">
                    <img class="pin_icon" src="../../static/images/icon_paper_clip.png" alt />
                  </div>
                  <div class="app_list app_list2">
                    <div class="customer_box">
                      <p>商品名称：</p>
                      <span>{{item.productName}}</span>
                    </div>
                    <!-- 6 取消 5 失败 -->
                    <p class="customer_btn">{{item.status==6?'面试取消':'面试失败'}}</p>
                  </div>
                  <div class="app_list">
                    <p>客户姓名：</p>
                    <span v-text="item.linkName"></span>
                  </div>
                  <div class="app_list">
                    <p>联系方式：</p>
                    <span>{{item.linkPhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>服务人员：</p>
                    <span>{{item.employeeName}}</span>
                  </div>
                  <div class="app_list">
                    <p>联系电话：</p>
                    <span>{{item.employeePhone}}</span>
                  </div>
                  <div class="app_list">
                    <p>面试时间：</p>
                    <span>{{item.startTimeStr}}</span>
                  </div>
                  <div class="app_list">
                    <p>客户地址：</p>
                    <span class="addr_info">{{item.address}}</span>
                  </div>
                  <van-button @click="toDetail(item)" class="footer_order_btn2" size="large">查看详情</van-button>
                </div>
              </div>
            </div>
            <div style="padding:2.5rem 0;">
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
    <van-popup class="middle_pop" v-model="interviewPopShow" :close-on-click-overlay="false">
      <div class="pop_header">
        <div class="header_left" @click="closeInterview">取消</div>
        <div class="header_title">面试失败理由</div>
        <div class="header_right"></div>
      </div>
      <div class="pop_content">
        <textarea class="message_input" v-model="failParams.remark"></textarea>
      </div>
      <div class="pop_footer">
        <van-button @click="interviewSubmit" class="submit_btn">发布</van-button>
      </div>
      <!--   -->
    </van-popup>
    <van-popup class="middle_pop" v-model="userFilesShow" :close-on-click-overlay="false">
      <div class="pop_header2">
        <img @click="userFilesShow=false" src="../../static/images/btn_over.png" alt />
      </div>
      <div class="pop_content2">
        <img src="../../static/images/def_prompt.png" alt />
        <p>还未完善顾客档案资料</p>
      </div>
      <div class="pop_footer">
        <van-button @click="toUserFiles" class="submit_btn">去完善</van-button>
      </div>
    </van-popup>
    <!-- <div class="check_box_css1">
      <span @click="a=!a">
        <input id="a" type="checkbox" :checked="a">
        <label>
          <span style="width:2rem; height:2rem;"></span>
        </label>
        <em>123</em>
      </span>
    </div>-->
  </div>
</template>

<script>
import Header from "./component/header";
import InfiniteLoading from "vue-infinite-loading";
import {
  _getAppointList,
  _failAppoint,
  _successAppoint
} from "../service/appointment";
import { mapMutations } from "vuex";
export default {
  name: "AppointmentSummary",
  data() {
    return {
      active: 0,
      interviewPopShow: false,
      userFilesShow: false,
      searchNumber: 0,
      loadState: null,
      appointmentParams: {
        pageNumber: 1,
        pageSize: 6,
        status: 1
      },
      appointmentData: [],
      failParams: {
        remark: "",
        id: ""
      },
      appoinItemId: "",
      // 强行去档案页
      changeIndex: -1
    };
  },
  mounted() {
    this.initPrarms();
    this.init();
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      console.log(this.changeIndex);
      this.active = 0;
      this.currentIndex = this.changeIndex = -1;
      // keep-alive组件已缓存 需要手动初始化数据
      this.init();
    } else {
      // 待处理 可能需要储存 跳转状态
      this.init();
    }
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    ...mapMutations(["clearAppointTime"]),
    initPrarms() {
      this.appointmentParams.status = 1;
    },
    init() {
      this.appointmentParams.pageNumber = 1;
      this.getData("change");
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    tabChange(e) {
      switch (e) {
        case 0:
          // this.appointmentData = [];
          this.appointmentParams.pageNumber = 1;
          this.appointmentParams.status = 1;
          this.init();
          break;
        case 1:
          //  this.appointmentData = [];
          this.appointmentParams.pageNumber = 1;
          this.appointmentParams.status = 2;
          this.init();
          break;
        case 2:
          //  this.appointmentData = [];
          this.appointmentParams.pageNumber = 1;
          this.appointmentParams.status = 3;
          this.init();
          // this.getData("change");
          break;

        default:
          break;
      }
    },
    getData(flag) {
      let _this = this;
      _getAppointList(this.appointmentParams).then(res => {
        if (res.data.success) {
          let resData = res.data.data.list;
          resData.forEach(val => {
            val.checked = false;
          });
          if (flag == "change") {
            if (this.changeIndex >= 0 && resData.length > 0) {
              resData[this.changeIndex].checked = true;
            }
            _this.appointmentData = resData;
          } else {
            _this.appointmentData.push(...resData);
          }
        }
      });
    },
    appointFail(item, id, index) {
      // if (item.havaArchives) {
      //   this.failParams.id = id;
      //   this.interviewPopShow = true;
      // } else {
      //   this.userFilesShow = true;
      //   this.appoinItemId = item.userId;
      // }
      // console.log(item.havaArchives);
      this.changeIndex = index;
      if (!this.appointmentData[index].checked || !item.havaArchives) {
        this.userFilesShow = true;
        this.appoinItemId = item.userId;
      } else {
        this.failParams.id = item.id;
        this.interviewPopShow = true;
      }
    },
    appointSuccess(item, id, index) {
      let _this = this;
      // if (item.havaArchives) {
      //   let _this = this;
      //   let params = {
      //     id: id
      //   };
      //   _successAppoint(params).then(res => {
      //     if (res.data.success) {
      //       this.$toast(res.data.message);
      //       _this.init();
      //     }
      //   });
      // } else {
      //   this.userFilesShow = true;
      //   this.appoinItemId = item.userId;
      // }
      this.changeIndex = index;

      if (!this.appointmentData[index].checked || !item.havaArchives) {
        this.userFilesShow = true;
        this.appoinItemId = item.userId;
      } else {
        let params = {
          id: id
        };
        _successAppoint(params).then(res => {
          if (res.data.success) {
            this.$toast(res.data.message);
            _this.init();
          }
        });
      }
    },
    closeInterview() {
      this.interviewPopShow = false;
    },
    interviewSubmit() {
      let _this = this;
      console.log(this.failParams);
      if (!this.failParams.remark) {
        this.$toast("请填写面试失败原因");
      } else {
        _failAppoint(this.failParams).then(res => {
          if (res.data.success) {
            _this.interviewPopShow = false;
            _this.failParams.id = "";
            _this.failParams.remark = "";
            this.$toast(res.data.message);
            _this.init();
          }
        });
      }
    },
    toDetail(item) {
      let params = {
        id: item.id
      };
      this.pushTo("OrderDetail", params);
    },
    toOrderPage(id) {
      let params = {
        id: id
      };
      this.clearAppointTime();
      this.pushTo("AppointOrder", params);
    },
    toUserFiles() {
      this.appointmentData[this.changeIndex].checked = true;
      let params = {
        id: this.appoinItemId
      };
      this.pushTo("UserFiles", params);
    },
    toAddUserFiles(item) {
      let params = {
        id: item.userId
      };
      this.pushTo("UserFiles", params);
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.appointmentParams.pageNumber++;
      _getAppointList(this.appointmentParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (_this.appointmentParams.pageNumber <= page.totalPage) {
            _this.appointmentData.push(...res.data.data.list);
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
.appointment_summary {
  .tabs_box {
    background: #f5f5f5;
  }
  .load_container {
    background: #fff;
    // margin: 2.5rem 3.7rem 0 3.7rem;
    box-sizing: border-box;
    // margin: 2rem;
    height: 50rem;
    // width: 80rem;
    width: 96%;
    margin: 2rem auto;
    overflow: hidden;
    overflow-y: scroll;
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
  .tab_container {
    padding: 0rem 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list_box {
      margin-top: 2.5rem;

      width: 50%;
      .appointment_list {
        position: relative;
        box-sizing: border-box;
        // padding: 42px 62px;
        padding-top: 1rem;
        // box-shadow: 0 4px 10px 5px rgba(203, 203, 203, 0.15);
        border: 0.05rem solid #bababa;
        border-radius: 0.8rem;
        .pin_box {
          // background: #fff;
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          .pin_icon {
            width: 2rem;
          }
        }
        .app_list {
          padding: 0 2rem;
          display: flex;
          flex-direction: row;
          font-size: 1.4rem;
          color: #666;
          line-height: 2;
          // p {
          // }
          span {
            flex: 1;
            padding-left: 1rem;
          }
          .addr_info {
            height: 5.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .app_list2 {
          display: flex;
          justify-content: space-between;
          .customer_box {
            display: flex;
            p {
              font-size: 1.4rem;
              color: #666;
              line-height: 2;
            }
            span {
              font-size: 1.4rem;
              color: #666;
              line-height: 2;
            }
          }
          .customer_btn {
            width: 7vw;
            border-radius: 20px;
            line-height: 2.2;
            background: #eb5d2a;
            font-size: 1.2rem;
            color: #fff;
            text-align: center;
          }
        }
        .footer_order_btn {
          background: #eb5d2a;
          color: #fff;
          font-size: 1.4rem;
          line-height: 4rem;
          height: 4rem;
          border-bottom-left-radius: 0.8rem;
          border-bottom-right-radius: 0.8rem;
          display: block;
          margin-top: 1.5rem;
        }
        .footer_order_btn2 {
          font-size: 1.4rem;
          line-height: 4rem;
          height: 4rem;
          border-bottom-left-radius: 0.8rem;
          border-bottom-right-radius: 0.8rem;
          display: block;
          margin-top: 1.5rem;
          color: #eb5d2a;
        }
        .app_btn_box {
          display: flex;
          justify-content: center;
          padding: 1.2rem 0 1.2rem 0;
          > div {
            margin: 0 1.5rem;
            width: 13rem;
            box-sizing: border-box;
            position: relative;
            font-size: 1.2rem;
            border-radius: 1.5rem;
            line-height: 3rem;
            img {
              position: absolute;
              left: 3rem;
              top: 50%;
              transform: translate(0, -50%);
            }
            span {
              padding-left: 5.3rem;
            }
          }
          .left_btn {
            border: 1px solid #eb5d2a;
            color: #eb5d2a;
          }
          .right_brn {
            border: 1px solid #bababa;
            color: #666;
          }
        }
      }
    }
    .list_box:nth-child(2n) {
      padding-right: 1.25rem;
    }
    .list_box:nth-child(2n + 1) {
      padding-right: 1.25rem;
    }
  }
}
.middle_pop {
  width: 40%;
  .pop_header {
    display: flex;
    line-height: 4rem;
    border-bottom: 1px solid #dcdcdc;
    .header_left {
      flex: 0 0 10rem;
      box-sizing: border-box;
      padding-left: 1.5rem;
      font-size: 1.4rem;
      color: #666;
    }
    .header_title {
      flex: 1;
      text-align: center;
      font-size: 1.6rem;
    }
    .header_right {
      flex: 0 0 10rem;
    }
  }
  .pop_content {
    padding: 2rem 1.5rem;
    .message_input {
      padding: 1.5rem;
      width: 100%;
      height: 20rem;
      border: 1px solid #dadada;
      border-radius: 0.4rem;
      font-size: 1.2rem;
    }
  }
  .pop_header2 {
    height: 5.4vh;
    position: relative;
    img {
      position: absolute;
      right: 2vw;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .pop_content2 {
    img {
      width: 100%;
    }
    p {
      font-size: 1.6rem;
      line-height: 3;
      text-align: center;
    }
  }
  .pop_footer {
    padding: 0 0 1.75rem 0;
    .submit_btn {
      background: #eb5d2a;
      color: #fff;
      font-size: 1.5rem;
      border-radius: 40px;
      line-height: 4rem;
      height: 4rem;
      width: 25rem;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
