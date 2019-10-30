<template>
  <div>
    <van-popup
      v-model="show1"
      class="confirm_pop"
      position="center"
      :close-on-click-overlay="canClose"
    >
      <h3 v-text="title"></h3>
      <slot name="message"></slot>
      <div class="confirm_btns">
        <van-button class="btns cancel_btn" @click="show1=false">取消</van-button>
        <van-button class="btns submit_btn" @click="confirm">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: this.showPop
    };
  },
  props: {
    showPop: {
      type: Boolean,
      default: false
    },
    canClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  watch: {
    showPop: function(newVal, oldVal) {
      this.show1 = newVal;
    },
    show1: function(newVal, oldVal) {
      this.$emit("update:showPop", newVal);
    }
  },
  mounted() {},
  methods: {
    confirm() {
      this.$emit("getParams");
    }
  }
};
</script>
<style lang="less" scoped>
.confirm_pop {
  overflow: hidden;
  width: 290px;
  padding-top: 20px;
  border-radius: 15px;
  h3 {
    padding-bottom: 10px;
    font-size: 1.8rem;
    text-align: center;
  }
  .confirm_btns {
    display: flex;
    .btns {
      width: 50%;
      border: none;
      border-top: 1px solid #d2d3d5;
      height: 50px;
      line-height: 50px;
      display: block;
      font-size: 1.8rem;
    }
    .cancel_btn {
      border-right: 1px solid #d2d3d5;
    }
    .submit_btn {
      color: #eb5d2a;
    }
  }
}
</style>
