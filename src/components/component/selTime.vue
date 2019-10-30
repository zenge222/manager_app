<template>
  <div>
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        :title="title"
        v-model="current"
        @cancel="show1=false"
        :min-hour="startNumber"
        :max-hour="endNumber"
        @confirm="submitTime"
        :filter="filter"
        type="time"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: this.showPop,
      current: this.currentTime
    };
  },
  props: {
    showPop: {
      type: Boolean,
      required: true
    },
    currentTime: {
      type: String,
      default: "08:00"
    },
    title: {
      type: String,
      required: true
    },
    startNumber: {
      type: Number,
      default: 8
    },
    endNumber: {
      type: Number,
      default: 22
    }
  },
  watch: {
    showPop: function(newVal, oldVal) {
      this.show1 = newVal;
    },
    show1: function(newVal, oldVal) {
      /*
        vue中props数据是单向流，不能在子组件改变父组件传过来的prop值，而解决方式就是用emit来更新prop值
        利用sync进行数据双向绑定，子组件修改showPop的值，并响应到父组件 父组件传值带.sync
      */
      this.$emit("update:showPop", newVal);
    },
    currentTime: function(newVal, oldVal) {
      this.current = newVal;
    },
    current: function(newVal, oldVal) {
      this.$emit("update:currentTime", newVal);
    }
  },
  mounted() {},
  methods: {
    filter(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0);
      }
      return options;
    },
    submitTime(val) {
      let timesArr = val.split(":");
      let hour = timesArr[0];
      let minute = Number(timesArr[1]) ? "30" : "00";
      let selTime = `${hour}:${minute}`;
      this.$emit("getParams", selTime);
      this.show1 = false;
    }
  }
};
</script>