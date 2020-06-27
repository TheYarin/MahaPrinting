import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { createStyles, WithStyles, withStyles, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { grey } from "@material-ui/core/colors";
import { PrintStatus } from "../../../../ServerAPI/PrintStatus";
import { UserPrint } from "../../../../ServerAPI/UserPrint";
import { UserPrintsStore } from "../../../../PrintStores/UserPrintsStore";
import { flexColCentered } from "../../../../JssUtils";
import Dialog from "../../../Common/Dialog";
import PrintInfoPanel from "../../../Common/PrintInfoPanel";

const styles = () =>
  createStyles({
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
    previewContainer: {
      width: "100%",
      ...flexColCentered,
      backgroundColor: grey[200],
      border: `1px solid ${grey[300]}`,
      position: "relative",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      float: "right",
    },
    buttonIcon: {
      marginRight: 7,
      fontSize: 16,
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
        "Missing prop: userPrintStore." +
          " Yeah yeah, I know it's marked as optional, but that's just to trick typescript to work with Mobx's inject." +
          " It's actually mandatory. sorry."
      );
  }

  /* cancelPrint = () => {
        const userAgreedToCancel = window.confirm("Are you sure you want to cancel this print?");
        if (userAgreedToCancel) this.props.userPrintStore!.cancelPrint(this.props.userPrint.id);
    }; */

  render() {
    const { classes, userPrint, open, onClose, userPrintStore } = this.props;
    const { name, status } = userPrint;

    return (
      <Dialog onClose={onClose} open={open} title={`Print: ${name}`}>
        <PrintInfoPanel serverConnector={userPrintStore!.serverConnector} print={userPrint} />

        {/* {status !== PrintStatus.CANCELED && (
          <Button className={classes.button} onClick={undefined} variant="contained" color={"primary"} size="small">
            <DeleteIcon className={classes.buttonIcon} /> Delete Print
          </Button>
        )} */}
      </Dialog>
    );
  }
}

export default withStyles(styles)(UserPrintDialog);
