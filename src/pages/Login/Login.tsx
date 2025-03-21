import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/authService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Login: React.FC = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authResponse');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    const authResponse = await authService.login({credential, password});

    if (authResponse) {
      localStorage.setItem('authResponse', JSON.stringify(authResponse));
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <Input
        title="email"
        type="email"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        placeholder="Correo electrónico"
      />
      <Input
        title="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <Button type="submit" onClick={handleLogin}>Iniciar sesión</Button>
    </div>
  );
};

export default Login;
