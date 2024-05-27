const { cardSuits, cardFaces } = require("../const/list-of-cards.js");

function createDeckOfCards() {
  const deckOfCards = [];
  for (const cardFace of cardFaces) {
    for (const cardSuit of cardSuits) {
      deckOfCards.push({
        face: cardFace,
        suit: cardSuit,
      });
    }
  }
  return deckOfCards;
}

function shuffleDeckAndDraw5Cards(deck) {
  for (let i = 0; i < deck.length; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
  return sortCardsInHand(deck.slice(0, 5));
}

function sortCardsInHand(cards) {
  const faceWeights = cardFaces.reduce(
    (acc, face, idx) => ({ ...acc, [face]: idx + 1 }),
    {}
  );
  return cards.sort((a, b) => faceWeights[a.face] - faceWeights[b.face]);
}

module.exports = {
  createDeckOfCards,
  shuffleDeckAndDraw5Cards,
};
