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
      axios.defaults.headers.common['Authorization'] = null;   
    }
  
  },
  actions: {
    
    login({dispatch}, loginObj) {

        Login.fetch(loginObj)     
                .then(res=> {
                        const token = res.data.token
                        const RefreshToken = res.data.RefreshToken
                        sessionStorage.setItem("access-token", token)
                        sessionStorage.setItem("refresh-token",RefreshToken)
                        sessionStorage.setItem("email",res.data.email)
                        sessionStorage.setItem("Nickname",res.data.Nickname)
                        sessionStorage.setItem("Sex",res.data.Sex)
                        sessionStorage.setItem("Area",res.data.Area)
                        sessionStorage.setItem("Age",res.data.Age)
                        dispatch('gettoken')
                  })
                  .catch(() => {
                      dispatch('getError')
                  })
               

    },
    gettoken({commit}) {
      let token = sessionStorage.getItem("access-token")
      router.push({name: 'home'})
      if(token !== null){
        commit('loginSuccess')
        const accessToken = sessionStorage.getItem('access-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }
    },
    getError({commit}) {
      commit("loginError")
    },
    logout({commit}){
     
        sessionStorage.clear();
        commit("logout")
        router.push({name : 'home'})
        
    }
  }   
})
