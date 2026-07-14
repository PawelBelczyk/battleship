export function createBoard(element, gameboard) {

  const board = document.createElement("div");

  board.classList.add("board");


  for (let row = 0; row < 10; row++) {

    for (let col = 0; col < 10; col++) {

      const cell = document.createElement("div");

      cell.dataset.row = row;
      cell.dataset.col = col;

      board.appendChild(cell);
    }
  }


  element.appendChild(board);
}