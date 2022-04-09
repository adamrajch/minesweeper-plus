import { Cell, CellState, CellValue } from "../types";

interface GameRowCol {
  row: number;
  col: number;
}

export const generateCells = ({ row, col }: GameRowCol): Cell[][] => {
  const cells: Cell[][] = [];

  for (let i = 0; i < row; i++) {
    cells.push([]);
    for (let k = 0; k < col; k++) {
      cells[i].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  return cells;
};
