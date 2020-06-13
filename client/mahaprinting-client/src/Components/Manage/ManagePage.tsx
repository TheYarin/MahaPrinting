import React from "react";
import { WithStyles, createStyles, withStyles, MuiThemeProvider } from "@material-ui/core";

import { PrintsStore } from "../../PrintStores/PrintsStore";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import FinishedPrintsTable from "./PrintTables/FinishedPrintsTable";
import PrintersPanel from "./PrintersPanel/PrintersPanel";
import PrintersStore from "../../Stores/PrintersStore";
import WaitingPrintsTable from "./PrintTables/WaitingPrintsTable";
import InProgressPrintsTable from "./PrintTables/InProgressPrintsTable";
import { openDetachedDialog } from "../Common/DetachedDialog";
import SendFileToPrinter from "../Dialogs/SendFileToPrinter";
import { Print } from "../../ServerAPI/Print";
import theme from "../../theme";

const styles = createStyles({
  pageContainer: { display: "flex", minWidth: 1150, padding: 20, paddingTop: 5 },
  tableContainer: { flexBasis: "83%", maxWidth: "calc(100% - 280px)" },
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

  sendToPrinter = (selectedPrint: Print) => {
    openDetachedDialog(
      (closeDialog) => (
        <MuiThemeProvider theme={theme}>
          <SendFileToPrinter selectedPrint={selectedPrint} printers={this.printersStore.printers} onClose={closeDialog} />
        </MuiThemeProvider>
      ),
      "sendToPrinterDialog"
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <div className={classes.tableContainer}>
          <InProgressPrintsTable printsStore={this.allPrintsStore} />
          <WaitingPrintsTable printsStore={this.allPrintsStore} sendToPrinter={this.sendToPrinter} />
          <FinishedPrintsTable printsStore={this.allPrintsStore} />
        </div>
        <PrintersPanel printersStore={this.printersStore} />
      </div>
    );
  }
}

export default withStyles(styles)(ManagePage);
