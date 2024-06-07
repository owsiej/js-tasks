export class Player {
  constructor(id) {
    this.id = id;
    this.points = 0;
    this.guessedCards = {};
    this.mediator = null;
  }

  setMediator(mediator) {
    this.mediator = mediator;
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

  getPossibleGuesses() {
    const guessedIndexes = Object.values(this.guessedCards).flat();
    return this.mediator.unGuessedIndexes.filter(
      (i) => !guessedIndexes.includes(i)
    );
  }
}
