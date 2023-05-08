<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3> 
    <!-- 没有子菜单的 -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>  
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 有子菜单的 -->
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item @click="clickMenu(subItem)" v-for="subItem in item.children" :index="subItem.label">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    
  </el-menu>

</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      // 四个数据，其中有一个有子菜单,这个数据由后面vuex中给到显示
      // menuData:[
      //   {
      //       path:'/',
      //       name:'home',
      //       label:'首页',
      //       icon:'s-home',
      //       url:'Home/Home'
      //   },
      //   {
      //       path:'/mall',
      //       name:'mall',
      //       label:'商品管理',
      //       icon:'video-play',
      //       url:'MallManage/MallManage'
      //   },
      //   {
      //       path:'/user',
      //       name:'user',
      //       label:'用户管理',
      //       icon:'user',
      //       url:'UserManage/UserManage'
      //   },
      //   {
      //       label:'其它',
      //       icon:'location',
      //       children:[
      //           {
      //               path:'/page1',
      //               name:'page1',
      //               label:'页面1',
      //               icon:'setting',
      //               url:'Other/PageOne'
      //           },
      //           {
      //               path:'/page2',
      //               name:'page2',
      //               label:'页面2',
      //               icon:'setting',
      //               url:'Other/PageTwo'
      //           }
      //       ]
      //   },
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath, 'open');
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath, 'close');
    },
    clickMenu(item){
        if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
          // 返回有item信息，直接进行页面跳转了
          this.$router.push(item.path)
        }
        // this.$router.push(item.path)
        this.$store.commit('selectMenu', item)
        
    },
  },
  computed:{
    // 没有子菜单的
    noChildren(){
        return this.menuData.filter(item => !item.children)
    },
    // 有子菜单的
    hasChildren(){
        return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    menuData(){
      // 判断当前的数据，如果缓存中没有，就从当前的store中取
      return  JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100vh;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400px;
    }
    border-right:none;
}
</style>