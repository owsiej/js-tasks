import { Cell } from "./classes/cell.js";
import { GameBoard } from "./classes/game-board.js";

customElements.define("game-cell", Cell);

const gameBoard = new GameBoard(50, 50);

gameBoard.createBoard();

function updateButtonStatuses(val) {
  resetButton.disabled = val;
  startButton.disabled = val;
  stopButton.disabled = !val;
}

const resetButton = document.getElementById("button-reset");
resetButton.addEventListener("click", gameBoard.resetBoard.bind(gameBoard));

const startButton = document.getElementById("button-start");
startButton.addEventListener("click", gameBoard.startGame.bind(gameBoard));
startButton.addEventListener("click", () => updateButtonStatuses(true));

const stopButton = document.getElementById("button-stop");
stopButton.addEventListener("click", gameBoard.stopGame.bind(gameBoard));
stopButton.addEventListener("click", () => updateButtonStatuses(false));

updateButtonStatuses(false);
