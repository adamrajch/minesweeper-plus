import { Button } from "@mantine/core";
import React from "react";
import { CellState, CellValue } from "../../types";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}
export default function TileButton({ row, col, state, value }: ButtonProps) {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return "💣";
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return "🚩";
      //TODO: Display Flag Emoji
    }

    return null;
  };

  console.log(value);

  return (
    <Button
      sx={{
        borderRadius: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "gainsboro",
        color:
          value && value === 1
            ? "blue"
            : value === 2
            ? "green"
            : value === 3
            ? "red"
            : value === 4
            ? "purple"
            : value === 5
            ? "maroon"
            : value == 6
            ? "turquoise"
            : value === 7
            ? "black"
            : "gray",
      }}
    >
      {renderContent()}
    </Button>
  );
}
