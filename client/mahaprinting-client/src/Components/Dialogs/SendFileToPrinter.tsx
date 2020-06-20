import React, { Component, FormEvent } from "react";
import { createStyles, WithStyles, withStyles, Typography, Button } from "@material-ui/core";
import { Print } from "../../ServerAPI/Print";
import Dialog from "../Common/Dialog";
import { observable, computed } from "mobx";
import Printer from "../../ServerAPI/Printer";
import Select, { Option } from "../Common/Select";
import { flexCol, spaceChildren } from "../../JssUtils";
import ButtonWithIconOnTop from "../Common/ButtonWithIconOnTop";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { ServerConnector } from "../../ServerAPI/ServerConnector";
import { observer } from "mobx-react";

const styles = createStyles({
  root: {
    ...flexCol,
    ...spaceChildren("vertically", 10),
  },
  slicing: {
    ...flexCol,
    alignItems: "start",
  },
});

interface Props extends WithStyles<typeof styles> {
  onClose: Function;
  selectedPrint: Print;
  printers: Printer[];
  serverConnector: ServerConnector;
}

@observer
class SendFileToPrinter extends Component<Props> {
  @observable selectedPrinterId?: number;
  @observable file?: File;
  fileInputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    const { printers } = this.props;

    if (printers.length === 1) this.selectedPrinterId = printers[0]?.id;
  }

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.file = e.target.files?.[0];
  };

  get shouldUploadGcode() {
    return this.props.selectedPrint.fileExtension === "stl";
  }

  @computed
  get canSubmitForm() {
    if (this.shouldUploadGcode && !this.file) return false;

    return this.selectedPrinterId && this.file;
  }

  onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { serverConnector, selectedPrint, onClose } = this.props;

    await serverConnector.sendToPrinter(selectedPrint.id, this.selectedPrinterId as number, this.file);

    onClose();
  };

  render() {
    const { selectedPrint, printers, serverConnector, classes } = this.props;

    let printerOptions = printers.map((printer) => new Option(printer.name, printer.id));

    return (
      <Dialog open={true} onClose={this.props.onClose} title="Send to 3D Printer">
        <form className={classes.root} onSubmit={this.onSubmit}>
          <Typography>**Details**</Typography>
          <Select
            label="Choose Printer"
            value={this.selectedPrinterId || ""}
            options={printerOptions}
            onChange={(event: any) => {
              this.selectedPrinterId = event.target.value;
            }}
          />
          {this.shouldUploadGcode && (
            <div className={classes.slicing}>
              <Typography>If STL, download STL, slice it and upload GCODE</Typography>
              <a href={serverConnector.getPrintFileDownloadLink(selectedPrint.id)}>
                <ButtonWithIconOnTop topIcon={<SaveAltIcon />}>Download STL</ButtonWithIconOnTop>
              </a>
              <input type="file" ref={this.fileInputRef} accept=".gcode" onChange={this.onFileChange} />
            </div>
          )}
          <Button type="submit" color="primary" variant="contained" disabled={!this.canSubmitForm}>
            Print!
          </Button>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SendFileToPrinter);
