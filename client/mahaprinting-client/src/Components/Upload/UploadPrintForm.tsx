import React, { FormEvent } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { TextField, WithStyles, createStyles, withStyles, Button } from "@material-ui/core";
import { UserPrintsStore } from "../../PrintStores/UserPrintsStore";

const styles = createStyles({
  root: {
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },
});

interface Props extends WithStyles<typeof styles> {
  userPrintsStore: UserPrintsStore;
}

@observer
class UploadPrintForm extends React.Component<Props> {
  @observable name?: string;
  @observable contactDetails?: string = window.localStorage["contactDetails"];
  fileInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  submitPrint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.name) return;
    if (!this.contactDetails) return;

    const printFile = this.fileInput.current!.files![0] as File;

    if (!printFile) return;

    this.props.userPrintsStore.add(this.name as string, this.contactDetails, printFile);

    window.localStorage["contactDetails"] = this.contactDetails;

    this.name = undefined;
  };

  // constructor(props: Object){
  //   super(props);
  // }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off" onSubmit={this.submitPrint}>
        <TextField
          name="name"
          label="Print name"
          variant="outlined"
          value={this.name || ""}
          onChange={(event) => (this.name = event.target.value)}
        />
        <TextField
          name="contactDetails"
          label="Contact Details"
          variant="outlined"
          value={this.contactDetails || ""}
          onChange={(event) => (this.contactDetails = event.target.value)}
        />
        <input type="file" ref={this.fileInput} accept=".stl" />
        <Button type="submit" variant="contained" color="primary">
          Upload print
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UploadPrintForm);
