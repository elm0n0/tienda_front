// Menu.tsx
import React, { useEffect, useState } from "react";
import './menu.css';
import MenuCard from "../MenuCard/MenuCard";

interface Section {
    title: string;
    subsections: string[];
}

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

    const sections: Section[] = [
        {
            title: "Tendencias",
            subsections: ["Lo más vendidos", "Últimas novedades", "Productos del momento"]
        },
        {
            title: "Dispositivos Digitales",
            subsections: ["Smartphones", "Tablets", "Laptops", "Accesorios"]
        },
        {
            title: "Electrodomésticos",
            subsections: ["Refrigeradores", "Lavadoras", "Microondas"]
        },
        {
            title: "Moda",
            subsections: ["Hombres", "Mujeres", "Niños"]
        }
    ];

    return (
        <div className={`menu-dropdown ${shouldShow ? 'show' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className='menu-header'>
                <span className='menu-title'>Hola, Nombre</span>
                <button className='menu-close' onClick={onClose}>✖</button>
            </div>
            <div className='menu-content'>
                <div className="menu-cards">
                    {sections.map((section, index) => (
                        <MenuCard key={index} title={section.title} subsections={section.subsections} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
