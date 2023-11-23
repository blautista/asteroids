import { Vector2D } from "../Vector.ts";

export abstract class Shape {
  position: Vector2D;

  protected constructor(initialPosition: Vector2D) {
    this.position = initialPosition;
  }

  /**
   * Moves the shape position by a given amount
   */
  move(by: Vector2D) {
    this.position = this.position.sum(by);
  }

  getPosition() {
    return this.position;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract collidesWith(shape: Shape): boolean;
}
