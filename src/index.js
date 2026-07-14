import GameController from "./GameController.js";
import { createBoard, updateStats } from "./dom.js";


const game = new GameController();


const playerBoard =
    document.querySelector("#player-board");


const computerBoard =
    document.querySelector("#computer-board");


const message =
    document.querySelector("#message");


const newGameButton =
    document.querySelector("#new-game");



let gameOver = false;




newGameButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);







function refreshBoards() {


    createBoard(

        playerBoard,

        game.player.gameboard,

        false

    );



    createBoard(

        computerBoard,

        game.computer.gameboard,

        true,

        handlePlayerAttack

    );



    updateStats(
        game.statistics
    );


}









function handlePlayerAttack(coordinates) {


    if(gameOver) {

        return;

    }





    const result =
        game.playerAttack(coordinates);





    if(result === false) {

        return;

    }





    refreshBoards();






    const winner =
        game.checkWinner();





    if(winner === "player") {


        gameOver = true;


        createBoard(

            playerBoard,

            game.player.gameboard,

            false

        );


        createBoard(

            computerBoard,

            game.computer.gameboard,

            false

        );



        message.textContent =
            "🏆 You win!";


        message.classList.add(
            "win"
        );


        return;

    }







    // ruch komputera

    game.computerTurn();





    const computerWinner =
        game.checkWinner();





    refreshBoards();






    if(computerWinner === "computer") {


        gameOver = true;



        createBoard(

            computerBoard,

            game.computer.gameboard,

            false

        );



        message.textContent =
            "💀 Computer wins!";


        message.classList.add(
            "lose"
        );



        return;

    }




}









// start gry

refreshBoards();  