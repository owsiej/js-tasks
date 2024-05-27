class JosephusProblem {
  constructor(numberOfSoldiers, step) {
    this.step = step;
    this.numberOfSoldiers = Array.from(
      { length: numberOfSoldiers },
      (val, idx) => idx + 1
    );
  }

  #fight() {
    let currentIndex = 0;
    while (this.numberOfSoldiers.length != 1) {
      const shootingSoldier =
        this.numberOfSoldiers[currentIndex % this.numberOfSoldiers.length];
      currentIndex = (currentIndex + this.step) % this.numberOfSoldiers.length;
      const killedSoldier = this.numberOfSoldiers[currentIndex];
      console.log(`${shootingSoldier} Kills ${killedSoldier}`);
      this.numberOfSoldiers.splice(currentIndex, 1);
    }
  }

  findSurvivor() {
    this.#fight();
    console.log(`${this.numberOfSoldiers[0]} Remains alive`);
  }
}

const problem = new JosephusProblem(7, 1);

problem.findSurvivor();
