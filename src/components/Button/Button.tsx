import React from 'react';
import './Button.css';

interface ButtonProps {
  name: "primary" | "secondary" | "disabled";
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', name }) => {

  return (
    <button type={type} onClick={onClick} className={"button " + name}>
      {children}
    </button>
  );
};

export default Button;
