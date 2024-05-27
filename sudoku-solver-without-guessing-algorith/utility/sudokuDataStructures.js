const { SudokuSquare, Row, Column } = require("../classes/sudokuClasses");

const ROW = {
  TOP: "TOP",
  CENTER: "CENTER",
  BOTTOM: "BOTTOM",
};

const COLUMN = {
  LEFT: "LEFT",
  MIDDLE: "MIDDLE",
  RIGHT: "RIGHT",
};

const sudokuSquareMapper = {
  0: {
    row: ROW.TOP,
    column: COLUMN.LEFT,
  },
  1: {
    row: ROW.TOP,
    column: COLUMN.MIDDLE,
  },
  2: {
    row: ROW.TOP,
    column: COLUMN.RIGHT,
  },
  3: {
    row: ROW.CENTER,
    column: COLUMN.LEFT,
  },
  4: {
    row: ROW.CENTER,
    column: COLUMN.MIDDLE,
  },
  5: {
    row: ROW.CENTER,
    column: COLUMN.RIGHT,
  },
  6: {
    row: ROW.BOTTOM,
    column: COLUMN.LEFT,
  },
  7: {
    row: ROW.BOTTOM,
    column: COLUMN.MIDDLE,
  },
  8: {
    row: ROW.BOTTOM,
    column: COLUMN.RIGHT,
  },
};

function createSudokuSquares(sudoku) {
  return sudoku.map(
    (val, idx) =>
      new SudokuSquare(
        sudokuSquareMapper[idx].row,
        sudokuSquareMapper[idx].column,
        val
      )
  );
}

function getSudokuRowsOrColumns(listOfSquares, segment) {
  const groupedSquares = Object.entries(
    listOfSquares.reduce((acc, square) => {
      const key = square[segment];
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], square] : [square],
      };
    }, {})
  );
  const result = [];
  const className = segment === "row" ? Row : Column;
  for (const group of groupedSquares) {
    const key = group[0];
    for (let i = 0; i <= 2; i++) {
      result.push(new className(key, i, group[1]));
    }
  }
  return result;
}

module.exports = {
  createSudokuSquares,
  getSudokuRowsOrColumns,
};
