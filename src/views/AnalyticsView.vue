<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useChartData } from "@/composables/useChartData";
import ThreatTrendChart from "@/components/analytics/ThreatTrendChart.vue";
import AttackDistribution from "@/components/analytics/AttackDistribution.vue";

// 從 Pinia store 取得 logs
const attackStore = useAttackStore();
const { logs } = storeToRefs(attackStore);

// 使用 useChartData 處理資料
const { trendData, distributionData } = useChartData(logs.value);
</script>

<template>
  <div class="h-full flex flex-col p-4">
    <!-- 頂部標題列 -->
    <div
      class="mb-4 p-4 border border-terminal-green/30 flex justify-between items-center bg-black/40 rounded"
    >
      <h2 class="text-xl font-bold">📈 Threat Analytics</h2>
      <div class="text-sm opacity-70">Live Threat Visualization</div>
    </div>

    <!-- 圖表區域 -->
    <div class="flex-1 overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 趨勢圖 (Line Chart)- 佔據兩欄 -->
        <div
          class="border border-terminal-green/30 rounded bg-black/40 p-4 md:col-span-2 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow duration-300"
        >
          <h3
            class="text-lg font-bold mb-2 text-terminal-green flex items-center gap-2"
          >
            Threat Level Trend (Last 60s)
            <span
              class="w-2 h-2 bg-terminal-green rounded-full animate-pulse"
            ></span>
          </h3>
          <div
            v-if="logs.length < 10"
            class="h-64 flex items-center justify-center text-terminal-green/50"
          >
            <div class="text-center">
              <div class="animate-pulse mb-2">📊</div>
              <div>Collecting data... ({{ logs.length }}/10)</div>
            </div>
          </div>
          <div v-else class="h-48 md:h-64 lg:h-80">
            <ThreatTrendChart :chartData="trendData" />
          </div>
        </div>

        <!-- 分布圖 (Doughnut Chart) -->
        <div class="border border-terminal-green/30 rounded bg-black/40 p-4">
          <h3 class="text-lg font-bold mb-2 text-terminal-green">
            Attack Status Distribution
          </h3>
          <div
            v-if="logs.length < 10"
            class="h-64 flex items-center justify-center text-terminal-green/50"
          >
            <div class="text-center">
              <div class="animate-pulse mb-2">📊</div>
              <div>Collecting data... ({{ logs.length }}/10)</div>
            </div>
          </div>
          <div v-else class="h-48 md:h-64 lg:h-80">
            <AttackDistribution :chartData="distributionData" />
          </div>
        </div>

        <!-- 統計資訊卡片 (可選) -->
        <div class="border border-terminal-green/30 rounded bg-black/40 p-4">
          <h3 class="text-lg font-bold mb-2 text-terminal-green">Statistics</h3>
          <div class="space-y-2 text-sm font-mono">
            <div class="flex justify-between">
              <span class="text-terminal-green/70">Total Logs:</span>
              <span class="text-terminal-green font-bold">{{
                logs.length
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-red-500/70">Critical:</span>
              <span class="text-red-500 font-bold">
                {{ logs.filter((l) => l.level === "CRITICAL").length }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-yellow-500/70">Warning:</span>
              <span class="text-yellow-500 font-bold">
                {{ logs.filter((l) => l.level === "WARNING").length }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-500/70">Info:</span>
              <span class="text-blue-500 font-bold">
                {{ logs.filter((l) => l.level === "INFO").length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
