import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
Vue.use(Vuex)
import {Login} from './api'
import axios from 'axios'


export default new Vuex.Store({
  state: {
    userInfo : null,
    isLogin : false,
    isLoginError : false
  },
  mutations: { 
    loginSuccess(state) {
      state.isLogin = true
   
    },
    loginError(state) {
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null   
    }
  
  },
  actions: {
    
    login({dispatch}, loginObj) {

        Login.fetch(loginObj)     
                .then(res=> {
                        const token = res.data.token
                        const RefreshToken = res.data.RefreshToken
                        localStorage.setItem("access-token", token)
                        localStorage.setItem("refresh-token",RefreshToken)
                        localStorage.setItem("email",res.data.email)
                        localStorage.setItem("Nickname",res.data.Nickname)
                        localStorage.setItem("Sex",res.data.Sex)
                        localStorage.setItem("Area",res.data.Area)
                        localStorage.setItem("Age",res.data.Age)
                        dispatch('gettoken')
                  })
                  .catch(() => {
                      dispatch('getError')
                  })
               

    },
    gettoken({commit}) {
      let token = localStorage.getItem("access-token")
      router.push({name: 'home'})
      if(token !== null){
        commit('loginSuccess')
        const accessToken = localStorage.getItem('access-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }
    },
    getError({commit}) {
      commit("loginError")
    },
    logout({commit}){
        localStorage.removeItem('access-token')
        localStorage.removeItem('email')
        localStorage.removeItem('Nickname')
        localStorage.removeItem('Sex')
        localStorage.removeItem('Area')
        localStorage.removeItem('Age')
        commit("logout")
        router.push({name : 'home'})
    }
  }
})
