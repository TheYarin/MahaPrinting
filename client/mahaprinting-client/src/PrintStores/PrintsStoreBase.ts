import { observable } from "mobx";
import { ServerConnector } from "../ServerAPI/ServerConnector";
import { PrintStatus } from "../ServerAPI/PrintStatus";
import { UserPrint } from "../ServerAPI/UserPrint";

export default abstract class PrintsStoreBase<TPrint extends UserPrint> {
  @observable public prints = new Array<TPrint>();
  public serverConnector: ServerConnector;

  public constructor(serverConnector: ServerConnector) {
    this.serverConnector = serverConnector;
  }

  protected abstract async _loadPrintsFromServer(): Promise<TPrint[]>;

  public async initialize(): Promise<void> {
    const printsFromTheServer = await this._loadPrintsFromServer();

    this.prints.push(...printsFromTheServer);
  }

  public async cancelPrint(printId: number): Promise<void> {
    await this.serverConnector.cancelPrint(printId);
    const printToCancel = this.prints.find((p) => p.id === printId);

    if (printToCancel === undefined) throw new Error("Tried to cancel a print that cannot be found in the print store");

    printToCancel.status = PrintStatus.CANCELED;
  }
}
