import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import WorkArrangement from '@/components/workArrangement'
import OrderManagement from '@/components/OrderManagement'
import StaffManagement from '@/components/staffManagement'
import UserArrangement from '@/components/userArrangement'
import AppointmentSummary from '@/components/appointmentSummary'
import AddWork from '@/components/addWork'
import EditWork from '@/components/editWork'
import SelPersonal from '@/components/selPersonal'
import OrderInformation from '@/components/orderInformation'
import AppointOrder from '@/components/appointOrder'
import UserFiles from '@/components/userFiles'
import OrderDetail from '@/components/orderDetail'
import WorkDetail from '@/components/workDetail'
import SelectTime from '@/components/selectTime'
import SeeSelectTime from '@/components/seeSelectTime'
import WeekScreen from '@/components/weekScreen'
import MonthScreen from '@/components/monthScreen'
import UnfixedDate from '@/components/unfixedDate'
import NotFound from '@/components/notFound'
import Text1 from '@/components/text1'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登陆',
        index: 0,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '家美',
        index: 1,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/workArrangement',
      name: 'WorkArrangement',
      component: WorkArrangement,
      meta: {
        title: '工作安排',
        index: 2,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/orderManagement',
      name: 'OrderManagement',
      component: OrderManagement,
      meta: {
        title: '订单管理',
        index: 3,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/staffManagement',
      name: 'StaffManagement',
      component: StaffManagement,
      meta: {
        title: '员工管理',
        index: 4,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/userArrangement',
      name: 'UserArrangement',
      component: UserArrangement,
      meta: {
        title: '用户管理',
        index: 5,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/appointmentSummary',
      name: 'AppointmentSummary',
      component: AppointmentSummary,
      meta: {
        title: '预约汇总',
        index: 6,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/addWork',
      name: 'AddWork',
      component: AddWork,
      meta: {
        title: '添加工作安排',
        index: 7,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/editWork',
      name: 'EditWork',
      component: EditWork,
      meta: {
        title: '编辑工作安排',
        index: 7,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/selPersonal',
      name: 'SelPersonal',
      component: SelPersonal,
      meta: {
        title: '选择服务人员',
        index: 8,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/orderInformation',
      name: 'OrderInformation',
      component: OrderInformation,
      meta: {
        title: '订单信息',
        index: 8,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/appointOrder',
      name: 'AppointOrder',
      component: AppointOrder,
      meta: {
        title: '下单页',
        index: 9,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/userFiles',
      name: 'UserFiles',
      component: UserFiles,
      meta: {
        title: '用户档案',
        index: 10,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '预约汇总详情',
        index: 11,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/workDetail',
      name: 'WorkDetail',
      component: WorkDetail,
      meta: {
        title: '工作详情',
        index: 11,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },

    {
      path: '/weekScreen',
      name: 'WeekScreen',
      component: WeekScreen,
      meta: {
        title: '日期选择筛选',
        index: 12,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/monthScreen',
      name: 'MonthScreen',
      component: MonthScreen,
      meta: {
        title: '日期选择筛选',
        index: 12,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/unfixedDate',
      name: 'UnfixedDate',
      component: UnfixedDate,
      meta: {
        title: '日期选择筛选',
        index: 12,
        requireAuth: false,
        keepAlive: true,
        isUseCache: false,
      }
    },
    {
      path: '/selectTime',
      name: 'SelectTime',
      component: SelectTime,
      meta: {
        title: '选择时间段',
        index: 15,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '/seeSelectTime',
      name: 'SeeSelectTime',
      component: SeeSelectTime,
      meta: {
        title: '查看时间段',
        index: 15,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    // SeeSelectTime
    {
      path: '/text1',
      name: 'Text1',
      component: Text1,
      meta: {
        title: '测试',
        index: 9,
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      }
    },
    {
      path: '*',
      name: 'NotFound',
      // redirect: '/home', // 页面重定向 或 配置404页面 
      component: NotFound,
      meta: {
        requireAuth: false,
        keepAlive: false,
        isUseCache: false,
      },
    }
  ],
  // mode: 'history',
  history: true,
})
