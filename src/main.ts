import "./style.css";
import { Player } from "./Player.ts";
import { CanvasRenderer } from "./shared/CanvasRenderer.ts";
import { ShapeFactory } from "./shared/shapeFactories.ts";

const canvasRenderer = new CanvasRenderer(document.getElementById("app")!);
const player = new Player(400, 400);
const ctx = canvasRenderer.getContext();

let lastTimestamp = 0;

const octagon = ShapeFactory.createOctagon(200, 250, 200);

function playGame(timestamp: number) {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, 1024, 768);
  octagon.draw(ctx);
  player.update(timestamp - lastTimestamp);
  if (player.collidesWith(octagon)) {
    ctx.strokeStyle = "pink";
  }
  player.draw(ctx);
  window.requestAnimationFrame(playGame);
  lastTimestamp = timestamp;
}

window.requestAnimationFrame(playGame);
