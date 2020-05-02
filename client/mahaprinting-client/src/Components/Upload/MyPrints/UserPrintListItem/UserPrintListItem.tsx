import React, { Component } from "react";
import { Paper, createStyles, WithStyles, withStyles, Typography, ListItem } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import { UserPrint } from "../../../../ServerAPI/UserPrint";
import { observer } from "mobx-react";
import { observable } from "mobx";
import UserPrintDialog from "./UserPrintDialog";

const styles = createStyles({
  root: {
    margin: 5,
  },
  itemContent: {
    paddingLeft: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grouping: {
    // float: "right",
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
  },
  fullSizeFont: {
    fontSize: "1.5em",
    wordWrap: "break-word",
    minWidth: 0,
  },
  menuIcon: {
    padding: 12,
  },

  closeButton: {
    // alignSelf: "flex-start",
    float: "right",
  },
});

interface Props extends WithStyles<typeof styles> {
  userPrint: UserPrint;
}

@observer
class UserPrintListItem extends Component<Props> {
  @observable dialogOpen: boolean = false;

  render() {
    const { userPrint, classes } = this.props;
    const { name, status } = userPrint;

    return (
      <Paper className={classes.root}>
        {this.dialogOpen && (
          <UserPrintDialog userPrint={userPrint} open={this.dialogOpen} onClose={() => (this.dialogOpen = false)} />
        )}
        <ListItem button disableGutters className={classes.itemContent} onClick={() => (this.dialogOpen = true)}>
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
