import React, { useState } from "react";
import AuthModal from "../../modals/AuthModal/AuthModal";
import Button from "../../Button/Button";
import { useTranslation } from "react-i18next";

const HeaderRegister: React.FC = () => {

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        variant="primary">
        {t('HEADER.REGISTER.REGISTER')}
      </Button>
      {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default HeaderRegister;