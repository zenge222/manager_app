import api from '../api/apiConfig'
import request from '../api/request'

// 获取预约列表
export function _getAppointList(data) {
  return request(api.getAppointList, 'get', data);
}

// 面试失败
export function _failAppoint(data) {
  return request(api.failAppoint, 'post', data);
}

// 面试成功
export function _successAppoint(data) {
  return request(api.successAppoint, 'post', data);
}

// 面试下单 详情
export function _appointDetail(data) {
  return request(api.appointDetail + `/${data.id}`, 'get');
}

// 面试 下订单 orderSubmit
export function _orderSubmit(data) {
  return request(api.orderSubmit, 'post', data);
}

// 获取周筛选日期
export function _getScreenWeekDays(data) {
  return request(api.getScreenWeekDays, 'get', data);
}

// 获取月筛选日期
export function _getScreenMonthDays(data) {
  return request(api.getScreenMonthDays, 'get', data);
}

// 预约汇总详情
export function _getAppoinDetail(data) {
  return request(api.getAppoinDetail + `/${data.id}`, 'get');
}

// 获取员工时间表
export function _getEmployeeTime(data) {
  return request(api.getEmployeeTime, 'get', data);
}
