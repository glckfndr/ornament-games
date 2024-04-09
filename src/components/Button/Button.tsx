import React, { CSSProperties, useState } from "react";

interface ButtonStyle {
  isToggled: boolean;
  isCorrect: boolean;
  imagePath: string;
  style: CSSProperties;
}

const initStyle: CSSProperties = {
  backgroundSize: "cover",
  position: "relative",
  bottom: "0rem",
  margin: "5px",
  transition: "bottom 0.4s ease-out",
};

const getStyle = ({
  isToggled,
  isCorrect,
  imagePath,
  style,
}: ButtonStyle): CSSProperties => {
  const baseStyle: CSSProperties = {
    ...initStyle,
    backgroundImage: `url(${imagePath})`,
    bottom: "-0.3rem",
  };
  return isToggled
    ? isCorrect
      ? { ...baseStyle, backgroundColor: "#f07800" }
      : { ...baseStyle, backgroundColor: "#007800" }
    : style;
};

interface Props {
  imagePath: string;
  handleClick: () => boolean;
  pushFunction: (arg: () => void) => void;
  btnClass: string;
  disabled: boolean;
}
const Button = ({
  imagePath,
  handleClick,
  btnClass,
  pushFunction,
  disabled,
}: Props) => {
  const [isToggled, setIsToggled] = useState(false);
  const style = { ...initStyle, backgroundImage: `url(${imagePath})` };
  const [buttonStyle, setButtonStyle] = useState<CSSProperties>(style);

  return (
    <button
      onClick={() => {
        setIsToggled(!isToggled);
        setButtonStyle(
          getStyle({
            isToggled: !isToggled,
            isCorrect: handleClick(),
            imagePath,
            style,
          })
        );
        if (!isToggled)
          pushFunction(() => {
            setIsToggled(false);
            setButtonStyle(style);
          });
      }}
      className={btnClass}
      style={buttonStyle}
      disabled={disabled}
    ></button>
  );
};

export default Button;
