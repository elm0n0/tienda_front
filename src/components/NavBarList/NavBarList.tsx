import React, { useState } from 'react';
import './NavBarList.css';

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
      <div className={`menu-dropdown ${open ? 'show' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className='menu-header'>
          <span className='menu-title'>Hola, Nombre</span>
          <button className='menu-close'
            onClick={handleToggleMenu}
          >✖</button>
        </div>
        <div className='menu-content'>
          <p>Contenido del menú aquí...</p>
        </div>
      </div>
    </>
  );
};

export default NavBarList;
