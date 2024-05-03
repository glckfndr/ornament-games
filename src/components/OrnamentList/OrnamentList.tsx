import React from "react";
import OrnamentButton from "../Button/OrnamentButton";
import { ornaments } from "../../data/ornaments";

const ornamentList = Object.entries(ornaments);

interface Props {
  active: boolean;
  pushFunction: (arg: () => void) => void;
  handleAnswer: (arg: string) => boolean;
}

const OrnamentList = ({ active, pushFunction, handleAnswer }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        maxWidth: "32rem",
        flexWrap: "wrap",
        margin: "0 auto",
      }}
    >
      {ornamentList.map(([key, ornament]) => (
        <OrnamentButton
          active={active}
          pushFunction={pushFunction}
          handleAnswer={() => handleAnswer(key)}
          key={key}
          imagePath={ornament}
        />
      ))}
    </div>
  );
};

export default OrnamentList;
