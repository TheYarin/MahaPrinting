import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Theme, Tooltip } from "@material-ui/core";
import moment from "moment";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: "fit-content",
    },
  });

interface Props extends WithStyles<typeof styles> {
  timestamp: string;
}

class PrettyTimestamp extends Component<Props> {
  render() {
    const { timestamp, classes } = this.props;

    const timestampMoment = moment(timestamp);
    return (
      <Tooltip title={timestampMoment.format("MMMM Do YYYY, HH:mm:ss")}>
        <div className={classes.container}>{timestampMoment.fromNow()}</div>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(PrettyTimestamp);
