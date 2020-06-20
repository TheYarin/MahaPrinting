import React, { Component } from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Delete";
import StyledPrintsTable from "../../Common/StyledPrintsTable";
import { PrintsStore } from "../../../PrintStores/PrintsStore";
import { observer } from "mobx-react";
import * as muiColors from "@material-ui/core/colors";
import { PrintStatus } from "../../../ServerAPI/PrintStatus";
import { Column } from "material-table";
import PrettyTimestamp from "../../Common/PrettyTimestamp";

const styles = createStyles({
  icon: { color: muiColors.grey[700] },
});

interface Props extends WithStyles<typeof styles> {
  printsStore: PrintsStore;
}

@observer
class FinishedPrintsTable extends Component<Props> {
  render() {
    const { classes, printsStore } = this.props;

    return (
      <StyledPrintsTable
        title={"Print History"}
        columns={[
          { title: "Print Status", field: "status", width: "18%" } as Column<any>,
          {
            title: "Printed",
            field: "timestamp_printed",
            render: (rowData) => <PrettyTimestamp timestamp={rowData.timestamp} />,
            width: "10%",
          } as Column<any>,
          {
            title: "Uploaded",
            field: "timestamp",
            render: (rowData) => <PrettyTimestamp timestamp={rowData.timestamp} />,
            width: "10%",
          } as Column<any>,
          { title: "Contact Details", field: "contactDetails", width: "25%" } as Column<any>,
        ]}
        data={printsStore.prints.filter((p) => [PrintStatus.COMPLETED, PrintStatus.CANCELED].includes(p.status)).map((p) => p)}
        actions={[
          {
            icon: () => <RemoveIcon className={classes.icon} />,
            tooltip: "Delete Print Log",
            onClick: () => false,
          },
        ]}
      />
    );
  }
}

export default withStyles(styles)(FinishedPrintsTable);
