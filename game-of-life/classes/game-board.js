import { Cell } from "./cell.js";

export class GameBoard {
  neighborsCells = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    ,
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  interval;
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = Array.from({ length: this.rows }, (row) =>
      Array.from({ length: this.cols })
    );
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
  createBoard() {
    const gameBoard = this.#createDivElement("board", "board");
    document.body.appendChild(gameBoard);

    this.board = this.board.map((row, indexRow) => {
      const boardRow = this.#createDivElement("row", `row-${indexRow}`);
      gameBoard.appendChild(boardRow);

      const mappedRow = row.map((cell, indexCol) => {
        const gameCell = new Cell([indexRow, indexCol]);
        boardRow.appendChild(gameCell);
        return gameCell;
      });
      return mappedRow;
    });
  }

  resetBoard() {
    this.board.flat().forEach((cell) => cell.killCell());
  }

  countAliveCellNeighbors(x, y) {
    return this.neighborsCells.reduce((acc, cords) => {
      const [nX, nY] = [cords[0] + x, cords[1] + y];
      if (!((nX < 0) | (nY < 0) | (nX >= this.cols) | (nY >= this.rows))) {
        this.board[nX][nY].isCellAlive() ? (acc += 1) : acc;
      }

      return acc;
    }, 0);
  }

  setNextCellStatus(x, y, nCount) {
    const currentCell = this.board[x][y];
    if (
      (currentCell.isCellAlive() & ((nCount === 2) | (nCount === 3))) |
      (!currentCell.isCellAlive() & (nCount !== 3))
    ) {
      currentCell.shouldChangeNextCellState = false;
    } else {
      currentCell.shouldChangeNextCellState = true;
    }
  }

  startGame() {
    let deadCellsCount = 0;
    let notChangedCellStatusCount = 0;
    this.interval = setInterval(() => {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const sumOfAliveNeighbors = this.countAliveCellNeighbors(i, j);
          this.setNextCellStatus(i, j, sumOfAliveNeighbors);
        }
      }
      this.board.flat().forEach((cell) => {
        if (!cell.updateStatus()) {
          notChangedCellStatusCount++;
        }
        if (!cell.isCellAlive()) {
          deadCellsCount++;
        }
      });
      if (
        (deadCellsCount === this.cols * this.rows) |
        (notChangedCellStatusCount === this.cols * this.rows)
      ) {
        this.stopGame();
      }
      deadCellsCount = 0;
      notChangedCellStatusCount = 0;
    }, 500);
  }

  stopGame() {
    clearInterval(this.interval);
  }
}
