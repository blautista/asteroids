export class Keyboard {
  private static pressedKeys = new Set<string>();

  static {
    window.addEventListener("keydown", (e) => {
      this.pressedKeys.add(e.code);
    });

    window.addEventListener("keyup", (e) => {
      this.pressedKeys.delete(e.code);
    });
  }

  static getIsKeyPressed(code: string) {
    return this.pressedKeys.has(code);
  }
}
