import React, { useEffect, useState } from 'react';
import './header.css';
import logo from './icons/logo.svg';
import Search from '../Search/Search';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/auth';
import HeaderLogedMenu from './HeaderLogedMenu/HeaderLogedMenu';
import HeaderCesta from './HeacerCesta/HeaderCesta';
import { authService } from '../../services/auth/authService';
import { RefreshTokenRequest } from '../../services/auth/types/RefreshTokenRequest';
import { clearAuthUser, setAuthUser } from '../../store/auth/authSlice';

const Header: React.FC = () => {

    const dispatch = useDispatch();

    const authUserData = useSelector((state: RootState) => state.auth.user);
    const [loading, setLoading] = useState(true);

    const isTokenExpired = authUserData
        ? new Date(authUserData.device.accessTokenExpiresAt) < new Date()
        : true;

    useEffect(() => {
        const tryRefreshToken = async () => {
            if (!authUserData || !authUserData.device.accessToken) {
                setLoading(false);
                return;
            }

            if (!isTokenExpired) {
                setLoading(false);
                return;
            }

            try {
                const newAuth = await authService.refreshToken(
                    new RefreshTokenRequest(
                        authUserData.device.accessToken,
                        authUserData.device.refreshToken
                    )
                );
                if (newAuth) {
                    dispatch(setAuthUser(newAuth));
                } else {
                    dispatch(clearAuthUser());
                }
            } catch (err) {
                console.error("Error al refrescar token:", err);
                dispatch(clearAuthUser());
            } finally {
                setLoading(false);
            }
        };
        tryRefreshToken();
    }, [authUserData, dispatch, isTokenExpired]);

    if (loading) return null;

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
                {authUserData ? <HeaderLogedMenu /> : <HeaderRegister />}
            </div>
            <div className='cesta-container'>
                <HeaderCesta />
            </div>
        </div>
    );
};

export default Header;