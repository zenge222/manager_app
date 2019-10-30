<template>
  <div id="app">
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      name="viewport"
    />
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition :name="transitionName">
      <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      transitionName: state => state.login.transitionName
    })
  }
};
</script>

<style lang="less">
@import "./less/style.less";
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
