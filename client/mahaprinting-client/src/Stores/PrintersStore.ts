import { observable } from "mobx";
import { ServerConnector } from "../ServerAPI/ServerConnector";
import Printer from "../ServerAPI/Printer";

export default class PrintersStore {
  @observable public printers = new Array<Printer>();
  private serverConnector: ServerConnector;

  public constructor(serverConnector: ServerConnector) {
    this.serverConnector = serverConnector;
  }

  public async initialize(): Promise<void> {
    const printersFromTheServer = await this.serverConnector.getPrinters();

    this.printers.push(...printersFromTheServer);
  }

  public async addPrinter(printerName: string, url: string, apiKey: string): Promise<void> {
    const printer = await this.serverConnector.addPrinter(printerName, url, apiKey);
    this.printers.push(printer);
  }
}
