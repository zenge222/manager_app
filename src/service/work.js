import api from '../api/apiConfig'
import request from '../api/request'

// 获取工作安排列表
export function _getWorkList(data) {
  return request(api.getWorkList, 'get', data);
}

// 获取工作安排详情 
export function _getWorkDetail(data) {
  return request(api.getWorkDetail + `/${data.id}`, 'get');
}

// 获取服务人员列表
export function _getPersonList(data) {
  return request(api.getPersonList, 'get',data);
}

//submitAddWork
export function _submitAddWork(data) {
  return request(api.submitAddWork, 'post',data);
}