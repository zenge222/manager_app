// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './api/request'
import store from './store/index'
import * as types from './store/mutations';
import Echarts from 'echarts'//引入echarts
import infiniteScroll from 'vue-infinite-scroll';
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(infiniteScroll); //实现无限滚动列表，瀑布流
Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body) //移除移动端页面点击延迟
/* eslint-disable no-new */

import {
  Button,
  Field,
  Toast,
  Notify,
  Icon,
  Tab,
  Tabs,
  Popup,
  SwipeCell,
  Cell,
  DatetimePicker,
  Picker,
  Rate
} from 'vant';
Vue.prototype.$echarts = Echarts;
Vue.use(Button).use(Field).use(Toast).use(Notify).use(Icon).use(Tab)
  .use(Tabs).use(Popup).use(SwipeCell).use(Cell).use(DatetimePicker).use(Picker).use(Rate)

Vue.prototype.pushTo = function (path, parameter = {}) {
  router.push({
    name: path,
    params: parameter
  });
};
Vue.prototype.replaceTo = function (path, parameter = {}) {
  router.replace({
    name: path,
    params: parameter
  });
};

router.beforeEach((to, from, next) => {
  // 设置title
  if (to.meta.title) {
    window.document.title = to.meta.title;
  }
  // 设置滑动方向
  if (to.meta.index > from.meta.index) {
    store.commit(types.CHANGE_SIDE, 'slide-left');
  } else {
    store.commit(types.CHANGE_SIDE, 'slide-right');
  }
  //
  if (to.name === 'AddWork' || to.name === 'EditWork') {
    if (from.name === "SelPersonal") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };

  if (to.name === 'AppointmentSummary') {
    if (from.name === "AppointOrder" || from.name === "OrderDetail" || from.name === "UserFiles") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };
  // 下单页 
  if (to.name === 'AppointOrder') {
    if (from.name === "WeekScreen" || from.name === "MonthScreen") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };
  // 星期日期筛选
  if (to.name === 'WeekScreen' || to.name === 'MonthScreen') {
    if (from.name === "SelectTime") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  };

  // 日历插件
  if (to.name === 'UnfixedDate') {
    if (from.name === "SeeSelectTime") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  }

  // 工作安排
  if (to.name === 'WorkArrangement') {
    if (from.name === "EditWork" || from.name === "WorkDetail") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  }

  // 订单管理
  if (to.name === 'OrderManagement') {
    if (from.name === "OrderInformation") {
      to.meta.isUseCache = true;
    } else {
      to.meta.isUseCache = false;
    }
  }

  if (to.name === 'SelPersonal') {
    // 来自员工详情
    // if (from.name === "SelPersonal") {
    //   to.meta.isUseCache = true;
    // } else { 
    //   to.meta.isUseCache = false;
    // }
  };
  next();
});

// 跳转后返回顶部
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
