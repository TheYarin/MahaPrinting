import { observable } from "mobx";
import { ServerConnector, PrintStatus, UserPrint } from "../ServerAPI";

export default abstract class PrintsStoreBase<TPrint extends UserPrint> {
  @observable public prints = new Array<TPrint>();
  protected serverConnector: ServerConnector;

  protected abstract async _getPrints(): Promise<TPrint[]>;

  public constructor(serverConnector: ServerConnector) {
    this.serverConnector = serverConnector;
  }

  public async initialize(): Promise<void> {
    const userPrintsFromTheServer = await this._getPrints();

    this.prints.push(...userPrintsFromTheServer);
  }

  public async cancelPrint(printId: number): Promise<void> {
    await this.serverConnector.cancelPrint(printId);
    const printToCancel = this.prints.find((p) => p.id === printId);

    if (printToCancel === undefined) throw new Error("Tried to cancel a print that cannot be found in the print store");

    printToCancel.status = PrintStatus.CANCELED;
  }
}
