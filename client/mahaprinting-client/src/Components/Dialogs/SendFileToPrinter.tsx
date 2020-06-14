import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { Print } from "../../ServerAPI/Print";
import Dialog from "../Common/Dialog";
import { observable } from "mobx";
import Printer from "../../ServerAPI/Printer";
import Select, { Option } from "../Common/Select";

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

    const { printers } = this.props;

    if (printers.length === 1) this.selectedPrinterId = printers[0]?.id;
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

    let printerOptions = printers.map((printer) => new Option(printer.name, printer.id));

    return (
      <Dialog open={true} onClose={this.props.onClose} title="Send to 3D Printer">
        <Select
          label="Choose Printer"
          value={this.selectedPrinterId || ""}
          options={printerOptions}
          onChange={(event: any) => {
            this.selectedPrinterId = event.target.value;
          }}
        />
        {selectedPrint.fileExtension === "stl" && <input />}
      </Dialog>
    );
  }
}

export default withStyles(styles)(SendFileToPrinter);
