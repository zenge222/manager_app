import api from '../api/apiConfig'
import request from '../api/request'

// 登录
export function _toLogin(data) {
    return request(api.toLogin, 'post',data);
}
// 获取用户信息
export function _getUserInfo() {
    return request(api.getUserInfo, 'get');
}
