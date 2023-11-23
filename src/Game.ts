import { CanvasRenderer } from "./shared/CanvasRenderer.ts";
import { Player } from "./Player.ts";
import { Asteroid } from "./Asteroid.ts";
import { Vector2D } from "./shared/Vector.ts";

export class Game {
  private canvasRenderer: CanvasRenderer;
  private player = new Player(new Vector2D(400, 400));
  private asteroids = new Set<Asteroid>();
  private lastTimestamp = 0;
  private frameId: null | number = null;

  constructor(parent: HTMLElement) {
    this.canvasRenderer = new CanvasRenderer(parent);
  }

  drawBackground() {
    const ctx = this.canvasRenderer.getContext();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, this.canvasRenderer.width, this.canvasRenderer.height);
  }

  loop(timestamp: number) {
    const ctx = this.canvasRenderer.getContext();

    this.drawBackground();
    const delta = timestamp - this.lastTimestamp;

    this.player.update(delta);
    this.player.draw(ctx);

    for (const bullet of this.player.bullets) {
      let collided = false;
      bullet.update(delta);

      for (const asteroid of this.asteroids) {
        if (bullet.collidesWith(asteroid)) {
          this.player.bullets.delete(bullet);
          this.asteroids.delete(asteroid);
          this.player.onAsteroidDestroyed();
          collided = true;
          break;
        }
      }

      if (!collided) {
        bullet.draw(ctx);
      }
    }

    for (const asteroid of this.asteroids) {
      asteroid.update(delta);

      if (asteroid.collidesWith(this.player)) {
        this.player.onAsteroidCollision();
        this.asteroids.delete(asteroid);
        continue;
      }

      asteroid.draw(ctx);
    }

    if (this.asteroids.size === 0) {
      this.initAsteroids();
    }

    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
    this.lastTimestamp = timestamp;
  }

  initAsteroids() {
    for (let i = 0; i < 10; i++) {
      this.asteroids.add(
        Asteroid.createFromEdge(this.canvasRenderer.width, this.canvasRenderer.height),
      );
    }
  }

  start() {
    this.initAsteroids();
    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
    }
  }
}
