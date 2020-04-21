import React, { Component, ReactNode } from "react";
import { createStyles, WithStyles, withStyles, Typography } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";

const styles = createStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: lightBlue[300],
    color: "white",
  },
  title: {
    fontFamily: "monospace",
    fontWeight: "bold",
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
