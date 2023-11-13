export class Vector2D {
  constructor(
    private readonly x: number,
    private readonly y: number,
  ) {}

  static zero() {
    return new Vector2D(0, 0);
  }

  static right() {
    return new Vector2D(1, 0);
  }

  static fromAngle(rad: number) {
    return Vector2D.right().rotate(rad);
  }

  getX() {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  dotProduct(vector: Vector2D): number {
    return vector.x * this.x + vector.y * this.y;
  }

  getMagnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  changeMagnitude(by: number) {
    const m = this.getMagnitude();
    if (m === 0) {
      return this.setMagnitude(by);
    }

    const diff = (m + by) / m;
    return new Vector2D(this.x * diff, this.y * diff);
  }

  setMagnitude(to: number) {
    const m = this.getMagnitude();
    let diff = m === 0 ? to : to / m;
    return new Vector2D(this.x * diff, this.y * diff);
  }

  rotate(rad: number) {
    return new Vector2D(
      this.x * Math.cos(rad) - this.y * Math.sin(rad),
      this.x * Math.sin(rad) + this.y * Math.cos(rad),
    );
  }

  normalize() {
    const m = this.getMagnitude();
    return new Vector2D(this.x / m, this.y / m);
  }

  /**
   * Obtains a new perpendicular vector
   */
  normal(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }

  isNull(): boolean {
    return this.x === 0 && this.y === 0;
  }

  sum(vector: Vector2D) {
    return new Vector2D(this.x + vector.getX(), this.y + vector.getY());
  }
}
