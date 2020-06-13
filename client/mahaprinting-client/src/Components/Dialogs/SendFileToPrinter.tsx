import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, TextField, MenuItem } from "@material-ui/core";
import { Print } from "../../ServerAPI/Print";
import Dialog from "../Common/Dialog";
import { observable } from "mobx";
import Printer from "../../ServerAPI/Printer";

const styles = createStyles({});

interface Props extends WithStyles<typeof styles> {
  onClose: Function;
  selectedPrint: Print;
  printers: Printer[];
}

const states = {
  UPLOADING: "Uploading",
  SLICING: "Slicing",
};

class SendFileToPrinter extends Component<Props> {
  @observable selectedPrinterId?: number;

  constructor(props: Props) {
    super(props);

    this.selectedPrinterId = props.printers[0]?.id;
  }

  state = {
    activeStep: -1,
    printState: null,
  };

  onSubmit = () => {};

  _uploadPrint = () => this.setState({ printState: states.UPLOADING });
  _slicePrint = () => this.setState({ printState: states.SLICING });
  _showPrintInfo = () => this.setState({ printState: null, activeStep: 2 });

  render() {
    const { selectedPrint, printers } = this.props;

    let printerOptions = printers.map((printer) => (
      <MenuItem key={printer.id} value={printer.id}>
        {printer.name}
      </MenuItem>
    ));

    printerOptions = [
      <MenuItem key=" " value=" ">
        {" "}
      </MenuItem>,
      ...printerOptions,
    ];

    return (
      <Dialog open={true} onClose={this.props.onClose} title="Send to 3D Printer">
        <TextField
          select
          label="Choose Printer"
          value={this.selectedPrinterId || ""}
          onChange={(event: any) => {
            this.selectedPrinterId = event.target.value;
          }}
        >
          {printerOptions}
        </TextField>
        {selectedPrint.fileExtension === "stl" && <input />}
      </Dialog>
    );
  }
}

export default withStyles(styles)(SendFileToPrinter);
