import { randomNumber } from "./utility.js";

export class Board {
  constructor(cardsRange) {
    this._cardsRange = Array.from({ length: cardsRange }, (_, i) =>
      i.toString()
    );
    this.board = this.#creteBoard();
    this.unGuessedIndexes = Array.from(
      { length: this.board.length },
      (_, i) => i
    );
    this.players = [];
  }

  #creteBoard() {
    const board = [];
    const cards = this._cardsRange.concat(this._cardsRange);
    for (let i = 0; i < this._cardsRange.length * 2; i++) {
      board[i] = cards.splice(randomNumber(cards.length), 1)[0];
    }
    return board;
  }

  removeFoundCards(card, foundIndexes) {
    this.unGuessedIndexes = this.unGuessedIndexes.filter(
      (index) => !foundIndexes.includes(index)
    );
    for (const player of this.players) {
      player.deletedGuessedCard(card);
    }
  }
  pickCard(index) {
    return this.board[index];
  }
  registerPlayers(players) {
    this.players = players;
  }
}
