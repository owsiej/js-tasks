import { board as exampleInput } from "./const/example-input.js";
import { BoardEngine } from "./classes/board-engine.js";

const board = new BoardEngine(exampleInput);
board.createBoardVisualization();
board.findFieldSquaresNearBallAndChoseOne();

const ballCords = board.ballCoordinates;
const nextMove = board.nextPossibleMove;

board.getMoveDirection(ballCords, nextMove);

setInterval(() => {
  board.updateBallPosition();

  if (!board.makeMove()) {
    board.makeBounce();
    board.makeMove();
  }
}, 100);
