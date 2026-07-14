import { player, computer, playerAttack } from "./game.js";
import { renderBoards } from "./dom.js";


const boards = document.querySelector("#boards");


const newGameButton = document.querySelector("#new-game");

newGameButton.addEventListener("click", () => {
  location.reload();
});





function computerTurn() {

  const move = computer.getRandomMove();

  player.gameboard.receiveAttack(move);

}



function handlePlayerAttack(coordinates) {

  playerAttack(coordinates);


  // sprawdzamy czy gracz wygrał
  if (computer.gameboard.allShipsSunk()) {

    renderBoards(
      boards,
      player,
      computer,
      handlePlayerAttack
    );

    alert("You win!");
    return;
  }


  // ruch komputera
  computerTurn();


  // sprawdzamy czy komputer wygrał
  if (player.gameboard.allShipsSunk()) {

    renderBoards(
      boards,
      player,
      computer,
      handlePlayerAttack
    );

    alert("Computer wins!");
    return;
  }


  // odświeżenie plansz po obu ruchach
  renderBoards(
    boards,
    player,
    computer,
    handlePlayerAttack
  );

}



// pierwsze wyświetlenie plansz

renderBoards(
  boards,
  player,
  computer,
  handlePlayerAttack
);