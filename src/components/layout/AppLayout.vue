<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import ParticleBackground from "./ParticleBackground.vue";
import { useUISettings } from "@/composables/useUISettings";

const { showParticles } = useUISettings();
</script>

<template>
  <div
    class="h-screen bg-terminal-bg text-terminal-green scanline-effect flex overflow-hidden relative"
  >
    <!-- 粒子背景 -->
    <Transition name="fade">
      <ParticleBackground v-if="showParticles" />
    </Transition>

    <!-- 左側 -->
    <Sidebar />

    <!-- 右側 -->
    <main class="flex-1 p-4 md:p-8 overflow-y-auto">
      <div class="h-full max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
