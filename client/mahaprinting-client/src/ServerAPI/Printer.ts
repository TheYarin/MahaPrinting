import { observable } from "mobx";

export default class Printer {
  @observable id: number;
  @observable name: string;
  @observable url: string;
  @observable apiKey: string;
  @observable state: { [key: string]: any };
  @observable jobInfo: { [key: string]: any };

  constructor({
    id,
    name,
    url,
    apiKey,
    state,
    jobInfo,
  }: {
    id: number;
    name: string;
    url: string;
    apiKey: string;
    state: { [key: string]: any };
    jobInfo: { [key: string]: any };
  }) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.apiKey = apiKey;
    this.state = state;
    this.jobInfo = jobInfo;
  }
}
