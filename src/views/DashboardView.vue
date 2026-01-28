<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
// import AppLayout from "@/components/layout/AppLayout.vue";
import Header from "@/components/layout/Header.vue";
import Filter from "@/components/dashboard/Filter.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import LogTerminal from "@/components/logs/LogTerminal.vue";
import LogControls from "@/components/logs/LogControls.vue";
import type { ThreatLevel, AttackStatus } from "@/types/attack";

const attackStore = useAttackStore();
const { logs, totalLogs, criticalCount, blockedCount, successCount } =
  storeToRefs(attackStore);

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
</script>

<template>
  <!-- <div
  class="min-h-screen bg-terminal-bg text-terminal-green p-8 scanline-effect"
  > -->
  <!-- 用 AppLayout 包裝整個 App.vue 來進行版面配置 -->
  <div>
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
      <Filter
        :filterLevel="filterLevel"
        :filterStatus="filterStatus"
        @clearFilters="clearFilters"
      />

      <!-- 控制按鈕 -->
      <LogControls />

      <!-- 日誌終端 -->
      <!-- 日誌終端 -->
      <LogTerminal
        :logs="filteredLogs.slice(-10).reverse()"
        :filterActive="filterActive"
        :filterLabel="filterLabel"
        :totalMatchCount="filteredLogs.length"
      />
    </div>
    <!-- </div> -->
  </div>
</template>

<style scoped></style>
