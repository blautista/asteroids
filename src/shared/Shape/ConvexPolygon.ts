import { Vector2D } from "../Vector.ts";
import { Polygon } from "./Polygon.ts";

export class ConvexPolygon extends Polygon {
  private getShapeNormalVectors(): Vector2D[] {
    return this.getVectors().map((v) => v.normal().normalize());
  }

  collidesWith(polygon: ConvexPolygon) {
    for (const v of this.getShapeNormalVectors()) {
      const p1 = this.projection(v);
      const p2 = polygon.projection(v);

      if (p1.min > p2.max || p2.min > p1.max) {
        return false;
      }
    }

    for (const v of polygon.getShapeNormalVectors()) {
      const p1 = this.projection(v);
      const p2 = polygon.projection(v);

      if (p1.min > p2.max || p2.min > p1.max) {
        return false;
      }
    }

    return true;
  }
}
