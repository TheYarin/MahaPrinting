import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Typography } from "@material-ui/core";
import PrinterPanel from "./PrinterPanel";
import PrintersStore from "../../../Stores/PrintersStore";
import { observer } from "mobx-react";
import AddPrinterDialog from "./AddPrinterDialog";
import TitleBar from "../../Common/TitleBar";
import { spaceChildren } from "../../../JssUtils";
import * as muiColors from "@material-ui/core/colors";

const styles = createStyles({
    root: {
        flexBasis: "calc(20% - 15px)",
        marginLeft: 15,
        minWidth: 280,
        //padding: "0 10px",
        //boxSizing: "border-box",
        //flex: "0 0 auto", // Required for "width" to work because width works differently inside a flex container
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
