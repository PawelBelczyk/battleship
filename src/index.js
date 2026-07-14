import { player, computer } from "./game.js";
import { createBoard } from "./dom.js";


const boards = document.querySelector("#boards");


createBoard(
  boards,
  player.gameboard
);


createBoard(
  boards,
  computer.gameboard
);