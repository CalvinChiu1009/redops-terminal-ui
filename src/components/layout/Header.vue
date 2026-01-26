<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 即時時間
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

let intervalId: number | null = null;

onMounted(() => {
  updateTime();
  intervalId = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <header class="mb-8 pb-4 border-b border-terminal-green/30">
    <div class="flex items-center justify-between">
      <!-- 標題 -->
      <h1 class="text-4xl font-bold text-terminal-blue flex items-center gap-3">
        <span class="text-terminal-red">🔴</span>
        <span>RedOps Command Center</span>
      </h1>

      <!-- 時間 -->
      <span class="text-terminal-green text-sm font-mono opacity-70">
        {{ currentTime }}
      </span>
    </div>
  </header>
</template>
