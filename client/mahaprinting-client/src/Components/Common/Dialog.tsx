import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { observer } from "mobx-react";
import * as muiColors from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";

const styles = createStyles({
    title: {
        backgroundColor: muiColors.lightBlue[400],
        color: "white",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: "150%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    closeButton: {
        padding: 2,
        color: "white",
    },
});

interface Props extends WithStyles<typeof styles> {
    title: string;
    open: boolean;
    onClose: any;
}

@observer
class CustomDialog extends Component<Props> {
    render() {
        const { classes, children, title, ...otherProps } = this.props;

        return (
            <Dialog {...otherProps}>
                <DialogTitle disableTypography className={classes.title}>
                    {title}
                    <IconButton className={classes.closeButton} children={<CloseIcon />} onClick={this.props.onClose} />
                </DialogTitle>
                {children}
            </Dialog>
        );
    }
}

export default withStyles(styles)(CustomDialog);
