import type { ColorSource } from 'pixi.js';
import { Text, TextStyle } from 'pixi.js';

export type DigitalClockOptions = {
  color?: ColorSource;
  fontSize?: number;
  letterSpacing?: number;
};

export class DigitalClock extends Text {
  private options: DigitalClockOptions;

  constructor(options: DigitalClockOptions = {}) {
    const defaultOptions = {
      color: '#00b1dd',
      fontSize: 48,
      letterSpacing: 2,
    };

    // 合并默认选项和传入的选项
    const finalOptions = { ...defaultOptions, ...options };

    const style = new TextStyle({
      fontFamily: 'Digital',
      fontSize: finalOptions.fontSize,
      fill: finalOptions.color,
      align: 'center',
      fontWeight: 'bold',
      letterSpacing: finalOptions.letterSpacing,
    });

    super({
      text: '00:00',
      style: style
    });

    this.options = finalOptions;
    this.anchor.set(0.5);
  }

  updateTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.text = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // 添加 setter 方法来动态更新颜色
  set color(value: ColorSource) {
    this.style.fill = value;
  }

  get color(): ColorSource {
    return this.style.fill as ColorSource;
  }
} 
