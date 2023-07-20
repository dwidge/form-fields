// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect } from "react";
import { Button, Stack, Paper, Box, ButtonGroup } from "@mui/material";
import { removeItem, upsertItem } from "./utils/array";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const makeId = () => (Math.random() * 1e8) | 0;

type Render<T> = (props: {
  value: T;
  onChange: (v: T) => void;
}) => React.ReactNode;

export function ListField<T extends { id: string | number }>({
  label = "",
  value,
  defaultValue,
  keyProp = "listKey",
  onChange,
  onClick,
  children,
}: {
  label?: string;
  defaultValue: () => T;
  keyProp?: string;
  value: T[];
  onChange: (v: T[]) => void;
  onClick?: (v: T) => void;
  children: Render<T>;
}) {
  useEffect(() => {
    if (value.some((c) => c[keyProp] == null))
      onChange(
        value.map((v) => ({
          ...v,
          [keyProp]: v[keyProp] ?? makeId(),
        }))
      );
  }, [value]);

  const make = () => ({
    ...(typeof defaultValue === "function" ? defaultValue() : defaultValue),
    [keyProp]: makeId(),
  });
  const prepend = () => onChange([make(), ...value]);
  const append = () => onChange([...value, make()]);
  const clear = () => {
    onChange([]);
  };

  const byKey = (item) => (listItem) => item[keyProp] === listItem[keyProp];

  return (
    <Stack gap={2} sx={{ flex: "auto", height: "100%" }}>
      <Stack gap={2} direction="row" justifyContent="space-between">
        <label>{label}</label>
        <ButtonGroup>
          <Button variant="contained" onClick={prepend}>
            +
          </Button>
          <Button variant="contained" onClick={clear}>
            &times;
          </Button>
        </ButtonGroup>
      </Stack>
      <List>
        <Container
          lockAxis="y"
          dragHandleSelector=".dragHandle"
          onDrop={({ removedIndex, addedIndex }) => {
            removedIndex != null &&
              addedIndex != null &&
              onChange(arrayMoveImmutable(value, removedIndex, addedIndex));
          }}
        >
          {value
            .filter((c) => c[keyProp])
            .map((item) => (
              <Draggable key={item[keyProp]}>
                <ListItem>
                  <Paper sx={{ width: 1 }}>
                    <Stack direction="row">
                      {
                        <Button
                          onClick={() => {
                            onChange(removeItem(value, byKey)(item));
                          }}
                          className="dragHandle"
                        >
                          &times; &#x2630;
                        </Button>
                      }
                      <Box
                        p={1}
                        {...(onClick
                          ? {
                              onClick: () => onClick(item),
                              style: { cursor: "pointer" },
                            }
                          : {})}
                        sx={{ width: 1 }}
                      >
                        {children({
                          value: item,
                          onChange: (item) => {
                            onChange(upsertItem(value, byKey)(item));
                          },
                        })}
                      </Box>
                    </Stack>
                  </Paper>
                </ListItem>
              </Draggable>
            ))}
        </Container>
      </List>
      <Stack gap={2} direction="row" justifyContent="space-between">
        <label></label>
        <ButtonGroup>
          <Button variant="contained" onClick={append}>
            +
          </Button>
          <Button variant="contained" onClick={clear}>
            &times;
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

const H3 = styled.h3`
  margin: 0;
`;
