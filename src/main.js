// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createRouter from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import md5 from 'js-md5'
import store from './store/index'
import qs from 'qs'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import { showLoading, hideLoading } from './assets/js/loading'

if (typeof window !== 'undefined') {
  require('element-ui/lib/theme-chalk/index.css')
  require('./assets/css/reset.css')
  require('./assets/css/common.less')
}
/* 表单验证各项正则集合 */
Vue.prototype.regex = {
  phone: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  $register_password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  $login_account: /^[a-zA-Z0-9_-]{4,16}$/,
  name: /^([\u4E00-\u9FA5]{2,10})|([·\u4E00-\u9FA5]{2,10})$/,
  vCode: /^[0-9]{6}$/,
  bankCard: /^([1-9]{1})(\d{14,18})$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
}
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
Vue.use(ElementUI)
Vue.prototype.axios = Axios
Vue.prototype.HOST = '/apis'
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5

Axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('Authorization')) {
      config.headers.Authorization = sessionStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });

/* 请求拦截器（请求之前的操作） */
Axios.interceptors.request.use((req) => {
  showLoading();
  return req;
}, err => Promise.reject(err));

/* 请求之后的操作 */
Axios.interceptors.response.use((res) => {
  hideLoading();
 
  return res;
 
  return Promise.reject(res);
}, (err) => {
  hideLoading();
  return Promise.reject(err);
});

Vue.config.productionTip = false
const router = createRouter()

router.beforeEach((to,from,next)=>{
  if(to.path == '/' || to.path == '/register'){
    next();
  }else{
    let token = sessionStorage.getItem('Authorization');
    if (!token) {
      next('/');
    } else{
      next();
    }
  }
})

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
