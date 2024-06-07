import { Board } from "./board.js";
import { Player } from "./player.js";
import { randomNumber } from "./utility.js";

const playBoard = new Board(10);

const players = Array.from(
  { length: randomNumber(5, 2) },
  (_, i) => new Player(i + 1)
);
playBoard.registerPlayers(players);

console.log(`Board: ${playBoard.board}`);
console.log(`Players in game: ${players.length}\n`);
while (playBoard.unGuessedIndexes.length > 0) {
  for (const player of players) {
    console.log(
      `Currently playing player ${player.id} with ${player.points} points.`
    );
    console.log(`Player guessed cards: ${Object.keys(player.guessedCards)}`);
    for (let i = 0; i < 2; i++) {
      const guessedCards = player.getGuessedPair();
      if (guessedCards) {
        const [card, indexes] = guessedCards;
        console.log(`Found pair of ${card}`);
        player.addPoint();
        playBoard.removeFoundCards(card, indexes);
        break;
      } else {
        const availableGuesses = player.getPossibleGuesses(
          playBoard.unGuessedIndexes
        );

        const indexGuess =
          availableGuesses[randomNumber(availableGuesses.length)];
        const pickedCard = playBoard.pickCard(indexGuess);
        player.addCard(pickedCard, indexGuess);
        console.log(`Added card ${pickedCard} found at index ${indexGuess}`);
      }
    }
    console.log(`Unguessed indexes on board: ${playBoard.unGuessedIndexes}\n`);
    if (playBoard.unGuessedIndexes.length === 0) {
      break;
    }
  }
}
players
  .sort((p1, p2) => p2.points - p1.points)
  .forEach((p) => {
    console.log(`Player ${p.id} with ${p.points} points.`);
  });
