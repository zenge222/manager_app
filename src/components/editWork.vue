<template>
  <div class="add_work has-header">
    <Header :title="'工作安排'"></Header>
    <div class="work_container">
      <div class="user_box">
        <div class="user_info">
          <h3>服务对象</h3>
          <p v-text="workInfo.user.nickname"></p>
        </div>
        <div class="user_info">
          <h3>联系电话</h3>
          <p v-text="workInfo.user.phone"></p>
        </div>
        <div class="user_info">
          <h3>服务时间</h3>
          <p style="width:166px;" v-text="serviceTime"></p>
        </div>
        <div class="user_info" style="padding-right:0;">
          <h3>服务地址</h3>
          <p v-text="workInfo.user.address"></p>
        </div>
        <div class="user_info">
          <h3>服务人员</h3>
          <p v-text="employee.truename"></p>
        </div>
      </div>
      <div class="work_content">
        <h3>工作内容</h3>
        <div class="work_box">
          <div class="list_box">
            <div class="list_item" v-for="(item,index) in workList" :key="index">
              <p class="serial_number" v-text="index+1">.</p>
              <van-swipe-cell :right-width="100" :left-width="0" style="width:100%;">
                <!-- <span slot="left">选择</span> -->
                <input class="add_input" type="text" v-model="item.title" placeholder="请输入工作安排" />
                <span class="del_work" @click="delWork(index)" slot="right">删除</span>
              </van-swipe-cell>
            </div>
          </div>
          <!--
          <div class="list_box">
            <div class="list_item">
              <input class="add_input" type="text" placeholder="请输入工作安排">
            </div>
          </div>
          -->
          <img
            @click="addWorkItem"
            class="work_icon"
            src="../../static/images/btn_increase.png"
            alt
          />
        </div>
      </div>
      <van-button @click="editSubmit" class="submit_btn" size="large">修改</van-button>
    </div>
    <popConfirm @getParams="getPopInfo" :showPop.sync="showConfirm" :title="'确定修改'">
      <!-- <p class="comfrm_message" slot="message"></p> -->
    </popConfirm>
  </div>
</template>

<script>
import Header from "./component/header";
import popConfirm from "./component/popConfirm";
import { _getWorkDetail, _submitAddWork } from "../service/work";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "AppointmentSummary",
  data() {
    return {
      showConfirm: false,
      active: 0,
      interviewPopShow: false,
      workList: [],
      servicePersonal: "",
      workId: "",
      workInfo: {
        endTimeStr: "",
        startTimeStr: "",
        id: "",
        user: {
          nickname: "",
          address: ""
        }
      },
      serviceTime: "",
      serviceId: ""
      //
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    // this.init();
  },
  computed: {
    ...mapState({
      employee: state => state.work.employee
    })
  },
  components: {
    Header,
    popConfirm
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      // keep-alive组件已缓存 需要手动初始化数据
      this.init();
    }
  },
  methods: {
    init() {
      let _this = this;
      this.workList = [];
      this.active = 0;
      this.serviceId = this.$route.params.id;
      // 请求接口
      let params = {
        id: this.serviceId
      };
      _getWorkDetail(params).then(res => {
        if (res.data.success) {
          this.workInfo = res.data.data.services;
          this.serviceTime = res.data.data.serviceTime;
          this.workList = res.data.data.services.servicesItemList;
        }
      });
    },
    closeInterview() {
      this.interviewPopShow = false;
    },
    interviewErr() {
      this.interviewPopShow = true;
    },
    interviewSubmit() {},
    delWork(index) {
      this.workList.splice(index, 1);
    },
    addWorkItem() {
      let data = {
        value: ""
      };
      if (this.workList.length > 0) {
        let workIndex = 0;
        let hasNull = false;
        console.log(this.workList);
        this.workList.find((val, index) => {
          if (val.title == "") {
            hasNull = true;
            workIndex = index + 1;
          }
        });
        if (hasNull) {
          this.$toast(`请填写第${workIndex}条工作内容`);
        } else {
          this.workList.push(data);
        }
      } else {
        this.workList.push(data);
      }
    },
    getPopInfo() {
      let newWork = [];
      this.workList.forEach(val => {
        let obj = {};
        obj.title = val.title;
        newWork.push(obj);
      });
      let params = {
        serviceId: this.serviceId,
        employeeId: this.employee.id,
        itemJson: JSON.stringify(newWork)
      };
      _submitAddWork(params).then(res => {
        if (res.data.success) {
          this.$router.go(-1);
          // this.replaceTo("WorkArrangement");
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    editSubmit() {
      if (this.workList.length == 0) {
        this.$toast(`请至少添加一条工作内容`);
      } else {
        this.showConfirm = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.add_work {
  .work_container {
    background: #fff;
    margin: 2rem auto;
    padding: 3rem;
    width: 96%;
    margin: 2rem auto;
    min-height: 50rem;
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
      }
    }
    .work_content {
      padding-top: 2.5rem;
      h3 {
        font-size: 1.6rem;
      }
      .work_box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .list_box {
          width: 100%;
          .list_item {
            display: flex;
            align-items: center;
            margin: 1rem;
            .serial_number {
              font-size: 1.4rem;
              padding: 0 0.5rem;
            }
            .add_input {
              width: 100%;
              border-radius: 0.2rem;
              border: 1px solid #dcdcdc;
              line-height: 3.5rem;
              padding: 0 2.4rem 0 2.4rem;
              font-size: 1.4rem;
            }
            .del_work {
              color: #fff;
              background: #f44;
              font-size: 1.4rem;
              line-height: 3.6rem;
              width: 5rem;
              text-align: center;
              display: block;
            }
          }
          // .list_item:nth-child(2n + 1) {
          //   padding-right: 50px;
          // }
        }
        .work_icon {
          display: block;
          margin: 1rem auto;
        }
      }
    }
    .submit_btn {
      width: 25rem;
      text-align: center;
      font-size: 1.6rem;
      line-height: 4rem;
      height: 4rem;
      border-radius: 2rem;
      display: block;
      margin: 5rem auto;
      background: #eb5d2a;
      color: #fff;
    }
  }
}
</style>
