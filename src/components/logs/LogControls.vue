<script setup lang="ts">
import { useMockStream } from "@/composables/useMockStream";
import { useAttackStore } from "@/stores/attackStore";

const attackStore = useAttackStore();

const { startStream, stopStream } = useMockStream();
</script>

<template>
  <div class="flex gap-4 my-8">
    <button
      @click="startStream"
      class="px-4 py-2 bg-terminal-green text-terminal-bg rounded hover:opacity-80 transition-opacity"
    >
      Start Stream
    </button>
    <button
      @click="stopStream"
      class="px-4 py-2 bg-terminal-red text-terminal-bg rounded hover:opacity-80 transition-opacity"
    >
      Stop Stream
    </button>
    <button
      @click="attackStore.clearLogs()"
      class="px-4 py-2 bg-terminal-yellow text-terminal-bg rounded hover:opacity-80 transition-opacity"
    >
      Clear Logs
    </button>
  </div>
</template>
