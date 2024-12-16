<script setup lang="ts">
import { Application } from 'pixi.js';
import { UserList } from './components/UserList';

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

initPixi();
// #endregion

// 创建用户列表
const userList = new UserList();
userList.position.set(50, 50);
app.stage.addChild(userList);

// 添加示例用户
userList.addUser({
  username: "用户1",
  password: "password1",
  isOnline: true,
  backgroundColor: "#3498db"
});

userList.addUser({
  username: "用户2",
  password: "password2",
  isOnline: false,
  backgroundColor: "#2980b9"
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
