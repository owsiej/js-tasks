const { intersection } = require("../utility/utility-functions.js");
const { SudokuSquare } = require("../classes/sudokuClasses.js");
function sudokuSolver(squares, rows, columns) {
  let solvedSquares;
  let emptyIterationCounter;
  while (solvedSquares !== 9 && emptyIterationCounter !== 9) {
    solvedSquares = 0;
    emptyIterationCounter = 0;

    for (const square of squares) {
      if (square.isSquareSolved()) {
        solvedSquares++;
        emptyIterationCounter++;
        continue;
      }
      const rowsInSquare = rows.filter((row) => row.position === square.row);
      const columnsInSquare = columns.filter(
        (column) => column.position === square.column
      );

      square.updatePossibleNumbersInUnsolvedCells("byRow", rowsInSquare);
      square.updatePossibleNumbersInUnsolvedCells("byColumn", columnsInSquare);

      let solvedRowCount = 0;
      let unsolvedCellsCount = 0;
      let unsolvedCellsCountOnCurrentIteration;
      const uniqueSquareNumbers = square.findUniqueNumbersInAllUnsolvedCells();

      while (
        solvedRowCount !== 3 &&
        unsolvedCellsCount !== unsolvedCellsCountOnCurrentIteration
      ) {
        solvedRowCount = 0;
        unsolvedCellsCount = 0;
        unsolvedCellsCountOnCurrentIteration = 0;
        for (let x = 0; x <= 2; x++) {
          const unsolvedCellsInCurrentRow =
            square.amountOfUnsolvedCellsInRow(x);
          if (unsolvedCellsInCurrentRow === 0) {
            solvedRowCount++;
            continue;
          } else {
            unsolvedCellsCount += unsolvedCellsInCurrentRow;
          }
          for (let y = 0; y <= 2; y++) {
            const currentCell = square.getCell(x, y);
            if (SudokuSquare.isCellUnsolved(currentCell)) {
              const uniqueIntersection = intersection(
                currentCell,
                uniqueSquareNumbers
              );
              const cellSquareSharedPossibilities =
                uniqueIntersection.length > 0
                  ? uniqueIntersection
                  : intersection(square.possibleNumbers, currentCell);

              if (cellSquareSharedPossibilities.length === 1) {
                square.solveCell(x, y, cellSquareSharedPossibilities[0]);
                square.updatePossibleNumbers();

                rowsInSquare[x].updatePossibleNumbers(square.getCell(x, y));
                columnsInSquare[y].updatePossibleNumbers(square.getCell(x, y));
              } else {
                unsolvedCellsCountOnCurrentIteration++;
              }
            }
          }
        }
        if (unsolvedCellsCount === unsolvedCellsCountOnCurrentIteration) {
          emptyIterationCounter++;
        } else {
          emptyIterationCounter = 0;
        }
      }
    }
  }
  solvedSquares === 9
    ? console.log("Solved!!")
    : console.log("This Sudoku is too hard me. Below is best I can do.");
}

module.exports = {
  sudokuSolver,
};
