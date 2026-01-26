<script setup lang="ts">
import { computed } from "vue";
import { format } from "date-fns";
import type { AttackLog } from "@/types/attack";

// Props 使用 AttackLog 型別
interface Props {
  log: AttackLog;
}

const props = defineProps<Props>();

// 格式化時間戳記
const formattedTime = computed(() => {
  return format(props.log.timestamp, "yyyy-MM-dd HH:mm:ss");
});

// 根據 level 決定樣式
const levelClasses = computed(() => {
  const baseClasses = "p-2 border-l-4 transition-all duration-200";

  switch (props.log.level) {
    case "CRITICAL":
      return `${baseClasses} border-terminal-red bg-terminal-red/10 hover:bg-terminal-red/30`;
    case "WARNING":
      return `${baseClasses} border-terminal-yellow bg-terminal-yellow/10 hover:bg-terminal-yellow/30`;
    case "INFO":
    default:
      return `${baseClasses} border-terminal-green bg-terminal-green/10 hover:bg-terminal-green/30`;
  }
});

// 根據 status 決定文字顏色
const statusColor = computed(() => {
  switch (props.log.status) {
    case "SUCCESS":
      return "text-terminal-red";
    case "BLOCKED":
      return "text-terminal-blue";
    case "PENDING":
    default:
      return "text-terminal-yellow";
  }
});

// level 的顯示標籤
const levelBadge = computed(() => {
  switch (props.log.level) {
    case "CRITICAL":
      return "🔴 CRITICAL";
    case "WARNING":
      return "🟡 WARNING";
    case "INFO":
    default:
      return "🟢 INFO";
  }
});
</script>

<template>
  <div :class="levelClasses" class="font-mono text-sm">
    <!-- 第一行：時間 + IP:Port + Level -->
    <div class="flex justify-between items-center mb-1">
      <span class="text-terminal-green opacity-70">
        {{ formattedTime }}
      </span>
      <span class="text-terminal-blue">
        {{ log.source_ip }} → :{{ log.target_port }}
      </span>
      <span class="text-xs">{{ levelBadge }}</span>
    </div>

    <!-- 第二行：Payload -->
    <div class="text-terminal-green">
      <span class="opacity-50">Payload:</span>
      <span class="ml-2">{{ log.payload }}</span>
    </div>

    <!-- 第三行：Status -->
    <div class="mt-1 text-xs">
      <span class="opacity-50">Status:</span>
      <span :class="statusColor" class="ml-2 font-bold">{{ log.status }}</span>
    </div>
  </div>
</template>
