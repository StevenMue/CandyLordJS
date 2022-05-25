export default class Error {
  msg;
  type;

  constructor(type) {
    let t = ""+type;
    t.toUpperCase();
    switch (t.toUpperCase()){
      case "NOT_ENOUGH_MONEY": this.type = t;break;
      case "NOT_ENOUGH_SPACE": this.type = t;break;
      case "NOT_ENOUGH_CANDY": this.type = t;break;
      case "SAME_TOWN": this.type = t;break;
      case "HAS_DEBT": this.type = t;break;
      default: this.type="UNKNOWN";
    }

  }
}
