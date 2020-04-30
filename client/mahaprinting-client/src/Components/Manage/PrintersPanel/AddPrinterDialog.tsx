import React, { Component, FormEvent, ReactNode } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  IconButton,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import PrintersStore from "../../../Stores/PrintersStore";
import * as muiColors from "@material-ui/core/colors";
import Dialog from "../../Common/Dialog";
import AddPrinterWithApiKeyResult from "../../../ServerAPI/AddPrinterWithApiKeyResult";
import AddPrinterResult from "../../../ServerAPI/AddPrinterResult";
import { flexColCentered } from "../../../JssUtils";

const styles = createStyles({
  formFields: {
    display: "flex",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
  },
  addButton: {
    color: "white",
    padding: 3,
    marginRight: 10,
  },
  title: {
    backgroundColor: muiColors.lightBlue[400],
    color: "white",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: "150%",
  },
  submitProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  submitButtonWrapper: {
    position: "relative",
  },
  dialogActions: {
    ...flexColCentered,
  },
  errorMessage: {
    color: "red",
  },
  infoMessage: {
    textAlign: "center",
  },
  timeoutMessage: {
    textAlign: "center",
  },
});

interface Props extends WithStyles<typeof styles> {
  printersStore: PrintersStore;
}

@observer
class AddPrinterDialog extends Component<Props> {
  @observable dialogOpen: boolean = false;
  @observable submitting: boolean = false;
  @observable mode: "workflow" | "apiKey" = "workflow";
  @observable errorMessage?: string | ReactNode;

  // Form fields
  @observable printerName?: string = undefined;
  @observable printerUrl?: string = undefined;
  @observable user?: string = undefined;
  @observable apiKey?: string = undefined;

  @action
  submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.errorMessage = undefined;
    this.submitting = true;
    // return;

    if (!this.printerName) return;
    if (!this.printerUrl) return;

    switch (this.mode) {
      case "workflow":
        await this.addPrinter();
        break;
      case "apiKey":
        await this.addPrinterWithApiKey();
        break;

      default:
        throw new Error("Not implemented.");
    }

    this.submitting = false;
  };

  @action
  private cleanupForm() {
    this.printerName = undefined;
    this.printerUrl = undefined;
    this.user = undefined;
    this.apiKey = undefined;
    this.mode = "workflow";
  }

  async addPrinter() {
    const result = await this.props.printersStore.addPrinter(this.printerName as string, this.printerUrl as string, this.user);

    switch (result) {
      case AddPrinterResult.BAD_URL:
        this.setBadUrlErrorMessage();
        break;
      case AddPrinterResult.WORKFLOW_UNSUPPORTED:
        this.errorMessage =
          "The OctoPrint instance you provided does not seem to support the Application Keys Plugin workflow... You need to manually enter an API key.";
        this.mode = "apiKey";
        break;
      case AddPrinterResult.API_KEY_REQUEST_TIMED_OUT:
        this.errorMessage = (
          <div className={this.props.classes.timeoutMessage}>
            The API key request timed out, please try again.
            <br />
            If you didn't get a pop up in the OctoPrint UI, make sure the username you entered is correct.
          </div>
        );
        break;
      case AddPrinterResult.API_KEY_REQUEST_DENIED:
        this.errorMessage = "The API key request was denied, please try again.";
        break;
      case AddPrinterResult.SUCCESS:
        this.cleanupForm();
        this.dialogOpen = false;

        break;

      default:
        throw new Error("Not implemented.");
    }
  }

  async addPrinterWithApiKey() {
    if (!this.apiKey) return;

    const result = await this.props.printersStore.addPrinterWithApiKey(
      this.printerName as string,
      this.printerUrl as string,
      this.apiKey
    );

    switch (result) {
      case AddPrinterWithApiKeyResult.BAD_URL:
        this.setBadUrlErrorMessage();
        break;
      case AddPrinterWithApiKeyResult.BAD_API_KEY:
        this.errorMessage = "The API key you entered is invalid.";
        break;
      case AddPrinterWithApiKeyResult.SUCCESS:
        this.cleanupForm();
        this.dialogOpen = false;
        break;

      default:
        throw new Error("Not implemented.");
    }
  }

  setBadUrlErrorMessage() {
    this.errorMessage =
      "There was a problem with the URL you provided.Make sure it is a valid URL pointing at an OctoPrint instance.";
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton onClick={() => (this.dialogOpen = true)} className={classes.addButton}>
          <AddIcon />
        </IconButton>
        <Dialog open={this.dialogOpen} onClose={() => (this.dialogOpen = false)} title="Add New Printer">
          <form onSubmit={this.submit}>
            <DialogContent className={classes.formFields}>
              <TextField
                variant="outlined"
                label="Printer Display Name"
                value={this.printerName || ""}
                onChange={(e) => (this.printerName = e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Printer URL"
                placeholder="e.g. http://192.168.1.15:5000"
                value={this.printerUrl || ""}
                onChange={(e) => {
                  this.printerUrl = e.target.value;
                  if (ValidateIPMaybeWithPortRegex.test(this.printerUrl)) this.printerUrl = `http://${this.printerUrl}`;
                }}
              />
              {this.mode === "workflow" && (
                <TextField
                  variant="outlined"
                  label="Your OctoPrint Username"
                  value={this.user || ""}
                  onChange={(e) => (this.user = e.target.value)}
                />
              )}
              {this.mode === "apiKey" && (
                <TextField
                  variant="outlined"
                  label="API Key"
                  value={this.apiKey || ""}
                  onChange={(e) => (this.apiKey = e.target.value)}
                />
              )}
            </DialogContent>
            <div>
              {this.submitting && this.mode === "workflow" && (
                <Typography variant="subtitle2" className={classes.infoMessage}>
                  Now you need to approve the API key request in OctoPrint:
                  <br />
                  <a target="_blank" rel="noopener noreferrer" href={this.printerUrl}>
                    {this.printerUrl}
                  </a>
                </Typography>
              )}
              {this.errorMessage && <Typography className={classes.errorMessage}>{this.errorMessage}</Typography>}
            </div>
            <DialogActions className={classes.dialogActions}>
              <div className={classes.submitButtonWrapper}>
                {this.submitting && (
                  <CircularProgress size={25} className={classes.submitProgress} onClick={() => (this.submitting = false)} />
                )}
                <Button type="submit" disabled={this.submitting} color="primary" variant="outlined">
                  Add Printer
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddPrinterDialog);

const ZERO_TO_255 = "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])";
const IP_REGEX_PATTERN = `(${ZERO_TO_255}\\.){3}${ZERO_TO_255}`;
const IP_MAYBE_WITH_PORT_REGEX_PATTERN = `${IP_REGEX_PATTERN}(:\\d{1,5})?`;
const ValidateIPMaybeWithPortRegex = new RegExp(`^${IP_MAYBE_WITH_PORT_REGEX_PATTERN}$`);
