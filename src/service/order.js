import api from '../api/apiConfig'
import request from '../api/request'

// 获取订单列表
export function _getOrderData(data) {
  return request(api.getOrderData, 'get', data);
}

// 获取订单详情
export function _getOrderDetail(data) {
  return request(api.getOrderDetail + `/${data.id}`, 'get');
}

// 获取订单类型选择数据
export function _getOrderTypeList() {
  return request(api.getOrderTypeList, 'get');
}
