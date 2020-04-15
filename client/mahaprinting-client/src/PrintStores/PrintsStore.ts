import PrintsStoreBase from "./MyPrintsStore";
import { Print } from "../ServerAPI";

export class PrintsStore extends PrintsStoreBase<Print> {
  protected async _getPrints(): Promise<Print[]> {
    return await this.serverConnector.getAllPrints();
  }
}
