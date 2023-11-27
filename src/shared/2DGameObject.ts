import { Canvas } from "./Canvas.ts";

export interface GameObject2D {
  draw(ctx: CanvasRenderingContext2D): void;
  update(delta: number, canvas: Canvas): void;
}
