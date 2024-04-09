import React, { ReactNode } from "react";

const gameStyle = {
  maxWidth: "25rem",
  display: "flex",
  justifyContent: "center",
  margin: "1rem auto",
  padding: "1rem",
  backgroundColor: "#345678",
  borderRadius: "7px",
  boxShadow: "0 0 4px 4px #777",
};
interface Props {
  children: ReactNode;
  value?: number;
}
const SequenceGame = ({ children, value }: Props) => {
  //console.log(value);
  return (
    <div style={gameStyle}>
      <div>{children}</div>
    </div>
  );
};

export default SequenceGame;
