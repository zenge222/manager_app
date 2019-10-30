<template>
  <div class="appoint_order has-header">
    <Header :title="'下单表'"></Header>
    <div class="outer_container">
      <div class="flex_row_box">
        <div class="flex_item_3">
          <p>订单编号:</p>
          <span>{{appointData.indentId}}</span>
        </div>
        <div class="flex_item_3">
          <p>商品名称:</p>
          <span>{{appointData.product.name}}</span>
        </div>
        <div class="flex_item_3">
          <div class="type_list">
            <h3>会员类型</h3>
            <div class="sel_type" @click="typeShow1=true">
              <span v-text="vipCurrent"></span>
              <van-icon class="right_icon" name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <!-- 用户档案 -->
      <div class="user_files">
        <p>用户档案</p>
        <div class="user_files_box">
          <div class="flex_3_box">
            <div class="flex_3_otem">
              <h3>用户名</h3>
              <p>{{currentAddress.username}}</p>
            </div>
            <div class="flex_3_otem">
              <h3>联系电话</h3>
              <p>{{appointData.phone}}</p>
            </div>
            <!-- <div class="flex_3_otem">
              <h3>会员类型</h3>
              <p>{{appointData.level}}</p>
            </div>-->
            <div class="flex_3_otem">
              <h3>住房面积</h3>
              <p>80㎡</p>
            </div>
          </div>
          <div class="flex_3_box">
            <div class="flex_3_otem">
              <h3>户型</h3>
              <p>{{currentAddress.houseModel}}</p>
            </div>
            <div class="flex_3_otem">
              <h3>家庭人口</h3>
              <p>{{currentAddress.populateText}}</p>
            </div>
            <div class="flex_3_otem">
              <h3>家庭地址</h3>
              <p style="width:18rem;">{{currentAddress.areaText}} {{currentAddress.address}}</p>
            </div>
          </div>
          <div class="flex_5_box">
            <div class="flex_all_otem">
              <h3>用户习惯</h3>
              <p style="width:40rem;word-wrap:break-word">{{currentAddress.taste}}</p>
            </div>
          </div>
          <div class="sel_bar">
            <!-- active -->
            <div
              :class="{'bar_item':true,'active':addrActive==index}"
              v-for="(item,index) in appointData.userArchivesList"
              :key="index"
              @click="selAddress(item,index)"
            >档案{{index+1}}</div>
          </div>
        </div>
        <!-- 服务人员... -->
        <div class="person_addr">
          <div class="flex_3_otem">
            <h3>服务人员</h3>
            <p>{{appointData.employeeName}}</p>
          </div>
          <div class="flex_3_all">
            <h3>服务地址</h3>
            <p>{{currentaddr}}</p>
          </div>
        </div>
        <!-- 服务频次... -->
        <div class="person_addr">
          <div class="sel_type">
            <h3>服务频次</h3>
            <div class="check_box check_box_css1">
              <div
                class="check_item"
                v-for="(item,index) in serviceFrequency"
                :key="index"
                @click="selFrequency(item,index)"
              >
                <span>
                  <input type="checkbox" :checked="item.checked" />
                  <label>
                    <span style="width:1.6rem; height:1.6rem;"></span>
                  </label>
                </span>
                <em style="font-size:1.2rem;">{{item.title}}</em>
              </div>
            </div>
          </div>
        </div>
        <!-- 服务时间 -->
        <!--    v-model="employee.truename" -->
        <div class="user_info">
          <h3>服务时间</h3>
          <div :class="{'sel_service':true,'not_sel':!canSelTimes}" @click="toSelectDateTime">
            <input
              class="sel_input"
              type="text"
              v-model="appointTime"
              disabled
              placeholder="请选择服务时间"
            />
            <img src="../../static/images/btn_Down.png" alt />
          </div>
        </div>
        <!-- 沟通记录 -->
        <div class="message_box">
          <h3>沟通记录</h3>
          <textarea class="message_input" v-model="connectMessage"></textarea>
        </div>
        <!-- 选择付款方式 -->
        <div class="check_box check_box_css1">
          <div class="check_item" @click="beforePay">
            <span>
              <input type="checkbox" :checked="beforeCheck" />
              <label>
                <span style="width:1.6rem; height:1.6rem;"></span>
              </label>
            </span>
            <em style="font-size:1.2rem;">预付款</em>
          </div>
          <div @click="canVipSel" :class="{'check_item':true,'can_check':!isVip}">
            <span>
              <input type="checkbox" :checked="afterCheck" />
              <label>
                <span style="width:1.6rem; height:1.6rem;"></span>
              </label>
            </span>
            <em style="font-size:1.2rem;">后付款</em>
          </div>
        </div>
        <!-- 保存 -->
        <div class="submit_box">
          <van-button class="submit_order" @click="submitOrder">下单</van-button>
        </div>
      </div>
    </div>

    <van-popup class="check_middle_pop" v-model="showVipSelPop">
      <div class="check_container">
        <img
          @click="showVipSelPop=false;"
          class="close_icon"
          src="../../static/images/btn_over.png"
        />
        <div class="check_list_box">
          <div
            :class="{'check_list':true,'count_list':item.isCount}"
            v-for="(item,index) in afterSelData"
            :key="index"
            v-show="item.canShow"
          >
            <p>{{item.title}}</p>
            <div v-if="!item.isCount" class="sel_box" @click="toShowSelDatePop(item,index)">
              {{item.date}}
              <van-icon class="sel_icon" name="arrow-down" />
            </div>
            <div v-if="item.isCount" class="sel_box">
              <input v-model="item.count" type="number" placeholder="请填试用次数" />
            </div>
            <!-- :style="item.isCount?'display:none':''" -->
            <span :style="item.isCount?'visibility: hidden':''" @click="selVipCheckbox(item,index)">
              <input type="checkbox" :checked="item.checked" />
              <label>
                <span style="width:1.8rem; height:1.8rem;"></span>
              </label>
            </span>
          </div>
          <van-button @click="vipSubmit" class="submit_date">确定</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 星期 -->
    <van-popup position="bottom" class="check_bottom_pop" v-model="selDayShow">
      <div>
        <van-picker
          title="请选择日期"
          show-toolbar
          :columns="columns1"
          @confirm="confirm"
          @cancel="selDayShow=false"
        />
      </div>
    </van-popup>
    <!-- 会员类型 -->
    <van-popup class="check_bottom_pop" v-model="typeShow1" position="bottom">
      <van-picker
        show-toolbar
        title="请选择会员类型"
        :columns="vipColumns"
        :default-index="0"
        @cancel="typeShow1 = false"
        @confirm="vipConfirm"
      />
    </van-popup>
    <!-- 日 -->
    <van-popup position="bottom" class="check_bottom_pop" v-model="selDayShow2">
      <div>
        <van-picker
          title="请选择日期"
          show-toolbar
          :columns="columns2"
          @confirm="confirm2"
          @cancel="selDayShow2=false"
        />
      </div>
    </van-popup>

    <!-- vip卡号 -->
    <van-popup
      v-model="vipCardShow"
      class="pop_has_close"
      :close-on-click-overlay="false"
      position="center"
    >
      <van-icon @click="vipCardShow=false;" class="pop_close_icon" name="cross" />
      <div class="vip_pop_container">
        <div class="input_box">
          <p>vip卡号</p>
          <input v-model="vipCardNumber" type="text" placeholder="请输入VIP卡号" />
        </div>
        <van-button @click="vipCardSubmit" class="subimt_btn">确定</van-button>
      </div>
    </van-popup>

    <popConfirm @getParams="getPopInfo" :showPop.sync="popConfirm" :title="'确定注销该会员'">
      <!-- <p class="comfrm_message" slot="message">是否保存您编辑过的内容</p> -->
    </popConfirm>
  </div>
</template>

<script>
import Header from "./component/header";
import popConfirm from "./component/popConfirm";
import { _appointDetail, _orderSubmit } from "../service/appointment";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AppointOrder",
  data() {
    return {
      popConfirm: false,
      vipCardShow: false,
      vipCardNumber: "",
      columns1: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
      columns2: [],
      vipColumns: [],
      typeShow1: false,
      vipCurrent: "",
      showVipSelPop: false,
      beforeCheck: false,
      afterCheck: false,
      selDayShow: false,
      selDayShow2: false,
      addrActive: 0,
      orderId: "",
      appointData: {
        indentId: "",
        level: "",
        employeeName: "",
        employeeId: "",
        product: {
          name: ""
        },
        userArchivesList: []
      },
      currentAddress: {
        address: "",
        areaText: "",
        cityId: "",
        houseModel: "",
        username: "",
        phone: "",
        id: "",
        note: null,
        oldMan: null,
        populate: null,
        populateText: "",
        taste: ""
      },
      isVip: false,
      currentaddr: "",
      connectMessage: "",
      // selTimes: "", // 2019-06-15 13:00:00 至 16:00:00 2019-06-16 13:00:00 至 16:00:00
      afterSelData: [
        {
          canShow: true,
          title: "试用期周结",
          date: "周一",
          dateValue: 0,
          checked: false,
          type: 1,
          isTry: true
        },
        {
          canShow: false,
          isweek: true,
          isCount: true,
          count: "",
          title: "试用期次数",
          dateValue: 0
        },
        {
          canShow: true,
          title: "试用期月结",
          date: "1日",
          dateValue: 1,
          checked: false,
          type: 2,
          isTry: true
        },
        {
          canShow: false,
          isMonth: true,
          isCount: true,
          count: "",
          title: "试用期次数",
          dateValue: 0
        },
        {
          canShow: true,
          title: "无试用周结",
          date: "周一",
          dateValue: 0,
          checked: false,
          type: 1,
          isTry: false
        },
        {
          canShow: true,
          title: "无试用月结",
          date: "1日",
          dateValue: 1,
          checked: false,
          type: 2,
          isTry: false
        }
      ],
      // 服务频次
      serviceFrequency: [
        { title: "周循环", checked: false, type: 0 },
        { title: "月循环", checked: false, type: 1 }
        // { title: "不固定", checked: false }
      ],
      canSelTimes: false,
      // 后付款 选择时间索引 -->  打开对应pop (星期/日)
      popIndex: -1,
      // 储存确定之前 vip 1.是否试用 2.周/月订单 3.chenkbox索引 状态 --> 点击pop chenkbox
      currentIsTry: false,
      currentIsType: null,
      checkboxIndex: null,
      orderParams: {
        payType: -1, // 支付的类型 预付款（0），周结订单为（1），月结订单为（2）
        payTime: "", // 支付的时间日期 周结日期0~6(礼拜天是0) 月结日期1~28
        isTry: false, // 是否试用期（true,false）
        serviceType: null // 周循环 0 月循环 1
      }
    };
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.a = true;
      console.log("init");
      this.init();
    }
  },
  computed: {
    ...mapState({
      appointTime: state => state.appoint.appointTime,
      freeTime: state => state.appoint.freeTime,
      screenTime: state => state.appoint.screenTime
    })
  },
  mounted() {
    for (let i = 1; i <= 28; i++) {
      this.columns2.push(i + "日");
    }
    this.getData();
  },
  components: {
    Header,
    popConfirm
  },
  methods: {
    ...mapMutations(["clearAppointTime"]),
    init() {
      this.serviceFrequency.forEach(val => {
        val.checked = false;
      });
      this.selTimes = "";
      this.connectMessage = "";
      this.addrActive = 0;
      if (this.appointData.userArchivesList.length > 0) {
        this.currentAddress = this.appointData.userArchivesList[0];
      }
      this.beforeCheck = false;
      this.canSelTimes = false;
      this.afterCheck = false;
      this.clearAppointTime();
      this.getData();
    },
    getPopInfo() {
      this.popConfirm = false;
    },
    getData() {
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
        let params = {
          id: this.orderId
        };
        _appointDetail(params).then(res => {
          if (res.data.success) {
            this.vipColumns = [];
            this.appointData = res.data.data;
            this.currentAddress = this.appointData.userArchivesList[0];
            this.currentaddr =
              this.appointData.userArchivesList[0].areaText +
              " " +
              this.appointData.userArchivesList[0].address;
            this.vipCurrent = this.appointData.level;
            this.appointData.levelList.forEach(val => {
              this.vipColumns.push(val.desc);
            });
            if (this.appointData.level == "普通用户") {
              this.isVip = false;
            } else {
              this.isVip = true;
            }
          } else {
            this.$toast(res.data.message);
          }
        });
      } else {
        this.pushTo("Login");
      }
    },
    selAddress(item, index) {
      this.addrActive = index;
      this.currentAddress = this.appointData.userArchivesList[index];
      this.currentaddr =
        this.appointData.userArchivesList[index].areaText +
        " " +
        this.appointData.userArchivesList[index].address;
    },
    vipConfirm(value) {
      console.log(value);
      if (value == "充值会员") {
        // this.isVip = true;
        // this.vipCurrent = value;
        this.vipCardShow = true;
      } else {
        if (this.isVip) {
          this.popConfirm = true;
          // this.isVip = false;
          //  this.vipCurrent = value;
        }
      }
      this.typeShow1 = false;
    },
    vipCardSubmit() {
      console.log("axios");
      this.isVip = true;
      this.vipCardShow = false;
      console.log(this.vipCardNumber);
    },
    beforePay() {
      // 零时 改变状态
      this.orderParams.payTime = "";
      this.orderParams.isTry = false;
      this.orderParams.payType = 0;
      this.beforeCheck = true;
      this.afterCheck = false;
    },
    canVipSel() {
      if (this.isVip) {
        this.showVipSelPop = true;
      }
    },
    selFrequency(item, index) {
      let index1 = -1;
      this.serviceFrequency.forEach((val, index) => {
        if (val.checked) {
          index1 = index;
        }
        val.checked = false;
      });
      item.checked = true;
      this.orderParams.serviceType = item.type;
      this.canSelTimes = true;
      if (index != index1) {
        this.clearAppointTime();
      }
    },
    toShowSelDatePop(item, index) {
      this.popIndex = index;
      if (item.type == 2) {
        this.selDayShow2 = true;
      } else {
        this.selDayShow = true;
      }
    },
    confirm(e, index) {
      console.log(e, index);
      // 周结日期0~6(礼拜天是0)
      this.afterSelData[this.popIndex].date = e;
      if (index == 6) {
        this.afterSelData[this.popIndex].dateValue = 0;
      } else {
        this.afterSelData[this.popIndex].dateValue = index + 1;
      }
      this.selDayShow = false;
    },
    confirm2(e, index) {
      // console.log(e, index);
      this.afterSelData[this.popIndex].date = e;
      this.afterSelData[this.popIndex].dateValue = index + 1;
      this.selDayShow2 = false;
    },
    selVipCheckbox(item, index) {
      console.log(item);
      if (item.title == "试用期周结") {
        this.afterSelData[1].canShow = true;
        this.afterSelData[3].canShow = false;
        this.afterSelData[3].count = "";
      }
      if (item.title == "试用期月结") {
        this.afterSelData[1].canShow = false;
        this.afterSelData[1].count = "";
        this.afterSelData[3].canShow = true;
      }
      if (item.title == "无试用周结" || item.title == "无试用月结") {
        this.afterSelData[1].canShow = false;
        this.afterSelData[1].count = "";
        this.afterSelData[3].canShow = false;
        this.afterSelData[3].count = "";
      }
      this.afterSelData.forEach(val => {
        val.checked = false;
      });
      this.afterSelData[index].checked = true;
      this.currentIsTry = this.afterSelData[index].isTry;
      this.currentIsType = this.afterSelData[index].type;
      this.checkboxIndex = index;
    },
    vipSubmit() {
      let hasChecked = false;
      let checkIndex = 0;
      this.afterSelData.find((val, index) => {
        if (val.checked) {
          checkIndex = index;
          hasChecked = true;
        }
      });
      if (!hasChecked) {
        this.$toast(`请选择试用类型`);
      } else {
        // 零时 改变状态
        if (this.afterSelData[checkIndex].title == "试用期周结") {
          let countNumber = this.afterSelData[checkIndex + 1].count;
          if (countNumber <= 0 || countNumber > 7) {
            this.$toast(`请输入1~7试用次数`);
          } else {
            this.submitFn();
          }
        } else if (this.afterSelData[checkIndex].title == "试用期月结") {
          let countNumber = this.afterSelData[checkIndex + 1].count;
          if (countNumber <= 0 || countNumber > 7) {
            this.$toast(`请输入1~7试用次数`);
          } else {
            this.submitFn();
          }
        } else {
          this.submitFn();
        }
      }
    },
    submitFn() {
      this.orderParams.payType = this.afterSelData[this.checkboxIndex].type;
      this.orderParams.payTime = this.afterSelData[
        this.checkboxIndex
      ].dateValue;
      this.orderParams.isTry = this.afterSelData[this.checkboxIndex].isTry;
      this.beforeCheck = false;
      this.afterCheck = true;
      this.showVipSelPop = false;
    },
    toSelectDateTime() {
      if (this.canSelTimes) {
        let params = {
          id: this.appointData.employeeId
        };
        let services = "";
        this.serviceFrequency.find(val => {
          if (val.checked) {
            services = val.title;
          }
        });
        if (services == "周循环") {
          this.pushTo("WeekScreen", params);
        } else if (services == "月循环") {
          this.pushTo("MonthScreen", params);
        } else {
          this.pushTo("UnfixedDate", params);
        }
      } else {
        this.$toast("请选择服务频次");
      }
    },
    submitOrder() {
      let _this = this;
      if (!this.appointTime) {
        this.$toast("请选择服务时间");
      } else if (!this.connectMessage) {
        this.$toast("请填写沟通记录");
      } else if (this.orderParams.payType == -1) {
        this.$toast("请选择付款方式");
      } else {
        let chageTimes = [];
        this.freeTime.forEach(val => {
          let obj = {};
          if (val.status == 1) {
            obj.workDay = val.workDay;
            obj.startTime = val.changeTime.startTime;
            obj.endTime = val.changeTime.endTime;
          } else {
            obj.workDay = val.workDay;
            obj.startTime = this.screenTime.startTime;
            obj.endTime = this.screenTime.endTime;
          }
          chageTimes.push(obj);
        });
        let tryNnumber = 0;
        if (this.checkboxIndex || this.checkboxIndex === 0) {
          if (
            this.afterSelData[this.checkboxIndex].title == "试用期周结" ||
            this.afterSelData[this.checkboxIndex].title == "试用期月结"
          ) {
            tryNnumber = this.afterSelData[this.checkboxIndex + 1].count;
          }
        }

        let vipTypeNum = -1;
        this.appointData.levelList.find(val => {
          if (val.desc == this.vipCurrent) {
            vipTypeNum = val.title;
          }
        });
        let params = {
          appointId: this.orderId,
          orderId: this.appointData.indentId,
          indentType: this.orderParams.payType,
          payTime: this.orderParams.payTime,
          isTry: this.orderParams.isTry,
          archivesId: this.currentAddress.id,
          remark: this.connectMessage,
          startDay: this.screenTime.startDay,
          endDay: this.screenTime.endDay,
          startTime: this.screenTime.startTime,
          endTime: this.screenTime.endTime,
          times: JSON.stringify(chageTimes),
          tryNum: tryNnumber,
          userLevel: vipTypeNum,
          serviceType: this.orderParams.serviceType
        };
        _orderSubmit(params).then(res => {
          if (res.data.success) {
            _this.$toast(res.data.message);
            this.$router.go(-1);
          } else {
            _this.$toast(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.appoint_order {
  .outer_container {
    background: #fff;
    // margin: 2rem 3.7rem 0 3.7rem;
    width: 96%;
    margin: 2rem auto;
    padding: 3rem 4rem;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
    .flex_row_box {
      padding: 1.5rem 0;
      display: flex;
      .flex_item_3 {
        font-size: 1.6rem;
        width: 33%;
        display: flex;
        // align-items: center;
        margin-right: 3.5rem;
        color: #282828;
        span {
          padding-left: 1rem;
          font-size: 1.4rem;
          color: #333;
          display: block;
          font-weight: 100;
          // max-width: 400px;
          word-wrap: break-word;
          padding-top: 0.2rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
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
            min-width: 15vw;
            max-width: 18vw;
            // padding-left: 1.5vw;
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
      .flex_item_3:nth-child(2) {
        justify-content: center;
      }
      .flex_item_3:nth-child(3) {
        justify-content: flex-end;
        margin-right: 0;
      }
    }
    .user_files {
      padding: 1.5rem 0;
      p {
        font-size: 1.6rem;
        color: #282828;
        padding-bottom: 1.5rem;
        font-weight: 100;
      }
      .user_files_box {
        padding: 2rem 5rem 1rem 5rem;
        border: 1px solid #dddddd;
        position: relative;
        .flex_3_box {
          display: flex;
          .flex_3_otem {
            width: 33%;
            line-height: 2;
            h3 {
              font-size: 1.6rem;
              color: #282828;
            }
            p {
              font-size: 1.4rem;
              padding-bottom: 1rem;
              font-weight: 100;
            }
          }
        }
        .flex_5_box {
          display: flex;
          line-height: 2;
          .flex_3_otem {
            width: 33%;
          }
          .flex_all_otem {
            flex: 1;
          }
          h3 {
            font-size: 1.6rem;
            color: #282828;
          }
          p {
            font-size: 1.4rem;
            padding-bottom: 1rem;
            line-height: 1.4;
            font-weight: 100;
          }
        }
        .sel_bar {
          position: absolute;
          top: -4rem;
          right: -1px;
          display: flex;
          .bar_item {
            line-height: 4rem;
            font-size: 1.6rem;
            //  font-weight: 300;
            padding: 0 2rem;
            background: #e3e3e3;
            border: 1px solid #e3e3e3;
            border-bottom: none;
          }
          .active {
            line-height: 4rem;
            font-size: 1.6rem;
            //  font-weight: 300;
            padding: 0 2rem;
            background: #fff;
            border: 1px solid #dddddd;
            border-bottom: none;
          }
        }
      }
      .person_addr {
        display: flex;
        padding: 1vw 0;
        line-height: 2;
        h3 {
          font-size: 1.6rem;
          color: #282828;
        }
        p {
          font-size: 1.4rem;
          padding-bottom: 1vw;
          line-height: 1.4;
          font-weight: 100;
        }
        .flex_3_otem {
          width: 33%;
        }
        .flex_3_all {
          padding-left: 1.6rem;
          flex: 1;
        }
        .sel_type {
          .check_item {
            display: flex;
            align-items: center;
            margin: 1vw 2vw 1vw 0;
          }
        }
      }
      .user_info {
        display: flex;
        align-items: center;
        h3 {
          font-size: 1.6rem;
          color: #282828;
          padding-right: 1rem;
        }
        .sel_service {
          position: relative;
          .sel_input {
            background: #fff;
            border: 1px solid #dcdcdc;
            width: 34.5rem;
            height: 3rem;
            line-height: 3rem;
            padding: 0 5rem 0 2.3rem;
            font-size: 1.4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translate(0, -50%);
          }
        }
        .not_sel {
          .sel_input {
            color: #999;
            background: #f0f0f0;
          }
        }
      }
      .message_box {
        padding: 1rem 0;
        h3 {
          font-size: 1.6rem;
          color: #282828;
          padding-right: 1rem;
          line-height: 3;
        }
        .message_input {
          width: 100%;
          border: 0.1rem solid #dcdcdc;
          border-radius: 0.2rem;
          height: 10rem;
          padding: 1rem;
          font-size: 1.4rem;
        }
      }
      .check_box {
        display: flex;
        justify-content: center;
        .check_item {
          margin: 0 1rem;
          font-size: 1.4px;
          border: 0.1rem solid #dddddd;
          padding: 0 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          label {
            // line-height: 2.5;
          }
          em {
            padding-left: 6px;
          }
        }
        .can_check {
          em {
            color: #999 !important;
          }
        }
      }
      .submit_box {
        // position: fixed;
        // bottom: 0;
        // left: 0;
        // width: 100%;
        // background: #fff;
        .submit_order {
          display: block;
          margin: 2rem auto;
          width: 25rem;
          background: #eb5d2a;
          line-height: 4rem;
          height: 4rem;
          color: #fff;
          border-radius: 2rem;
        }
      }
    }
  }
  .comfrm_message {
    text-align: center;
    font-size: 1.4rem;
    color: #bababa;
    padding: 0 20px 20px 20px;
  }
}
</style>
