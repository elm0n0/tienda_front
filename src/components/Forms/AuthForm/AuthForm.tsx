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
                        <Input {...inputProps("nombre","eg: Tienda")} />
                        <Input {...inputProps("apellidos","eg: Online")} />
                        <Input {...inputProps("usuario", "eg: TiendaOnline123")} />
                    </>
                )}
                <Input {...inputProps("email","eg: tienda.online@tiendaonline.com")} />
                <Input {...inputProps("password","eg: tuTiendaOnline*123")} />
            </div>
            <div className="auth-model-submit-button-container">
                <Button type="submit" onClick={handleSubmit} name="primary">
                    {isRegistering ? "Registrarse" : "Entrar"}
                </Button>
                <Button type="submit" onClick={handleSwapRegister} name="secondary">
                    {isRegistering ? "Iniciar sesión" : "Registrarse"}
                </Button>
            </div>
        </div>
    );

    function inputProps(field: keyof typeof formState,
        customPlaceholder?: string
    ) {
        return {
            title: field.charAt(0).toUpperCase() + field.slice(1),
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
