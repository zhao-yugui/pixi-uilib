<script setup lang="ts">
import { Application } from 'pixi.js';
import { onMounted } from 'vue';

// #region Pixi Application Init
const app = new Application();

const initPixi = async () => {
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1a1a1a,
    antialias: true,
    resolution: 1,
    autoDensity: true,
    powerPreference: 'high-performance',
  });

  document.body.appendChild(app.canvas);
};

// 将异步操作移到 onMounted 中
onMounted(async () => {
  await initPixi();
});
</script>

<template>
  <div>
    <!-- 这里是一个空的模板，因为我们使用 PixiJS 渲染 -->
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #000;
}
</style>
