import React, { useState } from "react";
import styled from "styled-components";
import { ListField } from "../lib/ListField";
import { TextField } from "../lib/TextField";
import { Center, Fill, Relative } from "Flex";

const App: React.FC<{}> = () => {
  const [value, onChange] = useState([]);
  return (
    <Background>
      <Foreground>
        <>
          <>
            <ListField
              {...{
                label: "ListField",
                value,
                onChange,
                defaultValue: {
                  id: 0,
                  text: "text",
                },
              }}
            >
              {({ onChange, value }) => (
                <TextField
                  fullWidth
                  {...{
                    value: value.text,
                    onChange: (text) => onChange({ ...value, text }),
                    label: "TextField",
                  }}
                />
              )}
            </ListField>
          </>
        </>
      </Foreground>
    </Background>
  );
};

const Abs = styled.div`
  position: absolute;
  height: 100%;
`;

const Foreground = styled(Fill)`
  background-color: cyan;
  height2: 80%;
  min-height: 200px;
  min-width: 200px;
  max-width: 500px;
  padding: 1em;
`;

const Background = styled(Center)`
  background-color: navy;
`;

export default App;
