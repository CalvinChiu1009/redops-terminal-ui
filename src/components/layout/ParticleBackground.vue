<!-- src/components/layout/ParticleBackground.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationId: number;

// 粒子設定
const particleCount = 50; // 粒子數量
const particles: Particle[] = [];
const connectionDistance = 150; // 連線距離 (可選)

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // 隨機速度 -0.5 ~ 0.5
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    // 隨機大小 1 ~ 3
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 邊界檢查：碰到邊緣反彈
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 255, 65, 0.4)"; // Terminal Green 半透明
    ctx.fill();
  }
}

const initParticles = (canvas: HTMLCanvasElement) => {
  particles.length = 0; // 清空
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas));
  }
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 清除畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 更新並繪製每個粒子
  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  // (進階) 繪製連線：如果兩個粒子夠近，就畫一條線
  // 為了效能，雙重迴圈要注意數量
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 65, ${0.2 * (1 - distance / connectionDistance)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  animationId = requestAnimationFrame(animate);
};

// 處理視窗大小改變
const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value); // 重置粒子位置
  }
};

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value);
    animate();
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <canvas ref="canvasRef" class="particle-background"></canvas>
</template>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /*放在最底層*/
  pointer-events: none; /* 讓滑鼠事件穿透 */
}
</style>
