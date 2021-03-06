// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import Qs from 'querystring'
import Comjs from '.././static/js/common.js'

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:7070";
//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = Qs.stringify(config.data);
  }
  return config;
},(error) =>{
 console.log('错误参数')
  return Promise.reject(error);
});

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

Vue.prototype.$http = axios
Vue.prototype.$comjs = Comjs;
Vue.use(iview);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
