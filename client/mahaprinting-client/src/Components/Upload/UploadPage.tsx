import React from "react";
import Typography from "@material-ui/core/Typography";
import MyPrintsStore from "./MyPrintsStore";
import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints";
import { ServerConnector } from "../../ServerAPI";

export default class UploadPage extends React.Component {
  myPrintsStore: MyPrintsStore = new MyPrintsStore(new ServerConnector("http://localhost:5000"));
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
