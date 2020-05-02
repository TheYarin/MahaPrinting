import React from "react";
import { observer } from "mobx-react";
import UserPrintListItem from "./UserPrintListItem/UserPrintListItem";
import { withStyles, createStyles, WithStyles, List } from "@material-ui/core";
import { UserPrintsStore } from "../../../PrintStores/UserPrintsStore";
import TitleBar from "../../Common/TitleBar";

const styles = createStyles({
  title: {
    marginBottom: 10,
  },
  list: {
    // backgroundColor: colors.grey[50],
    // padding: "5px 0",
    // boxShadow: "0 0 5px " + colors.grey[50],
  },
});

export interface Props extends WithStyles<typeof styles> {
  userPrintsStore: UserPrintsStore;
}

@observer
class MyPrints extends React.Component<Props> {
  render() {
    const expansionPanels = this.props.userPrintsStore.prints.map((print) => (
      <UserPrintListItem key={print.id} userPrint={print} />
    ));

    const { classes } = this.props;

    return (
      <div>
        <TitleBar title="Your Prints" />
        <List className={classes.list}>{expansionPanels}</List>
      </div>
    );
  }
}

export default withStyles(styles)(MyPrints);
