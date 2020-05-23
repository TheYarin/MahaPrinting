import React, { Component } from "react";
import { MenuItem, TextField, TextFieldProps } from "@material-ui/core";

interface Props {
  options?: string[];
  loading?: boolean;
  textFieldProps?: TextFieldProps;
}

class Select extends Component<Props> {
  render() {
    const { options, loading, textFieldProps } = this.props;

    if (loading) {
      const loadingText = "Loading...";

      return (
        <TextField select disabled {...textFieldProps} value={loadingText}>
          <MenuItem value={loadingText}>{loadingText}</MenuItem>
        </TextField>
      );
    }

    if (!options || (Array.isArray(options) && options.length === 0)) {
      console.error("Falsey options passed to Select:", options);
      return "ERROR";
    }

    return (
      <TextField select {...textFieldProps}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default Select;
