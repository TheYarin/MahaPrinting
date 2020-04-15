import PrintsStoreBase from "./MyPrintsStore";
import { UserPrint } from "../ServerAPI";

export class UserPrintsStore extends PrintsStoreBase<UserPrint> {
  protected async _getPrints(): Promise<UserPrint[]> {
    return await this.serverConnector.getUserPrints();
  }

  public async add(name: string, contactDetails: string, file: File): Promise<void> {
    const userPrint = await this.serverConnector.uploadUserPrint(name, contactDetails, file);
    this.prints.push(userPrint);
  }
}
