import React from "react";
import "./AuthModal.css";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" type="button" onClick={onClose}>×</button>
        <h2>Inicia sesión o regístrate</h2>

        {/* Aquí puedes poner los Inputs reales, o componentes como <LoginForm /> / <RegisterForm /> */}
        <input className="auth-modal-input" type="email" placeholder="Correo electrónico" />
        <input className="auth-modal-input" type="password" placeholder="Contraseña" />
        <button className="auth-model-submit-button" type="submit">Entrar</button>
      </div>
    </div>
  );
};

export default AuthModal;
