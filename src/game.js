import Player from "./Player.js";
import Ship from "./Ship.js";





const player = new Player("human");
const computer = new Player("computer");

 
function placeRandomShip(gameboard, length) {
  let placed = false;

  while (!placed) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * (11 - length));

    const coordinates = [];

    for (let i = 0; i < length; i++) {
      coordinates.push([row, col + i]);
    }

    const overlaps = gameboard.ships.some((placedShip) =>
      placedShip.coordinates.some(([r, c]) =>
        coordinates.some(([newR, newC]) => r === newR && c === newC)
      )
    );

    if (!overlaps) {
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

 