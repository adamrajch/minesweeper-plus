import { Cell, CellState, CellValue } from "../types";

interface GameRowCol {
  MAX_ROW: number;
  MAX_COL: number;
  numMines: number;
}

export const generateCells = ({
  MAX_ROW,
  MAX_COL,
  numMines,
}: GameRowCol): Cell[][] => {
  let cells: Cell[][] = [];
  console.log("generating :", MAX_ROW, MAX_COL, numMines);
  //generate cells
  for (let i = 0; i < MAX_ROW; i++) {
    cells.push([]);
    for (let k = 0; k < MAX_COL; k++) {
      cells[i].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  //place mines - dont hard code the number ( eventually put difficulty)
  let minesPlaced = 0;

  while (minesPlaced < numMines) {
    const randomRow = Math.floor(Math.random() * MAX_ROW);
    const randomCol = Math.floor(Math.random() * MAX_COL);

    const currentCell = cells[randomRow][randomCol];

    if (currentCell.value !== CellValue.bomb) {
      cells[randomRow][randomCol] = {
        ...cells[randomRow][randomCol],
        value: CellValue.bomb,
      };
      minesPlaced++;
    }
  }

  //place tile numbers for non bombs
  for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = 0;

      const {
        topCell,
        topLeftCell,
        topRightCell,
        rightCell,
        leftCell,
        bottomCell,
        bottomLeftCell,
        bottomRightCell,
      } = grabAllAdjacentCells(cells, rowIndex, colIndex, MAX_ROW, MAX_COL);

      if (topLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }

  return cells;
};

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number,
  MAX_ROWS: number,
  MAX_COLS: number
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
  console.log("adjuscent", MAX_ROWS);
  console.log("adjuscent cols", MAX_COLS);
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < MAX_COLS - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell =
    colParam < MAX_COLS - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < MAX_ROWS - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell =
    rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < MAX_ROWS - 1 && colParam < MAX_COLS - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

export const openMultipleCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number,
  MAX_ROW: number,
  MAX_COL: number
): Cell[][] => {
  let newCells = cells.slice();

  newCells[rowParam][colParam].state = CellState.visible;

  const {
    topCell,
    topLeftCell,
    topRightCell,
    rightCell,
    leftCell,
    bottomCell,
    bottomLeftCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam, MAX_ROW, MAX_COL);

  if (
    topLeftCell?.state === CellState.open &&
    topLeftCell.value !== CellValue.bomb
  ) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam - 1,
        colParam - 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }

  if (topCell?.state === CellState.open && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam - 1,
        colParam,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam - 1][colParam].state = CellState.visible;
    }
  }

  if (
    topRightCell?.state === CellState.open &&
    topRightCell.value !== CellValue.bomb
  ) {
    if (topRightCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam - 1,
        colParam + 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }

  if (leftCell?.state === CellState.open && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam,
        colParam - 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam][colParam - 1].state = CellState.visible;
    }
  }

  if (
    rightCell?.state === CellState.open &&
    rightCell.value !== CellValue.bomb
  ) {
    if (rightCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam,
        colParam + 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam][colParam + 1].state = CellState.visible;
    }
  }

  if (
    bottomLeftCell?.state === CellState.open &&
    bottomLeftCell.value !== CellValue.bomb
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam + 1,
        colParam - 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    bottomCell?.state === CellState.open &&
    bottomCell.value !== CellValue.bomb
  ) {
    if (bottomCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam + 1,
        colParam,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam + 1][colParam].state = CellState.visible;
    }
  }

  if (
    bottomRightCell?.state === CellState.open &&
    bottomRightCell.value !== CellValue.bomb
  ) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openMultipleCells(
        newCells,
        rowParam + 1,
        colParam + 1,
        MAX_ROW,
        MAX_COL
      );
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return newCells;
};
