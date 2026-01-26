<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div
    class="h-screen bg-terminal-bg text-terminal-green scanline-effect flex overflow-hidden"
  >
    <!-- 左側 -->
    <Sidebar />

    <!-- 右側 -->
    <main class="flex-1 p-4 md:p-8 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
