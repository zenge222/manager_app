import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';

const work = {
  state: {
    employee: {
      id: '',
      nickname: '',
      truename: '',
    },
    addTime: {
      dateTime: '',
      startTime: '',
      endTime: '',
      timeString: '',
    }
  },
  mutations: {
    // 设置技工id
    setEmployeeIdName(state, data) {
      // console.log(data)
      state.employee.id = data.id;
      state.employee.nickname = data.nickname;
      state.employee.truename = data.truename;
    },
    initEmployeeIdName(state) {
      state.employee.id = '';
      state.employee.nickname = '';
      state.employee.truename = '';
    },
    setAddTime(state, data) {
      if (data.name == 'addWork') {
        state.addTime.dateTime = data.dateTime;
        state.addTime.startTime = data.startTime;
        state.addTime.endTime = data.endTime;
        state.addTime.timeString = data.timeString;
      } else if (data.name == 'selPersonal') {
        state.addTime.dateTime = data.dateTime;
        state.addTime.startTime = data.startTime;
        state.addTime.endTime = data.endTime;
        state.addTime.timeString = data.timeString;
      }
    }
  },
  actions: {

  },
};

export default work;
