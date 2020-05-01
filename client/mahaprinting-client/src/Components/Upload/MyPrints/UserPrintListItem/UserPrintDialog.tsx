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
// @ts-ignore
import STLViewer from "stl-viewer";

import ButtonWithIconOnTop from "../../../Common/ButtonWithIconOnTop";
import { PrintStatus } from "../../../../ServerAPI/PrintStatus";
import { UserPrint } from "../../../../ServerAPI/UserPrint";
import { UserPrintsStore } from "../../../../PrintStores/UserPrintsStore";
import { flexColCentered } from "../../../../JssUtils";
import { observable } from "mobx";

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
  previewContainer: {
    width: "100%",
    ...flexColCentered,
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
  @observable stlFile?: ArrayBuffer;

  constructor(props: Props) {
    super(props);
    if (!props.userPrintStore)
      throw new Error(
        "Missing prop: myPrintStore." +
          " Yeah yeah, I know it's marked as optional, but that's just to trick typescript to work with Mobx's inject." +
          " It's actually mandatory. sorry."
      );
  }

  async componentDidMount() {
    await this.loadStlFile();
  }

  cancelPrint = () => {
    const userAgreedToCancel = window.confirm("Are you sure you want to cancel this print?");
    if (userAgreedToCancel) this.props.userPrintStore!.cancelPrint(this.props.userPrint.id);
  };

  async loadStlFile() {
    const { userPrint, userPrintStore } = this.props;
    try {
      this.stlFile = await userPrintStore?.serverConnector.getPrintFile(userPrint.id);
    } catch {
      this.stlFile = undefined;
    }
  }

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

        <div className={classes.previewContainer}>
          {this.stlFile && (
            <STLViewer
              model={this.stlFile}
              width={300}
              height={300}
              modelColor="#B92C2C"
              backgroundColor="#EAEAEA"
              rotate={true}
              orbitControls={true}
              rotationSpeeds={[0, 0.02, 0]}
              lights={[
                [1, 1, 1],
                [-1, -1, -1],
              ]}
            />
          )}
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
