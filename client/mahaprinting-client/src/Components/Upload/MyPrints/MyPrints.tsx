import React from "react";
import MyPrintsStore from "../MyPrintsStore";
import { observer } from "mobx-react";
import UserPrintListItem from "./UserPrintListItem";
import { withStyles, createStyles, WithStyles, colors, Typography } from "@material-ui/core";

const styles = createStyles({
  title: {
    marginBottom: 10,
  },
  list: {
    backgroundColor: colors.grey[100],
    padding: "5px 0",
    boxShadow: "0 0 5px " + colors.grey[100],
  },
});

export interface Props extends WithStyles<typeof styles> {
  myPrintsStore: MyPrintsStore;
}

@observer
class MyPrints extends React.Component<Props> {
  render() {
    const expansionPanels = this.props.myPrintsStore.prints.map((print) => (
      <UserPrintListItem key={print.id} userPrint={print} />
    ));

    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.title} variant="h5">
          Your prints
        </Typography>
        <div className={classes.list}>{expansionPanels}</div>
      </div>
    );
  }
}

export default withStyles(styles)(MyPrints);
