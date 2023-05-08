<template>
  <div class="tabs">
    <el-tag
        v-for="(item,index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        size="small"
        >
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({   
            tags: state => state.tab.tabsList
        }),
    },
    methods:{
        ...mapMutations(['closeTag']),
        // 点击tag跳转功能
        changeMenu(item){
            // 不要重复跳转
            if(this.$route.name !== item.name){
                this.$router.push(item.path)
            } 
        },
        // 点击输出的逻辑
        handleClose(item, index){
            // 调用store中的mutation方法
            this.closeTag(item)
            const length = this.tags.length
            // 删除之后的跳转逻辑
            if(item.name !== this.$route.name){
                // 不是当前显示的就不跳转
                return
            }
            
            if(index === length){
                // 当前页面，且删除的最后一项,往前跳转
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                // 当前页面，删除其它页面,原地跳转,数据本来就少了
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor:pointer;
    }
}
</style>