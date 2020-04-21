import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Typography } from "@material-ui/core";
import PrinterPanel from "./PrinterPanel";
import PrintersStore from "../../../Stores/PrintersStore";
import { observer } from "mobx-react";
import AddPrinterDialog from "./AddPrinterDialog";
import TitleBar from "../../Common/TitleBar";
import { spaceChildren } from "../../../JssUtils";

const styles = createStyles({
  root: {
    flexBasis: "calc(25% - 15px)",
    marginLeft: 15,
    minWidth: 280,
    //padding: "0 10px",
    //boxSizing: "border-box",
    //flex: "0 0 auto", // Required for "width" to work because width works differently inside a flex container
  },
  printersList: {
    ...spaceChildren("vertically", 5),
    padding: "5px 0",
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
        <TitleBar title="Printers" iconSection={<AddPrinterDialog printersStore={printersStore} />} />
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
