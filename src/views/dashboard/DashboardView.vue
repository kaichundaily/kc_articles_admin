<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, nextTick  } from "vue";

const zhexiantu = ref(null)

const bingtu = ref(null)

onMounted(() => {
  nextTick(() => {
    const myChart = echarts.init(zhexiantu.value);
    myChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['8-19', '8-20', '8-21', '8-22', '8-23', '8-24', '8-25']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Sales',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
        areaStyle: {}
      }]
    });

    // 监听窗口大小变化以调整图表大小
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  });
})
onMounted(() => {
  nextTick(() => {
    const myChart = echarts.init(bingtu.value)
    myChart.setOption({
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: false },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: ['20%', '70%'],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'vue' },
            { value: 38, name: 'Go' },
            { value: 32, name: 'react' },
            { value: 30, name: 'linux' },
            { value: 28, name: 'java' },
            { value: 26, name: 'python' },
            { value: 22, name: 'TS' },
            { value: 18, name: 'panel' }
          ]
        }
      ]
    })

    // 监听窗口大小变化以调整图表大小
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  })
})
</script>

<template>
  <div class="index">
    <a-row :gutter="16">
      <a-col :span="16">
        <div ref="zhexiantu" style="position: relative; width: 100%; height: 30vh; background-color: #fff"></div>
      </a-col>
      <a-col :span="8">
        <div ref="bingtu" style="position: relative; width: 100%; height: 30vh; background-color: #fff"></div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.index {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
