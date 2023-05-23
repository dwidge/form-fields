// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export function SelectField({ items, value, onChange, ...opts }) {
  const list = Array.isArray(items)
    ? items.map((v) => [v, v])
    : Object.entries(items);

  return (
    <TextField
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...opts}
    >
      {list.map(([i, v]) => (
        <MenuItem key={i} value={v}>
          {i}
        </MenuItem>
      ))}
    </TextField>
  );
}
