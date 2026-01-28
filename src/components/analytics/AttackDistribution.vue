<!-- src/components/analytics/AttackDistributionChart.vue -->
<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

const props = defineProps<{
  chartData: ChartData<"doughnut">;
}>();

const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "#00ff41",
        font: {
          family: "monospace",
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      titleColor: "#00ff41",
      bodyColor: "#00ff41",
      borderColor: "#00ff41",
      borderWidth: 1,
      padding: 12,
      displayColors: true,
    },
  },
};
</script>

<template>
  <div class="w-full h-full p-2 flex items-center justify-center">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
