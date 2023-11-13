export class Vector2D {
  constructor(
    private x: number,
    private y: number,
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
    this.x *= diff;
    this.y *= diff;
    return this;
  }

  setMagnitude(to: number) {
    const m = this.getMagnitude();
    let diff = m === 0 ? to : to / m;
    this.x *= diff;
    this.y *= diff;
    return this;
  }

  rotate(rad: number) {
    const { x, y } = this;
    this.x = x * Math.cos(rad) - y * Math.sin(rad);
    this.y = x * Math.sin(rad) + y * Math.cos(rad);
    return this;
  }

  normalize() {
    const m = this.getMagnitude();
    this.x /= m;
    this.y /= m;
    return this;
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
    this.x += vector.getX();
    this.y += vector.getY();
    return this;
  }
}
