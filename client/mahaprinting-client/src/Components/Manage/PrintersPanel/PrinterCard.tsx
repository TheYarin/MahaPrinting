import React, { Component } from "react";
import moment from "moment";
import { createStyles, WithStyles, withStyles, Card, Typography, LinearProgress, lighten } from "@material-ui/core";
import Printer from "../../../ServerAPI/Printer";
import * as muiColors from "@material-ui/core/colors";

const BorderLinearProgress = withStyles({
  root: {
    borderRadius: 3,
    height: 7,
    backgroundColor: lighten(muiColors.purple[300], 0.8),
    width: "100%",
  },
  bar: {
    borderRadius: 3,
    backgroundColor: muiColors.purple[200],
  },
  dashedColorPrimary: {
    backgroundImage: "none",
    backgroundColor: muiColors.lightBlue[100],
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
    //border: "1px solid " + muiColors.grey[400],
    padding: "0px 7px",
    fontWeight: "bold",
    wordBreak: "break-word",
    width: "fit-content",
    fontFamily: "monospace",
    fontSize: "110%",
    textTransform: "uppercase",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  status: {
    display: "flex",
    marginTop: 8,
    marginLeft: 2,
    //fontWeight: "bold"
  },
  printStatusText: {
    fontWeight: "bold",
    fontStyle: "italic",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    textAlign: "center",
    marginTop: 10,
  },
});

interface Props extends WithStyles<typeof styles> {
  printer: Printer;
}

class PrinterCard extends Component<Props> {
  render() {
    const { classes, printer } = this.props;
    const { name } = printer;
    const stateText = printer.state; // One of the following values:  "Operational", "Printing", "Pausing", "Cancelling", "Error", "Closed" or "Offline". or "Closed". or "Error: Failed to autodetect serial port, please set it manually.".
    let printStatusTextColor;

    if (["Pausing", "Paused", "Cancelling", "Error", "Offline", "Closed"].includes(stateText))
      printStatusTextColor = lighten(muiColors.red[400], 0.1);
    if ("Operational" === stateText) printStatusTextColor = muiColors.green["A700"];
    if ("Printing" === stateText) printStatusTextColor = muiColors.purple[300];

    return (
      <Card className={classes.root}>
        <Typography className={classes.printerName} variant="subtitle1">
          {name}
        </Typography>
        <Typography variant="subtitle1" className={classes.status}>
          {/* Status:{" "} */}
          <div
            style={{ color: printStatusTextColor }}
            className={classes.printStatusText}
            children={
              stateText === "Printing"
                ? "Printing <PrintName>..." //TODO: Add the name of what's being printed?
                : stateText === "Closed" || stateText === "Error: Failed to autodetect serial port, please set it manually."
                ? "Printer unavailable"
                : stateText
            }
          />
        </Typography>
        {stateText === "Printing" && (
          <div>
            <BorderLinearProgress
              variant="buffer"
              value={printer.jobInfo.progress.completion * 100}
              valueBuffer={printer.jobInfo.progress.completion * 100 + 10}
              color="primary"
            />
            <Typography variant="subtitle2" className={classes.printTimeLeft}>
              {`${Math.round(printer.jobInfo.progress.completion * 100)}% Finished (`}
              <b>{moment.duration({ seconds: printer.jobInfo.progress.printTimeLeft }).humanize()} left</b>)
            </Typography>
            {/* <Typography variant="subtitle1" className={classes.printTimeLeft}>
                        Estimated Time Left:{" "}
                        <b>{moment.duration({ seconds: printer.jobInfo.progress.printTimeLeft }).humanize()}</b>
                    </Typography> */}
          </div>
        )}
        {/* {currentPrintProgressInfo} */}
      </Card>
    );
  }
}

export default withStyles(styles)(PrinterCard);
