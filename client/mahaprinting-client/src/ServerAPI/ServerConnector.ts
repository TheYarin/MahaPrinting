import { UserPrint } from "./UserPrint";
import { Print } from "./Print";
import Printer from "./Printer";

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

    if (!response.ok) throw new Error("Failed to get all prints, response status was " + response.statusText);

    const responseJson = await response.json();
    const prints = responseJson.map((p: any) => new Print(p));

    return prints;
  }

  public async uploadUserPrint(name: string, contactDetails: string, file: File): Promise<UserPrint> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactDetails", contactDetails);
    formData.append("file", file);

    const response = await postFormDataWithCookies(this.urlBase + "/uploadUserPrint", formData);
    const responseJson = await response.json();

    return new UserPrint(responseJson);
  }

  public async cancelPrint(printId: number): Promise<void> {
    const response = await postJsonWithCookies(this.urlBase + "/cancelPrint", { printId });

    if (!response.ok) throw new Error("Failed to cancel print, server returned status code " + response.status);
  }

  public async getPrinters(): Promise<Printer[]> {
    const response = await fetchWithCookies(this.urlBase + "/getPrinters");

    if (!response.ok) throw new Error("Failed to get printers, response status was " + response.statusText);

    const responseJson = await response.json();
    const printers = responseJson.map((p: any) => new Printer(p));

    return printers;
  }

  public async addPrinter(printerName: string, url: string, apiKey: string): Promise<Printer> {
    const response = await postJsonWithCookies(this.urlBase + "/addPrinter", { printerName, url, apiKey });
    const responseJson = await response.json();

    return new Printer(responseJson);
  }
}

function fetchWithCookies(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let initWithCookies = init;

  if (initWithCookies === undefined) initWithCookies = {};

  initWithCookies.credentials = "include";

  return fetch(input, initWithCookies);
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
