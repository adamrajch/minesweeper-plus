import { Box, Button, Grid, Group, Stack } from "@mantine/core";
import React, { useState } from "react";
import { generateCells } from "../../utils";
import NumDisplay from "./NumDisplay";

type Props = {};

export default function Game() {
  const [cells, setCells] = useState(generateCells({ row: 9, col: 9 }));

  console.log(cells);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <Grid.Col key={`${rowIndex}+${colIndex}`} span={1}>
            <Button
              sx={{
                width: "100%",
              }}
            >{`${rowIndex}+${colIndex}`}</Button>
          </Grid.Col>
        );
      })
    );
  };
  return (
    <Stack
      align="stretch"
      justify="center"
      sx={(theme) => ({
        border: "1px solid white",
        // width: "600px",
        margin: "auto",
      })}
    >
      <Group position="apart" p="md">
        <Box>
          <NumDisplay value={12} />
        </Box>
        <Button>😁</Button>
        <Box>
          <NumDisplay value={50} />
        </Box>
      </Group>
      <Grid columns={9} gutter={0}>
        {renderCells()}
      </Grid>
    </Stack>
  );
}
