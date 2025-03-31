import React from "react";

interface MenuCardProp {
    title: string;
    subsections: string[];
}

const MenuCard: React.FC<MenuCardProp> = ({ title, subsections }) => {

    return (
        <div className="menu-card">
            <h3 className="menu-card-title">{title}</h3>
            <ul className="menu-card-list">
                {subsections.map((subsection, index) => (
                    <li key={index} className="menu-card-item">
                        {subsection}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuCard;