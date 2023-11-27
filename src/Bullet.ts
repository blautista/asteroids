import { Vector2D } from "./shared/Vector.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Point } from "./shared/Shape/Point.ts";
import { Canvas } from "./shared/Canvas.ts";

const BULLET_DURATION = 2000;

export class Bullet extends Point implements GameObject2D {
  constructor(
    position: Vector2D,
    private readonly velocity: Vector2D,
    onExpired: (bullet: Bullet) => void,
  ) {
    super(position);
    window.setTimeout(() => {
      onExpired(this);
    }, BULLET_DURATION);
  }

  update(delta: number, canvas: Canvas) {
    this.move(this.velocity);
    this.position = canvas.warpPositionAround(this.position);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, 1, 1);
  }
}
