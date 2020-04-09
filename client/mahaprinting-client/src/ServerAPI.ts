export class ServerConnector {
  private urlBase: string;

  public constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  public async initialize(): Promise<void> {
    await fetchWithCookies(this.urlBase + "/initialize");
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

  public async getUserPrints(): Promise<UserPrint[]> {
    const response = await fetchWithCookies(this.urlBase + "/getUserPrints");
    const responseJson = await response.json();

    const userPrints = responseJson.map((p: any) => new UserPrint(p));

    return userPrints;
  }
}

export enum PrintStatus {
  IN_QUEUE = "IN_QUEUE",
  PRINTING = "PRINTING",
  DONE = "DONE"
}

export class UserPrint {
  public id: number;
  public name: string;
  public status: PrintStatus;
  public timestamp: string;
  public contactDetails: string;

  public constructor({
    id,
    name,
    status,
    timestamp,
    contactDetails
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

async function postFormDataWithCookies(url: string, formData: FormData): Promise<Response> {
  return await fetchWithCookies(url, {
    method: "POST",
    body: formData
  });
}

function fetchWithCookies(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let initWithCookies = init;

  if (initWithCookies === undefined) initWithCookies = {};

  initWithCookies.credentials = "include";

  return fetch(input, initWithCookies);
}
