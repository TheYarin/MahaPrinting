import React from "react";
import STLPrintViewer from "./STLPrintViewer";
import GcodePrintViewer from "./GcodePrintViewer";
import { Typography, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { UserPrint } from "../../ServerAPI/UserPrint";
import moment from "moment";
import FileType from "./FileType";
import { Print } from "../../ServerAPI/Print";

type GenericObject = { [key: string]: any };

const styles = () =>
  createStyles({
    printInfoDiv: {
      margin: "10px 3px 0",
    },
    infoPairDiv: {
      marginBottom: 10,
      display: "flex",
    },
    infoPairTitle: {
      marginRight: 5,
      fontWeight: "bold",
    },
    infoPairContent: {
      maxWidth: "50%",
    },
  });

interface Props extends WithStyles<typeof styles> {
  serverConnector: ServerConnector;
  print: UserPrint;
}

function PrintInfoPanel({ serverConnector, print, classes }: Props) {
  const { status, notes, timestamp, contactDetails, fileExtension } = print;

  const printInfo = {
    Uploaded: moment(timestamp).calendar(),
    "File Type": <FileType fileExtension={fileExtension} />,
    Status: status,
    Notes: notes,
    "Contact Details": contactDetails,
  } as GenericObject;

  if ((print as Print) !== null) {
  }

  return (
    <div className={classes.printInfoDiv}>
      {print.fileExtension === "stl" && serverConnector && (
        <STLPrintViewer printId={print.id} serverConnector={serverConnector} />
      )}
      {print.fileExtension === "gcode" && serverConnector && (
        <GcodePrintViewer printId={print.id} serverConnector={serverConnector} />
      )}
      {Object.keys(printInfo).map((k) => (
        <Typography component="div" key={k} className={classes.infoPairDiv}>
          <div className={classes.infoPairTitle} children={`${k}:`} />
          <div className={classes.infoPairContent} children={printInfo[k]} />
        </Typography>
      ))}
    </div>
  );
}

export default withStyles(styles)(PrintInfoPanel);
