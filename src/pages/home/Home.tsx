import React from 'react';
import './Home.css';

import Header from '../../components/headers/header';

const Home: React.FC = () => {

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
