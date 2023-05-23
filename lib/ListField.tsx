// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Button, Stack, Paper, Box, ButtonGroup } from "@mui/material";
import { prependItem, removeItem, upsertItem } from "./utils/array";
import styled from "styled-components";
import { Container, Draggable } from "@edorivai/react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export function ListField({
  label,
  value,
  defaultValue,
  onChange,
  onClick = null,
  children,
}) {
  if (value.some(({ id }) => id == null))
    console.warn("ListField", "Missing id");
  const update = (item) => {
    onChange(upsertItem(value)(item));
  };
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
  const del = (item) => {
    onChange(removeItem(value)(item));
  };
  const onDrop = ({ removedIndex, addedIndex }) => {
    onChange(arrayMoveImmutable(value, removedIndex, addedIndex));
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
        <Container lockAxis="y" onDrop={onDrop}>
          {value.map((item, i) => (
            <Draggable key={item.id}>
              <ListItem>
                <Paper sx={{ width: 1 }}>
                  <Stack direction="row">
                    {del ? (
                      <Button onClick={(e) => del(item)}>&times;</Button>
                    ) : null}
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
                        onChange: update,
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
