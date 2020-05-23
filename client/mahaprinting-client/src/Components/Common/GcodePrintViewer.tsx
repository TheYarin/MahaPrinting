import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Theme, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { flexColCentered } from "../../JssUtils";
import GcodeViewer from "./GcodeViewer";
import { observable } from "mobx";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { observer } from "mobx-react";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      ...flexColCentered,
      backgroundColor: grey[200],
      border: `1px solid ${grey[300]}`,
      position: "relative",
    },
    previewText: {
      fontStyle: "italic",
      fontFamily: "monospace",
      position: "absolute",
      top: 0,
      left: 0,
      margin: 10,
      fontSize: "105%",
      color: grey[500],
    },
  });

interface Props extends WithStyles<typeof styles> {
  printId: number;
  serverConnector: ServerConnector;
}

@observer
class GcodePrintViewer extends Component<Props> {
  @observable gcodeFile?: string;

  async componentDidMount() {
    await this.loadGcodeFile();
  }

  async loadGcodeFile() {
    const { serverConnector, printId } = this.props;
    try {
      this.gcodeFile = await serverConnector.getPrintFileAsString(printId);
    } catch (e) {
      console.error("failed to load GCODE file from the server", e);
      this.gcodeFile = undefined;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.gcodeFile && <GcodeViewer height={250} gcode={this.gcodeFile} />}
        <Typography variant="caption" className={classes.previewText}>
          (GCODE Preview)
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(GcodePrintViewer);
