import { observable } from "mobx";
import { ServerConnector } from "../ServerAPI/ServerConnector";
import Printer from "../ServerAPI/Printer";
import AddPrinterResult from "../ServerAPI/AddPrinterResult";
import AddPrinterWithApiKeyResult from "../ServerAPI/AddPrinterWithApiKeyResult";

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

  public async addPrinter(printerName: string, url: string, user?: string): Promise<AddPrinterResult> {
    // await sleep(1500);
    // return AddPrinterResult.WORKFLOW_UNSUPPORTED;

    const [result, printer] = await this.serverConnector.addPrinter(printerName, url, user);

    if (result === AddPrinterResult.SUCCESS && printer) this.printers.push(printer);

    return result;
  }

  public async addPrinterWithApiKey(printerName: string, url: string, apiKey: string): Promise<AddPrinterWithApiKeyResult> {
    const [result, printer] = await this.serverConnector.addPrinterWithApiKey(printerName, url, apiKey);

    if (result === AddPrinterWithApiKeyResult.SUCCESS && printer) this.printers.push(printer);

    return result;
  }
}
