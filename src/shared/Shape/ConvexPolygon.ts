import { Polygon } from "./Polygon.ts";
import { Shape } from "./Shape.ts";

export class ConvexPolygon extends Polygon {
  collidesWith(shape: Shape) {
    if (shape instanceof ConvexPolygon) {
      for (const v of this.getEdgeNormalVectors()) {
        const p1 = this.projection(v);
        const p2 = shape.projection(v);

        if (p1.min > p2.max || p2.min > p1.max) {
          return false;
        }
      }

      for (const v of shape.getEdgeNormalVectors()) {
        const p1 = this.projection(v);
        const p2 = shape.projection(v);

        if (p1.min > p2.max || p2.min > p1.max) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
