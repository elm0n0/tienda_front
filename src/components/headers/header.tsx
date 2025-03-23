import React from 'react';
import './header.css';
import logo from './icons/logo.svg';
import Search from '../Search/Search';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/auth';

const Header: React.FC = () => {

    const authUserData = useSelector((state: RootState) => state.auth.user);

    const isTokenExpired = authUserData
        ? new Date(authUserData.device.accessTokenExpiresAt) < new Date()
        : true;

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img className='logo' src={logo} alt="logo" />
            </div>
            <div className='search-container'>
                <Search />
            </div>
            <div className='language-selector-container'>
                <LanguageSelector />
            </div>
            <div className='header-register-container'>
                {
                    !isTokenExpired &&
                    <span>Hola, {authUserData?.email}</span>
                }
                {
                    isTokenExpired &&
                    <HeaderRegister />
                }
            </div>
            <div className='cesta-container'>
                <div>cesta</div>
            </div>
        </div>
    );
};

export default Header;