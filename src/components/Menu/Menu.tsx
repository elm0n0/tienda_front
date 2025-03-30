import React, { useEffect, useState } from "react";

import './menu.css';

interface MenuProps {
    isOpen: boolean;
    isClosing: boolean;
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, isClosing, onClose }) => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if (isOpen && !isClosing) {
            const timeout = setTimeout(() => {
                setShouldShow(true);
            }, 10);
            return () => clearTimeout(timeout);
        } else {
            setShouldShow(false);
        }
    }, [isOpen, isClosing]);

    return (
        <div className={`menu-dropdown ${shouldShow ? 'show' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className='menu-header'>
                <span className='menu-title'>Hola, Nombre</span>
                <button className='menu-close' onClick={onClose}>✖</button>
            </div>
            <div className='menu-content'>
                <p>Contenido del menú aquí...</p>
            </div>
        </div>
    );
};

export default Menu;