<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useMockStream } from "@/composables/useMockStream";
// import StatCard from "@/components/dashboard/StatCard.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import LogTerminal from "@/components/logs/LogTerminal.vue";
import LogControls from "@/components/logs/LogControls.vue";
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

// 是否有篩選啟用
const filterActive = computed(() => {
  return filterLevel.value !== null || filterStatus.value !== null;
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
      <StatsGrid
        :totalLogs="totalLogs"
        :criticalCount="criticalCount"
        :successCount="successCount"
        :blockedCount="blockedCount"
        @filterByLevel="handleFilterByLevel"
        @filterByStatus="handleFilterByStatus"
        @clearFilters="clearFilters"
      />

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
      <LogControls />
      <!-- <div class="flex gap-4 my-8">
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
      </div> -->

      <!-- 日誌終端 -->
      <LogTerminal
        :logs="filteredLogs.slice(-10).reverse()"
        :filterActive="filterActive"
      />
    </div>
  </div>
</template>

<style scoped></style>
