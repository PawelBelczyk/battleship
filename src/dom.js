export function createBoard(
  element,
  gameboard,
  hideShips = false,
  onCellClick = null
) {

  const board = document.createElement("div");

  board.classList.add("board");


  for (let row = 0; row < 10; row++) {

    for (let col = 0; col < 10; col++) {

      const cell = document.createElement("div");

      cell.dataset.row = row;
      cell.dataset.col = col;


      if (onCellClick) {
        cell.addEventListener("click", () => {
          onCellClick([row, col]);
        });
      }


      const hasShip = gameboard.ships.some((placedShip) =>
        placedShip.coordinates.some(
          ([shipRow, shipCol]) =>
            shipRow === row && shipCol === col
        )
      );


      const wasHit = gameboard.hitAttacks.some(
        ([hitRow, hitCol]) =>
          hitRow === row && hitCol === col
      );


      const wasMiss = gameboard.missedAttacks.some(
        ([missRow, missCol]) =>
          missRow === row && missCol === col
      );


      if (hasShip && !hideShips) {
        cell.classList.add("ship");
      }


      if (wasHit) {
        cell.textContent = "💥";
      }


      if (wasMiss) {
        cell.textContent = "🌊";
      }


      board.appendChild(cell);
    }
  }


  element.appendChild(board);
}



export function renderBoards(
  container,
  player,
  computer,
  onCellClick,
  revealComputerShips = false
) {

  container.innerHTML = "";


  createBoard(
    container,
    player.gameboard,
    false
  );


  createBoard(
    container,
    computer.gameboard,
    !revealComputerShips,
    revealComputerShips ? null : onCellClick
  );
}