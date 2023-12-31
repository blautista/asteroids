import { ConvexPolygon } from "./shared/Shape/ConvexPolygon.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Vector2D } from "./shared/Vector.ts";
import { Canvas } from "./shared/Canvas.ts";

export class Asteroid extends ConvexPolygon implements GameObject2D {
  private readonly vel: Vector2D;

  static createFromEdge(canvas: Canvas) {
    return new Asteroid(canvas.randomPointInEdge(), Vector2D.fromRandomAngle().multiply(1));
  }

  static readonly scoresBySize = {
    1: 100,
    2: 50,
    3: 20,
  };

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

  score() {
    return Asteroid.scoresBySize[this.size as keyof typeof Asteroid.scoresBySize];
  }
}
