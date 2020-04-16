import { observable } from "mobx";
import { UserPrint } from "./UserPrint";
import { PrintStatus } from "./PrintStatus";

export class Print extends UserPrint {
  @observable
  userId: string;
  @observable
  fileDownloadLink: string;
  @observable
  filePath: string;
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
