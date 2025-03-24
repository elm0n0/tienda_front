import React, { useState } from "react";
import AuthModal from "../../modals/AuthModal/AuthModal";
import Button from "../../Button/Button";

const HeaderRegister: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        name="primary">
        Identificarse
      </Button>
      {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default HeaderRegister;