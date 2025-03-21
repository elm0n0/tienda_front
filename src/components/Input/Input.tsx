import React, { useState } from 'react';
import eyeShowIcon  from './icons/eye-show-password-ico-dark.svg';
import eyeHiddenIcon  from './icons/eye-hidden-password-ico-dark.svg';
import './Input.css'

interface InputProps {
  title: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ title, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(eyeShowIcon);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (showIcon === eyeShowIcon) {
      setShowIcon(eyeHiddenIcon);
    }else {
      setShowIcon(eyeShowIcon);
    }
    
  };

  return (
    <div className="container">
      <div className="input-container">
        <p className="pInput">{title}</p>
        <div className="input-wrapper">
          <input
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input"
          />
          {type === 'password' && (
              <img src={showIcon} alt="Mostrar contraseña" onClick={togglePasswordVisibility} className="eye-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
