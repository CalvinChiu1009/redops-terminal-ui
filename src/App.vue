<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useMockStream } from "@/composables/useMockStream";
import Header from "@/components/layout/Header.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import LogTerminal from "@/components/logs/LogTerminal.vue";
import LogControls from "@/components/logs/LogControls.vue";
import type { ThreatLevel, AttackStatus } from "@/types/attack";

const attackStore = useAttackStore();
const { logs, totalLogs, criticalCount, blockedCount, successCount } =
  storeToRefs(attackStore);

const { startStream } = useMockStream();

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

// 篩選條件標籤
const filterLabel = computed(() => {
  if (filterLevel.value) {
    const labels = {
      CRITICAL: "嚴重威脅",
      WARNING: "警告",
      INFO: "資訊",
    };
    return labels[filterLevel.value];
  }
  if (filterStatus.value) {
    const labels = {
      SUCCESS: "成功攻擊",
      BLOCKED: "已阻擋",
      PENDING: "待處理",
    };
    return labels[filterStatus.value];
  }
  return "";
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
      <!-- Header -->
      <Header />

      <!-- 統計卡片 - 改為 4 欄佈局 -->
      <StatsGrid
        :totalLogs="totalLogs"
        :criticalCount="criticalCount"
        :successCount="successCount"
        :blockedCount="blockedCount"
        :filterLevel="filterLevel"
        :filterStatus="filterStatus"
        @filterByLevel="handleFilterByLevel"
        @filterByStatus="handleFilterByStatus"
        @clearFilters="clearFilters"
      />

      <!-- 篩選提示 -->
      <div
        v-if="filterLevel || filterStatus"
        class="my-4 p-3 bg-terminal-yellow/10 border border-terminal-yellow rounded"
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

      <!-- 日誌終端 -->
      <LogTerminal
        :logs="filteredLogs.slice(-10).reverse()"
        :filterActive="filterActive"
        :filterLabel="filterLabel"
      />
    </div>
  </div>
</template>

<style scoped></style>
