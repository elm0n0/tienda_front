import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/auth";
import "./HeaderLogedMenu.css";
import { userService } from "../../../services/user/UserService";
import { UserResponseAPI } from "../../../services/user/types/UserResponse";
import { clearAuthUser } from "../../../store/auth/authSlice";
import { useTranslation } from "react-i18next";

const HeaderLogedMenu: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.auth.user);
    const [userInfo, setUserInfo] = useState<UserResponseAPI | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authUser?.usuarioId || !authUser.device.accessToken) return;
            const response = await userService.getUserById(authUser.usuarioId, authUser.device.accessToken);
            if (response) {
                setUserInfo(response);
            }
        };

        fetchUserData();
    }, [authUser?.usuarioId, authUser?.device.accessToken]);

    const handleLogout = () => {
        dispatch(clearAuthUser());
        localStorage.removeItem("AuthUser");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="header-loged-menu-container" onClick={() => setMenuOpen(!menuOpen)} ref={menuRef}>
            <p className="header-loged-menu-p">{t("HEADER.LOGED_MENU.HELLOW")},</p>
            <p className="header-loged-menu-p2">{userInfo?.nombre}</p>
            <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
                <ul>
                    <li onClick={handleLogout}>{t("HEADER.LOGED_MENU.LOGOUT")}</li>
                </ul>
            </div>
        </div>
    );
};

export default HeaderLogedMenu;
