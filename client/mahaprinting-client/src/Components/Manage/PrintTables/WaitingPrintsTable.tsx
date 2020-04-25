import React, { Component } from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import StyledPrintsTable from "../../Common/StyledPrintsTable";
import { PrintsStore } from "../../../PrintStores/PrintsStore";
import { observer } from "mobx-react";
import moment from "moment";
import * as muiColors from "@material-ui/core/colors";
import { PrintStatus } from "../../../ServerAPI/PrintStatus";

const styles = createStyles({
    icon: { color: muiColors.grey[700] },
});

interface Props extends WithStyles<typeof styles> {
    printsStore: PrintsStore;
}

@observer
class WaitingPrintsTable extends Component<Props> {
    render() {
        const { classes, printsStore } = this.props;
        return (
            <StyledPrintsTable
                title={"Waiting Prints"}
                columns={[
                    { title: "Notes", field: "notes", width: "25%" },
                    {
                        title: "Uploaded",
                        field: "timestamp",
                        render: (rowData) => moment(rowData.timestamp).fromNow(),
                        width: "12%",
                    },
                    { title: "Contact Details", field: "contactDetails", width: "25%" },
                ]}
                data={printsStore.prints.filter((p) => p.status === PrintStatus.IN_QUEUE).map((p) => p)}
                actions={[
                    {
                        icon: () => <PrintIcon className={classes.icon} />,
                        tooltip: "Send to 3D printer",
                        onClick: () => false,
                    },
                ]}
            />
        );
    }
}

export default withStyles(styles)(WaitingPrintsTable);
