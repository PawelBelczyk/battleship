import Player from "./Player.js";
import Ship from "./Ship.js";
import { getSmartMove } from "./ai.js";


const statistics = {
    playerHits: 0,
    playerMisses: 0,
    computerHits: 0,
    computerMisses: 0,
    turns: 0
};

const player = new Player("human");
const computer = new Player("computer");

function placeRandomShip(gameboard, length) {
  let placed = false;

  while (!placed) {

    const horizontal = Math.random() < 0.5;

    const row = horizontal
      ? Math.floor(Math.random() * 10)
      : Math.floor(Math.random() * (11 - length));

    const col = horizontal
      ? Math.floor(Math.random() * (11 - length))
      : Math.floor(Math.random() * 10);

    const coordinates = [];

    for (let i = 0; i < length; i++) {

      if (horizontal) {
        coordinates.push([row, col + i]);
      } else {
        coordinates.push([row + i, col]);
      }

    }

 const blocked = coordinates.some(([row, col]) =>
  isCoordinateBlocked(gameboard, row, col)
);

    if (!blocked) {
      gameboard.placeShip(new Ship(length), coordinates);
      placed = true;
    }
  }
}

function placeFleet(gameboard) {
  const ships = [5, 4, 3, 3, 2];

  ships.forEach((length) => {
    placeRandomShip(gameboard, length);
  });
}


 placeFleet(player.gameboard);
placeFleet(computer.gameboard);




export {player, computer, statistics};
export function playerAttack(coordinates) {

    const result =
        computer.gameboard.receiveAttack(coordinates);


    if(result === "hit" || result === "sunk") {

        statistics.playerHits++;

    }


    if(result === "miss") {

        statistics.playerMisses++;

    }


    statistics.turns++;


    return result;
}
 

export function isGameOver() {
    return ( 
        player.gameboard.allShipsSunk() ||
        computer.gameboard.allShipsSunk()
    ); 
}

 function isCoordinateBlocked(gameboard, row, col) {

  return gameboard.ships.some((placedShip) =>

    placedShip.coordinates.some(([shipRow, shipCol]) =>

      Math.abs(shipRow - row) <= 1 &&
      Math.abs(shipCol - col) <= 1

    )

  );

}

export function computerAttack() {

    const move = getSmartMove(computer);


    const result =
        player.gameboard.receiveAttack(move);



    if(result === "hit" || result === "sunk") {

        statistics.computerHits++;

        computer.successfulHits.push(move);

    }


    if(result === "miss") {

        statistics.computerMisses++;

    }


    return result;
}