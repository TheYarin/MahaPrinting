import React from "react";
import Typography from "@material-ui/core/Typography";
import MyPrintsStore from "./MyPrintsStore";
import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints";
import { ServerConnector } from "../../ServerAPI";

export interface UploadPageProps {
  serverConnector: ServerConnector;
}

export default class UploadPage extends React.Component<UploadPageProps> {
  myPrintsStore: MyPrintsStore = new MyPrintsStore(this.props.serverConnector);

  async componentDidMount() {
    await this.myPrintsStore.initialize();
  }

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
