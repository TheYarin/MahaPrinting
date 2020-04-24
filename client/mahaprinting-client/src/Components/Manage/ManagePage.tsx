import React from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

import { PrintsStore } from "../../PrintStores/PrintsStore";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import AllPrintsTable from "./AllPrintsTable";
import PrintersPanel from "./PrintersPanel/PrintersPanel";
import PrintersStore from "../../Stores/PrintersStore";

const styles = createStyles({
  pageContainer: { display: "flex", minWidth: 1000, padding: 20 },
});

interface Props extends WithStyles<typeof styles> {
  serverConnector: ServerConnector;
}
class ManagePage extends React.Component<Props> {
  allPrintsStore: PrintsStore = new PrintsStore(this.props.serverConnector);
  printersStore: PrintersStore = new PrintersStore(this.props.serverConnector);

  async componentDidMount() {
    await this.allPrintsStore.initialize();
    await this.printersStore.initialize();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pageContainer}>
        <AllPrintsTable printsStore={this.allPrintsStore} />
        <PrintersPanel printersStore={this.printersStore} />
      </div>
    );
  }
}

export default withStyles(styles)(ManagePage);
