// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Button, Stack, Paper, Box, ButtonGroup } from "@mui/material";
import { prependItem, removeItem, upsertItem } from "./utils/array";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type Render<T> = (props: {
  value: T;
  onChange: (v: T) => void;
}) => React.ReactNode;

export function ListField<T extends { id: string | number }>({
  label,
  value,
  defaultValue,
  onChange,
  onClick,
  children,
}: {
  label?: string;
  defaultValue: () => T;
  value: T[];
  onChange: (v: T[]) => void;
  onClick?: (v: T) => void;
  children: Render<T>;
}) {
  if (value.some(({ id }) => id == null))
    console.warn("ListField", "Missing id");
  const add = () => {
    const newValue =
      typeof defaultValue === "function"
        ? defaultValue()
        : { ...defaultValue, id: value.length };
    onChange(prependItem(value)(newValue));
  };
  const clear = () => {
    onChange([]);
  };

  return (
    <Stack gap={2} sx={{ flex: "auto", height: "100%" }}>
      <Stack gap={2} direction="row" justifyContent="space-between">
        <H3>{label}</H3>
        <ButtonGroup>
          <Button variant="contained" onClick={add}>
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
          onDrop={({ removedIndex, addedIndex }) => {
            removedIndex != null &&
              addedIndex != null &&
              onChange(arrayMoveImmutable(value, removedIndex, addedIndex));
          }}
        >
          {value.map((item) => (
            <Draggable key={item.id}>
              <ListItem>
                <Paper sx={{ width: 1 }}>
                  <Stack direction="row">
                    {
                      <Button
                        onClick={() => {
                          onChange(removeItem(value)(item));
                        }}
                      >
                        &times;
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
                          onChange(upsertItem(value)(item));
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
    </Stack>
  );
}

const H3 = styled.h3`
  margin: 0;
`;
