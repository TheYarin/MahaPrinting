import React, { Component, FormEvent } from "react";
import { TextField, WithStyles, createStyles, withStyles, Button } from "@material-ui/core";
import { flexCol, spaceChildren } from "../../JssUtils";
import Dialog from "../Common/Dialog";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";
import Select, { Option } from "../Common/Select";

const styles = createStyles({
  root: {
    ...spaceChildren("vertically", 20),
    ...flexCol,
    maxWidth: "min(600px, 100%)",
  },
});

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: Function;
  userPrintsStore: UserPrintsStore;
}

@observer
class UploadNewPrint extends Component<Props> {
  @observable name?: string;
  @observable slicedFor?: string;
  @observable contactDetails?: string = window.localStorage["contactDetails"];
  @observable notes?: string;
  @observable file?: File;
  fileInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  @observable visited: { [key: string]: boolean } = {};
  @observable showSlicedForField: boolean = false;
  @observable printerModels?: string[];

  @computed
  get canSubmitForm() {
    if (this.showSlicedForField && !this.slicedFor) return false;

    return this.name && this.contactDetails && this.file && this.notes;
  }

  submitPrint = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await this.props.userPrintsStore.add(
      this.name as string,
      this.slicedFor as string,
      this.contactDetails as string,
      this.notes as string,
      this.file as File
    );

    window.localStorage["contactDetails"] = this.contactDetails;
    this.resetForm();
    this.props.onClose();
  };

  resetForm() {
    this.name = undefined;
    this.resetSlicedFor();
    this.contactDetails = window.localStorage["contactDetails"];
    this.notes = undefined;
    this.file = undefined;
    this.fileInputRef.current!.value = "";
    this.visited = {};
  }

  private resetSlicedFor() {
    this.slicedFor = undefined;
    this.showSlicedForField = false;
  }

  async componentDidMount() {
    this.printerModels = await this.props.userPrintsStore.serverConnector.getPrinterModels();

    if (this.printerModels?.length === 1) this.slicedFor = this.printerModels[0];
  }

  render() {
    const { classes } = this.props;

    let printerModelOptions: Option[];
    let helperText;

    if (!this.printerModels) {
      printerModelOptions = [];
      helperText = "Loading...";
    } else {
      printerModelOptions = this.printerModels.map((printerModel) => new Option(printerModel, printerModel));
      helperText = "For which printer model was this GCODE sliced for?";
    }

    return (
      <Dialog open={this.props.open} onClose={this.props.onClose} title="Upload New Print">
        <form className={classes.root} autoComplete="off" onSubmit={this.submitPrint}>
          <TextField
            variant="outlined"
            name="name"
            label="Print name"
            value={this.name || ""}
            onChange={(event) => (this.name = event.target.value)}
            error={this.visited["name"] && !this.name}
            helperText="Required"
            onBlur={() => (this.visited["name"] = true)}
          />
          <TextField
            variant="outlined"
            name="contactDetails"
            label="Contact Details"
            placeholder="Your name, phone number..."
            value={this.contactDetails || ""}
            onChange={(event) => (this.contactDetails = event.target.value)}
            error={this.visited["contactDetails"] && !this.contactDetails}
            helperText="required"
            onBlur={() => (this.visited["contactDetails"] = true)}
          />
          <TextField
            variant="outlined"
            name="notes"
            label="Notes"
            placeholder="Any relevant information..."
            multiline
            value={this.notes || ""}
            onChange={(event) => (this.notes = event.target.value)}
          />
          <input type="file" ref={this.fileInputRef} accept=".stl,.gcode" onChange={this.onFileChange} />
          {this.showSlicedForField && (
            <Select
              label="Sliced for..."
              options={printerModelOptions}
              helperText={helperText}
              value={this.slicedFor || ""}
              onChange={(event: any) => {
                this.slicedFor = event.target.value as string;
              }}
            />
          )}
          <Button type="submit" variant="contained" color="primary" disabled={!this.canSubmitForm}>
            Upload print!
          </Button>
        </form>
      </Dialog>
    );
  }

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const previousFile = this.file;
    this.file = e.target.files?.[0];

    // Clear print name if it was derived from the previous file's name
    const previousFileNameWithoutExtension = previousFile?.name.replace(/\.[^/.]+$/, "");
    if (this.name === previousFileNameWithoutExtension) this.name = undefined;

    if (this.file) {
      if (!this.name) {
        const fileNameWithoutExtension = this.file.name.replace(/\.[^/.]+$/, "");
        this.name = fileNameWithoutExtension;
      }

      const fileExtension = this.file.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "gcode") this.showSlicedForField = true;
      else this.resetSlicedFor();
    } else {
      this.resetSlicedFor();
    }
  };
}

export default withStyles(styles)(UploadNewPrint);
