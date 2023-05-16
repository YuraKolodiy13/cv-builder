import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React from "react";
import './Switcher.scss';

interface SwitcherProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Switcher: React.FC<SwitcherProps> = ({label, checked, onChange}) => (
  <FormControlLabel
    control={
      <Switch
        checked={checked}
        onChange={onChange}
        color="primary"
      />
    }
    labelPlacement="start"
    label={label}
  />
);

export default Switcher;