<script setup lang="ts">
import { onMounted } from "vue";
import AppLayout from "@/components/layout/AppLayout.vue";
import { useMockStream } from "@/composables/useMockStream";

// 在最上層啟動資料流，確保切換頁面時不會中斷
const { startStream } = useMockStream();

onMounted(() => {
  startStream();
});
</script>

<template>
  <AppLayout>
    <!-- 所有的頁面內容，都會根據當前網址顯示在這裡 -->
    <RouterView />
  </AppLayout>
</template>
