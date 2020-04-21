import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints/MyPrints";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { observer, Provider } from "mobx-react";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";
import { flexCol, spaceChildren } from "../../JssUtils";
import TitleBar from "../Common/TitleBar";

const styles = createStyles({
  root: {
    ...spaceChildren("vertically", 20),
    ...flexCol,
    maxWidth: "min(600px, 100%)",
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

interface Props extends WithStyles<typeof styles> {
  serverConnector: ServerConnector;
}

@observer
class UploadPage extends React.Component<Props> {
  userPrintsStore: UserPrintsStore = new UserPrintsStore(this.props.serverConnector);

  async componentDidMount() {
    await this.userPrintsStore.initialize();
  }

  render() {
    const { classes } = this.props;

    return (
      <Provider userPrintStore={this.userPrintsStore}>
        <div className={classes.container}>
          <div className={classes.root}>
            <TitleBar title="Upload a new print" />
            <UploadPrintForm userPrintsStore={this.userPrintsStore} />
            {this.userPrintsStore.prints.length > 0 && <MyPrints userPrintsStore={this.userPrintsStore} />}
          </div>
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles)(UploadPage);
