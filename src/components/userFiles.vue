<template>
  <div class="user_files has-header">
    <Header :title="'用户档案'"></Header>
    <div class="user_info">
      <h3 class="list_title">个人信息</h3>
      <div class="info_flex">
        <div class="item_list">
          <span class="item_title">姓名</span>
          <div class="right_item">
            <input
              v-model="constInfo.userName"
              :disabled="!canSaveInfo"
              type="text"
              placeholder="请输入姓名"
            />
          </div>
        </div>
        <div class="item_list2">
          <span class="item_title">性别</span>
          <div class="check_box_user_files">
            <div v-for="(item,index) in sexList" :key="index" @click="changeSex(item,index)">
              <span>
                <input type="checkbox" :checked="item.checked" />
                <label>
                  <span style="width:1.8rem; height:1.8rem;"></span>
                </label>
                <em style="font-size:1.4rem;" v-text="item.title"></em>
              </span>
            </div>
          </div>
        </div>
        <div class="item_list">
          <span class="item_title">手机</span>
          <div class="right_item">
            <input
              v-model="constInfo.userPhone"
              :disabled="!canSaveInfo"
              type="text"
              placeholder="请输入手机号码"
            />
          </div>
        </div>
        <div class="item_list">
          <span class="item_title">会员类型</span>
          <div :class="{'sel_type':true,'sel_disable':!canSaveInfo}" @click="selVip">
            <span v-text="constInfo.level"></span>
            <van-icon class="right_icon" name="arrow" />
          </div>
        </div>
      </div>
      <img class="chain_pic chain_left" src="../../static/images/def_chain.png" alt />
      <img class="chain_pic chain_right" src="../../static/images/def_chain.png" alt />
      <van-button @click="canSaveInfo=true;" v-show="!canSaveInfo" class="submit_save">修改</van-button>
      <van-button @click="saveUserInfo" v-show="canSaveInfo" class="submit_save">保存</van-button>
    </div>
    <div class="outer_container">
      <!-- start 单条修改档案 -->
      <div class="files_list" v-for="(item,index) in filesList" :key="index">
        <h3>档案{{numberList[index]}}</h3>
        <!-- <div class="user_item1">
          <div class="left_info">
            <span class="input_label">姓名</span>
            <input
              style="width:27.7rem;"
              v-model="item.username"
              type="text"
              placeholder="请输入姓名"
              :disabled="item.disabled"
            />
          </div>
          <div class="right_info">
            <div>
              <span>手机号</span>
              <i>{{constInfo.userPhone}}</i>
            </div>
            <div>
              <span>会员类型</span>
              <i>{{constInfo.level}}</i>
            </div>
          </div>
        </div>-->
        <div class="user_item2">
          <span>家庭地址</span>
          <i>{{constInfo.areaText}}</i>
          <em>:</em>
          <input
            :disabled="item.disabled"
            type="text"
            v-model="item.address"
            placeholder="请输入具体家庭地址（街道-小区-门牌号）"
          />
        </div>
        <div class="user_item1">
          <div class="left_info ruo_zhi">
            <span class="input_label">住房面积</span>
            <!-- +'(㎡)' -->
            <input
              :disabled="item.disabled"
              style="width:27.7rem;"
              type="number"
              maxlength="10"
              v-model="item.houseArea"
              placeholder="请输入住房大约面积(㎡)"
            />
            <div class="group_input">(㎡)</div>
          </div>
          <div class="right_info">
            <span class="apartment">户型</span>
            <input
              :disabled="item.disabled"
              class="apartment_input"
              type="text"
              v-model="item.houseModel"
              placeholder="请输入户型（如:二室一厅一卫）"
            />
          </div>
        </div>
        <div class="user_item3">
          <span>家庭人口</span>
          <input
            :disabled="item.disabled"
            type="text"
            v-model="item.populateText"
            placeholder="请输入（如:总人口5人，70岁老人1人，6岁儿童1人,有无孕妇）"
          />
        </div>
        <div class="user_item4">
          <p>用户习惯</p>
          <textarea
            :disabled="item.disabled"
            class="user_habit"
            v-model="item.taste"
            placeholder="请选择用户口味，习惯，忌讳等"
          ></textarea>
        </div>
        <div class="save_box">
          <van-button class="submit_save" v-show="item.disabled" @click="openChangeFiles(item)">修改</van-button>
          <van-button
            class="submit_save del_btn"
            v-show="!item.disabled"
            @click="filesDel(item,index)"
          >删除</van-button>
          <van-button
            class="submit_save"
            v-show="!item.disabled"
            @click="filesSubmit(item,index)"
          >保存</van-button>
        </div>
      </div>
      <!-- end 单条修改档案 -->

      <!-- start 单条添加档案 -->
      <div class="files_list" v-for="(item,index) in filesList2" :key="'add-'+index">
        <h3>档案{{numberList[item.numberCurrent]}}</h3>
        <!-- <div class="user_item1"> -->
        <!-- <div class="left_info">
            <span class="input_label">姓名</span>
            <input style="width:27.7rem;" v-model="item.userName" type="text" placeholder="请输入姓名" />
        </div>-->
        <!-- <div class="right_info">
            <div>
              <span>手机号</span>
              <i>{{constInfo.userPhone}}</i>
            </div>
            <div> 
              <span>会员类型</span>
              <i>{{constInfo.level}}</i>
            </div>
        </div>-->
        <!-- </div> -->
        <div class="user_item2">
          <span>家庭地址</span>
          <i>{{constInfo.areaText}}</i>
          <em>:</em>
          <input type="text" v-model="item.address" placeholder="请输入具体家庭地址（街道-小区-门牌号）" />
        </div>

        <div class="user_item1">
          <!-- <div class="left_info">
            <span class="input_label">住房面积</span>
            <input
              style="width:27.7rem;"
              type="text"
              v-model="item.houseArea"
              placeholder="请输入住房大约面积(㎡)"
            >
          </div>-->
          <div class="left_info ruo_zhi">
            <span class="input_label">住房面积</span>
            <!-- +'(㎡)' -->
            <input
              maxlength="10"
              style="width:27.7rem;"
              type="number"
              v-model="item.houseArea"
              placeholder="请输入住房大约面积(㎡)"
            />
            <div class="group_input">(㎡)</div>
          </div>
          <div class="right_info">
            <span class="apartment">户型</span>
            <input
              class="apartment_input"
              type="text"
              v-model="item.houseModel"
              placeholder="请输入户型（如:二室一厅一卫）"
            />
          </div>
        </div>
        <div class="user_item3">
          <span>家庭人口</span>
          <input
            type="text"
            v-model="item.populateText"
            placeholder="请输入（如:总人口5人，70岁老人1人，6岁儿童1人,有无孕妇）"
          />
        </div>
        <div class="user_item4">
          <p>用户习惯</p>
          <textarea class="user_habit" v-model="item.taste" placeholder="请选择用户口味，习惯，忌讳等"></textarea>
        </div>
        <div class="save_box">
          <van-button @click="filesSubmit2(item,index)" class="submit_save">保存</van-button>
        </div>
      </div>
      <!-- end 单条添加档案 -->
      <div class="add_files" @click="addNewFiles">
        <img src="../../static/images/btn_increase.png" alt />
        <span>新增档案</span>
      </div>
    </div>

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

    <popConfirm @getParams="getPopInfo" :showPop.sync="popConfirm" :title="'确定注销该会员?'">
      <!-- <p class="comfrm_message" slot="message">是否保存您编辑过的内容</p> -->
    </popConfirm>

    <popConfirm @getParams="getPopInfo2" :showPop.sync="popConfirm2" :title="'确定删除该档案?'">
      <!-- <p class="comfrm_message" slot="message">是否保存您编辑过的内容</p> -->
    </popConfirm>
  </div>
</template>

<script>
import Header from "./component/header";
import popConfirm from "./component/popConfirm";
import {
  _getUserDetail,
  _editUserFules,
  _addUserFules,
  _modifyUserInfo,
  _delUserFiles
} from "../service/user";
export default {
  name: "UserFiles",
  data() {
    return {
      popConfirm: false,
      popConfirm2: false,
      vipCardShow: false,
      vipCardNumber: "",
      numberList: ["一", "二", "三", "四", "五"],
      a: false,
      typeShow1: false,
      canSaveInfo: false,
      filesList: [],
      filesList2: [],
      vipColumns: [],
      isVip: false,
      userId: "", // 用户id
      constInfo: {
        areaText: "",
        userPhone: "",
        userName: "",
        level: "",
        vipLevel: 0,
        userSex: 0
      },
      sexList: [
        { title: "先生", checked: true, value: 0 },
        { title: "女士", checked: false, value: 1 }
      ],
      filesParams: {
        id: "",
        index: 0
      }
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.userId = this.$route.params.id;
      this.getFilesData();
    }
  },
  components: {
    Header,
    popConfirm
  },
  methods: {
    getFilesData() {
      let _this = this;
      let params = {
        id: this.userId
      };
      _getUserDetail(params).then(res => {
        if (res.data.success) {
          if (res.data.success) {
            let resData = res.data.data;
            let userArchivesList = res.data.data.userArchivesList;
            userArchivesList.forEach(val => {
              val.disabled = true;
            });
            _this.filesList = userArchivesList;
            _this.constInfo.areaText = resData.areaText;
            _this.constInfo.level = resData.level;
            _this.constInfo.userPhone = resData.userPhone;
            _this.constInfo.userName = resData.userName;
            _this.constInfo.vipLevel = resData.vipLevel;
            _this.constInfo.userSex = resData.userSex;
            resData.levelList.forEach(val => {
              _this.vipColumns.push(val.desc);
            });
            if (resData.userSex === 0) {
              _this.sexList[0].checked = true;
              _this.sexList[1].checked = false;
            } else {
              _this.sexList[0].checked = false;
              _this.sexList[1].checked = true;
            }
            _this.isVip = resData.vipLevel === 0 ? false : true;
          }
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    saveUserInfo() {
      console.log(this.constInfo);
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!this.constInfo.userName) {
        this.$toast("请输入姓名");
        return;
      }
      32;
      if (!reg.test(this.constInfo.userPhone)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      let params = {
        userId: this.userId,
        userName: this.constInfo.userName,
        phone: this.constInfo.userPhone,
        userLevel: this.constInfo.vipLevel,
        sex: this.constInfo.userSex
      };
      _modifyUserInfo(params).then(res => {
        if (res.data.success) {
          this.canSaveInfo = false;
          this.$toast(res.data.message);
        }
      });
    },
    // 修改用户档案
    filesSubmit(item, index) {
      let _this = this;
      // if (!item.username) {
      //   this.$toast(`请填写姓名`);
      // } else
      if (!item.address) {
        this.$toast(`请填写家庭地址`);
      } else {
        let params = {
          id: item.id,
          userId: this.userId,
          userName: item.username,
          address: item.address,
          populateText: item.populateText,
          houseModel: item.houseModel,
          taste: item.taste,
          houseArea: item.houseArea
        };
        _editUserFules(params).then(res => {
          if (res.data.success) {
            _this.filesList[index].disabled = true;
            _this.$toast(res.data.message);
          }
        });
      }
    },
    filesDel(item, index) {
      this.popConfirm2 = true;
      this.filesParams.id = item.id;
      this.filesParams.index = index;
    },
    openChangeFiles(item) {
      item.disabled = false;
    },
    changeSex(item, index) {
      if (!this.canSaveInfo) return;
      this.constInfo.userSex = item.value;
      this.sexList.forEach(val => {
        val.checked = false;
      });
      item.checked = true;
    },
    selVip() {
      if (!this.canSaveInfo) return;
      this.typeShow1 = true;
    },
    vipCardSubmit() {
      // this.vipCardShow = false;
      if (!this.vipCardNumber) {
        this.$toast("请输入VIP卡号");
        return;
      }
      console.log("axios");
      console.log(this.vipCardNumber);
    },
    vipConfirm(value) {
      console.log(value);
      if (value == "充值会员") {
        // this.isVip = true;
        // this.vipCurrent = value;
        if (this.constInfo.vipLevel === 0) {
          this.vipCardShow = true;
        }
      } else {
        if (this.isVip) {
          this.popConfirm = true;
          // this.isVip = false;
          //  this.vipCurrent = value;
        }
      }
      this.typeShow1 = false;
    },
    getPopInfo() {
      this.popConfirm = false;
      // 接口待处理
      this.constInfo.vipLevel = 0;
      this.constInfo.level = this.vipColumns[0];
      this.isVip = false;
    },
    getPopInfo2() {
      _delUserFiles(this.filesParams.id).then(res => {
        if (res.data.success) {
          this.$toast(res.data.message);
          this.filesList.splice(this.filesParams.index, 1);
          this.popConfirm2 = false;
        }
      });
    },
    // 添加用户档案表单
    addNewFiles() {
      if (this.filesList.length >= 5) {
        this.$toast("同个区域档案不能超过5条");
      } else {
        if (this.filesList2.length == 0) {
          let params = {
            address: "",
            houseArea: "",
            houseModel: "",
            populateText: "",
            taste: "",
            userId: this.userId,
            userName: "",
            numberCurrent: this.filesList.length
          };
          this.filesList2.push(params);
        } else {
          this.$toast("您还有一条新档案还未保存");
        }
      }
    },
    filesSubmit2(item, index) {
      let _this = this;
      // if (!item.userName) {
      //   this.$toast(`请填写姓名`);
      // } else
      if (!item.address) {
        this.$toast(`请填写家庭地址`);
      } else {
        _addUserFules(item).then(res => {
          if (res.data.success) {
            _this.filesList2 = [];
            _this.$toast(res.data.message);
            _this.getFilesData();
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
.user_files {
  .user_info {
    position: relative;
    width: 96%;
    margin: 20px auto 0 auto;
    background: #fff;
    padding: 2rem 3rem;
    .list_title {
      font-size: 1.8rem;
      text-align: center;
      padding-bottom: 20px;
      font-weight: bold;
    }
    .info_flex {
      display: flex;
      justify-content: center;
      .item_list {
        margin-right: 20px;
        display: flex;
        align-items: center;
        .item_title {
          display: inline-block;
          margin-right: 15px;
          font-size: 1.6rem;
          color: #282828;
        }
        input,
        .input {
          line-height: 3.5rem;
          height: 3.5rem;
          width: 180px;
          border: 1px solid #dcdcdc;
          padding: 0 20px;
          font-size: 1.4rem;
        }
        .sel_type {
          position: relative;
          font-size: 1.4rem;
          border: 1px solid #dcdcdc;
          line-height: 34px;
          min-width: 18vw;
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
          span {
            padding-left: 1rem;
            font-size: 1.4rem;
            color: #333;
            display: block;
            font-weight: 100;
            word-wrap: break-word;
            padding-top: 0.2rem;
          }
        }
        .sel_disable {
          background: #ebebe4;
        }
      }
      .item_list2 {
        display: flex;
        align-items: center;
        padding-right: 30px;
        .item_title {
          font-size: 1.6rem;
          padding-right: 15px;
        }
      }
    }
    .submit_save {
      width: 20rem;
      line-height: 4rem;
      height: 4rem;
      background: #eb5d2a;
      color: #fff;
      font-size: 1.6rem;
      margin: 25px auto 20px auto;
      display: block;
      border-radius: 2rem;
    }
    .chain_pic {
      position: absolute;
      bottom: -35px;
    }
    .chain_left {
      left: 50px;
    }
    .chain_right {
      right: 50px;
    }
  }
  .outer_container {
    background: #fff;
    padding: 2rem 3rem;
    // height: 50rem;
    width: 96%;
    margin: 10px auto;
    // overflow: hidden;
    // overflow-y: scroll;
    .files_list {
      > h3 {
        padding-top: 20px;
        font-size: 1.8rem;
        text-align: center;
        padding-bottom: 20px;
        font-weight: bold;
      }
    }
    .user_item1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      .left_info {
        .input_label {
          display: inline-block;
          width: 6.5rem;
          margin-right: 1.5rem;
          font-size: 1.6rem;
          color: #282828;
        }
        input {
          line-height: 3.5rem;
          height: 3.5rem;
          border: 1px solid #dcdcdc;
          padding: 0 2.1rem;
          font-size: 1.4rem;
        }
      }
      .right_info {
        display: flex;
        align-items: center;
        > div {
          span {
            font-size: 1.6rem;
            color: #282828;
            padding-right: 1rem;
          }
          i {
            font-size: 1.4rem;
            color: #333;
          }
        }
        > div:last-child {
          padding-left: 6.7rem;
        }
        .apartment {
          display: inline-block;
          width: 6.5rem;
          margin-right: 1.5rem;
          font-size: 1.6rem;
          color: #282828;
        }
        .apartment_input {
          width: 28rem;
          line-height: 3.5rem;
          height: 3.5rem;
          border: 1px solid #dcdcdc;
          padding: 0 2.1rem;
          font-size: 1.4rem;
        }
      }
      .ruo_zhi {
        position: relative;
        .group_input {
          position: absolute;
          right: 0;
          top: 0;
          line-height: 3.5rem;
          box-sizing: border-box;
          padding: 0 1rem;
        }
      }
    }
    .user_item2 {
      padding: 1.5rem 0;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 6.5rem;
        margin-right: 1.5rem;
        font-size: 1.6rem;
        color: #282828;
      }
      i {
        padding: 0 0 0 2.1rem;
        font-size: 1.4rem;
      }
      em {
        font-size: 1.4rem;
        padding: 0 1rem;
      }
      input {
        flex: 1;
        line-height: 3.5rem;
        height: 3.5rem;
        border: 1px solid #dcdcdc;
        padding: 0 2.1rem;
        font-size: 1.4rem;
      }
    }
    .user_item3 {
      display: flex;
      align-items: center;
      padding: 1.5rem 0;
      span {
        display: inline-block;
        width: 6.5rem;
        margin-right: 1.5rem;
        font-size: 1.6rem;
        color: #282828;
      }
      input {
        flex: 1;
        line-height: 3.5rem;
        height: 3.5rem;
        border: 1px solid #dcdcdc;
        padding: 0 2.1rem;
        font-size: 1.4rem;
      }
    }
    .user_item4 {
      padding: 1.5rem 0;
      p {
        font-size: 1.6rem;
        color: #282828;
        line-height: 2;
      }
      .user_habit {
        width: 100%;
        height: 10rem;
        border-radius: 0.2rem;
        border: 1px solid #dcdcdc;
        padding: 1.7rem;
        font-size: 1.4rem;
      }
    }
    .save_box {
      display: flex;
      justify-content: center;
      .submit_save {
        width: 20rem;
        line-height: 4rem;
        height: 4rem;
        background: #eb5d2a;
        color: #fff;
        font-size: 1.6rem;
        // margin: 0 auto;
        margin-right: 2.5rem;
        display: block;
        border-radius: 2rem;
      }
      .del_btn {
        color: #eb5d2a;
        border: 1px solid #eb5d2a;
        background: #fff;
      }
      padding-bottom: 2.5rem;
      border-bottom: 1px dashed #dcdcdc;
    }
    .add_files {
      margin: 0 auto;
      width: 10rem;
      display: flex;
      align-items: center;
      padding: 2rem 0;
      img {
        width: 2.2rem;
      }
      span {
        font-size: 1.4rem;
        padding-left: 0.5rem;
      }
    }
  }
}
</style>
