export default class  Candy {
  name;
  min;
  max;
  value;

  constructor(name, min, max) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.calculatePrice();
  }

  calculatePrice() {
    this.value = Math.floor(Math.random() * (this.max + 1)) + this.min;
    return this.value;
  }

  nextDay() {
    this.value = this.calculatePrice();
  }
}
