import { CSSProperties } from "react";

interface ButtonState {
  isToggled: boolean;
  isCorrect: boolean;
}

export function getStyleReducer(imagePath: string) {
  const baseStyle: CSSProperties = {
    backgroundImage: `url(${imagePath})`,
    bottom: "0",
  };

  const styleReducer = (style: CSSProperties, action: ButtonState) => {
    if (!action.isToggled) {
      if (action.isCorrect)
        return { ...baseStyle, backgroundColor: "#007800", bottom: "-0.3rem" };
      else
        return { ...baseStyle, backgroundColor: "#f07800", bottom: "-0.3rem" };
    } else return baseStyle;
  };

  return { styleReducer, baseStyle };
}
