export default class Bank {
  money=0;
  candies;
  debt=0;

  constructor(money, candies, debt) {
    this.money += money;
    this.candies = new Map();

    candies.forEach((value, key)=>{
      this.candies.set(value.name, 0);
    });
    this.debt = debt;

  }

  addMoney(value) {
    this.money += Number(value);
  }

  subMoney(value) {
    if (value >= this.money) {
      value=this.money;
    }
    this.money -= value;
    return value;
  }

  addCandy(candy, amount) {
    let bankCandy = this.candies.get(candy.name);
    this.candies.set(candy.name, Number(bankCandy) + Number(amount));
  }

  subCandy(candy, amount) {
    let bankCandy = this.candies.get(candy.name);
    if (bankCandy< amount) {
      amount = bankCandy;
    }
      this.candies.set(candy.name, Number(bankCandy) - Number(amount));
    return amount;
  }

  addDebt(value) {
    if (this.debt === 0) {
      this.debt += value;
      return value;
    } else {
      return false
    }
  }

  subDebt(value) {
    if (value > this.debt) {
      this.money = value - this.debt;
      this.debt = 0;
      return true;
    } else {
      this.debt -= value;
    }
  }

  nextDay() {
    let interestChargesDebt = 0.10;
    let interestChargesStored = 0.05;
    this.money += (this.money / 100) * interestChargesStored;
    this.debt += (this.debt / 100) * interestChargesDebt;
  }
}
