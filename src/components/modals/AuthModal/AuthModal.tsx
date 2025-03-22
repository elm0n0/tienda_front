import React, { useState } from "react";
import "./AuthModal.css";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { authService } from "../../../services/auth/authService";
import { LoginRequest, RegisterRequest } from "../../../services/auth/types/auth";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {

  /** login */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** register */
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [usuario, setUsuario] = useState("");

  /** controls */
  const [isRegistering, setIsRegistering] = useState(false);
  const [isFading, setIsFading] = useState(false);


  const handleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOnchangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };
  const handleOnchangeApellidos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellidos(e.target.value);
  };
  const handleOnchangeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const handleSwapRegister = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setIsFading(false);
    }, 250);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Por favor, ingresa tu email y contraseña.");
      return;
    }

    const loginRequest: LoginRequest = { credential: email, password };

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

    if (!email || !password) {
      console.log("Por favor, ingresa tu email.");
      return;
    }
    if (!password) {
      console.log("Por favor, ingresa tu password.");
      return;
    }

    if (!nombre) {
      console.log("Por favor, ingresa tu nombre.");
      return;
    }

    if (!apellidos) {
      console.log("Por favor, ingresa tus apellidos.");
      return;
    }

    if (!usuario) {
      console.log("Por favor, ingresa tu usuario.");
      return;
    }

    const registerRequest: RegisterRequest = {
      email,
      password,
      nombre,
      apellidos,
      usuario,
    }

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
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="auth-modal-close-button-container">
          <Button
            type="button"
            onClick={onClose}
            name="primary">×</Button>
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
                  value={email}
                  onChange={handleOnchangeEmail}
                  placeholder="Correo Electronico"
                />
                <Input
                  title="Password"
                  type="password"
                  value={password}
                  onChange={handleOnchangePassword}
                  placeholder="Password"
                />
              </>
            )}
            {
              isRegistering && (
                <>
                  <div className="auth-modal-name-surname-container">
                    <Input
                      title="Nombre"
                      type="text"
                      value={nombre}
                      onChange={handleOnchangeNombre}
                      placeholder="nombre"
                    />
                    <Input
                      title="Apellidos"
                      type="text"
                      value={apellidos}
                      onChange={handleOnchangeApellidos}
                      placeholder="nombre"
                    />
                  </div>
                  <Input
                    title="Usuario"
                    type="text"
                    value={usuario}
                    onChange={handleOnchangeUsuario}
                    placeholder="Usuario"
                  />
                  <Input
                    title="Email"
                    type="text"
                    value={email}
                    onChange={handleOnchangeEmail}
                    placeholder="Correo Electronico"
                  />
                  <Input
                    title="Password"
                    type="password"
                    value={password}
                    onChange={handleOnchangePassword}
                    placeholder="Password"
                  />
                </>
              )}
          </div>
          <div className="auth-model-submit-button-container">
            <Button
              type="submit"
              onClick={isRegistering ? handleRegister : handleLogin}
              name="primary" >{isRegistering ? "Registrarse" : "Entrar"}</Button>
            <Button
              type="submit"
              onClick={handleSwapRegister}
              name="secondary">{!isRegistering ? "Registrarse" : "Iniciar sesión"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
