import { observable } from "mobx";

export default class Printer {
  @observable id: number;
  @observable name: string;
  @observable address: string;
  @observable apiKey: string;
  @observable state: object;
  @observable jobInfo: object;

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
    state: object;
    jobInfo: object;
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.apiKey = apiKey;
    this.state = state;
    this.jobInfo = jobInfo;
  }
}
