import { UserPrint } from "./UserPrint";
import { Print } from "./Print";
import Printer from "./Printer";
import AddPrinterResult from "./AddPrinterResult";
import AddPrinterWithApiKeyResult from "./AddPrinterWithApiKeyResult";

// TODO maybe the conversion of JSON objects to domain objects should be done in the stores instead of here?
export class ServerConnector {
  private urlBase: string;

  public constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  public async initialize(): Promise<void> {
    await fetchWithCookies(this.urlBase + "/initialize");
  }

  public async getUserPrints(): Promise<UserPrint[]> {
    const response = await fetchWithCookies(this.urlBase + "/getUserPrints");
    const responseJson = await response.json();
    const userPrints = responseJson.map((p: any) => new UserPrint(p));

    return userPrints;
  }

  public async getAllPrints(): Promise<Print[]> {
    const response = await fetchWithCookies(this.urlBase + "/getAllPrints");

    const responseJson = await response.json();
    const prints = responseJson.map((p: any) => new Print(p));

    return prints;
  }

  public async uploadUserPrint(name: string, contactDetails: string, notes: string, file: File): Promise<UserPrint> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactDetails", contactDetails);
    formData.append("notes", notes);
    formData.append("file", file);

    const response = await postFormDataWithCookies(this.urlBase + "/uploadUserPrint", formData);
    const responseJson = await response.json();

    return new UserPrint(responseJson);
  }

  public async getPrintFile(printId: number): Promise<ArrayBuffer> {
    const response = await fetchWithCookies(this.urlBase + "/getPrintFile/" + printId);

    return await response.arrayBuffer();
  }

  public async cancelPrint(printId: number): Promise<void> {
    await postJsonWithCookies(this.urlBase + "/cancelPrint", { printId });
  }

  public async getPrinters(): Promise<Printer[]> {
    const response = await fetchWithCookies(this.urlBase + "/getPrinters");

    const responseJson = await response.json();
    const printers = responseJson.map((p: any) => new Printer(p));

    return printers;
  }

  public async addPrinter(printerName: string, url: string, user?: string): Promise<[AddPrinterResult, Printer?]> {
    const response = await postJsonWithCookies(this.urlBase + "/addPrinter", { printerName, url, user });
    const responseJson = await response.json();
    const maybePrinter = responseJson.printerInfo ? new Printer(responseJson.printerInfo) : undefined;

    return [responseJson.result as AddPrinterResult, maybePrinter];
  }

  public async addPrinterWithApiKey(
    printerName: string,
    url: string,
    apiKey: string
  ): Promise<[AddPrinterWithApiKeyResult, Printer?]> {
    const response = await postJsonWithCookies(this.urlBase + "/addPrinterWithApiKey", { printerName, url, apiKey });
    const responseJson = await response.json();
    const maybePrinter = responseJson.printerInfo ? new Printer(responseJson.printerInfo) : undefined;

    return [responseJson.result as AddPrinterWithApiKeyResult, maybePrinter];
  }
}

async function fetchWithCookies(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let initWithCookies = init;

  if (initWithCookies === undefined) initWithCookies = {};

  initWithCookies.credentials = "include";

  const response = await fetch(input, initWithCookies);

  if (!response.ok) throw new Error(`Failed to fetch, response status code was ${response.status} (${response.statusText}`);

  return response;
}

async function postFormDataWithCookies(url: string, formData: FormData): Promise<Response> {
  return await fetchWithCookies(url, {
    method: "POST",
    body: formData,
  });
}

async function postJsonWithCookies(url: string, data: any): Promise<Response> {
  return await fetchWithCookies(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
