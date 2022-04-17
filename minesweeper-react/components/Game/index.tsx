import { Box, Button, Group, SimpleGrid, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Cell, CellState, CellValue, Face } from "../../types";
import { generateCells, openMultipleCells } from "../../utils";
import TileButton from "./Button";
import NumDisplay from "./NumDisplay";

export default function Game({ diff }: any) {
  const { name, rows, cols, numMines } = diff;
  const [cells, setCells] = useState(
    generateCells({
      MAX_ROW: rows,
      MAX_COL: cols,
      numMines: numMines,
    })
  );
  console.log(name, rows, cols);
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const [bombCounter, setBombCounter] = useState<number>(numMines);

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
  useEffect(() => {
    if (hasLost) {
      setFace(Face.lost);
      setLive(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setFace(Face.won);
      setLive(false);
    }
  }, [hasWon]);

  useEffect(() => {
    console.log(diff);
    setLive(false);
    setTime(0);
    setBombCounter(diff.numMines);
    setCells(
      generateCells({
        MAX_ROW: diff.rows,
        MAX_COL: diff.cols,
        numMines: diff.numMines,
      })
    );
  }, [diff, name, rows, cols, numMines]);

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

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();

    if (!live) {
      let isBomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isBomb) {
        newCells = generateCells({
          MAX_ROW: diff.rows,
          MAX_COL: diff.cols,
          numMines: diff.numMines,
        });
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isBomb = false;
          break;
        }
      }

      setLive(true);
    }

    const currentCell = newCells[rowParam][colParam];

    if (
      currentCell.state === CellState.flagged ||
      currentCell.state === CellState.visible
    ) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      //bomb click
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      //clear map
      newCells = openMultipleCells(
        newCells,
        rowParam,
        colParam,
        diff.rows,
        diff.cols
      );

      setCells(newCells);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    //check win condition
    let numberOfOpenCells = false;
    for (let row = 0; row < diff.rows; row++) {
      for (let col = 0; col < diff.cols; col++) {
        const currentCell = newCells[row][col];
        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          numberOfOpenCells = true;
          break;
        }
      }
    }
    if (!numberOfOpenCells) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }
    setCells(newCells);
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
    setLive(false);
    setTime(0);
    setCells(
      generateCells({
        MAX_ROW: diff.rows,
        MAX_COL: diff.cols,
        numMines: diff.numMines,
      })
    );
    setBombCounter(diff.numMines);
    setHasLost(false);
    setHasWon(false);
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
              red={cell.red}
            />
          </Box>
        );
      })
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();

    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }
        return cell;
      })
    );
  };

  return (
    <>
      <Stack
        align="stretch"
        justify="center"
        sx={(theme) => ({
          border: "1px solid white",
          margin: "auto",
        })}
      >
        <Group position="apart" p="md">
          <Box>
            <NumDisplay value={bombCounter} />
          </Box>
          <Button onClick={() => handleFaceClick()}>{face}</Button>
          <Box>
            <NumDisplay value={time} />
          </Box>
        </Group>
        <SimpleGrid cols={cols} spacing={0}>
          {renderCells()}
        </SimpleGrid>
      </Stack>
    </>
  );
}
