import React, { Component } from "react";

import { observable } from "mobx";
import { observer } from "mobx-react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import * as muiColors from "@material-ui/core/colors";

import { Column } from "material-table";

import StyledPrintsTable from "../../Common/StyledPrintsTable";
import { PrintsStore } from "../../../PrintStores/PrintsStore";
import { PrintStatus } from "../../../ServerAPI/PrintStatus";
import { Print } from "../../../ServerAPI/Print";
import PrettyTimestamp from "../../Common/PrettyTimestamp";
import { confirm } from "../../Common/Confirm";

const styles = createStyles({
  icon: { color: muiColors.grey[700] },
});

interface Props extends WithStyles<typeof styles> {
  printsStore: PrintsStore;
}

@observer
class InProgressPrintsTable extends Component<Props> {
  @observable printDialogOpen = false;
  @observable selectedPrint?: Print = undefined;

  _markPrintAsComplete = async (print: Print) => {
    if (!(await confirm("Are you sure you want to mark this print as complete?"))) return;

    this.props.printsStore.markPrintAsCompleted(print.id);
  };

  render() {
    const { classes, printsStore } = this.props;
    return (
      <StyledPrintsTable
        title={"Prints In Progress"}
        columns={[
          { title: "Notes", field: "notes", width: "25%" } as Column<any>,
          {
            title: "Uploaded",
            field: "timestamp",
            render: (rowData) => <PrettyTimestamp timestamp={rowData.timestamp} />,
            width: "12%",
          } as Column<any>,
          { title: "Contact Details", field: "contactDetails", width: "25%" } as Column<any>,
        ]}
        data={printsStore.prints.filter((p) => p.status === PrintStatus.PRINTING).map((p) => p)}
        actions={[
          {
            icon: () => <AssignmentTurnedInIcon className={classes.icon} />,
            tooltip: "Mark print as finished",
            onClick: (e, rowData) => this._markPrintAsComplete(rowData),
          },
        ]}
      />
    );
  }
}

export default withStyles(styles)(InProgressPrintsTable);
