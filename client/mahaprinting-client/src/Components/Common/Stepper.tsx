import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { grey } from "@material-ui/core/colors";

const styles = createStyles({
    root: {
        width: "100%",
    },
    stepper: {
        padding: "15px 10px 10px",
        margin: "-15px -15px 10px",
        backgroundColor: grey[100],
        borderBottom: `1px solid ${grey[300]}`,
    },
    stepFont: {
        fontFamily: "monospace",
    },
});

interface Props extends WithStyles<typeof styles> {
    activeStep: number;
    steps: Array<string>;
}

class CustomStepper extends Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ minWidth: this.props.steps.length * 153 }}>
                <Stepper activeStep={this.props.activeStep} className={classes.stepper} alternativeLabel>
                    {this.props.steps.map((title) => (
                        <Step key={title}>
                            <StepLabel>{title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}

export default withStyles(styles)(CustomStepper);
