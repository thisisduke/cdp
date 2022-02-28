<template>
  <div id="main"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";

interface FormState {}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({});

    onMounted(() => {
      const doc: any = document.getElementById("main");
      let myChart = echarts.init(doc);
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [52, 20, 36, 10, 18, 26, 45],
          },
        ],
      });
    });
    return {
      ...toRefs(formState),
    };
  },
});
</script>

<style lang="scss" scoped>
#main {
  height: 450px;
  width: 80%;
  margin: 0 auto;
}
</style>
