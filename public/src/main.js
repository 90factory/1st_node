import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

//import { access } from 'fs';

//Vue.config.productionTip = false
//Vue.prototype.$http = axios;
//const accessToken = localStorage.getItem('access-token')
//if(accessToken) {
//  Vue.prototype.$http.defaults.headers.common['Authorization']  = 'Bearer ' +accessToken   
//}


Vue.use(VueCookies)

export const eventBus = new Vue()


new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch('gettoken')
  },
  render: h => h(App)
}).$mount('#app')
