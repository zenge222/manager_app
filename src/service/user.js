import api from '../api/apiConfig'
import request from '../api/request'

// 获取用户列表
export function _getUserList(data) {
  return request(api.getUserList, 'get', data);
}

// 获取用户档案
export function _getUserDetail(data) {
  return request(api.getUserDetail + `/${data.id}`, 'get');
}

// 修改用户档案
export function _editUserFules(data) {
  return request(api.editUserFules, 'post', data);
}

// 添加用户档案
export function _addUserFules(data) {
  return request(api.addUserFules, 'post', data);
}

// 修改用户档案个人信息
export function _modifyUserInfo(data) {
  return request(api.modifyUserInfo, 'post', data);
}

// 删除用户档案 
export function _delUserFiles(id) {
  return request(api.delUserFiles + `/${id}`, 'get');
}
