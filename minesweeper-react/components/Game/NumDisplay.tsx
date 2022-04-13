import React from "react";

type Props = {
  value: number;
};

const NumDisplay: React.FC<Props> = ({ value }) => {
  return (
    <div>
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};

export default NumDisplay;
