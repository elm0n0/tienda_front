import React, { useCallback, useEffect, useState } from "react";
import "./AuthModal.css";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { LoginRequest, RegisterRequest } from "../../../services/auth/types/auth";
import { authService } from "../../../services/auth/authService";
import { isValidApellidos, isValidEmail, isValidNombre, isValidPassword, isValidUsuario, validateForm } from "../../../utils/validators/formsValidators";
import { validateField } from "../../../utils/validators/helpers/validationHelpers";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    nombre: "",
    apellidos: "",
    usuario: "",
  });

  const [validations, setValidations] = useState({
    email: { valid: true, errorMessage: "" },
    password: { valid: true, errorMessage: "" },
    nombre: { valid: true, errorMessage: "" },
    apellidos: { valid: true, errorMessage: "" },
    usuario: { valid: true, errorMessage: "" },
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    return () => {
      setFormState({
        email: "",
        password: "",
        nombre: "",
        apellidos: "",
        usuario: "",
      });
      setValidations({
        email: { valid: true, errorMessage: "" },
        password: { valid: true, errorMessage: "" },
        nombre: { valid: true, errorMessage: "" },
        apellidos: { valid: true, errorMessage: "" },
        usuario: { valid: true, errorMessage: "" },
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (field: keyof typeof formState) => {
    const { valid, errorMessage } = validateField(field, formState[field]);
    setValidations((prevValidations) => ({
      ...prevValidations,
      [field]: { valid, errorMessage },
    }));
  };

  const handleSwapRegister = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setIsRegistering((prev) => !prev);
      setIsFading(false);
    }, 250);
    clearValidators();
  }, []);

  const clearValidators = () => {
    setValidations({
      email: { valid: true, errorMessage: "" },
      password: { valid: true, errorMessage: "" },
      nombre: { valid: true, errorMessage: "" },
      apellidos: { valid: true, errorMessage: "" },
      usuario: { valid: true, errorMessage: "" },
    });
  };

  const handleLogin = async () => {
    const loginValidation = validateForm([
      { field: "email", value: formState.email, validators: [isValidEmail] },
      { field: "password", value: formState.password, validators: [isValidPassword] },
    ]);

    setValidations((prevValidations) => ({
      ...prevValidations,
      email: loginValidation.email,
      password: loginValidation.password,
    }));

    if (!loginValidation.email.valid || !loginValidation.password.valid) {
      return;
    }

    const loginRequest: LoginRequest = { credential: formState.email, password: formState.password };

    try {
      const response = await authService.login(loginRequest);
      if (response) {
        console.log("Login exitoso:", response);
        onClose();
      } else {
        console.log("Credenciales incorrectas. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      console.log("Ocurrió un error en la autenticación. Intenta nuevamente.");
    }
  };

  const handleRegister = async () => {
    const registerValidation = validateForm([
      { field: "email", value: formState.email, validators: [isValidEmail] },
      { field: "password", value: formState.password, validators: [isValidPassword] },
      { field: "nombre", value: formState.nombre, validators: [isValidNombre] },
      { field: "apellidos", value: formState.apellidos, validators: [isValidApellidos] },
      { field: "usuario", value: formState.usuario, validators: [isValidUsuario] },
    ]);

    setValidations((prevValidations) => ({
      ...prevValidations,
      email: registerValidation.email,
      password: registerValidation.password,
      nombre: registerValidation.nombre,
      apellidos: registerValidation.apellidos,
      usuario: registerValidation.usuario,
    }));

    if (
      !registerValidation.email.valid ||
      !registerValidation.password.valid ||
      !registerValidation.nombre.valid ||
      !registerValidation.apellidos.valid ||
      !registerValidation.usuario.valid
    ) {
      return;
    }

    const registerRequest: RegisterRequest = {
      email: formState.email,
      password: formState.password,
      nombre: formState.nombre,
      apellidos: formState.apellidos,
      usuario: formState.usuario,
    };

    try {
      const response = await authService.register(registerRequest);
      if (response) {
        console.log("registro exitoso:", response);
        onClose();
      } else {
        console.log("Credenciales incorrectas. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      console.log("Ocurrió un error al registrar el usuario. Intentalo nuevamente.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-close-button-container">
          <Button type="button" onClick={onClose} name="primary">
            ×
          </Button>
        </div>
        <h2 className={`auth-modal-title ${isFading ? "fade-out" : ""}`}>
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </h2>
        <div className="auth-modal-input-wrapper-container">
          <div className="auth-modal-input-wrapper">
            {!isRegistering && (
              <>
                <Input
                  title="Email"
                  type="text"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Correo Electronico"
                  hasError={!validations.email.valid}
                  error={validations.email.errorMessage}
                  onBlur={() => handleBlur("email")}
                />
                <Input
                  title="Password"
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="Password"
                  hasError={!validations.password.valid}
                  error={validations.password.errorMessage}
                  onBlur={() => handleBlur("password")}
                />
              </>
            )}
            {isRegistering && (
              <>
                <Input
                  title="Nombre"
                  type="text"
                  name="nombre"
                  value={formState.nombre}
                  onChange={handleChange}
                  placeholder="nombre"
                  hasError={!validations.nombre.valid}
                  error={validations.nombre.errorMessage}
                  onBlur={() => handleBlur("nombre")}
                />
                <Input
                  title="Apellidos"
                  type="text"
                  name="apellidos"
                  value={formState.apellidos}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  hasError={!validations.apellidos.valid}
                  error={validations.apellidos.errorMessage}
                  onBlur={() => handleBlur("apellidos")}
                />
                <Input
                  title="Usuario"
                  type="text"
                  name="usuario"
                  value={formState.usuario}
                  onChange={handleChange}
                  placeholder="Usuario"
                  hasError={!validations.usuario.valid}
                  error={validations.usuario.errorMessage}
                  onBlur={() => handleBlur("usuario")}
                />
                <Input
                  title="Email"
                  type="text"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Correo Electronico"
                  hasError={!validations.email.valid}
                  error={validations.email.errorMessage}
                  onBlur={() => handleBlur("email")}
                />
                <Input
                  title="Password"
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="Password"
                  hasError={!validations.password.valid}
                  error={validations.password.errorMessage}
                  onBlur={() => handleBlur("password")}
                />
              </>
            )}
          </div>
          <div className="auth-model-submit-button-container">
            <Button type="submit" onClick={isRegistering ? handleRegister : handleLogin} name="primary">
              {isRegistering ? "Registrarse" : "Entrar"}
            </Button>
            <Button type="submit" onClick={handleSwapRegister} name="secondary">
              {!isRegistering ? "Registrarse" : "Iniciar sesión"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
