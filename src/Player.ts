import { Keyboard } from "./shared/Keyboard.ts";
import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Bullet } from "./Bullet.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";

export class Player implements GameObject2D {
  private vel = new Vector2D(0, 0);
  private acc = new Vector2D(0, 0);
  bullets = new Set<Bullet>();

  private readonly polygon: ConvexPolygon;

  constructor(x: number, y: number) {
    this.polygon = new ConvexPolygon(
      x,
      y,
      [
        [2, 0],
        [-2, 1],
        [-2, -1],
      ],
      10,
    );
  }

  turnRight() {
    this.polygon.changeHeading(Math.PI / 32);
  }

  turnLeft() {
    this.polygon.changeHeading(-Math.PI / 32);
  }

  accelerateForward(timestamp: number) {
    const accPerSec = 3;
    const heading = this.polygon.getHeading();

    this.acc = Vector2D.fromAngle(heading).setMagnitude(accPerSec * (timestamp / 1000));
  }

  getShipTip() {
    return this.polygon.getVertex(0);
  }

  private readonly bulletCooldown = 700;
  private isShotCoolingDown = false;

  private resetBulletCooldown() {
    this.isShotCoolingDown = false;
  }

  shoot() {
    if (this.isShotCoolingDown) return;

    this.bullets.add(
      new Bullet(
        this.getShipTip(),
        this.vel.sum(Vector2D.fromAngle(this.polygon.getHeading()).multiply(5)),
      ),
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
    this.polygon.move(this.vel);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.polygon.draw(ctx);
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw(ctx);
    });
  }

  collidesWith(polygon: ConvexPolygon) {
    return this.polygon.collidesWith(polygon);
  }
}
