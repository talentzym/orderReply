import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderId: '',
    userType: sessionStorage.getItem('userType') ? sessionStorage.getItem('userType') : '',
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
    username: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : ''
  },
  getters: {
    getOrderId: state => state.orderId,
    getUserType: state => state.userType,
    getUsername: state => state.username,
  },
  mutations: {
    changeOrderId (state, payload) {
      console.log(payload)
      state.orderId = payload.id
    },
    changeUserType (state, payload) {
      console.log(payload)
      state.userType = payload.userType
      sessionStorage.setItem('userType', payload.userType)
    },
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      sessionStorage.setItem('Authorization', user.Authorization)
    },
    changeUsername (state, user) {
      state.username = user.username
      sessionStorage.setItem('username', user.username)
    }
  },
  actions: {}
})