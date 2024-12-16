<script setup lang="ts">
import { CircularProgressBar } from './components/CircularProgressBar.ts';
import { Application } from 'pixi.js';

const app = new Application();

// 使用异步函数初始化 PixiJS 应用
const initPixi = async () => {
  await app.init({
    width: 640,
    height: 360,
    backgroundColor: 0x000000,
    antialias: true,
    resolution: 1,
    autoDensity: true,
    powerPreference: 'high-performance',
  }); // 确保调用 init 方法
  document.body.appendChild(app.canvas);
};

// 调用初始化函数
initPixi();

// 创建进度条
const args = {
  backgroundColor: '#3d3d3d',
  fillColor: '#00b1dd',
  radius: 50,
  lineWidth: 5,
  backgroundAlpha: 0.5,
  fillAlpha: 0.8,
  animate: false,
  glowColor: '#00b1dd',
  glowSize: 15,
  glowBlur: 0.6,
};
const progressBar = new CircularProgressBar(args);

progressBar.x = 320;
progressBar.y = 180;

// 从服务器获取当前时间和结束时间
const fetchServerTime = async () => {
  // const response = await fetch('https://your-server.com/api/time');
  // const data = await response.json();
  return {
    currentTime: new Date('2024-12-16 16:42:00').getTime(),
    endTime: new Date('2024-12-16 16:50:00').getTime(),
  };
};

const startCountdown = async () => {
  const { currentTime, endTime } = await fetchServerTime();
  const countdownDuration = 10 * 60 * 1000; // 10分钟倒计时
  
  // 计算初始时间偏移量（服务器时间和本地时间的差值）
  const timeOffset = Date.now() - currentTime;

  const countdownInterval = setInterval(() => {
    // 使用服务器时间（本地时间减去偏移量）
    const now = Date.now() - timeOffset;
    const remaining = Math.max(0, endTime - now);

    if (remaining <= 0) {
      clearInterval(countdownInterval);
      progressBar.progress = 0;
      return;
    }

    // 更新圆形进度
    const progress = (remaining / countdownDuration) * 100;
    progressBar.progress = progress;
  }, 1000);
};

startCountdown();

app.stage.addChild(progressBar);
</script>

<template>
</template>

<style>
body {
  background-color: #000;
}
</style>
