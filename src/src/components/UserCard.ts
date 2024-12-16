import { Container, Sprite, Text, TextStyle, Graphics } from 'pixi.js';
import type { ColorSource, Texture } from 'pixi.js';

export type UserCardOptions = {
  username: string;
  password: string;
  avatar?: Texture;
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
  private avatarSprite?: Sprite;
  private statusIndicator: Graphics;
  private usernameText: Text;
  private passwordText: Text;

  constructor(options: UserCardOptions) {
    super();

    const {
      width = 200,
      height = 100,
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
    this.avatarContainer.position.set(20, height / 2);
    this.addChild(this.avatarContainer);

    // 创建头像圆形遮罩
    const avatarRadius = 25;
    this.avatarCircle = new Graphics()
      .circle(0, 0, avatarRadius)
      .fill("#cccccc");

    this.avatarContainer.addChild(this.avatarCircle);

    // 如果有头像，添加头像
    if (options.avatar) {
      this.avatarSprite = new Sprite(options.avatar);
      this.avatarSprite.width = avatarRadius * 2;
      this.avatarSprite.height = avatarRadius * 2;
      this.avatarSprite.anchor.set(0.5);
      this.avatarContainer.addChild(this.avatarSprite);
    }

    // 创建状态指示器
    this.statusIndicator = new Graphics();
    this.updateStatus(isOnline);
    this.statusIndicator.position.set(40, -15);
    this.avatarContainer.addChild(this.statusIndicator);

    // 创建文本样式
    const textStyle = new TextStyle({
      fontSize: 16,
      fill: textColor,
      fontFamily: 'Arial'
    });

    // 创建用户名文本
    this.usernameText = new Text({
      text: options.username,
      style: textStyle
    });
    this.usernameText.position.set(60, 20);
    this.addChild(this.usernameText);

    // 创建密码文本
    this.passwordText = new Text({
      text: '••••••••',
      style: textStyle
    });
    this.passwordText.position.set(60, 50);
    this.addChild(this.passwordText);
  }

  updateStatus(isOnline: boolean) {
    this.statusIndicator.clear();
    this.statusIndicator
      .circle(0, 0, 5)
      .fill(isOnline ? "#2ecc71" : "#e74c3c");
  }
}
