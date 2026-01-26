<script setup lang="ts">
import type { ThreatLevel, AttackStatus } from "@/types/attack";

interface Props {
  filterLevel: ThreatLevel | null;
  filterStatus: AttackStatus | null;
}

defineProps<Props>();

const emit = defineEmits<{
  clearFilters: [];
}>();
</script>

<template>
  <div
    v-if="filterLevel || filterStatus"
    class="my-4 p-3 bg-terminal-yellow/10 border border-terminal-yellow rounded"
  >
    <span class="text-terminal-yellow text-sm">
      🔍 篩選中:
      <span v-if="filterLevel" class="font-bold">{{ filterLevel }}</span>
      <span v-if="filterStatus" class="font-bold">{{ filterStatus }}</span>
      <button
        @click="emit('clearFilters')"
        class="ml-4 px-2 py-1 text-xs bg-terminal-yellow text-terminal-bg rounded hover:opacity-80"
      >
        清除篩選
      </button>
    </span>
  </div>
</template>
