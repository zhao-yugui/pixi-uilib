import { Container, Sprite, Text, TextStyle, Graphics, Assets } from 'pixi.js';
import type { ColorSource, Texture } from 'pixi.js';


export type UserCardOptions = {
  username: string;
  password: string;
  avatarUrl?: string;
  isOnline?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: ColorSource;
  textColor?: ColorSource;
};

export class UserCard extends Container {
  private background: Graphics;
  private avatarContainer: Container;
  private avatarCircle: Graphics;
  private avatarSprite: Sprite;
  private statusIndicator: Graphics;
  private usernameText: Text;

  // 直接使用预先计算好的 base64 字符串
  private static readonly DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjE5M2IwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzZkZDVlZDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwLCAzMCkiIGZpbGw9IndoaXRlIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIzMCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOSIvPjxwYXRoIGQ9Ik0xMDAgMTEwQzEwMCA4MyA3NyA3MCA1MCA3MEMyMyA3MCAwIDgzIDAgMTEwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIwIiBvcGFjaXR5PSIwLjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=';

  private static defaultAvatarTexture?: Texture;

  // 添加一个处理用户名的辅助方法
  private static truncateUsername(username: string, maxLength: number = 8): string {
    if (username.length <= maxLength) {
      return username;
    }
    return username.slice(0, maxLength) + '...';
  }

  constructor(options: UserCardOptions) {
    super();

    const {
      width = 260,
      height = 80,
      backgroundColor = "#2c3e50",
      textColor = "#ffffff",
      isOnline = false
    } = options;

    // 创建背景
    this.background = new Graphics()
      .roundRect(0, 0, width, height, 10)
      .fill(backgroundColor);
    this.addChild(this.background);

    // 创建头像容器
    this.avatarContainer = new Container();
    this.avatarContainer.position.set(50, height / 2);
    this.addChild(this.avatarContainer);

    // 创建头像圆形遮罩
    const avatarRadius = 25;
    this.avatarCircle = new Graphics()
      .circle(0, 0, avatarRadius)
      .fill("#cccccc");

    // 创建头像精灵（初始为默认头像）
    this.avatarSprite = new Sprite();
    this.avatarSprite.width = avatarRadius * 2;
    this.avatarSprite.height = avatarRadius * 2;
    this.avatarSprite.anchor.set(0.5);

    // 设置头像遮罩
    const mask = new Graphics()
      .circle(0, 0, avatarRadius)
      .fill();
    this.avatarContainer.addChild(mask);
    this.avatarSprite.mask = mask;

    this.avatarContainer.addChild(this.avatarSprite);

    // 加载头像
    this.loadAvatar(options.avatarUrl);

    // 创建状态指示器
    this.statusIndicator = new Graphics();
    this.updateStatus(isOnline);
    this.statusIndicator.position.set(40, 0);
    this.avatarContainer.addChild(this.statusIndicator);

    // 创建文本样式
    const textStyle = new TextStyle({
      fontSize: 16,
      fill: textColor,
      fontFamily: 'Arial'
    });

    // 创建用户名文本（使用截断后的用户名）
    this.usernameText = new Text({
      text: UserCard.truncateUsername(options.username),
      style: textStyle
    });
    this.usernameText.position.set(110, 32);
    this.addChild(this.usernameText);
  }

  private async loadAvatar(url?: string) {
    try {
      let texture: Texture;

      if (url) {
        // 加载在线头像
        texture = await Assets.load({
          src: url,
          loadParser: 'loadTextures'
        });
      } else {
        // 使用默认头像
        if (!UserCard.defaultAvatarTexture) {
          UserCard.defaultAvatarTexture = await Assets.load(UserCard.DEFAULT_AVATAR);
        }
        texture = UserCard.defaultAvatarTexture as Texture;
      }

      this.avatarSprite.texture = texture;
    } catch (error) {
      console.error('加载头像失败:', error);
      // 加载失败时使用默认头像
      if (!UserCard.defaultAvatarTexture) {
        UserCard.defaultAvatarTexture = await Assets.load(UserCard.DEFAULT_AVATAR);
      }
      this.avatarSprite.texture = UserCard.defaultAvatarTexture as Texture;
    }
  }

  updateStatus(isOnline: boolean) {
    this.statusIndicator.clear();
    this.statusIndicator
      .circle(0, 0, 5)
      .fill(isOnline ? "#2ecc71" : "#e74c3c");
  }

  // 提供更新头像的方法
  async updateAvatar(url: string) {
    await this.loadAvatar(url);
  }
}
