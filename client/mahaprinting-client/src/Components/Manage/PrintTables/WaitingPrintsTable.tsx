import React, { Component } from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import StyledPrintsTable from "../../Common/StyledPrintsTable";
import { PrintsStore } from "../../../PrintStores/PrintsStore";
import { observer } from "mobx-react";
import * as muiColors from "@material-ui/core/colors";
import { PrintStatus } from "../../../ServerAPI/PrintStatus";
import { Print } from "../../../ServerAPI/Print";
import { Column } from "material-table";
import PrettyTimestamp from "../../Common/PrettyTimestamp";

const styles = createStyles({
  icon: { color: muiColors.grey[700] },
});

interface Props extends WithStyles<typeof styles> {
  printsStore: PrintsStore;
  sendToPrinter: (print: Print) => void;
}

@observer
class WaitingPrintsTable extends Component<Props> {
  render() {
    const { classes, printsStore, sendToPrinter } = this.props;
    return (
      <StyledPrintsTable
        title={"Waiting Prints"}
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
        data={printsStore.prints.filter((p) => p.status === PrintStatus.IN_QUEUE).map((p) => p)}
        actions={[
          {
            icon: () => <PrintIcon className={classes.icon} />,
            tooltip: "Send to 3D printer",
            onClick: (_e, rowData) => sendToPrinter(rowData),
          },
        ]}
      />
    );
  }
}

export default withStyles(styles)(WaitingPrintsTable);
