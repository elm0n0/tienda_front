import React from 'react';
import './header.css';
import logo from './icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import HeaderRegister from './HeaderRegister/HeaderRegister';

const Header: React.FC = () => {

    const navigate = useNavigate();

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img className='logo' src={logo} alt="logo" onClick={handleLogo} />
            </div>
            <div className='search-container'>
                <Search />
            </div>
            <div className='language-selector-container'>
                <LanguageSelector />
            </div>
            <div className='header-register-container'>
                <HeaderRegister />
            </div>
            <div className='cesta-container'>
                <div>cesta</div>
            </div>
        </div>
    );
};

export default Header;