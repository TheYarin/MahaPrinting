import React, { Component } from "react";
import { Paper, createStyles, WithStyles, withStyles, Typography, ListItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { UserPrint } from "../../../ServerAPI";

const styles = createStyles({
  root: {
    margin: 5,
  },
  paper: {
    paddingLeft: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grouping: {
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
  },
  fullSizeFont: {
    fontSize: "1.5em",
  },
  menuIcon: {
    padding: 12,
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
      <Paper className={classes.root} onClick={() => console.log("asd")}>
        <ListItem button disableGutters className={classes.paper}>
          <Typography className={classes.fullSizeFont} variant="body1">
            {name}
          </Typography>
          <div className={classes.grouping}>
            <Typography variant="caption" color="textSecondary">
              {status}
            </Typography>
            <MoreVertIcon className={classes.menuIcon} />
          </div>
        </ListItem>
      </Paper>
    );
  }
}

export default withStyles(styles)(UserPrintListItem);
