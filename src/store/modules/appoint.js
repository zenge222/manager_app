import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';
import Vue from 'vue'
const appoint = {
  state: {
    // 下单显示时间
    appointTime: '',
    // 筛选时间
    screenTime: {
      startDay: '',
      endDay: '',
      startTime: '',
      endTime: '',
    },
    workDays: [],
    freeTime: [],
    workIndex: -1,
    freeIndex: -1,
    checkWork: false,
  },
  mutations: {
    // 设置服务时间
    setAppointTime(state, data) {
      state.appointTime = data.selTime;
      state.screenTime = data.screenTime;
    },
    // 重置服务时间
    clearAppointTime(state) {
      state.appointTime = "";
      state.screenTime.startDay = "";
      state.screenTime.endDay = "";
      state.screenTime.startTime = "";
      state.screenTime.endTime = "";
    },
    setAppointDays(state, data) {
      state.workDays = data.workDays;
      state.freeTime = data.freeTime;
    },
    clearAppointDays(state) {
      state.workDays = [];
      state.freeTime = [];
    },
    // 修改日期索引
    changeDayIndex(state, data) {
      if (data.name == "workDays") {
        state.workIndex = data.index;
        state.checkWork = true;
      } else if (data.name == "freeTime") {
        state.freeIndex = data.index;
        state.checkWork = false;
      }
    },
    // 修改占用 未排满时间
    changeWorkDaysData(state, data) {
      let dayData = state.workDays[state.workIndex];
      dayData.changeTime = data;
      state.freeTime.unshift(dayData);
      state.workDays.splice(state.workIndex, 1);
    },
    // 修改空余时间
    changeFreeTimeData(state, data) {
      let dayData = state.freeTime[state.freeIndex];
      dayData.changeTime = data;
      Vue.set(state.freeTime, state.freeIndex, dayData);
    },
  },
  actions: {

  },
};

export default appoint;
