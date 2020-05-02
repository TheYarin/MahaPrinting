import React, { Component } from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import StyledPrintsTable from "../../Common/StyledPrintsTable";
import { PrintsStore } from "../../../PrintStores/PrintsStore";
import { observer } from "mobx-react";
import moment from "moment";
import * as muiColors from "@material-ui/core/colors";
import { PrintStatus } from "../../../ServerAPI/PrintStatus";
import { Print } from "../../../ServerAPI/Print";
import SendFileToPrinter from "../../Dialogs/SendFileToPrinter";
import { Column } from "material-table";

const styles = createStyles({
    icon: { color: muiColors.grey[700] },
});

interface Props extends WithStyles<typeof styles> {
    printsStore: PrintsStore;
}

@observer
class WaitingPrintsTable extends Component<Props> {
    state = {
        printDialogOpen: false,
        selectedPrint: undefined,
    };

    _openPrintDialog = (selectedPrint: Print) => this.setState({ printDialogOpen: true, selectedPrint: selectedPrint });
    _closePrintDialog = () => this.setState({ printDialogOpen: false, selectedPrint: null });

    render() {
        const { classes, printsStore } = this.props;
        return (
            <>
                <StyledPrintsTable
                    title={"Waiting Prints"}
                    columns={[
                        { title: "Notes", field: "notes", width: "25%" } as Column<any>,
                        {
                            title: "Uploaded",
                            field: "timestamp",
                            render: (rowData) => moment(rowData.timestamp).fromNow(),
                            width: "12%",
                        } as Column<any>,
                        { title: "Contact Details", field: "contactDetails", width: "25%" } as Column<any>,
                    ]}
                    data={printsStore.prints.filter((p) => p.status === PrintStatus.IN_QUEUE).map((p) => p)}
                    actions={[
                        {
                            icon: () => <PrintIcon className={classes.icon} />,
                            tooltip: "Send to 3D printer",
                            onClick: (e, rowData) => this._openPrintDialog(rowData),
                        },
                    ]}
                />
                <SendFileToPrinter
                    selectedPrint={this.state.selectedPrint}
                    open={this.state.printDialogOpen}
                    onClose={this._closePrintDialog}
                />
            </>
        );
    }
}

export default withStyles(styles)(WaitingPrintsTable);
