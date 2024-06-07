export class Player {
  constructor(id) {
    this.id = id;
    this.points = 0;
    this.guessedCards = {};
  }

  getGuessedPair() {
    return Object.entries(this.guessedCards).find(
      ([_, indexes]) => indexes.length === 2
    );
  }
  addPoint() {
    this.points++;
  }

  deletedGuessedCard(guessedCard) {
    delete this.guessedCards[guessedCard];
  }

  addCard(card, index) {
    this.guessedCards = {
      ...this.guessedCards,
      [card]: this.guessedCards[card]
        ? [...this.guessedCards[card], index]
        : [index],
    };
  }

  getPossibleGuesses(guesses) {
    const guessedIndexes = Object.values(this.guessedCards).flat();
    return guesses.filter((i) => !guessedIndexes.includes(i));
  }
}
