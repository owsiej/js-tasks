import { moveDirections, moveMethods } from "../const/move-directions.js";
import { Board } from "./board.js";
import { squareTypes } from "../const/square-types.js";

export class BoardEngine extends Board {
  #currentMoveDirection;
  #nextPossibleMove;
  constructor(board) {
    super(board);
  }
  get currentDirectionMovement() {
    return this.#currentMoveDirection;
  }

  get nextPossibleMove() {
    return this.#nextPossibleMove;
  }

  isNotBorder(cords) {
    return !(this.board[cords[0]][cords[1]] === "X");
  }

  isNotRandom(cords) {
    return !(this.board[cords[0]][cords[1]] === "Y");
  }

  handleRandomSquare() {
    this.updateBallPosition();
    this.findFieldSquaresNearBallAndChoseOne();
    this.getMoveDirection(this.ballCoordinates, this.#nextPossibleMove);
    this.board[this.ballCoordinates[0]][this.ballCoordinates[1]] = "0";
  }

  updateBallPosition() {
    this.updateSquareClass(
      this.ballCoordinates[0],
      this.ballCoordinates[1],
      squareTypes[1],
      squareTypes[0]
    );
    this.updateSquareClass(
      this.#nextPossibleMove[0],
      this.#nextPossibleMove[1],
      squareTypes[0],
      squareTypes[1]
    );
    this.ballCoordinates = this.#nextPossibleMove;
  }

  findFieldSquaresNearBallAndChoseOne() {
    const possibleMoves = [];
    const [x, y] = this.ballCoordinates;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        this.isNotBorder([i, j]) &
        (JSON.stringify(this.ballCoordinates) !== JSON.stringify([i, j]))
          ? possibleMoves.push([i, j])
          : null;
      }
    }
    this.#nextPossibleMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  getMoveDirection(startingSquare, nextSquare) {
    const [xCorStarting, yCorStarting] = startingSquare;
    const [xCorNext, yCorNext] = nextSquare;
    if (xCorStarting === xCorNext) {
      if (yCorStarting > yCorNext) {
        this.#currentMoveDirection = moveDirections["STRAIGHT_LEFT"];
      } else {
        this.#currentMoveDirection = moveDirections["STRAIGHT_RIGHT"];
      }
    } else if (yCorStarting === yCorNext) {
      if (xCorStarting > xCorNext) {
        this.#currentMoveDirection = moveDirections["STRAIGHT_UP"];
      } else {
        this.#currentMoveDirection = moveDirections["STRAIGHT_DOWN"];
      }
    } else if (xCorStarting > xCorNext) {
      if (yCorStarting > yCorNext) {
        this.#currentMoveDirection = moveDirections["DIAGONAL_UP_LEFT"];
      } else {
        this.#currentMoveDirection = moveDirections["DIAGONAL_UP_RIGHT"];
      }
    } else if (xCorStarting < xCorNext) {
      if (yCorStarting > yCorNext) {
        this.#currentMoveDirection = moveDirections["DIAGONAL_DOWN_LEFT"];
      } else {
        this.#currentMoveDirection = moveDirections["DIAGONAL_DOWN_RIGHT"];
      }
    }
  }

  makeMove() {
    const nextMoveCords = moveMethods[this.#currentMoveDirection](
      this.#nextPossibleMove
    );

    if (this.isNotBorder(nextMoveCords)) {
      this.#nextPossibleMove = nextMoveCords;
      if (this.isNotRandom(nextMoveCords)) {
        return true;
      } else {
        this.handleRandomSquare();
        return true;
      }
    }
    return false;
  }

  makeBounce() {
    switch (this.#currentMoveDirection) {
      case moveDirections.STRAIGHT_DOWN:
        if (this.isNotBorder(moveMethods.STRAIGHT_LEFT(this.ballCoordinates))) {
          if (
            this.isNotBorder(moveMethods.STRAIGHT_RIGHT(this.ballCoordinates))
          ) {
            this.#currentMoveDirection = [
              moveDirections.DIAGONAL_UP_RIGHT,
              moveDirections.DIAGONAL_UP_LEFT,
              moveDirections.STRAIGHT_UP,
            ][Math.floor(Math.random() * 3)];
          } else {
            this.#currentMoveDirection = [
              moveDirections.STRAIGHT_LEFT,
              moveDirections.DIAGONAL_UP_LEFT,
            ][Math.floor(Math.random() * 2)];
          }
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_RIGHT,
            moveDirections.DIAGONAL_UP_RIGHT,
          ][Math.floor(Math.random() * 2)];
        }
        break;

      case moveDirections.STRAIGHT_UP:
        if (this.isNotBorder(moveMethods.STRAIGHT_LEFT(this.ballCoordinates))) {
          if (
            this.isNotBorder(moveMethods.STRAIGHT_RIGHT(this.ballCoordinates))
          ) {
            this.#currentMoveDirection = [
              moveDirections.DIAGONAL_DOWN_RIGHT,
              moveDirections.DIAGONAL_DOWN_LEFT,
              moveDirections.STRAIGHT_DOWN,
            ][Math.floor(Math.random() * 3)];
          } else {
            this.#currentMoveDirection = [
              moveDirections.STRAIGHT_LEFT,
              moveDirections.DIAGONAL_DOWN_LEFT,
            ][Math.floor(Math.random() * 2)];
          }
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_RIGHT,
            moveDirections.DIAGONAL_DOWN_RIGHT,
          ][Math.floor(Math.random() * 2)];
        }
        break;

      case moveDirections.STRAIGHT_RIGHT:
        if (this.isNotBorder(moveMethods.STRAIGHT_UP(this.ballCoordinates))) {
          if (
            this.isNotBorder(moveMethods.STRAIGHT_DOWN(this.ballCoordinates))
          ) {
            this.#currentMoveDirection = [
              moveDirections.DIAGONAL_DOWN_LEFT,
              moveDirections.DIAGONAL_UP_LEFT,
              moveDirections.STRAIGHT_LEFT,
            ][Math.floor(Math.random() * 3)];
          } else {
            this.#currentMoveDirection = [
              moveDirections.STRAIGHT_UP,
              moveDirections.DIAGONAL_UP_LEFT,
            ][Math.floor(Math.random() * 2)];
          }
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_DOWN,
            moveDirections.DIAGONAL_DOWN_LEFT,
          ][Math.floor(Math.random() * 2)];
        }
        break;

      case moveDirections.STRAIGHT_LEFT:
        if (this.isNotBorder(moveMethods.STRAIGHT_UP(this.ballCoordinates))) {
          if (
            this.isNotBorder(moveMethods.STRAIGHT_DOWN(this.ballCoordinates))
          ) {
            this.#currentMoveDirection = [
              moveDirections.DIAGONAL_DOWN_RIGHT,
              moveDirections.DIAGONAL_UP_RIGHT,
              moveDirections.STRAIGHT_RIGHT,
            ][Math.floor(Math.random() * 3)];
          } else {
            this.#currentMoveDirection = [
              moveDirections.STRAIGHT_UP,
              moveDirections.DIAGONAL_UP_RIGHT,
            ][Math.floor(Math.random() * 2)];
          }
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_DOWN,
            moveDirections.DIAGONAL_DOWN_RIGHT,
          ][Math.floor(Math.random() * 2)];
        }
        break;

      case moveDirections.DIAGONAL_DOWN_LEFT:
        if (
          this.isNotBorder(moveMethods.STRAIGHT_DOWN(this.ballCoordinates)) &
          this.isNotBorder(
            moveMethods.DIAGONAL_DOWN_RIGHT(this.ballCoordinates)
          )
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_DOWN_RIGHT;
        } else if (
          this.isNotBorder(moveMethods.STRAIGHT_LEFT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_UP_LEFT;
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_UP,
            moveDirections.STRAIGHT_RIGHT,
            moveDirections.DIAGONAL_UP_RIGHT,
          ][Math.floor(Math.random() * 3)];
        }
        break;

      case moveDirections.DIAGONAL_DOWN_RIGHT:
        if (
          this.isNotBorder(moveMethods.STRAIGHT_DOWN(this.ballCoordinates)) &
          this.isNotBorder(moveMethods.DIAGONAL_DOWN_LEFT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_DOWN_LEFT;
        } else if (
          this.isNotBorder(moveMethods.STRAIGHT_RIGHT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_UP_RIGHT;
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_UP,
            moveDirections.STRAIGHT_LEFT,
            moveDirections.DIAGONAL_UP_LEFT,
          ][Math.floor(Math.random() * 3)];
        }
        break;

      case moveDirections.DIAGONAL_UP_LEFT:
        if (
          this.isNotBorder(moveMethods.STRAIGHT_UP(this.ballCoordinates)) &
          this.isNotBorder(moveMethods.DIAGONAL_UP_RIGHT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_UP_RIGHT;
        } else if (
          this.isNotBorder(moveMethods.STRAIGHT_LEFT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_DOWN_LEFT;
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_DOWN,
            moveDirections.STRAIGHT_RIGHT,
            moveDirections.DIAGONAL_DOWN_RIGHT,
          ][Math.floor(Math.random() * 3)];
        }
        break;

      case moveDirections.DIAGONAL_UP_RIGHT:
        if (
          this.isNotBorder(moveMethods.STRAIGHT_UP(this.ballCoordinates)) &
          this.isNotBorder(moveMethods.DIAGONAL_UP_LEFT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_UP_LEFT;
        } else if (
          this.isNotBorder(moveMethods.STRAIGHT_RIGHT(this.ballCoordinates))
        ) {
          this.#currentMoveDirection = moveDirections.DIAGONAL_DOWN_RIGHT;
        } else {
          this.#currentMoveDirection = [
            moveDirections.STRAIGHT_DOWN,
            moveDirections.STRAIGHT_LEFT,
            moveDirections.DIAGONAL_DOWN_LEFT,
          ][Math.floor(Math.random() * 3)];
        }
        break;
    }
  }
}
