import PrintsStoreBase from "./PrintsStoreBase";
import { Print } from "../ServerAPI/Print";
import { PrintStatus } from "../ServerAPI/PrintStatus";

export class PrintsStore extends PrintsStoreBase<Print> {
  protected async _loadPrintsFromServer(): Promise<Print[]> {
    return await this.serverConnector.getAllPrints();
  }

  public async markPrintAsCompleted(printId: number): Promise<void> {
    const print = this._getPrint(printId);

    await this.serverConnector.markPrintAsCompleted(printId);
    print.status = PrintStatus.COMPLETED;
  }
}
