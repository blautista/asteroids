import { Vector2D } from "../Vector.ts";

export abstract class Shape {
  protected position: Vector2D;

  protected constructor(x: number, y: number) {
    this.position = new Vector2D(x, y);
  }

  getPosition() {
    return this.position;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract collidesWith(shape: Shape): boolean;
}
