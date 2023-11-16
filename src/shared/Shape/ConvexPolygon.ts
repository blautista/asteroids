import { Polygon } from "./Polygon.ts";

export class ConvexPolygon extends Polygon {
  collidesWith(polygon: ConvexPolygon) {
    for (const v of this.getEdgeNormalVectors()) {
      const p1 = this.projection(v);
      const p2 = polygon.projection(v);

      if (p1.min > p2.max || p2.min > p1.max) {
        return false;
      }
    }

    for (const v of polygon.getEdgeNormalVectors()) {
      const p1 = this.projection(v);
      const p2 = polygon.projection(v);

      if (p1.min > p2.max || p2.min > p1.max) {
        return false;
      }
    }

    return true;
  }
}
