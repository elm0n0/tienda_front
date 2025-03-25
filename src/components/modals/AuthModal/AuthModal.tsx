import React, { useState } from "react";
import "./AuthModal.css";
import Button from "../../Button/Button";
import AuthForm from "../../Forms/AuthForm/AuthForm";
import { useTranslation } from "react-i18next";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {

  const { t } = useTranslation();

  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-close-button-container">
          <Button type="button" onClick={onClose} name="primary">
            X
          </Button>
        </div>
        <h2 className="auth-modal-title">
          {isRegistering ? t('HEADER.REGISTER.AUTH_MODAL.REGISTER') : t('HEADER.REGISTER.AUTH_MODAL.LOGIN')}
        </h2>
        <AuthForm
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
};

export default AuthModal;
