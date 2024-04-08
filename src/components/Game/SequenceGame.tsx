import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  value?: number;
}
const SequenceGame = ({ children, value }: Props) => {
  //console.log(value);
  return (
    <>
      <button>{"Рівень: " + value}</button>
      <div>{children}</div>
    </>
  );
};

export default SequenceGame;
