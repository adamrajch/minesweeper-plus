import { Cell, CellState, CellValue } from "../types";

interface GameRowCol {
  MAX_ROW: number;
  MAX_COL: number;
}

export const generateCells = ({ MAX_ROW, MAX_COL }: GameRowCol): Cell[][] => {
  let cells: Cell[][] = [];

  for (let i = 0; i < MAX_ROW; i++) {
    cells.push([]);
    for (let k = 0; k < MAX_COL; k++) {
      //change to open later
      cells[i].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  //place mines - dont hard code the number ( eventually put difficulty)
  let minesPlaced = 0;
  let numMines = 10;
  while (minesPlaced < numMines) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);

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
  for (let r = 0; r < MAX_ROW; r++) {
    for (let c = 0; c < MAX_COL; c++) {
      const currentCell = cells[r][c];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = 0;

      const topLeftBomb = r > 0 && c > 0 ? cells[r - 1][c - 1] : null;
      const topBomb = r > 0 ? cells[r - 1][c] : null;
      const topRightBomb =
        r > 0 && c < MAX_COL - 1 ? cells[r - 1][c + 1] : null;
      const leftBomb = c > 0 ? cells[r][c - 1] : null;
      const rightBomb = c < MAX_COL ? cells[r][c + 1] : null;
      const bottomBomb = r < MAX_ROW - 1 ? cells[r + 1][c] : null;
      const bottomLeftBomb =
        r < MAX_ROW - 1 && c > 0 ? cells[r + 1][c - 1] : null;
      const bottomRightBomb =
        r < MAX_ROW - 1 && c < MAX_COL - 1 ? cells[r + 1][c + 1] : null;

      if (topLeftBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightBomb?.value === CellValue.bomb) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        cells[r][c] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }

  return cells;
};
