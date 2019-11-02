import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

export const bus = new Vue();
Vue.use(VueClipboard);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
