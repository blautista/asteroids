import "./style.css";
import { Game } from "./Game.ts";

const game = new Game(document.getElementById("app")!);
game.start();
