import { observable } from "mobx";
import { PrintStatus } from "./PrintStatus";
export class UserPrint {
  @observable
  public id: number;
  @observable
  public name: string;
  @observable
  public status: PrintStatus;
  @observable
  public timestamp: string;
  @observable
  public contactDetails: string;
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
