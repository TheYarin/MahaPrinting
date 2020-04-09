import React from "react";
import MyPrintsStore from "../MyPrintsStore";
import { observer } from "mobx-react";
import UserPrintListItem from "./UserPrintListItem";
import { withStyles, createStyles, WithStyles, colors } from "@material-ui/core";

const styles = createStyles({
  root: {
    marginTop: 10,
    padding: "5px 0",
    backgroundColor: colors.grey[100],
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

    return <div className={this.props.classes.root}>{expansionPanels}</div>;
  }
}

export default withStyles(styles)(MyPrints);
