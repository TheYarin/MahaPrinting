import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

import MyPrintsStore from "./MyPrintsStore";
import UploadPrintForm from "./UploadPrintForm";
import MyPrints from "./MyPrints/MyPrints";
import { ServerConnector } from "../../ServerAPI";
import { observer } from "mobx-react";

const styles = createStyles({
  root: {
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
  },
});

interface Props extends WithStyles<typeof styles> {
  serverConnector: ServerConnector;
}

@observer
class UploadPage extends React.Component<Props> {
  myPrintsStore: MyPrintsStore = new MyPrintsStore(this.props.serverConnector);

  async componentDidMount() {
    await this.myPrintsStore.initialize();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h2">Upload</Typography>
        <UploadPrintForm myPrintsStore={this.myPrintsStore} />
        {this.myPrintsStore.prints.length > 0 && <MyPrints myPrintsStore={this.myPrintsStore} />}
      </div>
    );
  }
}

export default withStyles(styles)(UploadPage);
