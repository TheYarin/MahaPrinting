import React, { Component } from "react";
import { MenuItem, TextField } from "@material-ui/core";

type optionValue = string | number;

export class Option {
  label: string;
  value: optionValue;

  constructor(label: string, value: optionValue) {
    this.label = label;
    this.value = value;
  }
}

interface Props {
  label: string;
  helperText?: string;
  value: optionValue;
  onChange: (e: any) => void;
  options: Option[];
}

class Select extends Component<Props> {
  public static defaultProps = {
    textWhenValueIsUndefined: "",
  };

  render() {
    const { value, label, onChange, helperText } = this.props;

    const optionsElements = this.props.options.map((option) => (
      <MenuItem key={option.value || ""} value={option.value}>
        {option.label}
      </MenuItem>
    ));

    return (
      <TextField select {...{ onChange, label, helperText, value }}>
        {optionsElements}
      </TextField>
    );
  }
}

export default Select;
