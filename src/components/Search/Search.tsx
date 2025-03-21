import React, { useState } from "react";

import './Search.css';
import searchIcon from './icons/search-dark.svg';
import searchIconHover from './icons/search-hover-dark.svg';

const Search: React.FC = () => {
    const [search, setSearch] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSearch = () => {
        console.log(`se realiza una busqueda con la entrada ${search}`);
    }

    return (
        <div className="search-border">
            <button className="search-button" type="button" >filtros</button>
            <input
                className="search-input"
                title="buscador"
                type="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="buscar en la tienda"
            />
            <div className="search-icon-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img className="search-icon" src={isHovered ? searchIconHover : searchIcon} alt="Search Icon" onClick={handleSearch} />
            </div>
        </div>
    );
};

export default Search;