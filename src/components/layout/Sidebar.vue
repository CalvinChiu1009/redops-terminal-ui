<!-- src/components/layout/Sidebar.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navItems = [
  {
    name: "dashboard",
    path: "/",
    icon: "📊",
    label: "Dashboard",
  },
  {
    name: "logs",
    path: "/logs",
    icon: "📝",
    label: "Logs",
  },
  {
    name: "settings",
    path: "/settings",
    icon: "⚙️",
    label: "Settings",
  },
];
</script>

<template>
  <aside
    class="hidden md:flex flex-col w-64 border-r border-terminal-green/30 bg-black/20 p-4 h-full overflow-y-auto"
  >
    <!-- Logo 區域 -->
    <div class="mb-8 p-2 border-b border-terminal-green/30 pb-4">
      <h1 class="text-xl font-bold tracking-wider text-shadow">
        🚨 RedOps 🚨
        <span class="text-xs font-normal block opacity-70 mt-1"
          >Command Center</span
        >
      </h1>
    </div>

    <!-- 導航選單 (先放假資料) -->
    <nav class="space-y-2 flex-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="block p-3 border-l-2 transition-all cursor-pointer group"
        :class="[
          // 使用 route.path === item.path 判斷是否啟用 (或使用 RouterLink 的 active-class)
          route.path === item.path
            ? 'bg-terminal-green/10 text-terminal-green border-terminal-green'
            : 'text-terminal-green/60 border-transparent hover:text-terminal-green hover:bg-terminal-green/10 hover:border-terminal-green/50',
        ]"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg group-hover:scale-110 transition-transform">{{
            item.icon
          }}</span>
          <span class="font-medium">{{ item.name }}</span>
        </div>
      </RouterLink>
    </nav>

    <!-- 底部版本號 -->
    <div
      class="mt-auto pt-4 border-t border-terminal-green/30 text-xs text-center opacity-50"
    >
      v0.5.0 Alpha
    </div>
  </aside>
</template>

<style scoped>
.text-shadow {
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}
</style>
