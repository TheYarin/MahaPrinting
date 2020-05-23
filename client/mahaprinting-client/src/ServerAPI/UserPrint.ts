import { observable } from "mobx";
import { PrintStatus } from "./PrintStatus";
export class UserPrint {
  @observable public id: number;
  @observable public name: string;
  @observable public fileExtension: string;
  @observable public slicedFor?: string;
  @observable public status: PrintStatus;
  @observable public timestamp: string;
  @observable public contactDetails: string;
  @observable public notes: string;

  public constructor({
    id,
    name,
    fileExtension,
    slicedFor,
    status,
    timestamp,
    contactDetails,
    notes,
  }: {
    id: number;
    name: string;
    fileExtension: string;
    slicedFor?: string;
    status: PrintStatus;
    timestamp: string;
    contactDetails: string;
    notes: string;
  }) {
    this.id = id;
    this.name = name;
    this.fileExtension = fileExtension;
    this.slicedFor = slicedFor;
    this.status = status;
    this.timestamp = timestamp;
    this.contactDetails = contactDetails;
    this.notes = notes;
  }
}
