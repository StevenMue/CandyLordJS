export default class Player {
  candies;
  city;
  money=0;
  space=0;

  constructor(candies, city, money, space) {
    this.candies = new Map();

    candies.forEach((value, key)=>{
      this.candies.set(key, 0);
    });

    this.city = city;
    this.money = money;
    this.space = space;
  }

  travel(city) {
    if (city === this.city || city.cost > this.money) {
      return false;
    }
    this.city = city.name;
    this.subMoney(city.cost);
    return true;
  }

  addMoney(value) {
    this.money += value;
  }

  subMoney(value) {
    this.money -= value;
  }

  addItem(candy, amount) {
      let playerCandy = this.candies.get(candy.name);
      this.candies.set(candy.name, (Number(playerCandy) + Number(amount)));
      this.space -= amount;
  }

  subItem(candy, amount) {
    let playerCandy = this.candies.get(candy.name);
    this.candies.set(candy.name, (Number(playerCandy) - Number(amount)));
    this.space += amount;
  }

  buy(candy, amount) {
    if (amount >= this.space) {
      amount = this.space;
    }
    if (candy.value * amount >= this.money) {
      amount = Math.floor(this.money / (candy.value * amount));
    }
    this.addItem(candy, amount);
    this.subMoney(amount * candy.value);
    return amount;
  }
  takeCandy(candy, amount){
    if (amount >= this.space) {
      amount = this.space;
    }
    this.addItem(candy, amount);
    return amount;
  }
  takeMoney(amount){
    this.addMoney(amount);
  }

  sell(candy, amount) {
    if (amount > this.candies.get(candy.name)) {
      amount = this.candies.get(candy.name);
    }
    this.subItem(candy, amount);
    this.subMoney(amount * candy.value);
    return amount;
  }

  storeCandy(candy, amount){
    if (amount > this.candies.get(candy.name)) {
      amount = this.candies.get(candy.name);
    }
    this.subItem(candy, amount);
    return amount;
  }
  storeMoney(amount){
    if (amount > this.money) {
      amount = Math.floor(this.money / (candy.value * amount));
    }
    this.subMoney(amount);
    return amount;
  }
}
