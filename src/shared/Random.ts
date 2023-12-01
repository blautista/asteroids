export class Random {
  static flipCoin() {
    return Math.random() > 0.5;
  }

  static int(min = 0, max = 1) {
    if (min > max) {
      throw new Error("min > max in Random.int");
    }
    return Math.floor(Math.random() * max) + min;
  }
}
