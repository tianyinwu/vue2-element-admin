// 1.引入组件
// 配置router需要的步骤
import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

// 主页面
import Main from "../views/Main.vue";

// 登录页面
import Login from "../views/Login.vue";

// 2.定义路由
// const routes = [
//   { path: "/home", component: Home },
//   { path: "/login", component: Login },
// ];

// 3.创建router实例
export default new VueRouter({
  // routes, // (缩写) 相当于 routes: routes
  routes: [
    {
      // 主路由
      path: "/",
      redirect: "/home",
      name:'Main',
      component: Main,
      // 子路由
      children: [
        // { path: "home", name: "home", component: Home }, // 首页
        // { path: "user", name: "user", component: User }, // 用户管理
        // { path: "mall", name: "mall", component: Mall }, // 商品管理
        // { path: "page1", name: "page1", component: Page1 }, // 页面1
        // { path: "page2", name: "page2", component: Page2 }, // 页面2
      ],
    },
    {
      // 登录页面
      path: "/login",
      name:'login',
      component: Login,
    },
  ],
});
