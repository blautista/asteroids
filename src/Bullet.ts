import { Vector2D } from "./shared/Vector.ts";
import { GameObject2D } from "./shared/2DGameObject.ts";
import { Point } from "./shared/Shape/Point.ts";

export class Bullet extends Point implements GameObject2D {
  constructor(
    position: Vector2D,
    private readonly velocity: Vector2D,
  ) {
    super(position);
  }

  update(delta: number) {
    this.move(this.velocity);

    if (this.position.x < 0) {
      this.position = new Vector2D(1024, this.position.y);
    } else if (this.position.x > 1024) {
      this.position = new Vector2D(0, this.position.y);
    }

    if (this.position.y < 0) {
      this.position = new Vector2D(this.position.x, 768);
    } else if (this.position.y > 768) {
      this.position = new Vector2D(this.position.x, 0);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, 1, 1);
  }
}
