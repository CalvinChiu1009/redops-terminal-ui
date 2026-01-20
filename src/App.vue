<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useMockStream } from "@/composables/useMockStream";
import StatCard from "@/components/dashboard/StatCard.vue";

const attackStore = useAttackStore();
const { logs, totalLogs, criticalCount, blockedCount, successCount } =
  storeToRefs(attackStore);

const { startStream, stopStream } = useMockStream();

// 元件掛載時啟動資料流
onMounted(() => {
  startStream();
});
</script>

<template>
  <div class="min-h-screen bg-terminal-bg text-terminal-green p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Title -->
      <h1 class="text-4xl font-bold text-terminal-blue mb-8">
        RedOps Command Center - Phase 1 Test
      </h1>

      <!-- 統計卡片 - 改為 4 欄佈局 -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Logs" :value="totalLogs" color="green" />

        <StatCard
          title="Critical Threats"
          :value="criticalCount"
          color="red"
          icon="⚠️"
        />

        <StatCard
          title="Successful Attacks"
          :value="successCount"
          color="red"
          icon="🚨"
        />

        <StatCard
          title="Blocked Attacks"
          :value="blockedCount"
          color="blue"
          icon="🛡️"
        />
      </div>

      <!-- 控制 -->
      <div class="flex gap-4 mb-8">
        <button
          @click="startStream"
          class="px-4 py-2 bg-terminal-green text-terminal-bg rounded hover:opacity-80 transition-opacity"
        >
          Start Stream
        </button>
        <button
          @click="stopStream"
          class="px-4 py-2 bg-terminal-red text-terminal-bg rounded hover:opacity-80 transition-opacity"
        >
          Stop Stream
        </button>
        <button
          @click="attackStore.clearLogs()"
          class="px-4 py-2 bg-terminal-yellow text-terminal-bg rounded hover:opacity-80 transition-opacity"
        >
          Clear Logs
        </button>
      </div>

      <!-- 最新 10 筆日誌 -->
      <div class="border border-terminal-green rounded p-4">
        <h2 class="text-xl font-bold mb-4">Latest Logs (Last 10)</h2>
        <div class="space-y-2 font-mono text-sm">
          <div
            v-for="log in logs.slice(-10).reverse()"
            :key="log.id"
            class="p-2 border-l-4"
            :class="{
              'border-terminal-red bg-terminal-red/10':
                log.level === 'CRITICAL',
              'border-terminal-yellow bg-terminal-yellow/10':
                log.level === 'WARNING',
              'border-terminal-green bg-terminal-green/10':
                log.level === 'INFO',
            }"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <span class="text-terminal-blue">{{ log.source_ip }}</span>
                <span class="text-terminal-yellow mx-2">→</span>
                <span class="text-terminal-green">:{{ log.target_port }}</span>
              </div>
              <div class="flex gap-2">
                <span
                  class="px-2 py-1 text-xs rounded"
                  :class="{
                    'bg-terminal-red text-terminal-bg':
                      log.level === 'CRITICAL',
                    'bg-terminal-yellow text-terminal-bg':
                      log.level === 'WARNING',
                    'bg-terminal-green text-terminal-bg': log.level === 'INFO',
                  }"
                >
                  {{ log.level }}
                </span>
                <span
                  class="px-2 py-1 text-xs rounded bg-terminal-blue text-terminal-bg"
                >
                  {{ log.status }}
                </span>
              </div>
            </div>
            <div class="mt-1 text-terminal-green/80">
              {{ log.payload }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
