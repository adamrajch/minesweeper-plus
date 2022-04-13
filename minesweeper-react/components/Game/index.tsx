import { Box, Button, Group, SimpleGrid, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CellState, CellValue, Face } from "../../types";
import { generateCells, openMultipleCells } from "../../utils";
import TileButton from "./Button";
import NumDisplay from "./NumDisplay";
type Props = {};

export default function Game() {
  const [cells, setCells] = useState(generateCells({ MAX_ROW: 9, MAX_COL: 9 }));
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);
  const [maxRow, setMaxRow] = useState<number>(9);
  const [maxCol, setMaxCol] = useState<number>(9);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (!live) {
      setLive(true);
    }

    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    if (
      currentCell.state === CellState.flagged ||
      currentCell.state === CellState.visible
    ) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      //bomb click
    } else if (currentCell.value === CellValue.none) {
      //clear map
      newCells = openMultipleCells(
        newCells,
        rowParam,
        colParam,
        maxRow,
        maxCol
      );

      setCells(newCells);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
      setCells(newCells);
    }
  };
  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      e.preventDefault();
      if (!live) {
        return;
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.open) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);

        setBombCounter(bombCounter - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.open;
        setCells(currentCells);
        setBombCounter(bombCounter + 1);
      }
    };
  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      generateCells({ MAX_ROW: 9, MAX_COL: 9 });
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <Box
            key={`${rowIndex}+${colIndex}`}
            sx={{
              height: "30px",
              width: "30px",
            }}
          >
            <TileButton
              onContext={handleCellContext}
              onClick={handleCellClick}
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
          <NumDisplay value={bombCounter} />
        </Box>
        <Button onClick={() => handleFaceClick()}>{face}</Button>
        <Box>
          <NumDisplay value={time} />
        </Box>
      </Group>
      <SimpleGrid cols={9} spacing={0}>
        {renderCells()}
      </SimpleGrid>
    </Stack>
  );
}
