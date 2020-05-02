import React, { Component, FormEvent } from "react";
import { TextField, WithStyles, createStyles, withStyles, Button, Divider } from "@material-ui/core";
import { flexCol, spaceChildren } from "../../JssUtils";
import Dialog from "../Common/Dialog";
import { observable } from "mobx";
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
    state = {
        canSubmitForm: false,
    };

    @observable name?: string;
    @observable contactDetails?: string = window.localStorage["contactDetails"];
    @observable notes?: string;
    fileInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    _checkCanSubmit = () => {
        const printFile = this.fileInput.current!.files![0] as File;

        if (this.name && this.contactDetails && printFile) this.setState({ canSubmitForm: true });
        else this.setState({ canSubmitForm: false });
    };

    _onNameBlur = () => {
        if (this.name === undefined) this.name = "";
        else if (this.name) this._checkCanSubmit();
    };

    _onContactDetailsBlur = () => {
        if (this.contactDetails === undefined) this.contactDetails = "";
        else if (this.contactDetails) this._checkCanSubmit();
    };

    submitPrint = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const printFile = this.fileInput.current!.files![0] as File;
        this.props.userPrintsStore.add(this.name as string, this.contactDetails as string, printFile); //this.notes as string

        window.localStorage["contactDetails"] = this.contactDetails;

        this.name = undefined;
    };

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} title="Upload New Print">
                <>
                    <form className={classes.root} autoComplete="off" onSubmit={this.submitPrint}>
                        <TextField
                            variant="outlined"
                            name="name"
                            label="Print name"
                            value={this.name}
                            onChange={(event) => (this.name = event.target.value)}
                            error={this.name === ""}
                            helperText="Required"
                            onBlur={this._onNameBlur}
                        />
                        <TextField
                            variant="outlined"
                            name="contactDetails"
                            label="Contact Details"
                            placeholder="Your name, phone number..."
                            value={this.contactDetails}
                            onChange={(event) => (this.contactDetails = event.target.value)}
                            error={this.contactDetails === ""}
                            helperText="required"
                            onBlur={this._onContactDetailsBlur}
                        />
                        <TextField
                            variant="outlined"
                            name="notes"
                            label="Notes"
                            placeholder="Any relevant information..."
                            multiline
                            value={this.notes}
                            onChange={(event) => (this.notes = event.target.value)}
                        />
                        <input type="file" ref={this.fileInput} accept=".stl" onChange={this._checkCanSubmit} />
                        <Button type="submit" variant="contained" color="primary" disabled={!this.state.canSubmitForm}>
                            Upload print!
                        </Button>
                    </form>
                </>
            </Dialog>
        );
    }
}

export default withStyles(styles)(UploadNewPrint);
