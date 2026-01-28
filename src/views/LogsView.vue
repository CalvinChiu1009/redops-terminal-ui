<script setup lang="ts">
import { watch, nextTick } from "vue";
import { useVirtualList } from "@vueuse/core";
import { useAttackStore } from "@/stores/attackStore";
import { storeToRefs } from "pinia";
import { format } from "date-fns";

const attackStore = useAttackStore();
const { logs, autoScroll } = storeToRefs(attackStore);

// 使用 Virtual List
// 必須解構出 scrollTo 才能使用
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(logs, {
  itemHeight: 50,
  overscan: 5,
});

// 當 logs 長度變動時，如果自動捲動開啟，就捲到底部
watch(
  () => logs.value.length,
  () => {
    if (autoScroll.value) {
      nextTick(() => {
        scrollTo(logs.value.length - 1);
      });
    }
  },
);
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- 1. 頂部工具列 -->
    <div
      class="p-4 border-b border-terminal-green/30 flex justify-between items-center bg-black/40"
    >
      <h2 class="text-xl font-bold">Tactical Logs</h2>

      <div class="flex items-center gap-6">
        <!-- 狀態統計 -->
        <div class="text-sm opacity-70">
          Total: {{ logs.length }} | Displaying: {{ list.length }}
        </div>

        <!-- Auto Scroll 開關 -->
        <label
          class="flex items-center gap-2 text-sm cursor-pointer hover:text-terminal-green transition-colors select-none"
        >
          <div
            class="w-4 h-4 border border-terminal-green flex items-center justify-center"
            :class="{ 'bg-terminal-green/20': autoScroll }"
          >
            <span v-if="autoScroll" class="text-xs">✓</span>
          </div>
          <input type="checkbox" v-model="autoScroll" class="hidden" />
          Auto-Scroll
        </label>
      </div>
    </div>

    <!-- 2. Virtual List container -->
    <div
      class="flex-1 border border-terminal-green/30 rounded bg-black/80 overflow-hidden flex flex-col"
    >
      <!-- 
          * 重點：containerProps 必須綁定到一個有固定高度且 overflow-y-auto 的元素上
          * 這裡我們用 flex-1 讓它佔滿剩餘高度
      -->
      <div v-bind="containerProps" class="h-full w-full custom-scrollbar">
        <!-- 內層 Wrapper: 負責被撐高 -->
        <div v-bind="wrapperProps">
          <!-- 實際渲染項目 -->
          <div
            v-for="item in list"
            :key="item.index"
            class="h-[50px] border-b border-terminal-green/10 flex items-center px-4 hover:bg-terminal-green/10 transition-color text-sm font-mono"
          >
            <!-- 顯示 Log 內容 -->
            <span class="text-terminal-green/50 w-24 mr-4">
              {{ format(new Date(item.data.timestamp), "HH:mm:ss") }}</span
            >

            <!-- Level -->
            <span
              class="w-24 font-bold mr-4"
              :class="{
                'text-red-500': item.data.level === 'CRITICAL',
                'text-yellow-500': item.data.level === 'WARNING',
                'text-blue-500': item.data.level === 'INFO',
              }"
            >
              {{ item.data.level }}
            </span>

            <!-- IP -->
            <span class="w-32 mr-4 text-terminal-green/80">
              {{ item.data.source_ip }}
            </span>

            <!-- Payload -->
            <span
              class="flex-1 truncate text-terminal-green/70 font-mono text-xs"
            >
              {{ item.data.payload }}
            </span>

            <!-- Status -->
            <span
              class="ml-auto text-xs px-2 py-1 rounded border"
              :class="
                item.data.status === 'BLOCKED'
                  ? 'border-red-500 text-red-500'
                  : 'border-green-500 text-green-500'
              "
            >
              {{ item.data.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #0d0d0d;
    border-left: 1px solid #00ff41;
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border: 2px solid #0d0d0d;
  }
}
</style>
