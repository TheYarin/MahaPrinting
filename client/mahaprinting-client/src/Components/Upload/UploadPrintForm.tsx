import React, { FormEvent } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { TextField } from "@material-ui/core";
import MyPrintsStore from "./MyPrintsStore";

export interface UploadPrintFormProps {
  myPrintsStore: MyPrintsStore;
}

@observer
export default class UploadPrintForm extends React.Component<UploadPrintFormProps> {
  @observable name?: string;
  fileInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  submitPrint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.name) return;

    console.log(this.fileInput);

    this.props.myPrintsStore.add(this.name as string, "CONTACT_DETAILS", this.fileInput.current!.files![0] as File);
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
            value={this.name || ""}
            onChange={(event) => (this.name = event.target.value)}
          />
          <input type="file" ref={this.fileInput} accept=".stl" />
        </form>
      </div>
    );
  }
}
