import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Print } from "../../ServerAPI/Print";
import Dialog from "../Common/Dialog";
import Stepper from "../Common/Stepper";
import CubeLoader from "../Common/CubeLoader/CubeLoader";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    onClose: Function;
    selectedPrint?: Print;
}

const states = {
    UPLOADING: "Uploading",
    SLICING: "Slicing",
};

const stepTitles = ["Preview Print Info", "Select Printer", "Preview G-Code", "Confirm and Continue"];

class SendFileToPrinter extends Component<Props> {
    state = {
        activeStep: -1,
        printState: null,
    };

    _uploadPrint = () => this.setState({ printState: states.UPLOADING });
    _slicePrint = () => this.setState({ printState: states.SLICING });
    _showPrintInfo = () => this.setState({ printState: null, activeStep: 2 });

    render() {
        const { classes } = this.props;
        const { activeStep, printState } = this.state;
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} title="Send to 3D Printer">
                <Stepper activeStep={activeStep} steps={stepTitles} />
                {activeStep === 1 && !!printState && <CubeLoader text={`${printState}...`} />}
            </Dialog>
        );
    }
}

export default withStyles(styles)(SendFileToPrinter);
