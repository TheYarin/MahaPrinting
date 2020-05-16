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

  protected _getPrint(printId: number): TPrint {
    const print = this.prints.find((p) => p.id === printId);

    if (print === undefined) throw new Error("Tried to access a print that cannot be found in the print store");

    return print;
  }

  public async initialize(): Promise<void> {
    const printsFromTheServer = await this._loadPrintsFromServer();

    this.prints.push(...printsFromTheServer);
  }

  public async cancelPrint(printId: number): Promise<void> {
    const printToCancel = this._getPrint(printId);

    await this.serverConnector.cancelPrint(printId);
    printToCancel.status = PrintStatus.CANCELED;
  }
}
