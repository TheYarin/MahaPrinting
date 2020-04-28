import React, { Component } from "react";

import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";

import MaterialTable, { Icons, MTableToolbar, MaterialTableProps, Column } from "material-table";
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
import { observer } from "mobx-react";
import * as muiColors from "@material-ui/core/colors";
import TitleBar from "../Common/TitleBar";

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

const styles = (theme: Theme) =>
    createStyles({
        root: { marginTop: 15 },
        customToolbar: theme.palette.global.titleBar,
        printIcon: { color: muiColors.grey[700] },
        toolbarOverride: { paddingLeft: 0 },
    });

export interface Props extends WithStyles<typeof styles>, MaterialTableProps<any> {
    title: string;
}

@observer
class StyledPrintsTable extends Component<Props> {
    render() {
        const { classes, title, columns, options, components, ...otherProps } = this.props;
        const finalColumns = [
            {
                title: "#",
                field: "id",
                width: "8%",
                cellStyle: { fontWeight: "bold", fontSize: "115%", fontFamily: "monospace" },
            } as Column<any>,
            { title: "Print Name", field: "name", width: "25%", cellStyle: { wordBreak: "break-word" } } as Column<any>,
            ...columns.filter((c) => !(["id", "name"] as Array<any>).includes(c.field)),
        ];

        return (
            <div className={classes.root}>
                <MaterialTable
                    {...otherProps}
                    title={<TitleBar title={title} />}
                    columns={finalColumns}
                    icons={tableIcons as Icons}
                    options={{
                        ...options,
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 25, 50],
                        emptyRowsWhenPaging: false,
                        sorting: true,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: muiColors.grey[300],
                            fontWeight: "bold",
                            fontSize: "130%",
                            fontFamily: "monospace",
                        },
                    }}
                    components={{
                        ...components,
                        Toolbar: (props) => (
                            <div className={classes.customToolbar}>
                                <MTableToolbar {...props} classes={{ root: classes.toolbarOverride }} />
                            </div>
                        ),
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(StyledPrintsTable);
