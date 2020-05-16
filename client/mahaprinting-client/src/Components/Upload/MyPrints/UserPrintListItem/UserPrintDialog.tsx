import React, { Component, ReactNode } from "react";
import { observer, inject } from "mobx-react";
import { createStyles, WithStyles, withStyles, Typography, Theme, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PrintStatus } from "../../../../ServerAPI/PrintStatus";
import { UserPrint } from "../../../../ServerAPI/UserPrint";
import { UserPrintsStore } from "../../../../PrintStores/UserPrintsStore";
import { flexColCentered } from "../../../../JssUtils";
import { observable } from "mobx";
import STLViewer from "../../../Common/STLViewer";
import Dialog from "../../../Common/Dialog";
import { grey } from "@material-ui/core/colors";
import moment from "moment";

const styles = (theme: Theme) =>
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
    previewText: {
      fontStyle: "italic",
      fontFamily: "monospace",
      position: "absolute",
      top: 0,
      left: 0,
      margin: 10,
      fontSize: "105%",
      color: grey[500],
    },
    printInfoDiv: {
      margin: "10px 3px 0",
    },
    infoPairDiv: {
      marginBottom: 10,
      display: "flex",
    },
    infoPairTitle: {
      marginRight: 5,
      fontWeight: "bold",
    },
    infoPairContent: {
      maxWidth: "50%",
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

interface InfoPairProps {
  title: ReactNode | string;
  content: ReactNode | string;
}

@inject("userPrintStore")
@observer
class UserPrintDialog extends Component<Props> {
  @observable stlFile?: ArrayBuffer;

  constructor(props: Props) {
    super(props);
    if (!props.userPrintStore)
      throw new Error(
        "Missing prop: userPrintStore." +
          " Yeah yeah, I know it's marked as optional, but that's just to trick typescript to work with Mobx's inject." +
          " It's actually mandatory. sorry."
      );
  }

  async componentDidMount() {
    await this.loadStlFile();
  }

  /* cancelPrint = () => {
        const userAgreedToCancel = window.confirm("Are you sure you want to cancel this print?");
        if (userAgreedToCancel) this.props.userPrintStore!.cancelPrint(this.props.userPrint.id);
    }; */

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
    const { name, status, notes, timestamp, contactDetails } = userPrint;

    type GenericObject = { [key: string]: any };

    const printInfo = {
      Uploaded: moment(timestamp).calendar(),
      Status: status,
      Notes: notes,
      "Contact Details": contactDetails,
    } as GenericObject;

    return (
      <Dialog onClose={onClose} open={open} title={`Print: ${name}`}>
        <div className={classes.previewContainer}>
          {this.stlFile && <STLViewer height={250} stlFile={this.stlFile} />}
          <Typography variant="caption" className={classes.previewText}>
            (STL Preview)
          </Typography>
        </div>

        <div className={classes.printInfoDiv}>
          {Object.keys(printInfo).map((k) => (
            <Typography component="div" key={k} className={classes.infoPairDiv}>
              <div className={classes.infoPairTitle} children={`${k}:`} />
              <div className={classes.infoPairContent} children={printInfo[k]} />
            </Typography>
          ))}
          {status !== PrintStatus.CANCELED && (
            <Button className={classes.button} onClick={undefined} variant="contained" color={"primary"} size="small">
              <DeleteIcon className={classes.buttonIcon} /> Delete Print
            </Button>
          )}
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UserPrintDialog);
