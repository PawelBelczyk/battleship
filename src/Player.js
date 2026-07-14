import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.moves =[];

    }


    getRandomMove() {

        
    let move;

    do {
      move = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ];

    } while (
      this.moves.some(
        ([row, col]) =>
          row === move[0] &&
          col === move[1]
      )
    );


    this.moves.push(move);

    return move;
  }
}

