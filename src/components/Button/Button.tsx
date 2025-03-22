import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button' }) => {

  const buttonClass = type === 'submit' ? 'btn-submit' : 'btn-button';

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
