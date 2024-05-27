import { squareTypes } from "../const/square-types.js";

export class Board {
  ballCoordinates;

  constructor(board) {
    this.board = board;
  }

  get numberOfRows() {
    return this.board.length;
  }

  get numberOFColumns() {
    return this.board[0].length;
  }

  #createDivElement(elementClass, idName) {
    const el = document.createElement("div");
    if (elementClass) {
      el.className = elementClass;
    }
    if (idName) {
      el.id = idName;
    }
    return el;
  }

  #getSquareType(square) {
    return squareTypes[square];
  }

  updateSquareClass(x, y, classToRemove, classToAdd) {
    const wantedSquare = document.getElementById(`square-${x}-${y}`);
    if (!wantedSquare.classList.toggle(squareTypes.Y, false)) {
      wantedSquare.classList.remove(classToRemove);
    }
    wantedSquare.classList.add(classToAdd);
  }

  createBoardVisualization() {
    const board = this.#createDivElement("board", "board");
    document.body.appendChild(board);
    for (let i = 0; i < this.numberOfRows; i++) {
      const boardRow = this.#createDivElement("row", `row-${i}`);
      board.appendChild(boardRow);

      for (let j = 0; j < this.numberOFColumns; j++) {
        const square = this.#createDivElement("square", `square-${i}-${j}`);
        const squareClass = this.#getSquareType(this.board[i][j]);
        if (!this.ballCoordinates & (squareClass === squareTypes[1])) {
          this.ballCoordinates = [i, j];
        }
        square.classList.add(squareClass);
        boardRow.appendChild(square);
      }
    }
  }
}
