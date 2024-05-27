const { intersection, remove } = require("../utility/utility-functions");
class SudokuSquare {
  #availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(row, column, numbers) {
    this.row = row;
    this.column = column;
    this.numbers = numbers;
    this.possibleNumbers = this.#getPossibleNumbers();
  }
  getRow(idx) {
    return this.numbers[idx];
  }
  getColumn(idx) {
    return this.numbers.map((val) => val[idx]);
  }
  getCell(x, y) {
    return this.numbers[x][y];
  }
  static isCellUnsolved(cell) {
    return Array.isArray(cell);
  }
  isSquareSolved() {
    return !this.numbers.flat().some((val) => typeof val !== "number");
  }
  amountOfUnsolvedCellsInRow(rowIdx) {
    return this.getRow(rowIdx).reduce((acc, val) => {
      SudokuSquare.isCellUnsolved(val) ? acc++ : null;
      return acc;
    }, 0);
  }

  solveCell(x, y, value) {
    this.numbers[x][y] = value;
  }

  updatePossibleNumbers() {
    this.possibleNumbers = this.#getPossibleNumbers();
  }

  updatePossibleNumbersInUnsolvedCells(direction, listOfSegments) {
    const updateCells = (index, getSegment, mapSegment) => {
      if (getSegment(index).some((val) => typeof val !== "number")) {
        const valuesIntersection = intersection(
          listOfSegments[index].possibleNumbers,
          this.possibleNumbers
        );
        mapSegment(index, valuesIntersection);
      }
    };

    if (direction === "byRow") {
      for (let i = 0; i <= 2; i++) {
        updateCells(i, this.getRow.bind(this), this.#updateRow.bind(this));
      }
    } else if (direction === "byColumn") {
      for (let i = 0; i <= 2; i++) {
        updateCells(
          i,
          this.getColumn.bind(this),
          this.#updateColumn.bind(this)
        );
      }
    }
  }

  findUniqueNumbersInAllUnsolvedCells() {
    const numberCounts = this.numbers.flat().reduce((acc, cell) => {
      if (SudokuSquare.isCellUnsolved(cell)) {
        acc = cell.reduce((acc2, numb) => {
          const key = numb;
          return {
            ...acc2,
            [key]: acc2[key] ? (acc2[key] += 1) : 1,
          };
        }, acc);
      }
      return acc;
    }, {});
    const result = [];
    for (const number in numberCounts) {
      if (numberCounts[number] === 1) {
        result.push(parseInt(number));
      }
    }
    return result;
  }
  #updateRow(rowIndex, value) {
    this.numbers[rowIndex] = this.getRow(rowIndex).map((numb) => {
      if (typeof numb === "string") {
        return value;
      } else if (SudokuSquare.isCellUnsolved(numb)) {
        return intersection(numb, value);
      }
      return numb;
    });
  }

  #updateColumn(columnIndex, value) {
    const column = this.getColumn(columnIndex);
    for (let i = 0; i <= 2; i++) {
      if (SudokuSquare.isCellUnsolved(column[i])) {
        this.numbers[i][columnIndex] = intersection(column[i], value);
      }
    }
  }

  #getPossibleNumbers() {
    const numbers = this.numbers.flat();
    return this.#availableNumbers.filter((numb) => !numbers.includes(numb));
  }
}

class SudokuSegment {
  availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(position, index, threeSquares) {
    this.position = position;
    this.index = index;
    this.threeSquares = threeSquares;
    this.numbers = [];
    this.possibleNumbers = [];
  }

  getPossibleNumbers() {
    const numbers = this.numbers.flat();
    return this.availableNumbers.filter((numb) => !numbers.includes(numb));
  }
  updatePossibleNumbers(value) {
    this.possibleNumbers = remove(this.possibleNumbers, value);
  }
}

class Row extends SudokuSegment {
  constructor(position, index, threeSquares) {
    super(position, index, threeSquares);
    this.numbers = this.#createRowNumbers();
    this.possibleNumbers = this.getPossibleNumbers();
  }
  #createRowNumbers() {
    return this.threeSquares.map((square) => square.getRow(this.index));
  }
}

class Column extends SudokuSegment {
  constructor(position, index, threeSquares) {
    super(position, index, threeSquares);
    this.numbers = this.#createColumnNumbers();
    this.possibleNumbers = this.getPossibleNumbers();
  }
  #createColumnNumbers() {
    return this.threeSquares.map((square) => square.getColumn(this.index));
  }
}

module.exports = {
  SudokuSquare,
  Row,
  Column,
};
