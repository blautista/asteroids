import { Vector2D } from "./Vector.ts";

export class Canvas {
  readonly canvas: HTMLCanvasElement;

  constructor(private parent: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.parent.appendChild(this.canvas);
    this.canvas.width = 1024;
    this.canvas.height = 768;
    this.canvas.style.imageRendering = "pixelated";
  }

  get context() {
    return this.canvas.getContext("2d")!;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  warpPositionAround(position: Vector2D): Vector2D {
    const { width, height } = this;
    let x = position.x;
    let y = position.y;

    if (position.x < 0) {
      x = width + position.x;
    } else if (position.x > width) {
      x = position.x - width;
    }

    if (position.y < 0) {
      y = height + position.y;
    } else if (position.y > height) {
      y = position.y - height;
    }

    return new Vector2D(x, y);
  }
}
