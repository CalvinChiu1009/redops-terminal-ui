import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { AttackLog } from "../types/attack"; // 雖然 AttackLog 是一個 interface，但 Pinia 仍然需要知道它的型別

export const useAttackStore = defineStore("attack", () => {
  // State
  const logs = ref<AttackLog[]>([]);

  // Getters
  const totalLogs = computed(() => logs.value.length);

  const criticalCount = computed(
    () => logs.value.filter((log) => log.level === "CRITICAL").length,
  );

  const warningCount = computed(
    () => logs.value.filter((log) => log.level === "WARNING").length,
  );

  const infoCount = computed(
    () => logs.value.filter((log) => log.level === "INFO").length,
  );

  const blockedCount = computed(
    () => logs.value.filter((log) => log.status === "BLOCKED").length,
  );

  const successCount = computed(
    () => logs.value.filter((log) => log.status === "SUCCESS").length,
  );

  const pendingCount = computed(
    () => logs.value.filter((log) => log.status === "PENDING").length,
  );

  // Actions
  const addLog = (log: AttackLog) => {
    logs.value.push(log);
  };

  const clearLogs = () => {
    logs.value = [];
  };

  return {
    logs,
    totalLogs,
    criticalCount,
    warningCount,
    infoCount,
    blockedCount,
    successCount,
    pendingCount,
    addLog,
    clearLogs,
  };
});
