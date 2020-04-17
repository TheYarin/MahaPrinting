import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, colors, Typography } from "@material-ui/core";
import PrinterPanel from "./PrinterPanel";
import PrintersStore from "../../../Stores/PrintersStore";
import { observer } from "mobx-react";
import AddPrinterDialog from "./AddPrinterDialog";

const styles = createStyles({
  root: {
    width: 250,
    padding: "0 10px",
    boxSizing: "border-box",
    flex: "0 0 auto", // Required for "width" to work because width works differently inside a flex container
  },
  printersList: {
    backgroundColor: colors.grey[100],
    padding: "5px 0",
    boxShadow: "0 0 5px " + colors.grey[100],
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  noPrintersMessage: {
    textAlign: "center",
    padding: 5,
  },
});

interface Props extends WithStyles<typeof styles> {
  printersStore: PrintersStore;
}

@observer
class PrintersPanel extends Component<Props> {
  render() {
    const { classes, printersStore } = this.props;

    const printerPanels = printersStore.printers.map((p) => <PrinterPanel key={p.id} printer={p} />);

    return (
      <div className={classes.root}>
        <div className={classes.titleRow}>
          <Typography>Printers</Typography>
          <AddPrinterDialog printersStore={printersStore} />
        </div>
        <div className={classes.printersList}>
          {printerPanels.length > 0 ? (
            printerPanels
          ) : (
            <Typography className={classes.noPrintersMessage} color="textSecondary" variant="h6">
              No printers yet, you should add one!
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PrintersPanel);