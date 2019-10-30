<template>
  <div class="order_information has-header">
    <Header :title="'预约信息'"></Header>
    <div class="work_container">
      <div>
        <!-- <div class="title_header">
          <h3>服务信息</h3>
        </div>-->
        <div class="user_box">
          <div class="user_info">
            <h3>客户姓名</h3>
            <p v-text="appoinData.appoint.user.truename"></p>
          </div>
          <div class="user_info">
            <h3>联系电话</h3>
            <p v-text="appoinData.appoint.user.phone"></p>
          </div>
          <div class="user_info">
            <h3>面试时间</h3>
            <p v-text="appoinData.appoint.startTimeStr"></p>
          </div>
          <div class="user_info" style="padding-right:0;">
            <h3>客户地址</h3>
            <p v-text="appoinData.appoint.areaText+appoinData.appoint.address"></p>
          </div>
        </div>
      </div>
      <div>
        <div class="user_box">
          <div class="user_info">
            <h3>服务人员</h3>
            <p class="order_number">{{appoinData.appoint.employee.truename}}</p>
          </div>
          <div class="user_info">
            <h3>联系电话</h3>
            <p>{{appoinData.appoint.employee.phone}}</p>
          </div>
        </div>
      </div>
      <!-- 沟通记录 -->
      <div class="message_box">
        <h3>沟通记录</h3>
        <!-- <textarea class="message_input"></textarea> -->
        <div
          class="message_list"
          v-for="(item,index) in appoinData.appoint.appointCommunites"
          :key="index"
        >
          <p>{{index+1}}.{{item.intro}}</p>
          <span>{{item.createTimeStr}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getAppoinDetail } from "../service/appointment";
export default {
  name: "AppointmentSummary",
  data() {
    return {
      appoinId: "",
      appoinData: {
        appoint: {
          startTimeStr: "",
          address: "",
          user: {
            truename: "",
            phone: ""
          },
          employee: {
            truename: "",
            phone: ""
          },
          appointCommunites: []
        }
      }
    };
  },
  mounted() {
    this.appoinId = this.$route.params.id;
    this.getData();
  },
  components: {
    Header
  },
  methods: {
    getData() {
      let params = {
        id: this.appoinId
      };
      _getAppoinDetail(params).then(res => {
        console.log(res);
        if (res.data.success) {
          this.appoinData = res.data.data;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order_information {
  .work_container {
    background: #fff;
    margin: 2rem auto;
    padding: 3rem;
    width: 96%;
    margin: 2rem auto;
    height: 54rem;
    overflow: hidden;
    overflow-y: scroll;
    // background: #fff;
    // margin: 50px 74px 0 74px;
    // padding: 60px 80px;
    .user_box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .user_info {
        width: 25%;
        margin-bottom: 1.5rem;
        box-sizing: border-box;
        padding: 0 4rem 0 0;
        h3 {
          font-size: 1.6rem;
          color: #333;
          line-height: 2;
        }
        p {
          font-size: 1.4rem;
          color: #666;
          line-height: 1.4;
        }
        .order_number {
          // width:300px;
          overflow: hidden;
          word-wrap: break-word;
        }
      }
    }
    .title_header {
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 2rem;
      h3 {
        font-size: 1.8rem;
        padding-bottom: 2rem;
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
      .message_list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8vw 0;
        font-size: 1.4rem;
        p {
          flex: 1;
          overflow: hidden;
          padding-right: 20px;
          // text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: wrap;
        }
        span {
          width: 20%;
          text-align: right;
        }
      }
    }
  }
}
</style>
