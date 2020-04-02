export class ServerConnector {
  private urlBase: string;

  public constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  public async uploadUserPrint(name: string, contactDetails: string, file: File): Promise<UserPrint> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactDetails", contactDetails);
    formData.append("file", file);

    const response = await postFormData(this.urlBase + "/uploadUserPrint", formData);
    const responseJson = await response.json();

    return new UserPrint(responseJson);
  }
}

export enum PrintStatus {
  IN_QUEUE = "IN_QUEUE",
  PRINTING = "PRINTING",
  DONE = "DONE"
}

export class UserPrint {
  public id: string;
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
    id: string;
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

async function postFormData(url: string, formData: FormData): Promise<Response> {
  return await fetch(url, {
    method: "POST",
    body: formData
  });
}
