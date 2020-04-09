import React, { Component } from "react";
import {
  Paper,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
// import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { UserPrint } from "../../../ServerAPI";
import { observer } from "mobx-react";
import { observable } from "mobx";

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
  dialogTitleRow: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  dialogTitle: {
    // flexShrink: 1,
    wordWrap: "break-word",
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
    const { name, status, contactDetails, timestamp } = userPrint;

    return (
      <Paper className={classes.root}>
        <Dialog onClose={() => (this.dialogOpen = false)} open={this.dialogOpen}>
          <div className={classes.dialogTitleRow}>
            <IconButton className={classes.closeButton} onClick={() => (this.dialogOpen = false)}>
              <CloseIcon />
            </IconButton>
            <DialogTitle className={classes.dialogTitle}>{name}</DialogTitle>
          </div>
          <DialogContent>
            <div>
              <IconButton>
                <DeleteForeverIcon />
              </IconButton>
            </div>
            <div>
              <div>Uploaded at: {timestamp}</div>
              <div>Status: {status}</div>
              <div>Contact details: {contactDetails}</div>
            </div>
          </DialogContent>
        </Dialog>
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
