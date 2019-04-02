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
      state.isSnsMember = false
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
    loginSNS({dispatch},loginObj) {
   
     sessionStorage.setItem("access-token",loginObj.token)
     sessionStorage.setItem("email",loginObj.email)
     sessionStorage.setItem("type",'SNS')
     $cookies.remove('token')
     $cookies.remove('email')    
     const isNewMember = loginObj.isNewMember;
     dispatch('getSnsToken',isNewMember)
     
    },
    getSnsToken({commit},isNewMember) {
      let token = sessionStorage.getItem("access-token")
     
      if(token !== null){
        const accessToken = sessionStorage.getItem('access-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        commit('loginSuccess')
     
      }
      
      if(isNewMember){
        router.push({name: 'snssetting'})
      }else{
        router.push({name: 'home'})
      }

    },
    gettoken({commit}) {
      let token = sessionStorage.getItem("access-token")
      router.push({name: 'home'})
      if(token !== null){
        const accessToken = sessionStorage.getItem('access-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        commit('loginSuccess')
      }
    },
    getError({commit}) {
      commit("loginError")
    },
    logout({commit}){

        sessionStorage.removeItem('access-token')
        sessionStorage.removeItem('refresh-token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('Nickname')
        sessionStorage.removeItem('Sex')
        sessionStorage.removeItem('Area')
        sessionStorage.removeItem('Age')
        sessionStorage.removeItem('type')

     
        sessionStorage.clear();

        commit("logout")
        router.push({name : 'home'})
        
    }
  }   
})
