import { Canvas } from "./shared/Canvas.ts";
import { Player } from "./Player.ts";
import { Asteroid } from "./Asteroid.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Bullet } from "./Bullet.ts";

export class Game {
  private canvas: Canvas;
  private player: Player;
  private asteroids = new Set<Asteroid>();
  private lastTimestamp = 0;
  private frameId: null | number = null;

  private createPlayer() {
    return new Player(
      new Vector2D(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2)),
    );
  }

  constructor(parent: HTMLElement) {
    this.canvas = new Canvas(parent);
    this.player = this.createPlayer();
  }

  private drawBackground() {
    const ctx = this.canvas.context;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private handleBulletAsteroidCollision(asteroid: Asteroid, bullet: Bullet) {
    this.player.bullets.delete(bullet);
    this.asteroids.delete(asteroid);
    if (asteroid.size > 1) {
      this.asteroids.add(
        new Asteroid(asteroid.position, Vector2D.fromRandomAngle(), asteroid.size - 1),
      );
      this.asteroids.add(
        new Asteroid(asteroid.position, Vector2D.fromRandomAngle(), asteroid.size - 1),
      );
    }
    this.player.onAsteroidDestroyed(asteroid);
  }

  private updatePlayerBullets(delta: number) {
    for (const bullet of this.player.bullets) {
      let collided = false;
      bullet.update(delta, this.canvas);

      for (const asteroid of this.asteroids) {
        if (bullet.collidesWith(asteroid)) {
          this.handleBulletAsteroidCollision(asteroid, bullet);
          collided = true;
          break;
        }
      }

      if (!collided) {
        bullet.draw(this.canvas.context);
      }
    }
  }

  private updateAsteroids(delta: number) {
    for (const asteroid of this.asteroids) {
      asteroid.update(delta, this.canvas);

      if (asteroid.collidesWith(this.player)) {
        this.player.onAsteroidCollision();
        this.asteroids.delete(asteroid);
        continue;
      }

      asteroid.draw(this.canvas.context);
    }
  }

  private loop(timestamp: number) {
    this.drawBackground();
    const delta = timestamp - this.lastTimestamp;

    this.player.update(delta, this.canvas);

    this.updatePlayerBullets(delta);
    this.updateAsteroids(delta);

    if (this.asteroids.size === 0) {
      this.initAsteroids();
    }

    this.player.drawHealth(this.canvas.context);
    this.player.drawScore(this.canvas.context);
    this.player.draw(this.canvas.context);

    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
    this.lastTimestamp = timestamp;
  }

  private initAsteroids() {
    for (let i = 0; i < 10; i++) {
      this.asteroids.add(Asteroid.createFromEdge(this.canvas.width, this.canvas.height));
    }
  }

  private initLevel() {
    this.player = this.createPlayer();
    this.initAsteroids();
  }

  start() {
    this.initLevel();
    this.frameId = window.requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
    }
  }
}
