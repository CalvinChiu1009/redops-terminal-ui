<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAttackStore } from "@/stores/attackStore";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useAttackStore();
const { safeMode, logs } = storeToRefs(store);
const { toggleSafeMode, addLog, clearLogs } = store;

// XSS Test: 插入一個包含 XSS 攻擊的 log
// XSS Test: 插入一個包含 XSS 攻擊的 log
function injectXSSTest() {
  addLog({
    id: `xss-test-${Date.now()}`, // ✅ 添加唯一的 id
    timestamp: Date.now(), // ✅ 使用 number 型別
    level: "CRITICAL",
    source_ip: "192.168.1.100",
    target_port: 443,
    payload: "<”script>alert('XSS Test')<" + "/script>",
    status: "PENDING",
  });

  router.push("/logs");
}

// Clear all logs
function handleClearLogs() {
  if (confirm("Are you sure you want to clear all logs?")) {
    clearLogs();
  }
}
</script>

<template>
  <div class="h-full overflow-y-auto p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-terminal-green mb-2">⚙️ Settings</h1>
      <p class="text-terminal-green/70">
        Configure security and performance options
      </p>
    </div>

    <!-- Security Settings Section -->
    <div class="mb-8">
      <h2
        class="text-xl font-semibold text-terminal-blue mb-4 border-b border-terminal-blue/30 pb-2"
      >
        🔐 Security Settings
      </h2>

      <!-- Safe Mode Toggle -->
      <div
        class="bg-terminal-dark/50 border border-terminal-green/30 rounded-lg p-6 mb-4 hover:border-terminal-green/50 transition-all"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold text-terminal-green mb-2">
              Safe Mode
            </h3>
            <p class="text-terminal-green/70 text-sm mb-2">
              When enabled, all payloads are sanitized using DOMPurify to
              prevent XSS attacks.
            </p>
            <p class="text-terminal-yellow/70 text-xs">
              ⚠️ Disable only for testing purposes in a safe environment.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="text-sm font-mono"
              :class="safeMode ? 'text-terminal-green' : 'text-terminal-yellow'"
            >
              {{ safeMode ? "ON" : "OFF" }}
            </span>
            <button
              @click="toggleSafeMode"
              class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-2 focus:ring-offset-terminal-dark"
              :class="safeMode ? 'bg-terminal-green' : 'bg-gray-600'"
            >
              <span
                class="inline-block h-6 w-6 transform rounded-full bg-white transition-transform"
                :class="safeMode ? 'translate-x-7' : 'translate-x-1'"
              />
            </button>
          </div>
        </div>

        <!-- Status Indicator -->
        <div
          class="flex items-center gap-2 p-3 rounded border"
          :class="
            safeMode
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
          "
        >
          <span class="text-xl">{{ safeMode ? "🔒" : "🔓" }}</span>
          <span class="text-sm font-mono">
            {{
              safeMode
                ? "All payloads are being sanitized"
                : "Raw payloads are displayed (for testing only)"
            }}
          </span>
        </div>
      </div>

      <!-- XSS Test Button -->
      <div
        class="bg-terminal-dark/50 border border-terminal-red/30 rounded-lg p-6 hover:border-terminal-red/50 transition-all"
      >
        <h3 class="text-lg font-semibold text-terminal-red mb-2">
          XSS Test Payload
        </h3>
        <p class="text-terminal-green/70 text-sm mb-4">
          Inject a test XSS payload to verify Safe Mode functionality. The
          payload will appear in the Logs view.
        </p>
        <button
          @click="injectXSSTest"
          class="px-4 py-2 bg-terminal-red/20 border border-terminal-red text-terminal-red rounded hover:bg-terminal-red/30 transition-all font-mono text-sm"
        >
          💉 Inject XSS Test
        </button>
        <p class="text-terminal-yellow/50 text-xs mt-2">
          Test payload:
          <code class="bg-black/30 px-2 py-1 rounded"
            >&lt;script&gt;alert("XSS Test")&lt;/script&gt;</code
          >
        </p>
      </div>
    </div>

    <!-- Data Management Section -->
    <div class="mb-8">
      <h2
        class="text-xl font-semibold text-terminal-blue mb-4 border-b border-terminal-blue/30 pb-2"
      >
        📊 Data Management
      </h2>

      <!-- Clear Logs -->
      <div
        class="bg-terminal-dark/50 border border-terminal-yellow/30 rounded-lg p-6 hover:border-terminal-yellow/50 transition-all"
      >
        <h3 class="text-lg font-semibold text-terminal-yellow mb-2">
          Clear All Logs
        </h3>
        <p class="text-terminal-green/70 text-sm mb-4">
          Remove all attack logs from the system. This action cannot be undone.
        </p>
        <div class="flex items-center gap-4">
          <button
            @click="handleClearLogs"
            class="px-4 py-2 bg-terminal-yellow/20 border border-terminal-yellow text-terminal-yellow rounded hover:bg-terminal-yellow/30 transition-all font-mono text-sm"
          >
            🗑️ Clear All Logs
          </button>
          <span class="text-terminal-green/50 text-sm">
            Current logs:
            <span class="font-mono font-bold">{{ logs.length }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Performance Settings Section (Placeholder for Phase 5B) -->
    <div class="mb-8">
      <h2
        class="text-xl font-semibold text-terminal-blue mb-4 border-b border-terminal-blue/30 pb-2"
      >
        ⚡ Performance Settings
      </h2>
      <div
        class="bg-terminal-dark/50 border border-terminal-green/30 rounded-lg p-6 opacity-50"
      >
        <h3 class="text-lg font-semibold text-terminal-green mb-2">
          Performance Monitoring
        </h3>
        <p class="text-terminal-green/70 text-sm mb-4">
          Configure FPS monitoring, memory tracking, and render performance
          metrics.
        </p>
        <p class="text-terminal-yellow/70 text-xs italic">
          🚧 Coming in Phase 5B: Performance Monitoring
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
