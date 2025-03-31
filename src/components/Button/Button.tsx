import React from "react";
import "./Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "disabled";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
