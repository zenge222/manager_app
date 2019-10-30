<template>
  <div class="order_information has-header">
    <Header :title="'订单信息'"></Header>
    <div class="work_container">
      <!-- 服务信息 基本信息-->
      <h3 class="list_title">服务信息</h3>
      <div class="list_container">
        <div class="list_item_left">
          <div class="left_item">
            <div class="item_list">
              <div class="item_title">
                <img src="../../static/images/icon_commodity.png" alt />
                <span>商品名称</span>
              </div>
              <p>{{orderInfo.productName}}</p>
              <!-- <p v-if="orderInfo.indentType!=0">{{orderInfo.productName}}</p>
              <p v-if="orderInfo.indentType==0">{{orderInfo.productPackageName}}</p>-->
            </div>
          </div>
          <div class="left_item">
            <div class="item_list">
              <div class="item_title">
                <img src="../../static/images/icon_Contacts.png" alt />
                <span>联系人姓名</span>
              </div>
              <p>{{orderInfo.linkName}}</p>
            </div>
          </div>
          <div class="left_item">
            <div class="item_list">
              <div class="item_title">
                <img src="../../static/images/icon_Telephone.png" alt />
                <span>联系人手机</span>
              </div>
              <p>{{orderInfo.linkPhone}}</p>
            </div>
          </div>
        </div>
        <div class="list_item_right">
          <div class="item_title">
            <img src="../../static/images/icon_coordinate.png" alt />
            <span>联系人地址</span>
          </div>
          <p>{{orderInfo.areaText}} {{orderInfo.address}}</p>
        </div>
      </div>
      <!-- 服务信息 服务展示模块 -->
      <div class="service_container">
        <div class="left_services">
          <div class="services_title">
            <div class="services_time">
              <img src="../../static/images/icon_time one.png" alt />
              <span>服务时间</span>
            </div>
            <div class="services_personnel">
              <img src="../../static/images/icon_Contacts.png" alt />
              <span>服务人员</span>
            </div>
          </div>
          <div
            v-for="(item,index) in servicesList"
            :class="{'services_info':true,'has_services':item.pastTimes}"
            :key="index"
            v-if="index<=2"
          >
            <div class="info_times">{{item.servicesTime}}</div>
            <p>{{item.employeeName}}</p>
          </div>
          <div class="no_services" v-if="servicesList.length==0">客户还未预约服务,暂时还未服务信息</div>
          <!-- 查看更多 -->
          <div class="see_more" @click="showList=true;" v-if="servicesList.length>3">
            <p>查看更多</p>
            <van-icon class="more_icon" name="arrow" />
          </div>
        </div>
        <div class="right_QR" style="visibility: hidden;">
          <h3>二维码</h3>
          <img :src="serviceQrCode" alt @click="showQRCode=true" />
          <div class="no_services_QR" v-if="serviceQrCode==''">
            <img src="../../static/images/def_no_QR.png" />
            <p>还未安排工作未生成二维码</p>
          </div>
        </div>
      </div>
      <!-- 服务信息 订单信息-->
      <h3 class="list_title">订单信息</h3>
      <div class="order_container">
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_Order.png" />
            <span>订单编号</span>
          </div>
          <p>{{orderInfo.indentNum}}</p>
        </div>
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_state.png" alt />
            <span>订单状态</span>
          </div>
          <p>{{orderInfo.indentStatus}}</p>
        </div>
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_type.png" alt />
            <span>订单类型</span>
          </div>
          <p>{{orderInfo.indentTypeStr}}</p>
        </div>
        <div class="order_info" v-if="orderInfo.indentType!=0">
          <div class="item_title">
            <img src="../../static/images/icon_date.png" alt />
            <span>{{orderInfo.type3}}</span>
          </div>
          <p>{{orderInfo.type2}}</p>
        </div>
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_Amount_of_money.png" alt />
            <span>订单金额</span>
          </div>
          <!-- 26000000*3*10 26000000*30 -->
          <p>{{orderInfo.money}}元</p>
        </div>
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_Payment_amount.png" alt />
            <span>实付金额</span>
          </div>
          <p>{{orderInfo.payMoney}}元</p>
        </div>
        <div class="order_info">
          <div class="item_title">
            <img src="../../static/images/icon_Creation_time.png" alt />
            <span>订单时间</span>
          </div>
          <p>{{orderInfo.createTime}}</p>
        </div>
      </div>
    </div>

    <van-popup class="pop_QR" v-model="showQRCode">
      <div class="QR_content">
        <img class="close_icon" @click="showQRCode=false;" src="../../static/images/btn_over.png" />
        <img :src="serviceQrCode" />
      </div>
    </van-popup>

    <van-popup class="pop_has_close" v-model="showList">
      <van-icon @click="showList=false;" class="pop_close_icon" name="cross" />
      <div class="services_title">
        <div class="services_time">
          <img src="../../static/images/icon_time one.png" alt />
          <span>服务时间</span>
        </div>
        <div class="services_personnel">
          <img src="../../static/images/icon_Contacts.png" alt />
          <span>服务人员</span>
        </div>
      </div>
      <div
        v-for="(item,index) in servicesList"
        :class="{'services_info':true,'has_services':item.pastTimes}"
        :key="index"
      >
        <div class="info_times">{{item.servicesTime}}</div>
        <p>{{item.employeeName}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getOrderDetail } from "../service/order";
export default {
  name: "AppointmentSummary",
  data() {
    return {
      showQRCode: false,
      showList: false,
      active: 0,
      interviewPopShow: false,
      servicePersonal: "",
      orderInfo: {
        productPackageName: "",
        linkName: "",
        linkPhone: "",
        address: "",
        indentNum: "",
        money: "",
        payMoney: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        weekDay: 0,
        indentType: 0,
        type1: "", // 订单状态
        type2: "", // 订单类型
        type3: "" // 付款日
      },
      serviceQrCode: "",
      servicesList: []
    };
  },
  mounted() {
    let _this = this;
    let params = {
      id: this.$route.params.id
    };
    if (this.$route.params.id) {
      _getOrderDetail(params).then(res => {
        if (res.data.success) {
          console.log(res);
          _this.serviceQrCode = res.data.data.ServiceQrCode;
          // this.servicesList = res.data.data.servicesList.slice(0,3);
          _this.servicesList = res.data.data.servicesList;
          _this.orderInfo = res.data.data.indent;
          _this.orderInfo.indentStatus = res.data.data.indentStatus;
          _this.orderInfo.indentTypeStr = res.data.data.indentType;
          _this.orderInfo.createTime = res.data.data.createTime;
          _this.orderInfo.type1 = res.data.data.indentType;
          _this.orderInfo.type2 = res.data.data.payDay;
          _this.orderInfo.type3 = res.data.data.payDayStr;
        }
      });
    }
  },
  components: {
    Header
  },
  methods: {
    closeInterview() {
      this.interviewPopShow = false;
    },
    interviewErr() {
      this.interviewPopShow = true;
    },
    interviewSubmit() {},
    toSelPersonal() {
      this.pushTo("SelPersonal");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order_information {
  .work_container {
    margin: 2rem auto;
    padding: 0 2rem 3rem 2rem;
    width: 96%;
    margin: 2rem auto;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
    .list_title {
      font-size: 1.6rem;
      padding-bottom: 25px;
    }
    .list_container {
      display: flex;
      justify-content: space-between;
      .list_item_left {
        display: flex;
        flex: 1;
        .left_item {
          width: 33.3%;
          box-sizing: border-box;
          .item_list {
            background: #fff;
            padding: 16px 10px;
            box-shadow: 1px 2px 6px rgba(65, 65, 65, 0.14);
            border-radius: 8px;
            height: 10vw;
            .item_title {
              text-align: center;
              padding-bottom: 2vw;
              img {
                margin-top: -4px;
                display: inline-block;
                width: 2vw;
                vertical-align: middle;
              }
              span {
                font-size: 1.4rem;
              }
            }
            p {
              font-size: 1.4rem;
              text-align: center;
            }
          }
        }
        .left_item:nth-child(1) {
          padding-right: 16px;
        }
        .left_item:nth-child(2) {
          padding: 0 8px;
        }
        .left_item:nth-child(3) {
          padding-left: 16px;
        }
      }
      .list_item_right {
        margin-left: 10px;
        width: 28vw;
        padding: 16px 10px;
        background: #fff;
        box-shadow: 1px 2px 6px rgba(65, 65, 65, 0.14);
        border-radius: 8px;
        height: 10vw;
        .item_title {
          text-align: center;
          padding-bottom: 6px;
          img {
            margin-top: -4px;
            display: inline-block;
            width: 2vw;
            vertical-align: middle;
          }
          span {
            font-size: 1.4rem;
          }
        }
        p {
          font-size: 1.4rem;
          text-align: center;
        }
      }
    }
    .service_container {
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      margin-top: 2.5rem;
      .left_services {
        height: 175px;
        position: relative;
        flex: 1;
        background: #fff;
        box-shadow: 1px 2px 6px rgba(65, 65, 65, 0.14);
        border-radius: 8px;
        padding: 20px 20px 10px 50px;
        .services_title {
          display: flex;
          .services_time {
            width: 300px;
            padding-bottom: 20px;
            img {
              margin-top: -4px;
              display: inline-block;
              width: 2vw;
              vertical-align: middle;
            }
            span {
              font-size: 1.4rem;
            }
          }
          .services_personnel {
            width: 100px;
            text-align: center;
            padding-bottom: 20px;
            img {
              margin-top: -4px;
              display: inline-block;
              width: 2vw;
              vertical-align: middle;
            }
            span {
              font-size: 1.4rem;
            }
          }
        }
        .no_services {
          background: url("../../static/images/icon_warning.png") no-repeat 60px
            center #eb5d2a;
          background-size: 18px;
          color: #fff;
          width: 400px;
          line-height: 2.4;
          font-size: 1.4rem;
          text-align: center;
          border-radius: 20px;
          margin-top: 20px;
        }
      }
      .services_info {
        display: flex;
        font-size: 1.4rem;
        padding: 8px 0;
        .info_times {
          font-size: 1.4rem;
          width: 300px;
        }
        p {
          width: 100px;
          text-align: center;
        }
      }
      .has_services {
        color: #777;
      }
      .see_more {
        position: absolute;
        display: flex;
        align-items: center;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 1.4rem;
        p {
          padding-right: 6px;
        }
        .more_icon {
          font-size: 1.4rem;
        }
      }
      .right_QR {
        width: 28vw;
        height: 175px;
        margin-left: 10px;
        background: #fff;
        box-shadow: 1px 2px 6px rgba(65, 65, 65, 0.14);
        border-radius: 8px;
        padding: 16px 10px;
        .no_services_QR {
          img {
            margin-top: 10px;
          }
          p {
            padding-top: 10px;
          }
        }
        h3 {
          text-align: center;
          font-size: 1.4rem;
          // padding-bottom: 10px;
        }
        img {
          display: block;
          width: 12vw;
          margin: 0 auto;
        }
        p {
          font-size: 1.4rem;
          text-align: center;
          padding-top: 20px;
          color: #999;
        }
      }
    }
    .order_container {
      background: #fff;
      box-shadow: 1px 2px 6px rgba(65, 65, 65, 0.14);
      padding: 30px 10px 0 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .order_info {
        width: 25%;
        margin-bottom: 1.5rem;
        box-sizing: border-box;
        padding: 0 4rem 1rem 0;
        .item_title {
          text-align: center;
          padding-bottom: 2vw;
          img {
            margin-top: -4px;
            display: inline-block;
            width: 2vw;
            vertical-align: middle;
          }
          span {
            font-size: 1.4rem;
          }
        }
        p {
          font-size: 1.4rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
