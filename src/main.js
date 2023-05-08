import Vue from 'vue'
import App from './App.vue'

// 关闭开发模式
Vue.config.productionTip = false

// 全局引入element组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 对于vuex的引入
import store from './store'  // 可以不用写index.js，自动的调用了


//引入mock
import './api/mock'

// 全局注册组件
Vue.use(ElementUI);

// 引入路由实例
import router from './router'

// 引入设置Cookie的库
import Cookie from 'js-cookie'

// 添加全局前置守卫,本质上来说就是需要token才会登录到页面
router.beforeEach((to,from,next)=>{
  // console.log(to, "to");
  // console.log(from, "from");
  // console.log(next, "next");
  // 判断token存在不
  const token = Cookie.get('token')
  if(!token && to.name !== 'login'){
    // token不存在且当前页面不是login，跳转到登录界面
    next({name:'login'})
  }else if(token && to.name === 'login'){
    // token存在且当前页面是login页面,说明用户登录，此时跳转到首页
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
