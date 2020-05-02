import React, { Component, FormEvent } from "react";
import { TextField, WithStyles, createStyles, withStyles, Button, Divider } from "@material-ui/core";
import { flexCol, spaceChildren } from "../../JssUtils";
import Dialog from "../Common/Dialog";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";
import STLViewer from "../Common/STLViewer";

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
  @observable contactDetails?: string = window.localStorage["contactDetails"];
  @observable notes?: string;
  @observable file?: File;
  fileInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  @observable visited: { [key: string]: boolean } = {};

  @computed
  get canSubmitForm() {
    return this.name && this.contactDetails && this.file;
  }

  submitPrint = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // await this.props.userPrintsStore.add(
    //   this.name as string,
    //   this.contactDetails as string,
    //   this.notes as string,
    //   this.file as File
    // );

    window.localStorage["contactDetails"] = this.contactDetails;
    this.resetForm();
    this.props.onClose();
  };

  resetForm() {
    this.name = undefined;
    this.contactDetails = window.localStorage["contactDetails"];
    this.notes = undefined;
    this.file = undefined;
    this.fileInputRef.current!.value = "";
    this.visited = {};
  }

  render() {
    const { classes } = this.props;
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
          <input type="file" ref={this.fileInputRef} accept=".stl" onChange={(e) => (this.file = e.target.files?.[0])} />
          <Button type="submit" variant="contained" color="primary" disabled={!this.canSubmitForm}>
            Upload print!
          </Button>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UploadNewPrint);
