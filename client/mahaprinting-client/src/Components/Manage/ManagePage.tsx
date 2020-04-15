import React from "react";

import Typography from "@material-ui/core/Typography";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

import { PrintsStore } from "../../PrintStores/PrintsStore";
import { ServerConnector } from "../../ServerAPI";
import AllPrintsTable from "./AllPrintsTable";

const styles = createStyles({
  root: {},
});

interface Props extends WithStyles<typeof styles> {
  serverConnector: ServerConnector;
}
class ManagePage extends React.Component<Props> {
  allPrintsStore: PrintsStore = new PrintsStore(this.props.serverConnector);

  async componentDidMount() {
    await this.allPrintsStore.initialize();
  }

  render() {
    return (
      <div>
        <Typography variant="h2">Manage</Typography>
        <AllPrintsTable printsStore={this.allPrintsStore} />
      </div>
    );
  }
}

export default withStyles(styles)(ManagePage);
