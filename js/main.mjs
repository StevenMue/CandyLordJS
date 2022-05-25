import Candy from "./candy.mjs";
import Bank from "./bank.mjs";
import City from "./city.mjs";
import Player from "./player.mjs";
import city from "./city.mjs";


let startMoney=2000;
let space=100;
let days=0;
let startCity=new City("CENTRAL",0,2);
let cities = new Map();
let candies = new Map();
let state = "MAIN";

let travelButtons = new Map();
let marketPrices = new Map();
let travelPrices = new Map();
let marketButton = document.getElementById("marketButton");
let bankButton = document.getElementById("bankButton");
let dayLabel = document.getElementById("dayLabel");
let playerMoney = document.getElementById("playerMoney");
let playerCity = document.getElementById("playerCity");
let bankActionWindow = document.getElementById("takeStoreBackground");
let marketActionWindow = document.getElementById("sellBuyBackground");
let actionButton = document.getElementById("actionButton");
let menuButton = document.getElementById("menuButton");
let travelLabel = document.getElementById("travelLabel");

let bronxButton=document.getElementById("BRONX");
let ghettoButton = document.getElementById("GHETTO");
let centralButton = document.getElementById("CENTRAL");
let brooklynButton = document.getElementById("BROOKLYN");
let coneyIslandButton = document.getElementById("CONEY_ISLAND");
let manhattanButton = document.getElementById("MANHATTAN");

travelButtons.set("BRONX",bronxButton);
travelButtons.set("GHETTO",ghettoButton);
travelButtons.set("CENTRAL", centralButton);
travelButtons.set("BROOKLYN", brooklynButton);
travelButtons.set("CONEY ISLAND",coneyIslandButton);
travelButtons.set("MANHATTAN",manhattanButton);

travelPrices.set("BRONX", document.getElementById("bronxCost"));
travelPrices.set("GHETTO", document.getElementById("ghettoCost"));
travelPrices.set("CENTRAL", document.getElementById("centralCost"));
travelPrices.set("BROOKLYN", document.getElementById("brooklynCost"));
travelPrices.set("CONEY ISLAND", document.getElementById("coneyIslandCost"));
travelPrices.set("MANHATTAN", document.getElementById("manhattanCost"));

marketPrices.set("BONBON",document.getElementById("marketBonbon"));
marketPrices.set("CHOCOLATE", document.getElementById("marketChocolate"));
marketPrices.set("GUM", document.getElementById("marketChips"));
marketPrices.set("CHIPS", document.getElementById("marketChips"));
marketPrices.set("JELLY", document.getElementById("marketJelly"));
marketPrices.set("SHOWER_ROD", document.getElementById("marketShowerRod"));


candies.set("BONBON", new Candy("BONBON",1 ,5));
candies.set("CHOCOLATE", new Candy("CHOCOLATE",3 ,10));
candies.set("GUM", new Candy("GUM",1 ,3));
candies.set("CHIPS", new Candy("CHIPS",3 ,7));
candies.set("JELLY", new Candy("JELLY",5 ,15));
candies.set("SHOWER_ROD", new Candy("SHOWER_ROD",7 ,20));
candies.forEach((value, key, ma)=>{
  value.calculatePrice();
});

cities.set("BRONX", new City("BRONX",3,0));
cities.set("GHETTO", new City("GHETTO",5,1));
cities.set("CENTRAL", startCity);
cities.set("MANHATTAN", new City("MANHATTAN",4,4));
cities.set("CONEY ISLAND", new City("CONEY ISLAND",3,5));
cities.set("BROOKLYN", new City("BROOKLYN",-2,6));
cities.forEach((value, key, ma)=>{
  value.calculateCosts(startCity);
});

let player = new Player(candies, startCity.name, startMoney, space);
let bank = new Bank(0, candies, 0);
bankActionWindow.style.visibility = "hidden";
marketActionWindow.style.visibility = "hidden";
actionButton.style.visibility = "hidden";

// buttonBuy.addEventListener("click", ev => {
//   let input = window.prompt("How much?",0);
//   player.buy(candies.get("BONBON"),input);
//   alert("Player bought: "+player.candies.get("BONBON"));
// });

function buy(){
  let amount = document.getElementById("buyAmountArea").value;
  if(is_numeric(amount)){
    let buyList = document.getElementById("buySelect");
    let candyToBuy = buyList.options[buyList.selectedIndex].value;
    player.buy(candies.get(candyToBuy), amount);
  }
}

function sell(){
  let amount = document.getElementById("sellAmountArea").value;
  if(is_numeric(amount)) {
    let sellList = document.getElementById("sellSelect");
    let candyToSell = sellList.options[sellList.selectedIndex].value;
    player.sell(candies.get(candyToSell), amount);
  }
}

function store(candy, amount){

}

function take(candy, amount){

}

function takeDebt(candy, amount){

}

function repayDebt(candy, amount){

}

function travel(){

}

function end(){
  score();
}

function score(){
  return (player.money+bank.money)-bank.debt;
}

function nextDay(){
  bank.nextDay();
  cities.forEach((value, key, ma)=>{
    value.calculateCosts(cities.get(player.city));
  });
  candies.forEach((value, key, ma)=>{
    value.calculatePrice();
  });
  days++;
  update();
}

function update(){
  cities.forEach((value, key, ma)=>{
    if(value.name === player.city){
      travelPrices.get(value.name).style.visibility="hidden";
      travelButtons.get(value.name).style.visibility="hidden";
    }else {
      travelPrices.get(value.name).innerHTML = `${value.cost}€`;
      travelPrices.get(value.name).style.visibility="visible";
      travelButtons.get(value.name).style.visibility="visible";
    }
    candies.forEach((value, key, ma)=>{
      marketPrices.get(value.name).innerHTML = `${value.value}€`;
    });
    document.getElementById("BankGUM").innerHTML=`${bank.candies.get("GUM")}`
    document.getElementById("BankJELLY").innerHTML=`${bank.candies.get("JELLY")}`
    document.getElementById("BankCHIPS").innerHTML=`${bank.candies.get("CHIPS")}`
    document.getElementById("BankCHOCOLATE").innerHTML=`${bank.candies.get("CHOCOLATE")}`
    document.getElementById("BankSHOWER_ROD").innerHTML=`${bank.candies.get("SHOWER_ROD")}`
    document.getElementById("BankBONBON").innerHTML=`${bank.candies.get("BONBON")}`
    document.getElementById("PlayerGUM").innerHTML=`${player.candies.get("GUM")}`
    document.getElementById("PlayerJELLY").innerHTML=`${player.candies.get("JELLY")}`
    document.getElementById("PlayerCHIPS").innerHTML=`${player.candies.get("CHIPS")}`
    document.getElementById("PlayerCHOCOLATE").innerHTML=`${player.candies.get("CHOCOLATE")}`
    document.getElementById("PlayerSHOWER_ROD").innerHTML=`${player.candies.get("SHOWER_ROD")}`
    document.getElementById("PlayerBONBON").innerHTML=`${player.candies.get("BONBON")}`
    document.getElementById("playerMoney").innerHTML=`${player.money}`;
    document.getElementById("playerCity").innerHTML=`${player.city}`;
    document.getElementById("bankMoney").innerHTML=`${bank.money}`;
    document.getElementById("dayLabel").innerHTML=`${days}`;
  });
}


/**
 * Quelle: https://stackoverflow.com/questions/8935632/check-if-character-is-number
 * @param str
 * @returns {boolean}
 */
function is_numeric(str){
  return /^\d+$/.test(str);
}

marketButton.addEventListener("click", ev =>{
  marketButton.style.visibility="hidden";
  bankButton.style.visibility="hidden";
  marketActionWindow.style.visibility="visible";
  actionButton.style.visibility="visible";
  menuButton.style.visibility="hidden";
  travelLabel.style.visibility="hidden";
  document.getElementById("bankTable").style.visibility="hidden";
  document.getElementById("bankMoney").style.visibility="hidden";
  document.getElementById("bankMoneyLabel").style.visibility="hidden";
  state="MARKET";
});
bankButton.addEventListener("click", ev =>{
  marketButton.style.visibility="hidden";
  bankButton.style.visibility="hidden";
  bankActionWindow.style.visibility="visible";
  actionButton.style.visibility="visible";
  menuButton.style.visibility="hidden";
  travelLabel.style.visibility="hidden";
  document.getElementById("marketLabels").style.visibility="hidden";
  state="BANK";
});

actionButton.addEventListener("click", ev => {
  if(state==="MARKET"){
    buy();
    sell();
  }
  if(state==="BANK"){
    let moneySelect = document.getElementById("moneySelect");
    let candyActionSelect = document.getElementById("candyTakeStoreSelect");
    let candySelect = document.getElementById("candySelect");
    let moneyOption = moneySelect.options[moneySelect.selectedIndex].value;
    let candyOption = candyActionSelect.options[candyActionSelect.selectedIndex].value;
    let candy = candySelect.options[candySelect.selectedIndex].value;
    let candyAmount = document.getElementById("candyAmountArea").value;
    let moneyAmount = document.getElementById("moneyAmountArea").value;

    if(moneyOption==="STORE"){
      if(is_numeric(moneyAmount)){
        bank.addMoney(player.storeMoney(moneyAmount));
      }
    }else{
      if(is_numeric(moneyAmount)){
        player.addMoney(bank.subMoney(moneyAmount));
      }
    }

    if(candyOption==="STORE"){
      if(is_numeric(candyAmount)) {
        bank.addCandy(candies.get(candy), player.storeCandy(candies.get(candy), candyAmount));
      }
    }else{
      if(is_numeric(candyAmount)) {
        player.addItem(candies.get(candy), bank.subCandy(candies.get(candy), candyAmount));
      }
    }
  }

  marketButton.style.visibility="visible";
  bankButton.style.visibility="visible";
  marketActionWindow.style.visibility="hidden";
  bankActionWindow.style.visibility="hidden";
  actionButton.style.visibility="hidden";
  menuButton.style.visibility="visible";
  travelLabel.style.visibility="visible";
  document.getElementById("bankTable").style.visibility="visible";
  document.getElementById("bankMoney").style.visibility="visible";
  document.getElementById("bankMoneyLabel").style.visibility="visible";
  document.getElementById("marketLabels").style.visibility="visible";
  update();
  state="MAIN";
});

bronxButton.addEventListener("click", ev=>{
  if(state === "MAIN") {
    if(player.travel(cities.get("BRONX"))) {
      nextDay();
    }
  }
});
ghettoButton.addEventListener("click", ev=>{
  if(state === "MAIN") {
    if(player.travel(cities.get("GHETTO"))) {
      nextDay();
    }
  }
});
centralButton.addEventListener("click", ev=> {
  if (state === "MAIN") {
    if(player.travel(cities.get("CENTRAL"))) {
      nextDay();
    }
}
});
brooklynButton.addEventListener("click", ev=> {
  if (state === "MAIN") {
    if(player.travel(cities.get("BROOKLYN"))) {
      nextDay();
    }
}
});
coneyIslandButton.addEventListener("click", ev=> {
  if (state === "MAIN") {
    if(player.travel(cities.get("CONEY ISLAND"))) {
      nextDay();
    }
}
});
manhattanButton.addEventListener("click", ev=> {
  if (state === "MAIN") {
    if (player.travel(cities.get("MANHATTAN"))) {
      nextDay();
  }
}
});

update();
