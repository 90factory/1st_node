import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'



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
