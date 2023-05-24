// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { DebounceField } from "./DebounceField";

export const TextFieldB = ({
  value = "",
  onChange,
  ...opts
}: Omit<TextFieldProps, "onChange"> & {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  return (
    <MuiTextField
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...opts}
    />
  );
};

export function TextField({
  value = "",
  onChange,
  ...props
}: Omit<TextFieldProps, "onChange"> & {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <DebounceField
      {...{ value, onChange }}
      render={({ value, onChange }) => (
        <TextFieldB {...{ value, onChange, ...props }} />
      )}
    />
  );
}
