<template>
    <el-container>
        <el-aside width="auto">
        <CommonAsilde/>
        </el-aside>
        <el-container>
            <el-header>
                <CommonHeader/>
            </el-header>
            <CommonTag/>
            <el-main>
                <!-- 路由的入口，匹配到的组件将渲染在这里 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommonAsilde from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue';
export default {
    name:'Main',
    components:{
        CommonAsilde,
        CommonHeader,
        CommonTag,
    }
}
</script>
<style lang="less" scoped>
.el-header{
    padding: 0;     
}
</style>
