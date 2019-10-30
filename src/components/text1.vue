<template>
  <div class="text1 has-header">
    <!-- <Header :title="'测试'"></Header> -->
    <div id="liquidFill" style="width:80px;height:80px;font-size:12px;"></div>
    <p>1</p>
    <!-- <div class="item_list" v-for="(item,index) in dataList" :key="index">{{item}}</div>
    <div style="padding:50px 0;">
      <infinite-loading
        @infinite="infiniteHandler"
        ref="infiniteLoading"
        spinner="bubbles"
        :distance="searchNumber"
      >
        <span style="font-size:28px;color:#999;" slot="no-results">--- 暂无数据 ---</span>
        <span style="font-size:28px;;color:#999;" slot="no-more">--- 暂无更多数据 ---</span>
      </infinite-loading>
    </div>-->
  </div>
</template>
<script>
import echarts from "echarts";
import echartsLiquidfill from "echarts-liquidfill";
import Header from "./component/header";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "Text1",
  data() {
    return {
      searchNumber: 0,
      loadState: null,
      dataList: [1, 2],
      pageNumber: 1,
      counter: 1
    };
  },
  mounted() {
    this.liquidFill();
  },
  components: {
    Header,
    InfiniteLoading
  },
  methods: {
    liquidFill() {
      //方法
      var liquid = this.$echarts.init(document.getElementById("liquidFill"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            data: [0.6],
            name: "Liquid Fill"
          }
        ],
        tooltip: {
          show: true
        }
        // title: {
        //   //标题
        //   text: "",
        //   textStyle: {
        //     //标题的样式
        //     color: "#ffffff", //字体颜色
        //     fontFamily: "Microsoft YaHei", //字体
        //     align: "center", //文字的水平方式
        //     fontSize: "12px",
        //     verticalAlign: "middle" //文字的垂直方式
        //   },
        //   left: "center", //定位
        //   backgroundColor: "#ED6D3F" //文字区域的背景颜色
        // },
        // series: [
        //   {
        //     type: "liquidFill", //类型
        //     data: [0.5, 0.5], //数据是个数组 数组的每一项的值是0-1
        //     outline: {
        //       //show: true , //是否显示轮廓 布尔值
        //       borderDistance: 0, //外部轮廓与图表的距离 数字
        //       itemStyle: {
        //         borderColor: "#ED6D3F", //边框的颜色
        //         borderWidth: 2, //边框的宽度
        //         shadowBlur: 0, //外部轮廓的阴影范围 一旦设置了内外都有阴影
        //         shadowColor: "#ED6D3F" //外部轮廓的阴影颜色
        //       }
        //     },
        //     backgroundStyle: {
        //       color: "#fff", //图表的背景颜色
        //       borderWidth: "2", //图表的边框宽度
        //       borderColor: "#fff", //图表的边框颜色
        //       itemStyle: {
        //         // shadowBlur: 100, //设置无用
        //         // shadowColor: "#ED6D3F", //设置无用
        //         // opacity: 1 //设置无用
        //       }
        //     },
        //     itemStyle: {
        //       opacity: 1, //波浪的透明度
        //       shadowBlur: 10, //波浪的阴影范围
        //       shadowColor: "#ED6D3F" //阴影颜色
        //     },
        //     emphasis: {
        //       itemStyle: {
        //         opacity: 1 //鼠标经过波浪颜色的透明度
        //       }
        //     },
        //     color: ["#ED6D3F", "#ED6D3F", "#ED6D3F"], //水波的颜色 对应的是data里面值
        //     shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
        //     center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
        //     radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
        //     amplitude: 3, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
        //     waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
        //     phase: 0, //波的相位弧度 默认情况下是自动
        //     period: (value, index) => {
        //       //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引
        //       return index * 2000;
        //     },
        //     direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
        //     waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
        //     animationEasing: "linear", //初始动画
        //     animationEasingUpdate: "quarticInOut", //数据更新的动画效果
        //     animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
        //     animationDurationUpdate: 300 //数据更新动画的时长
        //   }
        // ]
        // // backgroundColor: 'rgba(255,0,0,0.1)' //容器背景颜色
      });
    },
    infiniteHandler($state) {
      console.log("infiniteHandler");
      this.loadState = $state;
      this.pageNumber++;
      console.log(this.pageNumber);
      if (this.pageNumber < 5) {
        this.dataList.push(...[8, 8]);
        $state.loaded(); // 加载
      } else {
        $state.complete(); // 无数据 完成
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.item_list {
  font-size: 28px;
  line-height: 400px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
