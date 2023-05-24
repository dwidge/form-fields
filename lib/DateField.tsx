// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DebounceField } from "./DebounceField";

export function DateFieldB({
  value = new Date(),
  onChange,
  ...opts
}: Omit<DatePickerProps<Date>, "onChange"> & {
  value?: Date | null;
  onChange?: (v: Date | null) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        //renderInput={(props) => <TextField {...props} />}
        value={value}
        onChange={onChange}
        {...opts}
      />
    </LocalizationProvider>
  );
}

export function DateField({
  value,
  onChange,
  ...props
}: Omit<DatePickerProps<Date>, "onChange"> & {
  value: Date | null;
  onChange: (v: Date | null) => void;
}) {
  return (
    <DebounceField
      {...{ value, onChange }}
      render={({ value, onChange }) => (
        <DateFieldB {...{ value, onChange, ...props }} />
      )}
    />
  );
}
