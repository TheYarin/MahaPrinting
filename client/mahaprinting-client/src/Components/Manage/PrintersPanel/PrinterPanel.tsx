import React, { Component } from "react";
import {
    createStyles,
    WithStyles,
    withStyles,
    Card,
    Typography,
    LinearProgress,
    lighten,
    Tooltip,
} from "@material-ui/core";
import moment from "moment";
import Printer from "../../../ServerAPI/Printer";
import * as muiColors from "@material-ui/core/colors";

const BorderLinearProgress = withStyles({
    root: {
        borderRadius: 20,
        height: 10,
        backgroundColor: lighten(muiColors.purple[200], 0.8),
        width: "100%",
        marginLeft: 10,
    },
    bar: {
        borderRadius: 20,
        backgroundColor: muiColors.purple[200],
    },
})(LinearProgress);

const styles = createStyles({
    root: {
        marginBottom: 2,
        padding: 12,
        borderRadius: 0,
    },
    currentPrintProgressSection: {
        margin: 2,
    },
    printerName: {
        backgroundColor: muiColors.grey[300],
        //color: "white",
        borderRadius: 5,
        border: "1px solid " + muiColors.grey[400],
        padding: "1px 7px",
        fontWeight: "bold",
        wordBreak: "break-word",
        //whiteSpace: "nowrap",
        //overflow: "hidden",
        //textOverflow: "ellipsis",
        width: "fit-content",
    },
    status: {
        display: "flex",
        marginTop: 8,
        marginLeft: 2,
        //fontWeight: "bold"
    },
    printStatusText: {
        marginLeft: 5,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    printProgress: {
        display: "flex",
        alignItems: "center",
    },
    percentFinished: {
        marginLeft: 5,
        fontWeight: "bold",
    },
    printTimeLeft: {
        marginLeft: 2,
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
        let printStatusTextColor;

        if (["Pausing", "Paused", "Cancelling", "Error", "Offline"].includes(stateText))
            printStatusTextColor = lighten(muiColors.red[400], 0.1);
        if ("Operational" === stateText) printStatusTextColor = muiColors.green["A700"];
        if ("Printing" === stateText) printStatusTextColor = muiColors.purple[300];

        let currentPrintProgressInfo;

        if (printer.state.flags.printing) {
            const { completion, printTimeLeft } = printer.jobInfo.progress;

            const percentCompleted = completion * 100;
            const secondsLeftEstimation = printTimeLeft;

            currentPrintProgressInfo = (
                <div className={classes.currentPrintProgressSection}>
                    <Typography variant="subtitle1" className={classes.printProgress}>
                        Progress:{" "}
                        <div
                            className={classes.percentFinished}
                            children={`${Math.round(percentCompleted)}% Finished`}
                        />
                        {/* <Tooltip title={`${Math.round(percentCompleted)}% Finished`} placement="top">
                            <BorderLinearProgress variant="determinate" value={percentCompleted} color="primary" />
                        </Tooltip> */}
                    </Typography>
                    <Typography variant="subtitle1">
                        Estimated Time Left: <b>{moment.duration({ seconds: secondsLeftEstimation }).humanize()}</b>
                    </Typography>
                </div>
            );
        }

        return (
            <Card className={classes.root}>
                <Typography className={classes.printerName} variant="subtitle1">
                    {name}
                </Typography>
                <Typography variant="subtitle1" className={classes.status}>
                    Status:{" "}
                    <div
                        style={{ color: printStatusTextColor }}
                        className={classes.printStatusText}
                        children={
                            stateText === "Printing"
                                ? `Printing (${Math.round(printer.jobInfo.progress.completion * 100)}% Finished)`
                                : stateText
                        }
                    />
                </Typography>
                {stateText === "Printing" && (
                    <Typography variant="subtitle1" className={classes.printTimeLeft}>
                        Estimated Time Left:{" "}
                        <b>{moment.duration({ seconds: printer.jobInfo.progress.printTimeLeft }).humanize()}</b>
                    </Typography>
                )}
                {/* {currentPrintProgressInfo} */}
            </Card>
        );
    }
}

export default withStyles(styles)(PrinterPanel);
