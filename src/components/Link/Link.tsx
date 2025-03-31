import React from "react";
import { Link } from "react-router-dom";

import './Link.css';

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, className }) => {

    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    );

}

export default CustomLink;