import React, { useState } from 'react';
import './NavBarList.css';
import Menu from '../Menu/Menu';

const NavBarList: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggleMenu = () => {
    if (open) {
      setIsClosing(true);
      setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <>
      <div className="nav-bar-list-container">
        <div className="menu-button-section">
          <button className="menu-button"
            onClick={handleToggleMenu}
          >☰ Menú</button>
        </div>
        <div className="menu-sections">
          {/** componente menu-section-list */}
          <span>Sección 1</span>
          <span>Sección 2</span>
          <span>Sección 3</span>
          <span>Sección 4</span>
          <span>Sección 5</span>
          <span>Sección 6</span>
          <span>Sección 7</span>
          <span>Sección 8</span>
        </div>
        <div className="menu-offer">
          <span>🔥 Oferta del Mes</span>
        </div>
      </div>
      {(open || isClosing) && (
        <Menu isOpen={open} isClosing={isClosing} onClose={handleToggleMenu} />
      )}
    </>
  );
};

export default NavBarList;
