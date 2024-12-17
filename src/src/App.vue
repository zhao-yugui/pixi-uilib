<script setup lang="ts">
import { Application } from 'pixi.js';
import { UserList } from './components/UserList';
import { onMounted } from 'vue';

// #region Pixi Application Init
const app = new Application();
let userList: UserList;

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

  // 创建用户列表
  userList = new UserList();
  userList.position.set(50, 50);
  app.stage.addChild(userList);

  // 添加示例用户
  const firstCard = userList.addUser({
    username: "用户1用户1用户1用户1用户1用户1用户1用户1用户1",
    password: "password1",
    isOnline: true,
    backgroundColor: "#3498db"
  });

  userList.addUser({
    username: "用户2",
    password: "password2",
    isOnline: false,
    backgroundColor: "#2c3e50"
  });

  // 动态更新头像
  await firstCard.updateAvatar("https://lh3.googleusercontent.com/a/ACg8ocK5XLdBwoGFDSF5soxdp--tR0KmWX0I1UeFRm4ly3wgxSeEPA=s96-c");
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
