// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export function CheckField({
  value,
  onChange,
  label,
  ...opts
}: Omit<CheckboxProps, "onChange"> & {
  label?: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          {...opts}
        />
      }
      label={label}
    />
  );
}
