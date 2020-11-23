// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//全局引入element-ui
import ElementUI from 'element-ui'
//引入elementUIcss样式
import 'element-ui/lib/theme-chalk/index.css'
//调用插件
Vue.use(ElementUI)

Vue.prototype.$imgUrl='http://localhost:3000'




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
