import { CanvasRenderer } from "./shared/CanvasRenderer.ts";
import { Player } from "./Player.ts";

export class Game {
  private canvasRenderer: CanvasRenderer;
  private player = new Player(400, 400);
  private lastTimestamp = 0;
  private frameId: null | number = null;

  constructor(parent: HTMLElement) {
    this.canvasRenderer = new CanvasRenderer(parent);
  }

  loop(timestamp: number) {
    const ctx = this.canvasRenderer.getContext();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, 1024, 768);
    this.player.update(timestamp - this.lastTimestamp);
    this.player.draw(ctx);
    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
    this.lastTimestamp = timestamp;
  }

  start() {
    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
    }
  }
}
