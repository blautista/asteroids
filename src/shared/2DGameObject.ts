export interface GameObject2D {
  draw(ctx: CanvasRenderingContext2D): void;
  update(delta: number): void;
}
