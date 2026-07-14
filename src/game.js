import Player from "./Player.js";
import Ship from "./Ship.js";





const player = new Player("human");
const computer = new Player("computer");




// trwałe rozmieszczenie statków na planszy
player.gameboard.placeShip(
  new Ship(3),
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ]
);

computer.gameboard.placeShip(
  new Ship(3),
  [
    [5, 5],
    [5, 6],
    [5, 7],
  ]
);




export {player, computer};

export function playerAttack(coordinates) {
    computer.gameboard.receiveAttack(coordinates);
}

export function computerAttack() {
    const move = computer.getRandomMove();

    player.gameboard.receiveAttack(move);
}

export function isGameOver() {
    return ( 
        player.gameboard.allShipsSunk() ||
        computer.gameboard.allShipsSunk()
    ); 
}

 