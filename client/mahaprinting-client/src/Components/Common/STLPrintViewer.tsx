import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Theme, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { flexColCentered } from "../../JssUtils";
import STLViewer from "./STLViewer";
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
class STLPrintViewer extends Component<Props> {
  @observable stlFile?: ArrayBuffer;

  async componentDidMount() {
    await this.loadStlFile();
  }

  async loadStlFile() {
    const { serverConnector, printId } = this.props;
    try {
      this.stlFile = await serverConnector.getPrintFileAsArrayBuffer(printId);
    } catch (e) {
      console.error("failed to load STL file from the server", e);
      this.stlFile = undefined;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.stlFile && <STLViewer height={250} stlFile={this.stlFile} />}
        <Typography variant="caption" className={classes.previewText}>
          (STL Preview)
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(STLPrintViewer);
