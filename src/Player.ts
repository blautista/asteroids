import { Keyboard } from "./shared/Keyboard.ts";
import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Bullet } from "./Bullet.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Canvas } from "./shared/Canvas.ts";
import { Asteroid } from "./Asteroid.ts";

const playerPoints = [
  [2, 0],
  [-2, 1],
  [-2, -1],
] as [number, number][];

function createPlayerPolygon(initialPosition: Vector2D) {
  return new ConvexPolygon(initialPosition, playerPoints, 10);
}

export class Player extends ConvexPolygon implements GameObject2D {
  private vel = new Vector2D(0, 0);
  private acc = new Vector2D(0, 0);
  health = 5;
  score = 0;
  bullets = new Set<Bullet>();

  static createFromCentre(canvas: Canvas) {
    return new Player(canvas.getCentrePoint());
  }

  constructor(initialPosition: Vector2D) {
    super(initialPosition, playerPoints, 10);
  }

  turnRight() {
    this.rotate(Math.PI / 32);
  }

  turnLeft() {
    this.rotate(-Math.PI / 32);
  }

  accelerateForward(timestamp: number) {
    const accPerSec = 3;

    this.acc = Vector2D.fromAngle(this.heading).setMagnitude(accPerSec * (timestamp / 1000));
  }

  getShipTip() {
    return this.getVertex(0);
  }

  private readonly bulletCooldown = 200;
  private isShotCoolingDown = false;

  private resetBulletCooldown() {
    this.isShotCoolingDown = false;
  }

  shoot() {
    if (this.isShotCoolingDown) return;

    this.bullets.add(
      new Bullet(
        this.getShipTip(),
        this.vel.sum(Vector2D.fromAngle(this.heading).multiply(5)),
        (bullet) => {
          this.bullets.delete(bullet);
        },
      ),
    );
    this.isShotCoolingDown = true;

    window.setTimeout(this.resetBulletCooldown.bind(this), this.bulletCooldown);
  }

  update(delta: number, canvas: Canvas) {
    if (Keyboard.getIsKeyPressed("Space")) {
      this.shoot();
    }

    if (Keyboard.getIsKeyPressed("KeyW")) {
      this.accelerateForward(delta);
    } else {
      this.acc = Vector2D.zero();
    }

    if (Keyboard.getIsKeyPressed("KeyD")) {
      this.turnRight();
    }

    if (Keyboard.getIsKeyPressed("KeyA")) {
      this.turnLeft();
    }

    this.vel = this.vel.sum(this.acc);
    this.move(this.vel);
    this.position = canvas.warpPositionAround(this.position);
  }

  onAsteroidCollision() {
    this.health--;
    console.log("hit! ", this.health);
  }

  onAsteroidDestroyed(asteroid: Asteroid) {
    this.addScore(asteroid.score());
  }

  drawHealth(ctx: CanvasRenderingContext2D) {
    const leftOffset = 200;

    for (let i = 0; i < this.health; i++) {
      const polygon = createPlayerPolygon(new Vector2D(i * 24 + leftOffset, 100));
      polygon.rotate(-Math.PI / 2);
      polygon.draw(ctx);
    }
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    const leftOffset = 200;

    ctx.font = "40px monospace";
    ctx.strokeText(String(this.score), leftOffset, 40);
  }

  addScore(amount: number) {
    this.score += amount;
  }

  resetScore() {
    this.score = 0;
  }
}
