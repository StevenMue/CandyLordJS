export default class  city{
  name;
  posX;
  posY;
  cost;

  constructor(name, posX, posY) {
    this.name=name;
    this.posX=posX;
    this.posY= posY;
  }

  calculateDistance(x,y){
    let dx = Math.abs(this.posX-x);
    let dy = Math.abs(this.posY-y);

    return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
  }

  calculateCosts(city){
    let distance = this.calculateDistance(city.posX, city.posY);
   this.cost= Math.floor(distance*20);
  }

  nextDay(){

  }
}
