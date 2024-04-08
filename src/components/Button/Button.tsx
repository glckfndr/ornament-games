import React, { CSSProperties, useState } from "react";

const getStyle = (
  isToggled: boolean,
  isCorrect: boolean,
  imagePath: string,
  styleIn: CSSProperties
): CSSProperties => {
  const buttonStyle0: CSSProperties = {
    backgroundImage: `url(${imagePath})`,
    backgroundSize: "cover",
    backgroundColor: "#f07800",
    position: "relative",
    bottom: "-0.3rem",
    transition: "bottom 0.4s ease-out",
  };

  const buttonStyle1: CSSProperties = {
    backgroundImage: `url(${imagePath})`,
    backgroundSize: "cover",
    backgroundColor: "#007800",
    position: "relative",
    bottom: "-0.3rem",
    transition: "bottom 0.4s ease-out",
  };

  return isToggled ? (isCorrect ? buttonStyle0 : buttonStyle1) : styleIn;
};

interface Props {
  imagePath: string;
  handleClick: () => boolean;
  pushFunction: (arg: () => void) => void;
  btnClass: string;
  style: CSSProperties;
}
const Button = ({
  imagePath,
  handleClick,
  btnClass,
  style,
  pushFunction,
}: Props) => {
  const [isToggled, setIsToggled] = useState(false);
  const styleIn = {
    ...style,
    backgroundImage: `url(${imagePath})`,
  };
  const [styleX, setStyleX] = useState<CSSProperties>(styleIn);

  return (
    <button
      onClick={() => {
        const isCorrect = handleClick();
        setIsToggled(!isToggled);
        setStyleX(getStyle(!isToggled, isCorrect, imagePath, styleIn));
        if (!isToggled)
          pushFunction(() => {
            setIsToggled(false);
            setStyleX(styleIn);
          });
      }}
      className={btnClass}
      style={styleX}
    ></button>
  );
};

export default Button;
