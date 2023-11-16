import { Vector2D } from "../Vector.ts";
import { Shape } from "./Shape.ts";

export abstract class Polygon extends Shape {
  private heading = 0;
  private readonly points: [number, number][];

  constructor(x: number, y: number, points: [number, number][], size: number) {
    super(x, y);
    this.points = points.map(([x, y]) => [x * size, y * size]);
  }

  getHeading() {
    return this.heading;
  }

  setHeading(rad: number) {
    this.heading = rad;
  }

  changeHeading(rad: number) {
    this.heading += rad;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.translate(0.5, 0.5);

    const points = this.getPointsRelativeToPosition();

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[i + 1] ?? points[0];

      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  getPointsRelativeToPosition() {
    return this.points.map(([x, y]) => new Vector2D(x, y).rotate(this.heading).sum(this.position));
  }

  getEdgeVectors() {
    return this.getPointsRelativeToPosition().map((v1, i, arr) => {
      const v2 = arr[i + 1] ?? arr[0];

      return v2.subtract(v1);
    });
  }

  protected getEdgeNormalVectors(): Vector2D[] {
    return this.getEdgeVectors().map((v) => v.normal().normalize());
  }

  protected projection(axis: Vector2D) {
    const magnitudes = this.getPointsRelativeToPosition().map((v) => axis.dotProduct(v));

    const min = Math.min(...magnitudes);
    const max = Math.max(...magnitudes);

    return { min, max };
  }
}
