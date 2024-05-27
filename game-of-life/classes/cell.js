import { cellStatus } from "../const/cell-status.js";

export class Cell extends HTMLElement {
  shouldChangeNextCellState;
  constructor(id) {
    super();

    this.id = `cell-${id[0]}-${id[1]}`;
  }

  connectedCallback() {
    this.className = cellStatus.DEATH;

    this.addEventListener("click", this.changeStatus);
  }

  changeStatus() {
    this.classList.contains(cellStatus.ALIVE)
      ? (this.className = cellStatus.DEATH)
      : (this.className = cellStatus.ALIVE);
  }

  killCell() {
    this.className = cellStatus.DEATH;
  }
  isCellAlive() {
    return this.className === cellStatus.ALIVE;
  }

  updateStatus() {
    this.shouldChangeNextCellState ? this.changeStatus() : null;
    return this.shouldChangeNextCellState;
  }
}
