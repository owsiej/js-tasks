export function randomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
