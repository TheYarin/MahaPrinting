import React, { FC } from "react";
import { createStyles, withStyles, ButtonProps, Button } from "@material-ui/core";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

interface Props extends ButtonProps {
  topIcon: any;
}

const ButtonWithIconOnTop: FC<Props> = (props) => {
  const { classes, topIcon, children, ...rest } = props;
  return (
    <Button classes={classes} {...rest}>
      <div className={classes!.root}>
        {topIcon}
        {children}
      </div>
    </Button>
  );
};

export default withStyles(styles)(ButtonWithIconOnTop);
