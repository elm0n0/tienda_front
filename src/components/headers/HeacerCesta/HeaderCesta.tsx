import React from "react";
import './HeaderCesta.css';
import basketIcon from './icons/shopping-cart.svg';
import { useTranslation } from "react-i18next";

const HeaderCesta: React.FC = () => {
    const { t } = useTranslation();

    const itemCount = 1;

    return (
        <div className="header-cesta-container">
            <div className="basket-icon-wrapper">
                <img src={basketIcon} alt="Basket Icon" className="basket-icon" />
                {itemCount > 0 && (
                    <span className="basket-count">{itemCount}</span>
                )}
            </div>
            <span className="basket-label">{t('HEADER.BASKET.TITLE')}</span>
        </div>
    );
};

export default HeaderCesta;
