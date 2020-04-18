import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints/MyPrints";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { observer, Provider } from "mobx-react";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";

const styles = createStyles({
  root: {
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    display: "flex",
    flexDirection: "column",
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
            <Typography variant="h2">Upload</Typography>
            <UploadPrintForm userPrintsStore={this.userPrintsStore} />
            {this.userPrintsStore.prints.length > 0 && <MyPrints userPrintsStore={this.userPrintsStore} />}
          </div>
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles)(UploadPage);
