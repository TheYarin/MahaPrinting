import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Dialog, IconButton, Theme } from "@material-ui/core";
import { observer } from "mobx-react";
import CloseIcon from "@material-ui/icons/Close";
import TitleBar from "./TitleBar";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            minWidth: 400,
        },
        closeButton: {
            padding: 2,
            marginLeft: 20,
            marginRight: 10,
            color: "white",
        },
        childrenWrapper: {
            padding: 15,
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
            <Dialog {...otherProps} classes={{ paper: classes.root }}>
                <TitleBar
                    title={title}
                    iconSection={
                        <IconButton
                            className={classes.closeButton}
                            children={<CloseIcon />}
                            onClick={this.props.onClose}
                        />
                    }
                />
                <div className={classes.childrenWrapper}>{children}</div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(CustomDialog);
