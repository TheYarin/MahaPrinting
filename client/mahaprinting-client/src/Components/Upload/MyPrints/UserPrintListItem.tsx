import React, { Component } from "react";
import { Paper, createStyles, WithStyles, withStyles, IconButton, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { UserPrint } from "../../../ServerAPI";

const styles = createStyles({
  root: {
    paddingLeft: 10,
    margin: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  grouping: {
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
  },
  fullSizeFont: {
    fontSize: "1.5em",
  },
});

interface Props extends WithStyles<typeof styles> {
  userPrint: UserPrint;
}

class UserPrintListItem extends Component<Props> {
  render() {
    const { userPrint, classes } = this.props;
    const { name, status } = userPrint;

    return (
      <Paper className={this.props.classes.root} onClick={() => console.log("asd")}>
        <Typography className={classes.fullSizeFont} variant="body1">
          {name}
        </Typography>
        <div className={classes.grouping}>
          <Typography variant="caption" color="textSecondary">
            {status}
          </Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(UserPrintListItem);
