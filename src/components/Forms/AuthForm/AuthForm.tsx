import React, { useState, useCallback } from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";

import './AuthForm.css';

import {
    FormValidationResult,
    isValidApellidos,
    isValidEmail,
    isValidNombre,
    isValidPassword,
    isValidUsuario,
    validateForm,
} from "../../../utils/validators/formsValidators";
import { validateField } from "../../../utils/validators/helpers/validationHelpers";
import { authService } from "../../../services/auth/authService";
import { RegisterRequest } from "../../../services/auth/types/RegisterRequest";
import { LoginRequest } from "../../../services/auth/types/LoginRequest";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../../store/auth/authSlice";
import { useTranslation } from "react-i18next";

interface AuthFormProps {
    isRegistering: boolean;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
}


const AuthForm: React.FC<AuthFormProps> = ({
    isRegistering,
    setIsRegistering,
    onSuccess
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        nombre: "",
        apellidos: "",
        usuario: "",
    });

    const [validations, setValidations] = useState<FormValidationResult>({
        email: { valid: true, errorMessage: "" },
        password: { valid: true, errorMessage: "" },
        nombre: { valid: true, errorMessage: "" },
        apellidos: { valid: true, errorMessage: "" },
        usuario: { valid: true, errorMessage: "" },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: keyof typeof formState) => {
        const { valid, errorMessage } = validateField(field, formState[field]);
        setValidations((prev) => ({ ...prev, [field]: { valid, errorMessage } }));
    };

    const handleSwapRegister = useCallback(() => {
        setIsRegistering((prev) => !prev);
    }, [setIsRegistering]);

    const handleSubmit = async () => {
        if (isRegistering) {
            const registerValidation = validateForm([
                { field: "email", value: formState.email, validators: [isValidEmail] },
                { field: "password", value: formState.password, validators: [isValidPassword] },
                { field: "nombre", value: formState.nombre, validators: [isValidNombre] },
                { field: "apellidos", value: formState.apellidos, validators: [isValidApellidos] },
                { field: "usuario", value: formState.usuario, validators: [isValidUsuario] },
            ]);

            setValidations(registerValidation);

            const isValid = Object.values(registerValidation).every((v) => v.valid);
            if (!isValid) return;

            const registerRequest: RegisterRequest = { ...formState };

            try {
                const response = await authService.register(registerRequest);
                if (response) {
                    dispatch(setAuthUser(response));
                    onSuccess();
                }
            } catch (err) {
                console.error("Error en registro:", err);
            }
        } else {
            const loginValidation = validateForm([
                { field: "email", value: formState.email, validators: [isValidEmail] },
                { field: "password", value: formState.password, validators: [isValidPassword] },
            ]);

            setValidations((prev) => ({
                ...prev,
                email: loginValidation.email,
                password: loginValidation.password,
            }));

            if (!loginValidation.email.valid || !loginValidation.password.valid) return;

            const loginRequest: LoginRequest = {
                credential: formState.email,
                password: formState.password,
            };

            try {
                const response = await authService.login(loginRequest);
                if (response) {
                    dispatch(setAuthUser(response));
                    window.dispatchEvent(new Event('authUserChanged'));
                    onSuccess();
                }
            } catch (err) {
                console.error("Error en login:", err);
            }
        }
    };

    return (
        <div className="auth-modal-input-wrapper-container">
            <div className="auth-modal-input-wrapper">
                {isRegistering && (
                    <>
                        <Input {...inputProps(t('HEADER.LOGED_MENU.AUTH_FORM.NAME_INPUT.NAME'), "nombre", t('HEADER.LOGED_MENU.AUTH_FORM.NAME_INPUT.PLACEHOLDER'))} />
                        <Input {...inputProps(t('HEADER.LOGED_MENU.AUTH_FORM.SURNAME_INPUT.NAME'), "apellidos", t('HEADER.LOGED_MENU.AUTH_FORM.SURNAME_INPUT.PLACEHOLDER'))} />
                        <Input {...inputProps(t('HEADER.LOGED_MENU.AUTH_FORM.USER_INPUT.NAME'), "usuario", t('HEADER.LOGED_MENU.AUTH_FORM.USER_INPUT.PLACEHOLDER'))} />
                    </>
                )}
                <Input {...inputProps(t('HEADER.LOGED_MENU.AUTH_FORM.EMAIL_INPUT.NAME'), "email", t('HEADER.LOGED_MENU.AUTH_FORM.EMAIL_INPUT.PLACEHOLDER'))} />
                <Input {...inputProps(t('HEADER.LOGED_MENU.AUTH_FORM.PASSWORD_INPUT.NAME'), "password", t('HEADER.LOGED_MENU.AUTH_FORM.PASSWORD_INPUT.PLACEHOLDER'))} />
            </div>
            <div className="auth-model-submit-button-container">
                <Button type="submit" onClick={handleSubmit} variant="primary">
                    {isRegistering ? t('HEADER.LOGED_MENU.AUTH_FORM.REGISTER_BUTON') : t('HEADER.LOGED_MENU.AUTH_FORM.LOGIN_BUTON')}
                </Button>
                <Button type="submit" onClick={handleSwapRegister} variant="secondary">
                    {isRegistering ? t('HEADER.LOGED_MENU.AUTH_FORM.LOGIN_BUTON') : t('HEADER.LOGED_MENU.AUTH_FORM.REGISTER_BUTON')}
                </Button>
            </div>
        </div>
    );

    function inputProps(
        title: string,
        field: keyof typeof formState,
        customPlaceholder?: string
    ) {
        return {
            title: title,
            type: field === "password" ? "password" : "text",
            name: field,
            value: formState[field],
            onChange: handleChange,
            placeholder: customPlaceholder || field.charAt(0).toUpperCase() + field.slice(1),
            hasError: !validations[field].valid,
            error: validations[field].errorMessage,
            onBlur: () => handleBlur(field),
        };
    }
};

export default AuthForm;
