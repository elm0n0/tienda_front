import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/auth";
import './HeaderLogedMenu.css';

const HeaderLogedMenu: React.FC = () => {

    const authUser = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="header-loged-menu-container">
            <p className="header-loged-menu-p">hola,</p>
            <p className="header-loged-menu-p2">{authUser?.email}</p>
        </div>
    );
};

export default HeaderLogedMenu;