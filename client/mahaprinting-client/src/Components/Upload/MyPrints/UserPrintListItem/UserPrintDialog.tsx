import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import ButtonWithIconOnTop from "../../../Common/ButtonWithIconOnTop";
import { UserPrint, PrintStatus } from "../../../../ServerAPI";
import { UserPrintsStore } from "../../../../PrintStores/UserPrintsStore";

const styles = createStyles({
  root: {},
  closeButton: {
    // alignSelf: "flex-start",
    float: "right",
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
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: Function; // This is intentionally not the same type as Dialog's onClose prop because that one really sucks
  userPrint: UserPrint;
  userPrintStore?: UserPrintsStore;
}

@inject("userPrintStore")
@observer
class UserPrintDialog extends Component<Props> {
  constructor(props: Props) {
    super(props);

    if (!props.userPrintStore)
      throw new Error(
        "Missing prop: myPrintStore." +
          " Yeah yeah, I know it's marked as optional, but that's just to trick typescript to work with Mobx's inject." +
          " It's actually mandatory. sorry."
      );
  }

  cancelPrint = () => {
    const userAgreedToCancel = window.confirm("Are you sure you want to cancel this print?");
    if (userAgreedToCancel) this.props.userPrintStore!.cancelPrint(this.props.userPrint.id);
  };

  render() {
    const { classes, userPrint, open, onClose } = this.props;
    const { name, status, contactDetails, timestamp } = userPrint;
    return (
      <Dialog onClose={() => onClose()} open={open}>
        <div className={classes.dialogTitleRow}>
          <IconButton className={classes.closeButton} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
          <DialogTitle className={classes.dialogTitle}>{name}</DialogTitle>
        </div>
        <DialogContent>
          <div>Uploaded at: {timestamp}</div>
          <div>Status: {status}</div>
          <div>Contact details: {contactDetails}</div>
        </DialogContent>
        <DialogActions>
          {status !== PrintStatus.CANCELED && (
            <ButtonWithIconOnTop onClick={this.cancelPrint} topIcon={<DeleteForeverIcon />} color={"secondary"}>
              Cancel Print
            </ButtonWithIconOnTop>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UserPrintDialog);

const DialogActions = withStyles((theme) => ({
  root: {
    justifyContent: "center",
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
