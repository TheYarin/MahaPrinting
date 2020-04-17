import { observable } from "mobx";

export default class Printer {
  @observable id: number;
  @observable name: string;
  @observable address: string;
  @observable apiKey: string;
  @observable state: { [key: string]: any };
  @observable jobInfo: { [key: string]: any };

  constructor({
    id,
    name,
    address,
    apiKey,
    state,
    jobInfo,
  }: {
    id: number;
    name: string;
    address: string;
    apiKey: string;
    state: { [key: string]: any };
    jobInfo: { [key: string]: any };
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.apiKey = apiKey;
    this.state = state;
    this.jobInfo = jobInfo;
  }
}
