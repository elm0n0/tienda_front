import React from "react";

import './NavVarSection.css';
import CustomLink from "../../Link/Link";

interface NavBarSectionProps {
    sections: { label: string; path: string }[];
}

const NavBarSection: React.FC<NavBarSectionProps> = ({ sections }) => {

    return (
        <>
            {sections.map((section, index) => (
                <CustomLink key={index} to={section.path} className="nav-bar-link">
                    {section.label}
                </CustomLink>
            ))}
        </>
    );
}

export default NavBarSection;
