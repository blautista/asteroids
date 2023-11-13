import { ConvexPolygon } from "./Shape/ConvexPolygon.ts";

class ShapeFactory {
  static createOctagon(x: number, y: number, size: number) {
    return new ConvexPolygon(
      x,
      y,
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
      size,
    );
  }
}

export { ShapeFactory };
