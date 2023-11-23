import { Keyboard } from "./shared/Keyboard.ts";
import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Bullet } from "./Bullet.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";

export class Player extends ConvexPolygon implements GameObject2D {
  private vel = new Vector2D(0, 0);
  private acc = new Vector2D(0, 0);
  health = 5;
  score = 0;
  bullets = new Set<Bullet>();

  constructor(initialPosition: Vector2D) {
    super(
      initialPosition,
      [
        [2, 0],
        [-2, 1],
        [-2, -1],
      ],
      10,
    );
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
      new Bullet(this.getShipTip(), this.vel.sum(Vector2D.fromAngle(this.heading).multiply(5))),
    );
    this.isShotCoolingDown = true;

    window.setTimeout(this.resetBulletCooldown.bind(this), this.bulletCooldown);
  }

  update(delta: number) {
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

    if (this.position.x < 0) {
      this.position = new Vector2D(1024, this.position.y);
    } else if (this.position.x > 1024) {
      this.position = new Vector2D(0, this.position.y);
    }

    if (this.position.y < 0) {
      this.position = new Vector2D(this.position.x, 768);
    } else if (this.position.y > 768) {
      this.position = new Vector2D(this.position.x, 0);
    }
  }

  onAsteroidCollision() {
    this.health--;
    console.log("hit! ", this.health);
  }

  onAsteroidDestroyed() {
    this.score++;
    console.log("scored! ", this.score);
  }
}
