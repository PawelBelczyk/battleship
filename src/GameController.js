import Player from "./Player.js";
import Ship from "./Ship.js";
import { getSmartMove } from "./ai.js";


export default class GameController {


    constructor() {


        this.player = new Player("human");

        this.computer = new Player("computer");



        this.statistics = {

            playerHits: 0,

            playerMisses: 0,

            computerHits: 0,

            computerMisses: 0,

            turns: 0

        };



        this.gameOver = false;



        this.placeFleet(
            this.player.gameboard
        );


        this.placeFleet(
            this.computer.gameboard
        );


    }







    playerAttack(coordinates) {


        if(this.gameOver) {

            return false;

        }



        const result =
            this.computer.gameboard.receiveAttack(
                coordinates
            );



        if(result === "hit") {

            this.statistics.playerHits++;

        }



        if(result === "miss") {

            this.statistics.playerMisses++;

        }



        this.statistics.turns++;



        return result;


    }









            computerTurn() {

            const move = getSmartMove(this.computer);

            const result =
                this.player.gameboard.receiveAttack(move);


            if (result === "hit") {

                this.statistics.computerHits++;

                this.computer.successfulHits.push(move);

            }


            if (result === "sunk") {

                this.statistics.computerHits++;

                this.computer.successfulHits.push(move);

                this.computer.clearHits();

            }


            if (result === "miss") {

                this.statistics.computerMisses++;

            }


            return move;

        }






    checkWinner() {



        if(
            this.computer.gameboard.allShipsSunk()
        ) {


            this.gameOver = true;


            return "player";


        }





        if(
            this.player.gameboard.allShipsSunk()
        ) {


            this.gameOver = true;


            return "computer";


        }



        return null;


    }









    placeFleet(gameboard) {


        const ships = [

            5,

            4,

            3,

            3,

            2

        ];



        ships.forEach(length => {


            this.placeRandomShip(
                gameboard,
                length
            );


        });


    }









    placeRandomShip(gameboard, length) {



        let placed = false;




        while(!placed) {




            const horizontal =
                Math.random() < 0.5;






            const row =
                horizontal

                ? Math.floor(
                    Math.random() * 10
                )

                : Math.floor(
                    Math.random() * (11 - length)
                );







            const col =
                horizontal

                ? Math.floor(
                    Math.random() * (11 - length)
                )

                : Math.floor(
                    Math.random() * 10
                );








            const coordinates = [];







            for(
                let i = 0;
                i < length;
                i++
            ) {



                if(horizontal) {


                    coordinates.push(
                        [
                            row,
                            col + i
                        ]
                    );



                } else {



                    coordinates.push(
                        [
                            row + i,
                            col
                        ]
                    );


                }


            }








            const blocked =
                coordinates.some(
                    ([r,c]) =>

                        this.isCoordinateBlocked(
                            gameboard,
                            r,
                            c
                        )

                );








            if(!blocked) {



                gameboard.placeShip(

                    new Ship(length),

                    coordinates

                );



                placed = true;



            }



        }


    }









    isCoordinateBlocked(
        gameboard,
        row,
        col
    ) {



        return gameboard.ships.some(
            placedShip =>


                placedShip.coordinates.some(
                    ([shipRow, shipCol]) =>


                        Math.abs(shipRow - row) <= 1 &&

                        Math.abs(shipCol - col) <= 1


                )


        );


    }




}