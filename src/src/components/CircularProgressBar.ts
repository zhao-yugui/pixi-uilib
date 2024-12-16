import type { ColorSource } from 'pixi.js';
import { Container, DEG_TO_RAD, Graphics, BlurFilter, Color } from 'pixi.js';

export type MaskedProgressBarOptions = {
  backgroundColor?: ColorSource;
  fillColor: ColorSource;
  lineWidth: number;
  radius: number;
  value?: number;
  backgroundAlpha?: number;
  fillAlpha?: number;
  glowColor?: ColorSource;
  glowSize?: number;
  glowBlur?: number;
};

/**
 * Creates a Circular ProgressBar.
 * @example
 * const progressBar = new CircularProgressBar({
 *    backgroundColor: 0x000000,
 *    backgroundAlpha: 0.5,
 *    lineWidth: 10,
 *    fillColor: 0xFFFFFF,
 *    radius: 50,
 *    value: 50,
 *    cap: 'round'
 * });
 *
 * progressBar.progress = 100;
 */
export class CircularProgressBar extends Container {
  private _progress = 0;
  private options: MaskedProgressBarOptions;

  private bgCircle = new Graphics();
  private fillCircle = new Graphics();
  private glowCircle = new Graphics();

  /** Container, that holds all inner views. */
  innerView = new Container();

  /**
   * Creates a Circular ProgressBar.
   * @param { number } options - Options object to use.
   * @param { ColorSource } options.backgroundColor - Background color.
   * @param { ColorSource } options.fillColor - Fill color.
   * @param { number } options.lineWidth - Line width.
   * @param { number } options.radius - Radius.
   * @param { number } options.value - Progress value.
   * @param { number } options.backgroundAlpha - Background alpha.
   * @param { number } options.fillAlpha - Fill alpha.
   * @param { 'butt' | 'round' | 'square' } options.cap - Line cap.
   * @param { number } options.glowSize - Glow size.
   * @param { ColorSource } options.glowColor - Glow color.
   * @param { number } options.glowBlur - Glow blur.
   */
  constructor(options: MaskedProgressBarOptions) {
    super();

    this.options = {
      glowColor: options.fillColor,
      glowSize: options.glowSize,
      glowBlur: options.glowBlur,
      ...options
    };

    this.addChild(this.innerView);

    this.innerView.addChild(this.glowCircle);
    this.innerView.addChild(this.bgCircle, this.fillCircle);

    const blurFilter = new BlurFilter({
      quality: 10,
    });
    this.glowCircle.filters = [blurFilter];

    this.addBackground();
    this.addGlow();

    if (options.value) {
      this.progress = options.value;
    }
  }

  private addBackground() {
    const { backgroundColor, lineWidth, radius, backgroundAlpha } = this.options;

    let alpha = 1;

    if (backgroundAlpha && backgroundAlpha > 0) {
      alpha = backgroundAlpha;
    }

    if (backgroundColor === undefined) {
      alpha = 0.000001;
    }

    this.bgCircle.circle(0, 0, radius).stroke({
      width: lineWidth,
      color: backgroundColor,
      alpha,
    });
  }

  private addGlow() {
    const { radius, lineWidth, glowColor, glowSize, glowBlur } = this.options;

    this.glowCircle
      .circle(0, 0, radius)
      .stroke({
        width: glowSize ? glowSize : lineWidth * 1.5,
        color: glowColor,
        alpha: glowBlur ? glowBlur : 0.5
      });
  }

  private updateGlowColor(progress: number) {
    const { radius, lineWidth, glowSize, glowBlur, glowColor } = this.options;

    // 从蓝色 (#00b1dd) 渐变到红色 (#ff0000)
    const startColor = new Color(glowColor);
    const endColor = new Color('#ff0000');

    // 根据进度计算颜色
    const r = startColor.red + (endColor.red - startColor.red) * (1 - progress / 100);
    const g = startColor.green + (endColor.green - startColor.green) * (1 - progress / 100);
    const b = startColor.blue + (endColor.blue - startColor.blue) * (1 - progress / 100);

    const currentColor = new Color([r, g, b]);

    this.glowCircle
      .clear()
      .circle(0, 0, radius)
      .stroke({
        width: glowSize ? glowSize : lineWidth * 1.5,
        color: currentColor.toNumber(),
        alpha: glowBlur ? glowBlur : 0.8
      });
  }

  /**
   * Set progress value.
   * @param { number } value - Progress value.
   */
  set progress(value: number) {
    if (value > 100) {
      value = 100;
    }

    if (value < 0) {
      value = 0;
    }

    this._progress = value;

    const { lineWidth, radius, fillColor, fillAlpha } = this.options;

    if (value === 0 && fillAlpha === 0) {
      this.fillCircle.clear();

      return;
    }

    // 更新发光颜色
    this.updateGlowColor(value);

    const startAngle = 0;
    const endAngle = (360 / 100) * value;

    this.fillCircle
      .clear()
      .arc(
        0,
        0,
        radius,
        (0 - 90 + startAngle) * DEG_TO_RAD,
        (0 - 90 + startAngle + endAngle) * DEG_TO_RAD,
      )
      .stroke({
        width: lineWidth,
        color: fillColor,
        cap: 'round',
        alpha: fillAlpha,
      });
  }

  /**
   * Current progress value.
   * @returns { number } - Progress value.
   */
  get progress(): number {
    return this._progress;
  }
}
