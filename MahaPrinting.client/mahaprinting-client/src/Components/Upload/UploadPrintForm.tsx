import React, { FormEvent } from "react";
import { TextField } from "@material-ui/core";
import MyPrintsStore from "./MyPrintsStore";
import { observable } from "mobx";

export interface UploadPrintFormProps {
  myPrintsStore: MyPrintsStore;
}

export default class UploadPrintForm extends React.Component<UploadPrintFormProps> {
  @observable name?: string;

  submitPrint = (event: FormEvent<HTMLFormElement>) => {
    console.log("UploadPrintForm -> submitPrint -> submitPrint", this);

    event.preventDefault();

    if (!this.name) return;
    this.props.myPrintsStore.add(new File([], ""), this.name);
  };

  // constructor(props: Object){
  //   super(props);
  // }

  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.submitPrint}>
          <TextField
            name="name"
            label="Print name"
            variant="outlined"
            value={this.name}
            onChange={(event) => (this.name = event.target.value)}
          />
        </form>
      </div>
    );
  }
}
