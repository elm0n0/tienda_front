import React, { useState } from "react";
import AuthModal from "../../modals/AuthModal/AuthModal";
import Button from "../../Button/Button";

const HeaderRegister: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header-register">
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        name="primary">
        iniciar sesion
      </Button>
      {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default HeaderRegister;