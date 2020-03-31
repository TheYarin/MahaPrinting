import React from "react";
import Typography from "@material-ui/core/Typography";
import MyPrintsStore from "./MyPrintsStore";
import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints";

export default class UploadPage extends React.Component {
  myPrintsStore: MyPrintsStore = new MyPrintsStore();
  // constructor(props: Object){
  //   super(props);
  // }

  render() {
    return (
      <div>
        <Typography variant="h2">Upload</Typography>
        <UploadPrintForm myPrintsStore={this.myPrintsStore} />
        <MyPrints myPrintsStore={this.myPrintsStore} />
      </div>
    );
  }
}
