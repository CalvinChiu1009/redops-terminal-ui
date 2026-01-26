<!-- src/App.vue -->
<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <!-- 所有的頁面內容，都會根據當前網址顯示在這裡 -->
    <RouterView />
  </AppLayout>
</template>
