<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  color?: "red" | "green" | "blue" | "yellow";
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "green",
});

// 定義 emits
defineEmits<{
  click: [];
}>();

// 根據顏色決定樣式
const colorClasses = {
  red: {
    border: "border-terminal-red",
    text: "text-terminal-red",
    bg: "bg-terminal-red/10",
  },
  green: {
    border: "border-terminal-green",
    text: "text-terminal-green",
    bg: "bg-terminal-green/10",
  },
  blue: {
    border: "border-terminal-blue",
    text: "text-terminal-blue",
    bg: "bg-terminal-blue/10",
  },
  yellow: {
    border: "border-terminal-yellow",
    text: "text-terminal-yellow",
    bg: "bg-terminal-yellow/10",
  },
};

const currentColor = colorClasses[props.color];
</script>

<template>
  <div
    class="rounded p-4 border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
    :class="[currentColor.border, currentColor.bg]"
    @click="$emit('click')"
  >
    <!-- 標題 -->
    <div class="text-sm text-terminal-yellow mb-2 font-mono">
      {{ title }}
    </div>

    <!-- 數值 -->
    <div
      :key="value"
      class="text-4xl font-bold font-mono countup"
      :class="currentColor.text"
    >
      {{ value.toLocaleString() }}
    </div>

    <!-- 圖示（可選） -->
    <div v-if="icon" class="mt-2 text-xs opacity-60">
      {{ icon }}
    </div>
  </div>
</template>

<style scoped></style>
