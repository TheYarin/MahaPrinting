import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Typography } from "@material-ui/core";
import PrinterPanel from "./PrinterCard";
import PrintersStore from "../../../Stores/PrintersStore";
import { observer } from "mobx-react";
import AddPrinterDialog from "./AddPrinterDialog";
import InfoNotFound from "../../Common/InfoNotFound/InfoNotFound";
import * as muiColors from "@material-ui/core/colors";

const styles = createStyles({
    root: {
        flexBasis: "calc(17% - 15px)",
        marginLeft: 15,
        minWidth: 280,
        marginTop: 15,
    },
    printersList: {
        backgroundColor: muiColors.grey[200],
    },
    titleRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: muiColors.lightBlue[300],
        color: "white",
    },
    title: {
        fontFamily: "monospace",
        fontWeight: "bold",
        paddingLeft: 15,
        height: 64,
        display: "flex",
        alignItems: "center",
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

        return (
            <div className={classes.root}>
                <div className={classes.titleRow}>
                    <Typography variant="h5" className={classes.title} children="Printers" />
                    <AddPrinterDialog printersStore={printersStore} />
                </div>
                <div className={classes.printersList}>
                    {printersStore.printers.length > 0 ? (
                        printersStore.printers.map((p) => <PrinterPanel key={p.id} printer={p} />)
                    ) : (
                        <InfoNotFound text="No printers found - you should add one!" />
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PrintersPanel);
