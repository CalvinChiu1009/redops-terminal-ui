<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useMockStream } from "@/composables/useMockStream";
import StatCard from "@/components/dashboard/StatCard.vue";
import type { ThreatLevel, AttackStatus } from "@/types/attack";

const attackStore = useAttackStore();
const { logs, totalLogs, criticalCount, blockedCount, successCount } =
  storeToRefs(attackStore);

const { startStream, stopStream } = useMockStream();

// 篩選狀態
const filterLevel = ref<ThreatLevel | null>(null);
const filterStatus = ref<AttackStatus | null>(null);

// 篩選後的日誌
const filteredLogs = computed(() => {
  let result = logs.value;

  if (filterLevel.value) {
    result = result.filter((log) => log.level === filterLevel.value);
  }

  if (filterStatus.value) {
    result = result.filter((log) => log.status === filterStatus.value);
  }

  return result;
});

// 點擊卡片處理
const handleFilterByLevel = (level: ThreatLevel) => {
  filterLevel.value = filterLevel.value === level ? null : level;
  filterStatus.value = null;
};

const handleFilterByStatus = (status: AttackStatus) => {
  filterStatus.value = filterStatus.value === status ? null : status;
  filterLevel.value = null;
};

const clearFilters = () => {
  filterLevel.value = null;
  filterStatus.value = null;
};

// 元件掛載時啟動資料流
onMounted(() => {
  startStream();
});
</script>

<template>
  <div
    class="min-h-screen bg-terminal-bg text-terminal-green p-8 scanline-effect"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Title -->
      <h1 class="text-4xl font-bold text-terminal-blue mb-8">
        RedOps Command Center - Phase 1 Test
      </h1>

      <!-- 統計卡片 - 改為 4 欄佈局 -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Logs"
          :value="totalLogs"
          color="green"
          @click="clearFilters"
        />

        <StatCard
          title="Critical Threats"
          :value="criticalCount"
          color="red"
          icon="⚠️"
          @click="handleFilterByLevel('CRITICAL')"
          :class="{ 'ring-2 ring-terminal-red': filterLevel === 'CRITICAL' }"
        />

        <StatCard
          title="Successful Attacks"
          :value="successCount"
          color="red"
          icon="🚨"
          @click="handleFilterByStatus('SUCCESS')"
          :class="{ 'ring-2 ring-terminal-red': filterStatus === 'SUCCESS' }"
        />

        <StatCard
          title="Blocked Attacks"
          :value="blockedCount"
          color="blue"
          icon="🛡️"
          @click="handleFilterByStatus('BLOCKED')"
          :class="{ 'ring-2 ring-terminal-blue': filterStatus === 'BLOCKED' }"
        />
      </div>

      <!-- 篩選提示 -->
      <div
        v-if="filterLevel || filterStatus"
        class="mb-4 p-3 bg-terminal-yellow/10 border border-terminal-yellow rounded"
      >
        <span class="text-terminal-yellow text-sm">
          🔍 篩選中:
          <span v-if="filterLevel" class="font-bold">{{ filterLevel }}</span>
          <span v-if="filterStatus" class="font-bold">{{ filterStatus }}</span>
          <button
            @click="clearFilters"
            class="ml-4 px-2 py-1 text-xs bg-terminal-yellow text-terminal-bg rounded hover:opacity-80"
          >
            清除篩選
          </button>
        </span>
      </div>

      <!-- 控制按鈕 -->
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
        <h2 class="text-xl font-bold mb-4">
          Latest Logs (Last 10)
          <span
            v-if="filterLevel || filterStatus"
            class="text-sm text-terminal-yellow ml-2"
          >
            - 顯示 {{ filteredLogs.length }} 筆篩選結果
          </span>
        </h2>
        <div class="space-y-2 font-mono text-sm">
          <div
            v-for="log in filteredLogs.slice(-10).reverse()"
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
