import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button = ({
  title,
  disabled,
  onClick,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      style={{
        display: "block",
        width: "100%",
        padding: "15px 0",
        background: "linear-gradient(to right, #c0a3e3, #7b5aae) disabled",
        borderRadius: "25px",
        color: "#fff",
        textAlign: "center",
        fontSize: "16px",
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
