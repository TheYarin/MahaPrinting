import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

interface Props extends WithStyles<typeof styles> {
  fileExtension: string;
}

class FileType extends Component<Props> {
  render() {
    const { fileExtension } = this.props;

    let color;
    if (fileExtension === "stl") color = blue[700];
    else if (fileExtension === "gcode") color = orange[900];

    return <em style={{ fontWeight: "bold", color }}>{fileExtension.toUpperCase()}</em>;
  }
}

export default withStyles(styles)(FileType);
