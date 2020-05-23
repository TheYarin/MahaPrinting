import PrintsStoreBase from "./PrintsStoreBase";
import { UserPrint } from "../ServerAPI/UserPrint";

export class UserPrintsStore extends PrintsStoreBase<UserPrint> {
  protected async _loadPrintsFromServer(): Promise<UserPrint[]> {
    return await this.serverConnector.getUserPrints();
  }

  public async add(
    name: string,
    slicedFor: string | undefined,
    contactDetails: string,
    notes: string,
    file: File
  ): Promise<void> {
    const userPrint = await this.serverConnector.uploadUserPrint(name, slicedFor, contactDetails, notes, file);
    this.prints.push(userPrint);
  }
}
