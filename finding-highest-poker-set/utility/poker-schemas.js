const {
  cardFaces,
  royalFlushScheme,
  straightException,
} = require("../const/list-of-cards.js");

function areCardsSequential(cards) {
  if (cards.map((c) => c.face).join() === straightException.join()) {
    return true;
  }
  let startIndex = cardFaces.indexOf(cards[0].face);
  for (const card of cards) {
    if (card.face !== cardFaces[startIndex]) {
      return false;
    }
    startIndex++;
  }
  return true;
}

function areCardsSameSuit(cards) {
  return new Set(cards.map((c) => c.suit)).size === 1;
}

function isRoyalFlush(cards) {
  return cards.map((c) => c.face).join() === royalFlushScheme.join();
}

function groupCardsByFace(cards) {
  const groupedCards = cards.reduce((acc, card) => {
    const accKey = card.face;
    return {
      ...acc,
      [accKey]: acc[accKey] ? (acc[accKey] += 1) : 1,
    };
  }, {});
  return Object.entries(groupedCards).sort((a, b) => b[1] - a[1]);
}
function findDuplicates(groupedCards) {
  const topCount = groupedCards[0];
  const nextCount = groupedCards[1];

  if (topCount[1] === 4) {
    return `WOAH. You have got FOUR OF A KIND with ${topCount[0]}.`;
  } else if (topCount[1] === 3) {
    if (nextCount[1] === 2) {
      return `Nice one. You have got FULL HOUSE with three ${topCount[0]}'s and two ${nextCount[0]}'s.`;
    } else {
      return `Not bad. You have got THREE OF A KIND with three ${topCount[0]}'s.`;
    }
  } else if (topCount[1] === 2) {
    if (nextCount[1] === 2) {
      return `Congratz. You have got TWO PAIRS with two ${topCount[0]}'s and two ${nextCount[0]}'s.`;
    } else {
      return `Could have been worse. You have got ONE PAIR with two ${topCount[0]}'s.`;
    }
  }

  return false;
}

module.exports = {
  areCardsSameSuit,
  areCardsSequential,
  isRoyalFlush,
  groupCardsByFace,
  findDuplicates,
};
