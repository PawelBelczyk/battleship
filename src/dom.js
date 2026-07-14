export function createBoard(
    element,
    gameboard,
    hideShips = false,
    onCellClick = null
) {


    element.innerHTML = "";


    const board = document.createElement("div");

    board.classList.add("board");



    for(let row = 0; row < 10; row++) {


        for(let col = 0; col < 10; col++) {


            const cell =
                document.createElement("div");


            cell.classList.add("cell");


            cell.dataset.row = row;

            cell.dataset.col = col;




            if(onCellClick) {


                cell.addEventListener(
                    "click",
                    () => {

                        onCellClick(
                            [row,col]
                        );

                    }
                );


            }






            const placedShip =
                gameboard.ships.find(ship =>

                    ship.coordinates.some(
                        ([shipRow, shipCol]) =>

                            shipRow === row &&
                            shipCol === col

                    )

                );





            if(placedShip && !hideShips) {


                cell.classList.add("ship");


            }








            const wasHit =
                gameboard.hitAttacks.some(
                    ([hitRow, hitCol]) =>

                        hitRow === row &&
                        hitCol === col

                );





            const wasMiss =
                gameboard.missedAttacks.some(
                    ([missRow, missCol]) =>

                        missRow === row &&
                        missCol === col

                );








            if(wasHit) {

                cell.textContent = "💥";

                cell.classList.add("hit");

            }







            if(wasMiss) {

                cell.textContent = "🌊";

                cell.classList.add("miss");

            }






            board.appendChild(cell);


        }


    }





    element.appendChild(board);


}








export function updateStats(statistics) {


    document.querySelector("#player-hits")
        .textContent =
        statistics.playerHits;



    document.querySelector("#player-misses")
        .textContent =
        statistics.playerMisses;




    document.querySelector("#computer-hits")
        .textContent =
        statistics.computerHits;




    document.querySelector("#computer-misses")
        .textContent =
        statistics.computerMisses;




    document.querySelector("#turns")
        .textContent =
        statistics.turns;


}