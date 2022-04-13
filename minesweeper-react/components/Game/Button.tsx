import { UnstyledButton } from "@mantine/core";
import React from "react";
import { CellState, CellValue } from "../../types";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (e: React.MouseEvent) => void;
  onContext(rowParam: number, colParam: number): any;
}
export default function TileButton({
  row,
  col,
  state,
  value,
  onClick,
  onContext,
}: ButtonProps) {
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

  return (
    <UnstyledButton
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
      sx={{
        boxSizing: "border-box",
        borderRadius: 0,
        padding: 0,
        height: "100%",
        width: "100%",

        borderTop:
          state !== CellState.visible ? "2px solid white" : "1px solid #7b7b7b",
        borderLeft:
          state !== CellState.visible ? "2px solid white" : "1px solid #7b7b7b",
        borderRight:
          state !== CellState.visible
            ? "2px solid #7b7b7b"
            : "1px solid #7b7b7b",
        borderBottom:
          state !== CellState.visible
            ? "2px solid #7b7b7b"
            : "1px solid #7b7b7b",
        backgroundColor:
          state === CellState.visible ? "gainsboro" : "gainsboro",
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
        textAlign: "center",
      }}
    >
      {renderContent()}
    </UnstyledButton>
  );
}
