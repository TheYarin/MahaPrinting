import React, { Component } from "react";

import { createStyles, WithStyles, withStyles, Typography } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";

import MaterialTable, { Icons, MTableToolbar, MTableHeader } from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { PrintsStore } from "../../PrintStores/PrintsStore";
import { observer } from "mobx-react";
import moment from "moment";
import * as muiColors from "@material-ui/core/colors";
//import { PrintStatus } from "../../ServerAPI/PrintStatus";

const tableIcons = {
    Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: any) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: any) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: any) => <ViewColumn {...props} ref={ref} />),
};

const styles = createStyles({
    root: { flexBasis: "83%", maxWidth: "calc(100% - 280px)" },
    customToolbar: { backgroundColor: muiColors.lightBlue[300], color: "white" },
    printIcon: { color: muiColors.grey[700] },
    tableHeader: { fontFamily: "monospace", fontWeight: "bold" },
});

interface Props extends WithStyles<typeof styles> {
    printsStore: PrintsStore;
}

@observer
class AllPrintsTable extends Component<Props> {
    render() {
        const { classes, printsStore } = this.props;

        return (
            <div className={classes.root}>
                <MaterialTable
                    title={
                        <Typography variant="h5" className={classes.tableHeader}>
                            Waiting Prints
                        </Typography>
                    }
                    columns={[
                        {
                            title: "#",
                            field: "id",
                            width: "8%",
                            cellStyle: { fontWeight: "bold", fontSize: "115%", fontFamily: "monospace" },
                        },
                        { title: "Print Name", field: "name", width: "25%", cellStyle: { wordBreak: "break-word" } },
                        { title: "Contact Details", field: "contactDetails", width: "25%" },
                        {
                            title: "Uploaded",
                            field: "timestamp",
                            render: (rowData) => moment(rowData.timestamp).fromNow(),
                            width: "12%",
                            //defaultSort: "desc",
                            // headerStyle: { width: "100px" },
                        },
                        { title: "Notes", field: "notes", width: "25%" },
                    ]}
                    data={printsStore.prints.map((p) => p)} //printsStore.prints.filter(p => p.status === PrintStatus.UPLOADED).map((p) => p)
                    icons={tableIcons as Icons}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [10, 30, 50, 100],
                        emptyRowsWhenPaging: false,
                        sorting: true,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: muiColors.grey[300],
                            fontWeight: "bold",
                            fontSize: "130%",
                            fontFamily: "monospace",
                        },
                        // headerStyle: { width: "" },
                    }}
                    actions={[
                        {
                            icon: () => <PrintIcon className={classes.printIcon} />,
                            tooltip: "Send to 3D printer",
                            onClick: () => false,
                        },
                    ]}
                    components={{
                        Toolbar: (props) => (
                            <div className={classes.customToolbar}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AllPrintsTable);
