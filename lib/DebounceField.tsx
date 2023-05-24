// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect, useState, useRef } from "react";

export const DebounceField = <T,>({
  value,
  onChange,
  timeout = 1000,
  render,
}: {
  value: T;
  onChange: (v: T) => void;
  timeout?: number;
  render: ({
    value,
    onChange,
  }: {
    value: T;
    onChange: (v: T) => void;
  }) => React.ReactElement;
}) => {
  const [v, setv] = useState(value);
  const timer = useRef<number | undefined>();

  useEffect(() => {
    setv(value);
  }, [value]);
  return render({
    value: v,
    onChange: (v) => {
      setv(v);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => onChange(v), timeout);
    },
  });
};
