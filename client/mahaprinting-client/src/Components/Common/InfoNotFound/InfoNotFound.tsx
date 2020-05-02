import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Typography, Fade } from "@material-ui/core";
import Lottie from "react-lottie";
import animationData from "./NotFoundAnimation.json";

const styles = createStyles({
    root: {},
    text: {
        fontStyle: "italic",
        padding: "0px 25px 10px 25px",
        fontSize: "120%",
        fontFamily: "monospace",
        textAlign: "center",
    },
});

interface InfoNotFoundProps extends WithStyles<typeof styles> {
    text: string;
}

class InfoNotFound extends Component<InfoNotFoundProps> {
    render() {
        const { classes, text } = this.props;

        return (
            <Fade in={true} timeout={{ enter: 200 }}>
                <div className={classes.root}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: animationData,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                            },
                        }}
                        height={200}
                        width={200}
                    />
                    <Typography variant="subtitle1" children={text} className={classes.text} />
                </div>
            </Fade>
        );
    }
}

export default withStyles(styles)(InfoNotFound);
