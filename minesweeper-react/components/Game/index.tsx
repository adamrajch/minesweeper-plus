import { Box, Button, Group, SimpleGrid, Stack } from "@mantine/core";
import React, { useState } from "react";
import { generateCells } from "../../utils";
import TileButton from "./Button";
import NumDisplay from "./NumDisplay";

type Props = {};

export default function Game() {
  const [cells, setCells] = useState(generateCells({ MAX_ROW: 9, MAX_COL: 9 }));

  console.log(cells);

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <Box
            key={`${rowIndex}+${colIndex}`}
            sx={{
              height: "30px",
              width: "30px",
              border: "1px solid black",
            }}
          >
            <TileButton
              row={rowIndex}
              col={colIndex}
              state={cell.state}
              value={cell.value}
            />
          </Box>
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
        margin: "auto",
      })}
    >
      <Button
        onClick={() => setCells(generateCells({ MAX_ROW: 9, MAX_COL: 9 }))}
      >
        Generate
      </Button>
      <Group position="apart" p="md">
        <Box>
          <NumDisplay value={12} />
        </Box>
        <Button>😁</Button>
        <Box>
          <NumDisplay value={50} />
        </Box>
      </Group>
      <SimpleGrid cols={9} spacing={0}>
        {renderCells()}
      </SimpleGrid>
    </Stack>
  );
}
