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
  AllPrintsStore: PrintsStore = new PrintsStore(this.props.serverConnector);

  render() {
    return (
      <div>
        <Typography variant="h2">Manage</Typography>
        <AllPrintsTable />
      </div>
    );
  }
}

export default withStyles(styles)(ManagePage);
