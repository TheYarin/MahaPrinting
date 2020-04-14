import { observable } from "mobx";
import { ServerConnector, UserPrint, PrintStatus } from "../../ServerAPI";

export default class MyPrintsStore {
  @observable public prints = new Array<UserPrint>();
  private serverConnector: ServerConnector;

  public constructor(serverConnector: ServerConnector) {
    this.serverConnector = serverConnector;
  }

  public async initialize(): Promise<void> {
    const userPrintsFromTheServer = await this.serverConnector.getUserPrints();
    this.prints.push(...userPrintsFromTheServer);
  }

  public async add(name: string, contactDetails: string, file: File): Promise<void> {
    const userPrint = await this.serverConnector.uploadUserPrint(name, contactDetails, file);
    this.prints.push(userPrint);
  }

  public async cancelPrint(printId: number): Promise<void> {
    await this.serverConnector.cancelPrint(printId);
    const printToCancel = this.prints.find((p) => p.id === printId);

    if (printToCancel === undefined) throw new Error("Tried to cancel a print that cannot be found in the print store");

    printToCancel.status = PrintStatus.CANCELED;
  }
}
