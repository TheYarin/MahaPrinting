import React from "react";
import { createStyles, WithStyles, withStyles, Fab } from "@material-ui/core";
import MyPrints from "./MyPrints/MyPrints";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { observer, Provider } from "mobx-react";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";
import Add from "@material-ui/icons/Add";
import UploadNewPrint from "../Dialogs/UploadNewPrint";

const styles = createStyles({
  root: {
    maxWidth: 800,
  },
  uploadButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 0,
    right: 0,
    margin: 25,
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
  state = {
    uploadFormOpen: false,
  };

  _openUploadForm = () => this.setState({ uploadFormOpen: true });
  _closeUploadForm = () => this.setState({ uploadFormOpen: false });

  userPrintsStore: UserPrintsStore = new UserPrintsStore(this.props.serverConnector);

  async componentDidMount() {
    await this.userPrintsStore.initialize();
  }

  render() {
    const { classes } = this.props;

    return (
      <Provider userPrintStore={this.userPrintsStore}>
        <div className={classes.root}>
          {this.userPrintsStore.prints.length > 0 && <MyPrints userPrintsStore={this.userPrintsStore} />}
          <Fab color="primary" children={<Add />} className={classes.uploadButton} onClick={this._openUploadForm} />
          <UploadNewPrint
            userPrintsStore={this.userPrintsStore}
            open={this.state.uploadFormOpen}
            onClose={this._closeUploadForm}
          />
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles)(UploadPage);
