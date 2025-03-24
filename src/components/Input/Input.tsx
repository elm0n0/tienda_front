import React, { useState } from 'react';
import eyeShowIcon from './icons/eye-show-password-ico-dark.svg';
import eyeHiddenIcon from './icons/eye-hidden-password-ico-dark.svg';
import './Input.css'

interface InputProps {
  title: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: string;
  hasError?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  title,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  hasError = false,
  onBlur
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(eyeShowIcon);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (showIcon === eyeShowIcon) {
      setShowIcon(eyeHiddenIcon);
    } else {
      setShowIcon(eyeShowIcon);
    }

  };

  return (
    <div className="input-container">
      <div className="input-header">
        <p className="pInput">{title}</p>
        {hasError && error &&
          <p className="error-message-inline"
            title={error}>{error}</p>}
      </div>
      <div className={`input-wrapper`}>
        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          className="input"
        />
        {type === 'password' && (
          <img
            src={showIcon}
            alt="Mostrar contraseña"
            onClick={togglePasswordVisibility}
            className="eye-icon"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
