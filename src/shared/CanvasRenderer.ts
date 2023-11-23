export class CanvasRenderer {
  private readonly canvas: HTMLCanvasElement;

  constructor(private parent: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.parent.appendChild(this.canvas);
    this.canvas.width = 1024;
    this.canvas.height = 768;
    this.canvas.style.imageRendering = "pixelated";
  }

  getContext() {
    return this.canvas.getContext("2d")!;
  }

  getCanvas() {
    return this.canvas;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}
