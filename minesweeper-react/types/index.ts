export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  open,
  visible,
  flagged,
}

export enum Face {
  smile = "😃",
  oh = "😵",
  lost = "🤬",
  won = "😁",
}

export type Difficulty = {
  name: string;
  rows: number;
  cols: number;
  numMines: number;
};

export const Difficulties: Difficulty[] = [
  {
    name: "easy",
    rows: 9,
    cols: 9,
    numMines: 10,
  },
  {
    name: "medium",
    rows: 16,
    cols: 16,
    numMines: 40,
  },
  {
    name: "expert",
    rows: 16,
    cols: 30,
    numMines: 99,
  },
];

export type Cell = { value: CellValue; state: CellState; red?: boolean };
