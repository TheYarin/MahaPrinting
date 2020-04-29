import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Print } from "../../ServerAPI/Print";
import Dialog from "../Common/Dialog";
import Stepper from "../Common/Stepper";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    onClose: Function;
    selectedPrint?: Print;
}

const stepTitles = ["Select Printer", "Preview STL", "Preview G-Code", "Confirm Print Info"];

class SendFileToPrinter extends Component<Props> {
    state = {
        activeStep: 0,
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} title="Send to 3D Printer">
                <Stepper activeStep={this.state.activeStep} steps={stepTitles} />
                test
            </Dialog>
        );
    }
}

export default withStyles(styles)(SendFileToPrinter);
