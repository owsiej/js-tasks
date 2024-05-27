const {
  createDeckOfCards,
  shuffleDeckAndDraw5Cards,
} = require("./utility/deck-creations");

const {
  areCardsSameSuit,
  areCardsSequential,
  isRoyalFlush,
  groupCardsByFace,
  findDuplicates,
} = require("./utility/poker-schemas");

function findCardLineUp(cards) {
  if (areCardsSequential(cards)) {
    if (areCardsSameSuit(cards)) {
      if (isRoyalFlush(cards)) {
        return "I-N-C-R-E-D-I-B-L-E. You got the highest of all. ROYAL FLUSH.";
      } else {
        return "Seriously? It's freaking STRAIGHT FLUSH.";
      }
    } else {
      return "BRO, yooo. It's STRAIGHT.";
    }
  } else {
    const areDuplicates = findDuplicates(groupCardsByFace(cards));
    if (areDuplicates) {
      return areDuplicates;
    } else {
      return areCardsSameSuit(cards)
        ? `YAY. It's FLASH with suit ${cards[0].suit}.`
        : `Maybe next time. It's only HIGH CARD with ${cards.pop().face}.`;
    }
  }
}

const deckOfCards = createDeckOfCards();
const drawnCards = shuffleDeckAndDraw5Cards(deckOfCards);
console.log("Your cards: ");
drawnCards.forEach((card) => console.log(`${card.face}, ${card.suit}`));

console.log(findCardLineUp(drawnCards));
