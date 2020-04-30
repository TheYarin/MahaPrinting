import { observable } from "mobx";

export default class Printer {
  @observable id: number;
  @observable name: string;
  @observable url: string;
  @observable apiKey: string;
  @observable state: string;
  @observable jobInfo: { [key: string]: any };
  @observable model: string;

  constructor({
    id,
    name,
    url,
    apiKey,
    state,
    jobInfo,
    model,
  }: {
    id: number;
    name: string;
    url: string;
    apiKey: string;
    state: string;
    jobInfo: { [key: string]: any };
    model: string;
  }) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.apiKey = apiKey;
    this.state = state;
    this.jobInfo = jobInfo;
    this.model = model;
  }
}
