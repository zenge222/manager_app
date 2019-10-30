<template>
  <div class="order_management has-header">
    <Header :title="'订单管理'"></Header>
    <div class="tab_container">
      <div class="search_header">
        <div class="search_group">
          <div class="search_item">
            <input type="text" v-model="orderParams.keyWords" placeholder="搜索订单号/电话/名称" />
            <img class="search_icon" src="../../static/icon/icon_search.png" alt />
            <img
              @click="orderParams.keyWords=''"
              class="clear_icon"
              src="../../static/icon/icon_cancel.png"
              alt
            />
          </div>
          <p @click="searchOrder">查询</p>
        </div>
        <div class="type_container">
          <div class="type_list">
            <h3>订单类型</h3>
            <div class="sel_type" @click="typeShow1=true">
              {{productCurrent}}
              <van-icon class="right_icon" name="arrow" />
            </div>
          </div>
          <div class="type_list">
            <h3>订单状态</h3>
            <div class="sel_type" @click="typeShow2=true">
              {{indentCurrent}}
              <van-icon class="right_icon" name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="search_no_list" v-if="orderList.length==0">
        <div class="none_list">
          <img src="../../static/images/no_list.png" alt />
          <p>暂无订单</p>
        </div>
      </div>
      <div v-if="orderList.length>0">
        <div class="search_list">
          <div class="list_item_box" v-for="(item,index) in orderList" :key="index">
            <div class="list_item">
              <div class="item_header">
                <h3>{{item.productPackageName}}</h3>
                <div class="see_detail">
                  <div class="QR_code" style="width:24px;height:24px;">
                    <!-- <img
                      v-if="item.serviceQrCode!=''"
                      @click="toSeeQRCode(item)"
                      src="../../static/images/icon_two_dimension_code.png"
                      alt
                    />-->
                  </div>
                </div>
              </div>
              <div class="item_info">
                <div class="info_list">
                  <p>订单时间</p>
                  <span>{{item.createTimeStr}}</span>
                </div>
                <div class="info_list">
                  <p>订单编号</p>
                  <span>{{item.indentNum}}</span>
                </div>
                <div class="info_list">
                  <p>订单状态</p>
                  <span>{{item.statusStr}}</span>
                  <!-- <span v-if="item.payStatus==0">待支付</span>
                <span v-if="item.status==2&&item.payStatus==1">待服务</span>
                  <span v-if="item.status==5">已完成</span>-->
                </div>
                <div class="to_detail_item">
                  <span @click="toOrderDetail(item.id)">查看详情</span>
                  <img src="../../static/icon/view.png" />
                </div>
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
            <span style="font-size:1.4rem;color:#999;" slot="no-results">--- 暂无更多订单 ---</span>
            <span style="font-size:1.4rem;;color:#999;" slot="no-more">--- 暂无更多订单 ---</span>
          </infinite-loading>
        </div>
      </div>
    </div>

    <van-popup class="pop_QR" v-model="showQRCode">
      <div class="QR_content">
        <img class="close_icon" @click="showQRCode=false;" src="../../static/images/btn_over.png" />
        <img :src="QRImg" />
        <p v-text="employeeName"></p>
      </div>
    </van-popup>

    <van-popup class="check_bottom_pop" v-model="typeShow1" position="bottom">
      <van-picker
        show-toolbar
        title="请选择订单类型"
        :columns="productColumns"
        :default-index="0"
        @cancel="typeShow1 = false"
        @confirm="productConfirm"
      />
    </van-popup>

    <van-popup class="check_bottom_pop" v-model="typeShow2" position="bottom">
      <van-picker
        show-toolbar
        title="请选择订单状态"
        :columns="indentColumns"
        :default-index="0"
        @cancel="typeShow2 = false"
        @confirm="indentConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getOrderData, _getOrderTypeList } from "../service/order";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "OrderManagement",
  data() {
    return {
      showQRCode: false,
      typeShow1: false, // 订单类型
      typeShow2: false, // 订单状态
      QRImg: "",
      employeeName: "",
      orderParams: {
        pageNumber: 1,
        pageSize: 6,
        keyWords: "",
        productType: -1, // 订单类型
        indentStatus: -1 // 订单状态
      },
      searchNumber: 0,
      loadState: null,
      orderList: [],
      productTypeList: [],
      indentTypeList: [],
      productColumns: [],
      indentColumns: [],
      indentCurrent: "全部",
      productCurrent: "全部"
    };
  },
  mounted() {
    this.productColumns = ["全部"];
    this.indentColumns = ["全部"];
    this.getTypeList();
    this.init();
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.initData();
      this.init();
    }
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    initData() {
      this.orderParams.keyWords = "";
      this.orderParams.productType = -1;
      this.orderParams.indentStatus = -1;
      this.indentCurrent = "全部";
      this.productCurrent = "全部";
    },
    init() {
      this.orderParams.pageNumber = 1;
      this.getData("change");
      if (this.loadState) {
        this.$nextTick(() => {
          // 重置
          this.loadState.reset();
        });
      }
    },
    searchOrder() {
      this.init();
    },
    getTypeList() {
      _getOrderTypeList().then(res => {
        if (res.data.success) {
          let [resData1, resData2, arr1, arr2] = [
            res.data.data.productType,
            res.data.data.indentStatus,
            [],
            []
          ];
          let all = { title: "全部", type: -1 };
          arr1.push(all);
          arr2.push(all);
          for (var i in resData1) {
            let obj = {};
            obj.type = i;
            obj.title = resData1[i];
            arr1.push(obj);
            this.productColumns.push(resData1[i]);
          }
          for (var i in resData2) {
            let obj = {};
            obj.type = i;
            obj.title = resData2[i];
            arr2.push(obj);
            this.indentColumns.push(resData2[i]);
          }
          this.productTypeList = arr1;
          this.indentTypeList = arr2;
        }
      });
    },
    getData() {
      let _this = this;
      _getOrderData(this.orderParams).then(res => {
        if (res.data.success) {
          let resData = res.data.data.list;
          // resData.forEach((val, index) => {
          //   _this.$set(_this.staffData, index, val);
          // });
          _this.orderList = resData;
        }
      });
    },
    toSeeQRCode(item) {
      this.QRImg = item.serviceQrCode;
      this.employeeName = item.employeeName;
      this.showQRCode = true;
    },
    toOrderDetail() {
      let params = {
        id: "123"
      };
      this.pushTo("OrderInformation", params);
    },
    toOrderDetail(id) {
      let params = {
        id: id
      };
      this.pushTo("OrderInformation", params);
    },
    productConfirm(value) {
      let _this = this;
      this.productTypeList.find(val => {
        if (val.title == value) {
          _this.orderParams.productType = val.type;
          _this.typeShow1 = false;
          _this.productCurrent = value;
          _this.init();
        }
      });
    },
    indentConfirm(value) {
      let _this = this;
      console.log(this.indentTypeList);
      this.indentTypeList.find(val => {
        if (val.title == value) {
          _this.orderParams.indentStatus = val.type;
          _this.typeShow2 = false;
          _this.indentCurrent = value;
          _this.init();
        }
      });
    },
    infiniteHandler($state) {
      let _this = this;
      this.loadState = $state;
      this.orderParams.pageNumber++;
      _getOrderData(this.orderParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          if (_this.orderParams.pageNumber <= page.totalPage) {
            _this.orderList.push(...res.data.data.list);
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
.tab_container {
  background: #fff;
  // margin: 2rem auto;
  // padding: 0 0px 60px 0px;
  height: 54rem;
  width: 96%;
  margin: 2rem auto;
  overflow: hidden;
  overflow-y: scroll;
  .search_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 96%;
    padding: 1rem 4rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .search_group {
      display: flex;
      align-items: center;
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
          width: 25rem;
          border-radius: 2rem;
          border: none;
          background: #f4f4f4;
          font-size: 1.4rem;
          box-sizing: border-box;
          padding: 0 6rem 0 6.6rem;
        }
      }
    }
    p {
      line-height: 4rem;
      padding-left: 1.5rem;
      font-size: 1.4rem;
    }
    .type_container {
      display: flex;
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
      .type_list:first-child {
        margin-right: 1.5vw;
      }
    }
  }
  .search_no_list {
    padding: 6rem 4rem 0 4rem;
  }
  .search_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6rem 4rem 0 4rem;
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
          align-items: center;
          padding: 0 0 1.5rem 0;
          border-bottom: 1px solid #e6e6e6;
          h3 {
            font-size: 1.6rem;
          }
          .see_detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .QR_code {
              img {
                width: 1.8rem;
              }
            }
          }
          p {
            font-size: 1.4rem;
            width: 8rem;
            line-height: 2.3rem;
            text-align: center;
            border: 0.1rem solid #eb5d2a;
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
          }
          .to_detail_item {
            display: flex;
            padding-top: 1vw;
            justify-content: flex-end;
            align-items: center;
            span {
              font-size: 1.4rem;
              color: #eb5d2a;
            }
            img {
              display: block;
              width: 1rem;
              height: 1rem;
              margin: 0 0 0 0.4rem;
            }
          }
        }
      }
    }
    .list_item_box:nth-child(2n) {
      padding-left: 1.25rem;
    }
    .list_item_box:nth-child(2n + 1) {
      padding-right: 1.25rem;
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
