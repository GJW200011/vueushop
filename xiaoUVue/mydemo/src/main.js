// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/js/remScale'//jsrem
import './assets/css/reset.css'//样式清空
import './assets/font/iconfont.css' //精灵图


import VantUI from 'vant'
Vue.use(VantUI)
import 'vant/lib/index.css'


Vue.prototype.$imgUrl='http://localhost:3000'
//全局组件
import comComponent from './common/index'
for(let i in comComponent){
  Vue.component(i,comComponent[i])
}
//全局过滤器
import comFiler from './filter/index'
for(let i in comFiler){
  Vue.filter(i,comFiler[i])
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
