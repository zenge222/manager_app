const apiConfig = {
  toLogin: '/sign/login',
  getUserInfo: '/shop/indexInfo',
  getOrderData: '/indent/list',
  getOrderDetail: '/indent/detail',
  getStaffList: '/employee/list',
  getAppointList: '/appoint/list',
  failAppoint: '/appoint/interviewFailure',
  successAppoint: '/appoint/successFailure',
  appointDetail: '/appoint/sureIndent',
  getUserList: '/user/list',
  getUserDetail: '/userArchives/list',
  getWorkList: '/services/list',
  getWorkDetail: '/services/detail',
  getPersonList: '/employee/wList',
  submitAddWork: '/services/add',
  orderSubmit: '/indent/order',
  editUserFules: '/userArchives/mod',
  addUserFules: '/userArchives/add',
  getScreenWeekDays: '/workTime/selectWorkTime',
  getAppoinDetail: '/appoint/detail',
  getScreenMonthDays: '/workTime/selectWorkTimeByDay',
  getEmployeeTime: '/workTime/workTimeList',
  getOrderTypeList: '/indent/common',
  modifyUserInfo: '/user/mod',
  delUserFiles: "/userArchives/delete/"
};
// /user/list
export default apiConfig;
