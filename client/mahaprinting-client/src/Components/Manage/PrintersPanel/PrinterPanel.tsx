import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Paper, Typography, LinearProgress, lighten } from "@material-ui/core";
import { purple, red, green, grey } from "@material-ui/core/colors";
import moment from "moment";
import Printer from "../../../ServerAPI/Printer";
import { spaceChildren, flexColCentered } from "../../../JssUtils";

const BorderLinearProgress = withStyles({
    root: {
        borderRadius: 20,
        height: 10,
        backgroundColor: lighten(purple[200], 0.8),
        width: "100%",
    },
    bar: {
        borderRadius: 20,
        backgroundColor: purple[200],
    },
})(LinearProgress);

const styles = createStyles({
    root: {
        ...flexColCentered,
        margin: 5,
        padding: 10,
    },
    printStatusOperational: {
        color: green["A400"],
    },
    printStatusPrinting: { color: purple[300] },
    printStatusBad: { color: lighten(red[400], 0.1) },
    printStatusDefault: {
        /* color: red[400] */
    },
    currentPrintProgressSection: {
        ...flexColCentered,
        width: "100%",
        padding: 8,
        boxSizing: "border-box",
        ...spaceChildren("vertically", 10),
    },
    printerName: {
        textAlign: "center",
        color: grey[600],
    },
    timeLeft: {
        ...flexColCentered,
    },
});

interface Props extends WithStyles<typeof styles> {
    printer: Printer;
}

class PrinterPanel extends Component<Props> {
    render() {
        const { classes, printer } = this.props;
        const { name } = printer;
        console.log("PrinterPanel -> render -> printer", printer);
        const stateText = printer.state["text"]; // One of the following values:  "Operational", "Printing", "Pausing", "Paused", "Cancelling", "Error" or "Offline"
        let stateColorClass;

        if (["Pausing", "Paused", "Cancelling", "Error", "Offline"].includes(stateText))
            stateColorClass = classes.printStatusBad;
        if ("Operational" === stateText) stateColorClass = classes.printStatusOperational;
        if ("Printing" === stateText) stateColorClass = classes.printStatusPrinting;

        let currentPrintProgressInfo;

        if (printer.state.flags.printing) {
            const { completion, printTimeLeft } = printer.jobInfo.progress;

            const percentCompleted = completion * 100;
            const secondsLeftEstimation = printTimeLeft;

            currentPrintProgressInfo = (
                <div className={classes.currentPrintProgressSection}>
                    <BorderLinearProgress variant="determinate" value={percentCompleted} color="primary" />
                    <div className={classes.timeLeft}>
                        <Typography variant="subtitle2">Estimated time left: </Typography>
                        <Typography variant="subtitle2">
                            <b>{moment.duration({ seconds: secondsLeftEstimation }).humanize()}</b>
                        </Typography>
                    </div>
                </div>
            );
        }

        return (
            <Paper className={classes.root}>
                <Typography className={classes.printerName} variant="h5">
                    {name}
                </Typography>
                <Typography className={stateColorClass} variant="h6">
                    {stateText}
                </Typography>
                {currentPrintProgressInfo}
            </Paper>
        );
    }
}

export default withStyles(styles)(PrinterPanel);
