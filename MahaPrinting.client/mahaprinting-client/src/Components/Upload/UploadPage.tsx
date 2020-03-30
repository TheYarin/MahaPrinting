import React from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

export default class UploadPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Typography variant="h2">Upload</Typography>
        <form autoComplete="off">
          <TextField name="name" label="Print name" variant="outlined" />
        </form>
      </div>
    );
  }
}
