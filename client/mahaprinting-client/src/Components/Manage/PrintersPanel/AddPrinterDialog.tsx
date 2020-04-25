import React, { Component, FormEvent } from "react";
import {
    createStyles,
    WithStyles,
    withStyles,
    IconButton,
    Button,
    TextField,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { observable } from "mobx";
import { observer } from "mobx-react";
import PrintersStore from "../../../Stores/PrintersStore";
import * as muiColors from "@material-ui/core/colors";
import Dialog from "../../Common/Dialog";

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
});

interface Props extends WithStyles<typeof styles> {
    printersStore: PrintersStore;
}

@observer
class AddPrinterDialog extends Component<Props> {
    @observable dialogOpen: boolean = false;

    @observable printerName?: string = undefined;
    @observable address?: string = undefined;
    @observable apiKey?: string = undefined;

    submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!this.printerName) return;
        if (!this.address) return;
        if (!this.apiKey) return;

        await this.props.printersStore.addPrinter(this.printerName, this.address, this.apiKey);
        this.printerName = undefined;
        this.address = undefined;
        this.apiKey = undefined;
        this.dialogOpen = false;
    };

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
                                label="Printer Name"
                                value={this.printerName || ""}
                                onChange={(e) => (this.printerName = e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                label="Address"
                                placeholder="e.g. http://192.168.1.15:5000"
                                value={this.address || ""}
                                onChange={(e) => (this.address = e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                label="API Key"
                                value={this.apiKey || ""}
                                onChange={(e) => (this.apiKey = e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddPrinterDialog);
