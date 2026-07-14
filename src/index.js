import GameController from "./GameController.js";
import { renderBoards } from "./dom.js";


const boards = document.querySelector("#boards");

const message = document.querySelector("#message");

const newGameButton = document.querySelector("#new-game");


const game = new GameController();



let gameOver = false;



newGameButton.addEventListener("click", () => {
    location.reload();
});





function handlePlayerAttack(coordinates) {

    if (gameOver) {
        return;
    }


    const result =
        game.playerAttack(coordinates);


    // kliknięcie już zaatakowanego pola
    if (result === false) {
        return;
    }



    const winner =
        game.checkWinner();



    if (winner === "player") {

        gameOver = true;


        renderBoards(
            boards,
            game.player,
            game.computer,
            null,
            true
        );


        message.textContent = "🏆 You win!";
        message.classList.add("win");


        return;
    }



    // ruch komputera

    game.computerTurn();



    const computerWinner =
        game.checkWinner();



    if (computerWinner === "computer") {

        gameOver = true;


        renderBoards(
            boards,
            game.player,
            game.computer,
            null,
            true
        );


        message.textContent =
            "💀 Computer wins!";

        message.classList.add("lose");


        return;
    }



    // odświeżenie plansz

    renderBoards(
        boards,
        game.player,
        game.computer,
        handlePlayerAttack
    );

}





renderBoards(
    boards,
    game.player,
    game.computer,
    handlePlayerAttack
);