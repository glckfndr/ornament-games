import { useReducer, useState } from "react";
import Button from "./Button";
import classes from "./Button.module.css";
import { getStyleReducer } from "./styleReducer";

interface Props {
  active: boolean;
  pushFunction: (arg: () => void) => void;
  handleAnswer: () => boolean;
  imagePath: string;
}

const OrnamentButton = ({
  active,
  pushFunction,
  handleAnswer,
  imagePath,
}: Props) => {
  const [isToggled, setIsToggled] = useState(false);
  const { styleReducer, baseStyle } = getStyleReducer(imagePath);
  const [style, setStyle] = useReducer(styleReducer, baseStyle);

  const restoreButtonState = () => {
    setStyle({ isToggled: true, isCorrect: false });
    setIsToggled(false);
  };

  const handleClick = () => {
    setStyle({ isToggled: isToggled, isCorrect: handleAnswer() });
    setIsToggled((prev) => !prev);
    if (!isToggled) pushFunction(restoreButtonState);
  };

  return (
    <Button
      disabled={!active}
      buttonClass={classes.btn}
      handleClick={handleClick}
      style={style}
    />
  );
};

export default OrnamentButton;
