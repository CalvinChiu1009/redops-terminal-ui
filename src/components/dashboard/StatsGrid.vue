<script setup lang="ts">
import StatCard from "./StatCard.vue";
import type { AttackStatus, ThreatLevel } from "@/types/attack";

interface Props {
  totalLogs: number;
  criticalCount: number;
  successCount: number;
  blockedCount: number;
  filterLevel: ThreatLevel | null;
  filterStatus: AttackStatus | null;
}

// 如果有要在 script 裡面用到 props，才會需要宣告一個 props 變數
// const props = defineProps<Props>();
// 但如果沒有要在 script 裡面用到 props，就不用宣告一個 props 變數
// 只需要在 template 裡面用到 props 就可以了
defineProps<Props>();

// 定義 emits
const emit = defineEmits<{
  filterByLevel: [level: ThreatLevel];
  filterByStatus: [status: AttackStatus];
  clearFilters: [];
}>();
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <StatCard
      title="Total Logs"
      :value="totalLogs"
      color="green"
      @click="emit('clearFilters')"
    />
    <StatCard
      title="Critical Threats"
      :value="criticalCount"
      color="red"
      icon="⚠️"
      @click="emit('filterByLevel', 'CRITICAL')"
      :class="{
        'ring-2 ring-terminal-red': filterLevel === 'CRITICAL',
      }"
    />
    <StatCard
      title="Successful Attacks"
      :value="successCount"
      color="red"
      icon="🚨"
      @click="emit('filterByStatus', 'SUCCESS')"
      :class="{
        'ring-2 ring-terminal-red': filterStatus === 'SUCCESS',
      }"
    />
    <StatCard
      title="Blocked Attacks"
      :value="blockedCount"
      color="blue"
      icon="🛡️"
      @click="emit('filterByStatus', 'BLOCKED')"
      :class="{
        'ring-2 ring-terminal-blue': filterStatus === 'BLOCKED',
      }"
    />
  </div>
</template>
