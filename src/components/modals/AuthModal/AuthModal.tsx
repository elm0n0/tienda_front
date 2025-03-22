import React, { useState } from "react";
import "./AuthModal.css";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
        <h2>Iniciar sesión</h2>
        <div className="auth-modal-input-wrapper-container">
          <div className="auth-modal-input-wrapper">
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
          </div>
          <div className="auth-model-submit-button-container">
            <Button
              type="submit"
              onClick={onClose}
              name="primary" >Entrar</Button>
            <Button
              type="submit"
              onClick={onClose}
              name="secondary">registrarse</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
