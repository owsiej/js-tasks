export const moveDirections = {
  STRAIGHT_DOWN: "STRAIGHT_DOWN",
  STRAIGHT_UP: "STRAIGHT_UP",
  STRAIGHT_RIGHT: "STRAIGHT_RIGHT",
  STRAIGHT_LEFT: "STRAIGHT_LEFT",
  DIAGONAL_DOWN_RIGHT: "DIAGONAL_DOWN_RIGHT",
  DIAGONAL_DOWN_LEFT: "DIAGONAL_DOWN_LEFT",
  DIAGONAL_UP_RIGHT: "DIAGONAL_UP_RIGHT",
  DIAGONAL_UP_LEFT: "DIAGONAL_UP_LEFT",
};

export const moveMethods = {
  STRAIGHT_DOWN: function moveStraightDown(cords) {
    let [x, y] = cords;
    return [++x, y];
  },
  STRAIGHT_UP: function moveStraightUp(cords) {
    let [x, y] = cords;
    return [--x, y];
  },
  STRAIGHT_RIGHT: function moveStraightRight(cords) {
    let [x, y] = cords;
    return [x, ++y];
  },
  STRAIGHT_LEFT: function moveStraightLeft(cords) {
    let [x, y] = cords;
    return [x, --y];
  },
  DIAGONAL_DOWN_RIGHT: function moveDiagonalDownRight(cords) {
    let [x, y] = cords;
    return [++x, ++y];
  },
  DIAGONAL_DOWN_LEFT: function moveDiagonalDownLeft(cords) {
    let [x, y] = cords;
    return [++x, --y];
  },
  DIAGONAL_UP_RIGHT: function moveDiagonalUpRight(cords) {
    let [x, y] = cords;
    return [--x, ++y];
  },
  DIAGONAL_UP_LEFT: function moveDiagonalDownLeft(cords) {
    let [x, y] = cords;
    return [--x, --y];
  },
};
