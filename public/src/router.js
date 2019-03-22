import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Mypage from './views/Mypage.vue'
import store from './store'
import Detail from './components/Detail.vue'
import SearchResult from './views/SearchResult.vue'
import History from './views/History.vue'  
import Chatting from './views/Chat.vue'
import Register from './views/Register.vue'
Vue.use(Router)

const rejectAuthUser = (to, from, next) => {
    if(store.state.isLogin === true) {
      alert('이미 로그인 하였습니다.')
      next("/")
    } else {
      next()
    }
}
const onlyAuthUser = (to, from, next) => {
  if(localStorage.getItem("access-token") === null) {
    alert('로그인 하셔야 사용 가능 합니다.')
    next("/login")
  } else {
    next()
  }
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children : [{path: 'detail/:title',name: 'detail',beforeEnter : onlyAuthUser, component : Detail}]
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter : rejectAuthUser,
      component: Login
    },
    {
      path: '/mypage',
      name: 'mypage',
      beforeEnter : onlyAuthUser,
      component: Mypage
    },
    {
      path: '/searchresult',
      name: 'searchresult',
      beforeEnter : onlyAuthUser,
      component: SearchResult,
      children : [{path: 'result',name:'result',beforeEnter : onlyAuthUser, component : Detail}]
    },
    {
      path : '/history',
      name : 'history',
      beforeEnter : onlyAuthUser,
      component : History,
      children : [{path: 'historyresult',name:'historyresult',beforeEnter : onlyAuthUser, component : Detail}]
    },
    {
      path : '/setting',
      name : 'setting',
      beforeEnter : onlyAuthUser,
      component : Mypage
    },
    {
      path : '/chatting/:title',
      name : 'chatting',
      beforeEnter : onlyAuthUser,
      component : Chatting
    },
    {
      path : '/register',
      name : 'register',
      component : Register
    }
  
  ]
})
