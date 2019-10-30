<template>
  <div class="not_found has-header">
    <Header :title="'该页面不存在'"></Header>
    <div class="tab_container">
      <div class="not_found">
        <img src="../../static/images/def_404_2.png" alt />
        <p>未找到该页面</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./component/header";
export default {
  name: "NotFound",
  data() {
    return {};
  },
  mounted() {},
  components: {
    Header
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tab_container {
  position: relative;
  background: #fff;
  margin: 2rem auto;
  padding: 3rem;
  width: 96%;
  margin: 2rem auto;
  height: 54rem;
  overflow: hidden;
  overflow-y: scroll;
  .not_found {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    p {
      text-align: center;
      color: #dddddd;
      font-size: 1.6rem;
      line-height: 3;
    }
  }
}
</style>
