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
            <h3>服务对象</h3>
            <p v-text="workData.services.user.truename"></p>
          </div>
          <div class="user_info">
            <h3>联系电话</h3>
            <p v-text="workData.services.user.phone"></p>
          </div>
          <div class="user_info">
            <h3>服务时间</h3>
            <p v-text="workData.serviceTime"></p>
          </div>
          <div class="user_info" style="padding-right:0;">
            <h3>服务地址</h3>
            <p v-text="workData.services.indent.areaText+workData.services.indent.address"></p>
          </div>
        </div>
      </div>
      <div>
        <div class="user_box">
          <div class="user_info">
            <h3>服务人员</h3>
            <p class="order_number" v-text="workData.services.employee.truename"></p>
          </div>
          <div class="user_info">
            <h3>客户评分</h3>
            <div class="rate_box">
              <van-rate
                v-model="workData.services.averageScroe"
                icon="star"
                void-icon="star-o"
                :readonly="true"
              />
              <p v-text="workData.services.averageScroe+'分'"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 客户评价 -->
      <div class="message_box">
        <h3>客户评价</h3>
        <div class="message_list" v-text="workData.services.content"></div>
        <!-- <textarea class="message_input"></textarea> -->
        <!-- <div
          class="message_list"
          v-for="(item,index) in appoinData.appoint.appointCommunites"
          :key="index"
        >
          <p>{{index+1}}.{{item.intro}}</p>
          <span>{{item.createTimeStr}}</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
import { _getWorkDetail } from "../service/work";
export default {
  name: "AppointmentSummary",
  data() {
    return {
      value: 2,
      workId: "",
      workData: {
        serviceTime: "",
        services: {
          averageScroe: 0,
          content: "",
          employee: {
            truename: ""
          },
          indent: {
            areaText: "",
            address: ""
          },
          user: {
            truename: "",
            phone: ""
          }
        }
      }
    };
  },
  mounted() {
    this.workId = this.$route.params.id;
    this.getData();
  },
  components: {
    Header
  },
  methods: {
    getData() {
      let params = {
        id: this.workId
      };
      _getWorkDetail(params).then(res => {
        if (res.data.success) {
          console.log(res.data);
          this.workData = res.data.data;
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
        .rate_box {
          display: flex;
          align-items: center;
          padding-top: 5px;
          p {
            font-size: 14px;
            padding: 0 0 0 8px;
          }
        }
        h3 {
          font-size: 1.6rem;
          color: #333;
          line-height: 2;
        }
        p {
          font-size: 1.4rem;
          color: #666;
          line-height: 1.6;
          padding-top: 5px;
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
