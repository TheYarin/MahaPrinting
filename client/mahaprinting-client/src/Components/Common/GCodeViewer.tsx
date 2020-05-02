import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

import { WebGLPreview } from "gcode-preview";

const styles = createStyles({
  root: {},
});

interface GCodeViewerProps extends WithStyles<typeof styles> {
  gcode: string;
  height: number;
  width: number;
}

class GCodeViewer extends Component<GCodeViewerProps> {
  id: string = randomGcodeViewerId();

  componentDidMount() {
    const preview = new WebGLPreview({
      targetId: this.id,
    });

    preview.processGCode(this.props.gcode);
  }

  render() {
    const { classes, width, height } = this.props;

    return <div id={this.id} className={classes.root} style={{ width, height }}></div>; // The width and height are mandatory in order for WebGLPreview to work
  }
}

export default withStyles(styles)(GCodeViewer);

function randomString(length: number): string {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomGcodeViewerId(): string {
  return `GCODEViewer_${randomString(10)}`;
}
