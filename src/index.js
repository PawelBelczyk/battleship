import { player, computer, playerAttack } from "./game.js";
import { renderBoards } from "./dom.js";


const boards = document.querySelector("#boards");


const newGameButton = document.querySelector("#new-game");


const message = document.querySelector("#message");

newGameButton.addEventListener("click", () => {
  location.reload();
});





function computerTurn() {

  const move = computer.getRandomMove();

  player.gameboard.receiveAttack(move);

}



function handlePlayerAttack(coordinates) {

 
    const attackSuccessful = playerAttack(coordinates);

    if (!attackSuccessful) {
      return;
    }


  // sprawdzamy czy gracz wygrał
  if (computer.gameboard.allShipsSunk()) {

    renderBoards(
      boards,
      player,
      computer,
      handlePlayerAttack
    );

        message.textContent = "🏆 You win!";
      message.classList.add("win");
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

        message.textContent = "💀 Computer wins!";
      message.classList.add("lose");
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