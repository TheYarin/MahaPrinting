import React, { Component, ReactNode } from "react";
import { createStyles, WithStyles, withStyles, Typography, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            ...theme.palette.global.titleBar,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
            width: "100%",
        },
        title: {
            ...theme.palette.global.titleBarText,
            marginLeft: 15,
        },
    });

interface TitleBarProps extends WithStyles<typeof styles> {
    title: string;
    iconSection?: ReactNode;
}

class TitleBar extends Component<TitleBarProps> {
    render() {
        const { classes, title, iconSection } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
                {iconSection}
            </div>
        );
    }
}

export default withStyles(styles)(TitleBar);
