import { CSSProperties, ReactNode } from "react";

interface Props {
  handleClick?: () => void;
  buttonClass: string;
  disabled?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}
const Button = ({
  handleClick,
  buttonClass,
  disabled,
  style,
  children,
}: Props) => {
  return (
    <button
      onClick={handleClick}
      className={buttonClass}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
