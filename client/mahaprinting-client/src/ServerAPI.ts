import { observable } from "mobx";

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
}

export enum PrintStatus {
  IN_QUEUE = "IN_QUEUE",
  PRINTING = "PRINTING",
  DONE = "DONE",
  CANCELED = "CANCELED",
}

export class UserPrint {
  @observable public id: number;
  @observable public name: string;
  @observable public status: PrintStatus;
  @observable public timestamp: string;
  @observable public contactDetails: string;

  public constructor({
    id,
    name,
    status,
    timestamp,
    contactDetails,
  }: {
    id: number;
    name: string;
    status: PrintStatus;
    timestamp: string;
    contactDetails: string;
  }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.timestamp = timestamp;
    this.contactDetails = contactDetails;
  }
}

export class Print extends UserPrint {
  @observable userId: string;
  @observable fileDownloadLink: string;
  @observable filePath: string;

  constructor({
    id,
    name,
    status,
    timestamp,
    contactDetails,
    userId,
    fileDownloadLink,
    filePath,
  }: {
    id: number;
    name: string;
    status: PrintStatus;
    timestamp: string;
    contactDetails: string;
    userId: string;
    fileDownloadLink: string;
    filePath: string;
  }) {
    super({ id, name, status, timestamp, contactDetails });
    this.userId = userId;
    this.fileDownloadLink = fileDownloadLink;
    this.filePath = filePath;
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
