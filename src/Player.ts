import { Keyboard } from "./shared/Keyboard.ts";
import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { Vector2D } from "./shared/Vector.ts";

export class Player {
  private v = new Vector2D(0, 0);
  private a = new Vector2D(0, 0);

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

    this.a = Vector2D.fromAngle(heading).setMagnitude(accPerSec * (timestamp / 1000));
  }

  update(timestamp: number) {
    if (Keyboard.getIsKeyPressed("KeyW")) {
      this.accelerateForward(timestamp);
    } else {
      this.a = Vector2D.zero();
    }

    if (Keyboard.getIsKeyPressed("KeyD")) {
      this.turnRight();
    }

    if (Keyboard.getIsKeyPressed("KeyA")) {
      this.turnLeft();
    }

    this.v.sum(this.a);
    this.polygon.getPosition().sum(this.v);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.polygon.draw(ctx);
  }

  collidesWith(polygon: ConvexPolygon) {
    return this.polygon.collidesWith(polygon);
  }
}
