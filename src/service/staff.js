import api from '../api/apiConfig'
import request from '../api/request'

// 获取员工列表
export function _getStaffList(data) {
    return request(api.getStaffList, 'get',data);
}
