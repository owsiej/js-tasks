const {
  createSudokuSquares,
  getSudokuRowsOrColumns,
} = require("./utility/sudokuDataStructures.js");
const { sudokuSolver } = require("./service/sudokuSolver.js");
const sudokuBoards = require("./const/sudokuSamples.js");
const sudokuBoard = sudokuBoards.testSudoku1;

if (sudokuBoard.length !== 9) {
  throw new Error("Sudoku has got too many squares.");
}
sudokuBoard.flat().forEach((row) => {
  if (row.length !== 3) {
    throw new Error(`Wrong input.Row: ${row} has got wrong length.`);
  }
});

const squares = createSudokuSquares(sudokuBoard);
const rows = getSudokuRowsOrColumns(squares, "row");
const columns = getSudokuRowsOrColumns(squares, "column");

sudokuSolver(squares, rows, columns);

squares.forEach((element) => {
  console.table(element.numbers);
});
