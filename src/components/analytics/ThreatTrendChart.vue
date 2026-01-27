<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

const props = defineProps<{
  chartData: ChartData<"line">;
}>();

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 255, 65, 0,1)", // 網格線顏色
      },
      ticks: {
        color: "#00ff41", // 軸標籤顏色
      },
    },
    x: {
      grid: {
        display: false, // 隱藏 x 軸網格
      },
      ticks: {
        color: "#00ff41", // 軸標籤顏色
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#00ff41",
        font: {
          family: "monospace",
        },
      },
    },
  },
};
</script>

<template>
  <div class="w-full h-full p-2">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
