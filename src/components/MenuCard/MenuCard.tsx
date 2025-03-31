import React from "react";
import './MenuCard.css';

interface MenuCardProps {
  title: string;
  subsections: string[];
}

const MenuCard: React.FC<MenuCardProps> = ({ title, subsections }) => {
  return (
    <div className="menu-card">
      <div className="menu-card-header">
        <span className="menu-card-title">{title}</span>
      </div>
      <div className="menu-card-content">
        {subsections.map((subsection, index) => (
          <div key={index} className="menu-card-subsection">
            {subsection}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
