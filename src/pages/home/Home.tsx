import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../../utils/auth';
import Header from '../../components/headers/header';

const Home: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className='header-container'>
        <Header></Header>
      </div>
      <div>menu con modificacion</div>
      <div>contenido a elegir entre plantillas</div>
      <div>pie de pagina</div>
    </>
  );

};

export default Home;
