const cardSuits = ["clubs", "diamonds", "hearts", "spades"];
const cardFaces = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "as",
];
const royalFlushScheme = ["10", "jack", "queen", "king", "as"];
const straightException = ["2", "3", "4", "5", "as"];

module.exports = {
    cardFaces,
    cardSuits,
    straightException,
    royalFlushScheme,
  };
  