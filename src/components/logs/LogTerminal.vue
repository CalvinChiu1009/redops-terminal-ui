<script setup lang="ts">
import { computed } from "vue";
import type { AttackLog } from "@/types/attack";
import LogItem from "./LogItem.vue";

interface Props {
  logs: AttackLog[];
  filterActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  filterActive: false,
});

// 計算顯示的日誌數量
const displayCount = computed(() => props.logs.length);
</script>

<template>
  <div class="border border-terminal-green rounded p-4">
    <!-- 標題！ -->
    <h2 class="text-xl font-bold mb-4 flex items-center justify-between">
      <span>Latest Logs (Last 10)</span>
      <span v-if="filterActive" class="text-sm text-terminal-yellow">
        - 顯示 {{ displayCount }} 筆篩選結果
      </span>
    </h2>

    <!-- 日誌列表 -->
    <div class="space-y-2">
      <LogItem v-for="log in logs" :key="log.id" :log="log" />
    </div>

    <!-- 空狀態 -->
    <div
      v-if="logs.length === 0"
      class="text-center text-terminal-green opacity-50 py-8"
    >
      No logs available.
    </div>
  </div>
</template>
