import { player, computer, playerAttack } from "./game.js";
import { renderBoards } from "./dom.js";
import { getSmartMove } from "./ai.js";


let gameOver = false;
let revealComputerShips = false;

const boards = document.querySelector("#boards");


const newGameButton = document.querySelector("#new-game");


const message = document.querySelector("#message");

newGameButton.addEventListener("click", () => {
  location.reload();
});





function computerTurn() {

const move = getSmartMove(computer);


  const result = player.gameboard.receiveAttack(move);


  console.log("computer:", move);
  console.log("result:", result);

      if (result === "hit") {

          computer.successfulHits.push(move);

      }


      if (result === "sunk") {

          computer.clearHits();

      }
}



function handlePlayerAttack(coordinates) {

 
  if(gameOver) {
    return;
  }


    const attackSuccessful = playerAttack(coordinates);

    if (!attackSuccessful) {
      return;
    }


  // sprawdzamy czy gracz wygrał
  if (computer.gameboard.allShipsSunk()) {
    
    gameOver = true;

    revealComputerShips = true;
    
    renderBoards(
      boards,
      player,
      computer,
    null,
    true
    );

        message.textContent = "🏆 You win!";
      message.classList.add("win");

      

      return;
  }


  // ruch komputera
  computerTurn();


  // sprawdzamy czy komputer wygrał
  if (player.gameboard.allShipsSunk()) {

    revealComputerShips = true;

    renderBoards(
      boards,
      player,
      computer,
      null,
      true
    );

        message.textContent = "💀 Computer wins!";
      message.classList.add("lose");

      gameOver = true;
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