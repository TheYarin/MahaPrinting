import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Paper } from "@material-ui/core";
import Printer from "../../../ServerAPI/Printer";

const styles = createStyles({
  root: { margin: 5 },
});

interface Props extends WithStyles<typeof styles> {
  printer: Printer;
}

class PrinterPanel extends Component<Props> {
  render() {
    const { classes, printer } = this.props;
    const { name } = printer;
    return <Paper className={classes.root}>{name}</Paper>;
  }
}

export default withStyles(styles)(PrinterPanel);
