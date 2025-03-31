// NavBar.tsx
import React from 'react';
import './NavBar.css';
import Menu from '../Menu/Menu';
import NavBarSection from './NavBarSection/NavBarSection';
import MenuButton from '../Button/MenuButton/MenuButton';
import CustomLink from '../Link/Link';
import { useMenu } from '../../Hooks/useMenu';

const NavBar: React.FC = () => {
  const { open, isClosing, menuRef, handleToggleMenu } = useMenu();

  const sections = [
    { label: "Sección 1", path: "/seccion-1" },
    { label: "Sección 2", path: "/seccion-2" },
    { label: "Sección 3", path: "/seccion-3" },
    { label: "Sección 4", path: "/seccion-4" },
  ];

  return (
    <>
      <div className="nav-bar-list-container">
        <div className="menu-button-section">
          <MenuButton onClick={handleToggleMenu}>☰ menú</MenuButton>
        </div>
        <div className="menu-sections">
          <NavBarSection sections={sections} />
        </div>
        <div className="menu-offer">
          <CustomLink to="/ofert" className='nav-bar-link'>🔥 Oferta del Mes</CustomLink>
        </div>
      </div>
      {(open || isClosing) && (
        <div ref={menuRef}>
          <Menu isOpen={open} isClosing={isClosing} onClose={handleToggleMenu} />
        </div>
      )}
    </>
  );
};

export default NavBar;
