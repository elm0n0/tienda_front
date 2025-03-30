import React from 'react';
import './NavigationDropdown.css';

const NavigationDropdown: React.FC = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>Inicio</li>
        <li>Categorías</li>
        <li>Promociones</li>
        <li>Contacto</li>
      </ul>
    </div>
  );
};

export default NavigationDropdown;
