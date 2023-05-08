<template>
  <el-row>
    <!-- 第一列 -->
    <el-col :span="8" style="padding-right:10px">
       <!-- 第一列第一张卡片 -->
      <el-card>
        <div class="user">
          <img src="../assets/user.png" >
          <div class="userinfo"> 
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>  
        <div class="login-info">
          <p>上次登录时间：<span>2023-5-6</span></p>
          <p>上次登录地点：<span>杭州</span></p>
        </div>
      </el-card>
      <!-- 第一列第二张卡片 -->
      <el-card style="margin-top:20px;height:460px">
         <el-table
          :data="tableData"
          style="width: 100%">
            <!-- <el-table-column
              prop="name"
              label="课程">
            </el-table-column>
            <el-table-column
              prop="todayBuy"
              label="今日购买">
            </el-table-column>
            <el-table-column
              prop="monthBuy"
              label="本月购买">
            </el-table-column>
            <el-table-column
              prop="totalBuy"
              label="总购买">
            </el-table-column> -->
            <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val"/>
        </el-table>
      </el-card>
    <!-- 第二列  -->
    </el-col>
    <!-- 第二列  -->
    <el-col :span="16" style="padding-left:10px">
      <!-- 订单显示 -->
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <div>
        <el-card style="height:280px">
          <!-- 折线图 -->  
          <div ref="echarts1" style="height:220px"></div>
        </el-card>
        <!-- 柱状图和饼图 -->
        <div class="graph">
          <el-card style="height:260px">
            <div ref="echarts2"  style="height:210px"/>
          </el-card>
          <el-card style="height:260px">
            <div ref="echarts3"  style="height:210px"/>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  name:'Home',
  data() {
    return {
      tableData:[],
      // 列表头的数据
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      // 第二列，第一张图的数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted(){
    // 相当于页面挂载的时候就发送异步请求getData()响应数据了，通过请求依次获得折线图、柱状图、饼状图的data，然后通过ref引用显示
    // { data }从响应的数据中解构出来data
    getData().then(({ data }) => {
      // console.log(console.log(data))
      const { tableData } = data.data
      this.tableData = tableData  // 获取到列表的数据

      // 准备好dom初始化
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的数据
      let echarts1Option = {}
      // 三种表格的数据
      const { orderData, userData, videoData} = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {data: xAxis}
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}

      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key =>{
         echarts1Option.series.push({
          name:key,
          data:orderData.data.map(item => item[key]),
          type:'line'
         })
      })
      // 设置属性
      echarts1.setOption(echarts1Option)   // echarts绘图三步走，初始化=>参数格式化=>设置属性


      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      // 设置柱状图options的参数模板
      const echarts2Options = {
        legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ],
      }
      echarts2.setOption(echarts2Options)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Options = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: videoData,
              type:'pie'
            }
          ],
        }
      echarts3.setOption(echarts3Options)
    })
  }
}
</script>

<style lang="less" scoped>
.user{
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}
</style>