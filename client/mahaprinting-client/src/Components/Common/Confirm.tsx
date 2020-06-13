import React, { Component } from "react";

import { createStyles, WithStyles, withStyles, Theme, Dialog, DialogActions, DialogContent, Button } from "@material-ui/core";
import { openDetachedDialog } from "./DetachedDialog";

export function confirm(message: string): Promise<boolean> {
  return openDetachedDialog(
    (closeDialog) => <StyledConfirmDialog message={message} closeDialog={closeDialog} />,
    "react-confirm-dialog"
  );
}

const styles = (theme: Theme) =>
  createStyles({
    actions: { justifyContent: "space-between" },
  });

interface Props extends WithStyles<typeof styles> {
  message: string;
  closeDialog: (result: boolean) => void;
}

class ConfirmDialog extends Component<Props> {
  render() {
    const { classes, message, closeDialog } = this.props;

    return (
      <Dialog open={true}>
        <DialogContent children={message} />
        <DialogActions className={classes.actions}>
          <Button onClick={() => closeDialog(true)}>Confirm</Button>
          <Button onClick={() => closeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const StyledConfirmDialog = withStyles(styles)(ConfirmDialog);
