import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

// @ts-ignore
import OriginalSTLViewer from "stl-viewer";

const styles = createStyles({
  root: {},
});

interface STLViewerProps extends WithStyles<typeof styles> {
  stlFile: ArrayBuffer;
  height?: number;
  width?: number;
  [x: string]: any;
}

class STLViewer extends Component<STLViewerProps> {
  render() {
    const { classes, stlFile, ...rest } = this.props;

    return (
      <OriginalSTLViewer
        model={stlFile}
        width={300}
        height={300}
        modelColor="#B92C2C"
        backgroundColor="#EAEAEA"
        rotate={true}
        orbitControls={true}
        rotationSpeeds={[0, 0.02, 0]}
        lights={[
          [1, 1, 1],
          [-1, -1, -1],
        ]}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(STLViewer);
