import PrintsStoreBase from "./PrintsStoreBase";
import { Print } from "../ServerAPI/Print";

export class PrintsStore extends PrintsStoreBase<Print> {
  protected async _loadPrintsFromServer(): Promise<Print[]> {
    return await this.serverConnector.getAllPrints();
  }
}
