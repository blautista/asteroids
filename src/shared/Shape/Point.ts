import { Shape } from "./Shape.ts";
import { ConvexPolygon } from "./ConvexPolygon.ts";

export class Point extends Shape {
  collidesWith(shape: Shape) {
    if (shape instanceof Point) {
      return shape.position.equals(this.position);
    }

    if (shape instanceof ConvexPolygon) {
      let collision = false;
      const points = shape.getPointsRelativeToPosition();
      const { x, y } = this.position;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[i + 1] ?? points[0];

        if (
          ((p1.y >= y && p2.y < y) || (p1.y < y && p2.y >= y)) &&
          x < ((p2.x - p1.x) * (y - p1.y)) / (p2.y - p1.y) + p1.x
        ) {
          collision = !collision;
        }
      }

      return collision;
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillRect(this.position.x, this.position.y, 1, 1);
  }
}
