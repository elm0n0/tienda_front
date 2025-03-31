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
            title: "seccion 1",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3"]
        },
        {
            title: "seccion 2",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4"]
        },
        {
            title: "seccion 3",
            subsections: ["subseccion 1", "subseccion 2"]
        },
        {
            title: "seccion 4",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3"]
        },
        {
            title: "seccion 5",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },
        {
            title: "seccion 6",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },
        {
            title: "seccion 7",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },
        {
            title: "seccion 8",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },
        {
            title: "seccion 9",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },
        {
            title: "seccion 10",
            subsections: ["subseccion 1", "subseccion 2", "subseccion 3", "subseccion 4", "subseccion 5", "subseccion 6"]
        },

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
