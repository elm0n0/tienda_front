import React from "react";
import Button from "../Button";

interface MenuButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} variant="secondary" className="button">
      {children}
    </Button>
  );
};

export default MenuButton;
