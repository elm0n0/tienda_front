import React, { useState } from 'react';
import './NavBar.css';
import Menu from '../Menu/Menu';

import NavBarSection from './NavBarSection/NavBarSection';
import MenuButton from '../Button/MenuButton/MenuButton';
import CustomLink from '../Link/Link';
import { useMenu } from '../../Hooks/useMenu';

const NavBar: React.FC = () => {
  const { open, isClosing, menuRef, handleToggleMenu } = useMenu();

  const [sections, setSections] = useState([
    { label: "Sección 1", path: "/seccion-1" },
    { label: "Sección 2", path: "/seccion-2" },
    { label: "Sección 3", path: "/seccion-3" },
    { label: "Sección 4", path: "/seccion-4" },
  ]);

  const [newSection, setNewSection] = useState({ label: "", path: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSection = () => {
    if (newSection.label.trim() && newSection.path.trim()) {
      setSections([...sections, newSection]);
      setNewSection({ label: "", path: "" });
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="nav-bar-list-container">
        <div className="menu-button-section">
          <MenuButton onClick={handleToggleMenu}>☰ menú</MenuButton>
        </div>
        <div className="menu-sections">
          <NavBarSection />
        </div>
        <div className="menu-offer">
          <CustomLink to="/ofert" className='nav-bar-link'>🔥 Oferta del Mes</CustomLink>
        </div>
      </div>
      {(open || isClosing) && (
        <div ref={menuRef}>
          <Menu isOpen={open} isClosing={isClosing} onClose={handleToggleMenu} />
        </div>
      )
      }

      {/* Formulario para agregar una nueva sección */}
      {
        isAdding && (
          <div className="add-section-form">
            <input
              type="text"
              placeholder="Nombre de la sección"
              value={newSection.label}
              onChange={(e) => setNewSection({ ...newSection, label: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ruta (ej. /nueva-seccion)"
              value={newSection.path}
              onChange={(e) => setNewSection({ ...newSection, path: e.target.value })}
            />
            <button onClick={handleAddSection}>Agregar</button>
            <button onClick={() => setIsAdding(false)}>Cancelar</button>
          </div>
        )
      }

    </>
  );
};

export default NavBar;
