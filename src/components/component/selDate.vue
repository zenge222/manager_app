<template>
  <div>
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        :title="title"
        @cancel="show1=false"
        v-model="current"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="submitDate"
        type="date"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: this.showPop,
      current: this.currentDate
    };
  },
  props: {
    showPop: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    currentDate: {
      required: true
    },
    minDate: {
      required: true
    },
    maxDate: {
      required: true
    }
  },
  watch: {
    showPop: function(newVal, oldVal) {
      this.show1 = newVal;
    },
    show1: function(newVal, oldVal) {
      this.$emit("update:showPop", newVal);
    },
    currentDate: function(newVal, oldVal) {
      this.current = newVal;
    },
    current: function(newVal, oldVal) {
      this.$emit("update:currentDate", newVal);
    }
    //  this.initSelect();
  },
  mounted() {},
  methods: {
    submitDate(val) {
      let y = val.getFullYear();
      let m = val.getMonth() + 1;
      let d = val.getDate();
      let selDate = `${y}-${m}-${d}`;
      this.$emit("getParams", selDate);
      this.show1 = false;
    }
  }
};
</script>