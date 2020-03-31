export default class Print {
  name: string = "<EMPTY>";
  linkToStl: string = "<EMPTY>";

  public constructor(init?: Partial<Print>) {
    Object.assign(this, init);
  }
}
