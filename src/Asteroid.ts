import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Canvas } from "./shared/Canvas.ts";

const APPEARANCE_OFFSET = 30;

export class Asteroid extends ConvexPolygon implements GameObject2D {
  private readonly vel: Vector2D;

  static createFromEdge(width: number, height: number) {
    const x = Math.random() > 0.5 ? -APPEARANCE_OFFSET : width + APPEARANCE_OFFSET;
    const y = Math.random() * height;

    return new Asteroid(new Vector2D(x, y), Vector2D.fromRandomAngle().multiply(3));
  }

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    public size = 3,
  ) {
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
      size * 10,
    );
    this.vel = velocity;
  }

  update(delta: number, canvas: Canvas): void {
    this.move(this.vel);
    this.position = canvas.warpPositionAround(this.position);
  }
}
