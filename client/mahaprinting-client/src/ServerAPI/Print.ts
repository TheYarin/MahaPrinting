import { observable } from "mobx";
import { UserPrint } from "./UserPrint";
import { PrintStatus } from "./PrintStatus";

export class Print extends UserPrint {
  @observable userId: string;

  constructor({
    id,
    name,
    status,
    timestamp,
    contactDetails,
    notes,
    userId,
  }: {
    id: number;
    name: string;
    status: PrintStatus;
    timestamp: string;
    contactDetails: string;
    notes: string;
    userId: string;
  }) {
    super({ id, name, status, timestamp, contactDetails, notes });
    this.userId = userId;
  }
}
