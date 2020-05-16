import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { createStyles, WithStyles, withStyles, Theme, Dialog, DialogActions, DialogContent, Button } from "@material-ui/core";

export function confirm(message: string): Promise<boolean> {
  const divTarget = document.createElement("div");
  divTarget.id = "react-confirm-dialog";
  document.body.appendChild(divTarget);

  let promiseResolve: (value: boolean) => void;

  const confirmPromise = new Promise<boolean>((resolve, reject) => {
    promiseResolve = resolve;
  });

  const closeDialog = (confirmResult: boolean) => {
    unmountComponentAtNode(divTarget);
    document.body.removeChild(divTarget);
    promiseResolve(confirmResult);
  };

  render(<StyledConfirmDialog message={message} closeDialog={closeDialog} />, divTarget);

  return confirmPromise;
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
