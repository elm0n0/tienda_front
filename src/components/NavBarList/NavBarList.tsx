import React from 'react';
import './NavigationBarSection.css';

const NavBarList: React.FC = () => {
    return (
        <div className="nav-bar-section-container">
            <div className="nav-block menu-main">
                <span>☰ Menú</span>
            </div>

            <div className="nav-block menu-sections">
                <span>Sección 1</span>
                <span>Sección 2</span>
                <span>Sección 3</span>
            </div>

            <div className="nav-block menu-offer">
                <span>🔥 Oferta del Mes</span>
            </div>
        </div>
    );
};

export default NavBarList;
