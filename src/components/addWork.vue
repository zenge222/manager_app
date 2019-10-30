<template>
  <div class="add_work has-header">
    <Header :title="'工作安排'"></Header>
    <div class="work_container">
      <div class="user_box">
        <div class="user_info">
          <h3>服务对象</h3>
          <p>{{workInfo.user.nickname}}</p>
        </div>
        <div class="user_info">
          <h3>联系电话</h3>
          <p>{{workInfo.user.phone}}</p>
        </div>
        <div class="user_info">
          <h3>服务时间</h3>
          <p style="width:166px;">{{addTime.timeString}}</p>
        </div>
        <div class="user_info" style="padding-right:0;">
          <h3>服务地址</h3>
          <p v-text="workInfo.indent.areaText+workInfo.indent.address"></p>
        </div>
        <div class="user_info">
          <h3>服务人员</h3>
          <div class="sel_service" @click="toSelPersonal">
            <input
              class="sel_input"
              type="text"
              v-model="employee.truename"
              disabled
              placeholder="请选择服务人员"
            />
            <img src="../../static/images/btn_Down.png" alt />
          </div>
        </div>
      </div>
      <div class="work_content">
        <h3>工作内容</h3>
        <div class="work_box">
          <div class="list_box">
            <div class="list_item" v-for="(item,index) in workList" :key="index">
              <p class="serial_number">{{index+1}}.</p>
              <van-swipe-cell :right-width="60" :left-width="0" style="width:100%;">
                <!-- <span slot="left">选择</span> -->
                <input class="add_input" type="text" v-model="item.title" placeholder="请输入工作安排" />
                <span class="del_work" @click="delWork(index)" slot="right">删除</span>
              </van-swipe-cell>
            </div>
          </div>
          <!-- <div class="list_box">
            <div class="list_item">
              <input class="add_input" type="text" placeholder="请输入工作安排">
            </div>
          </div>-->
          <img @click="addWorkItem" class="work_icon" src="../../static/images/btn_increase.png" />
        </div>
      </div>
      <van-button @click="workSubmit" class="submit_btn" size="large">保存</van-button>
    </div>
    <popConfirm @getParams="getPopInfo" :showPop.sync="showConfirm" :title="'确定保存'">
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
  name: "AddWork",
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
        employeeId: "",
        indent: {
          areaText: "",
          address: ""
        },
        id: "",
        user: {
          nickname: "",
          address: ""
        }
      },
      serviceTime: "",
      serviceId: ""
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      employee: state => state.work.employee,
      addTime: state => state.work.addTime
    })
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      // keep-alive组件已缓存 需要手动初始化数据
      this.init();
    }
  },
  components: {
    Header,
    popConfirm
  },
  methods: {
    ...mapMutations(["setAddTime", "setEmployeeIdName"]),
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
          if (!res.data.data.services.employeeId) {
            this.workInfo.employee.nickname = "";
          } else {
            // this.employee.id = res.data.data.services.employeeId;
            let setParams = {
              id: res.data.data.services.employeeId,
              nickname: res.data.data.services.employee.nickname,
              truename: res.data.data.services.employee.truename
            };
            this.$store.commit("setEmployeeIdName", setParams);
          }

          // 储存 添加工作安排时间
          let startTimeArr = this.workInfo.startTimeStr.split(" ");
          let timeDate = startTimeArr[0];
          let startTime = res.data.data.startTime;
          let endTime = res.data.data.endTime;
          // 储存时间  待处理
          let submitParams = {
            dateTime: timeDate,
            startTime: startTime,
            endTime: endTime,
            timeString: this.serviceTime,
            name: "addWork"
          };
          this.$store.commit("setAddTime", submitParams);
        }
      });
    },
    getPopInfo() {
      let params = {
        startDay: `${this.addTime.dateTime} ${this.addTime.startTime}`,
        endDay: `${this.addTime.dateTime} ${this.addTime.endTime}`,
        serviceId: this.serviceId,
        employeeId: this.employee.id,
        itemJson: JSON.stringify(this.workList)
      };
      _submitAddWork(params).then(res => {
        if (res.data.success) {
          // workArrangement
          this.$router.go(-1);
          // this.replaceTo("WorkArrangement");
        } else {
          this.$toast(res.data.message);
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
    toSelPersonal() {
      let params = {
        id: this.workInfo.id,
        dateTime: this.addTime.dateTime,
        startTime: this.addTime.startTime,
        endTime: this.addTime.endTime
      };
      this.replaceTo("SelPersonal", params);
      // this.pushTo("SelPersonal", params);
    },
    addWorkItem() {
      let data = {
        title: ""
      };
      if (this.workList.length > 0) {
        let workIndex = 0;
        let hasNull = false;
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
    workSubmit() {
      if (!this.employee.id) {
        this.$toast(`请选择服务人员`);
      } else if (this.workList.length == 0) {
        this.$toast(`请至少添加一条工作内容`);
      } else {
        // addTime
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
    // overflow: hidden;
    // overflow-y: scroll;
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
        .sel_service {
          width: 48rem;
          padding: 1.5rem 0 0 0;
          position: relative;
          .sel_input {
            background: #fff;
            border: 1px solid #dcdcdc;
            width: 100%;
            height: 3.5rem;
            line-height: 3.5rem;
            padding: 0 5rem 0 2.3rem;
            font-size: 1.4rem;
          }
          img {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translate(-50%, 0);
          }
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
      border-radius: 40px;
      display: block;
      margin: 5rem auto;
      background: #eb5d2a;
      color: #fff;
    }
  }
}
</style>
