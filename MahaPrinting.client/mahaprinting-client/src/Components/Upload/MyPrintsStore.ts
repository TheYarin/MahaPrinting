import { observable } from "mobx";
import Print from "./Print";

export default class MyPrintsStore {
  prints = observable(new Array<Print>());

  add(file: File, name: string): Print {
    const print = new Print({ name, linkToStl: "LINK_TO_STL" });
    this.prints.push(print);

    return print;
  }
}
