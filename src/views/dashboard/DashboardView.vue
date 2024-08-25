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
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
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
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
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
  <a-row :gutter="16">
    <a-col :span="16">
      <div ref="zhexiantu" style="width: 100%; height: 400px; background-color: #fff"></div>
    </a-col>
    <a-col :span="8">
      <div ref="bingtu" style="width: 100%; height: 600px; background-color: #fff"></div>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
