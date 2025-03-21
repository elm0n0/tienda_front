import React, { useState } from "react";
import AuthModal from "../../modals/AuthModal/AuthModal";

const HeaderRegister: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="header-register">
        <button onClick={() => setIsOpen(true)} className="register-button">
          Iniciar sesión
        </button>
  
        {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  };

export default HeaderRegister;