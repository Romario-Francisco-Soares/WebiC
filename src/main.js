import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export let bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')