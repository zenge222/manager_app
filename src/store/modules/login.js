import request from '../../api/request';
import apiConfig from '../../api/apiConfig';
import * as types from '../mutations';

const login = {
    state: {
        authorization:'',
        transitionName :'slide-left',
        smstoken: '',
        loginUserInfo:{
            shopName: '',
            headImg: '',
            nickname: '',
            truename: ''
        }
    },
    mutations: {
        [types.CHANGE_SIDE](state,data) {
            state.transitionName = data;
        },
        [types.SET_AUTHORIZATION](state,data){
            state.authorization = data.token;
        },
        [types.SET_USER_INFO](state,data){
            state.loginUserInfo = data;
        },
    },
    actions: {
        changeSide({ commit, state }){
            commit(types.CHANGE_SIDE);
        },
        setUserInfo({ commit, state },params){
            commit(types.SET_USER_INFO,params);
        }
    },
};

export default login;