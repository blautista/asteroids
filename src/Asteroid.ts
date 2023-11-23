import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Vector2D } from "./shared/Vector.ts";

const APPEARANCE_OFFSET = 30;

export class Asteroid extends ConvexPolygon implements GameObject2D {
  private readonly vel: Vector2D;

  static createFromEdge(width: number, height: number) {
    const x = Math.random() > 0.5 ? -APPEARANCE_OFFSET : width + APPEARANCE_OFFSET;
    const y = Math.random() * height;

    return new Asteroid(new Vector2D(x, y), Vector2D.fromRandomAngle().multiply(3));
  }

  constructor(position: Vector2D, velocity: Vector2D) {
    super(
      position,
      [
        [0, -1],
        [Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)],
        [1, 0],
        [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)],
        [0, 1],
        [-Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)],
        [-1, 0],
        [-Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)],
      ],
      40,
    );
    this.vel = velocity;
  }

  update(delta: number): void {
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
}
